<template>
	<view class="container">
		<!-- 科室标题 -->
		<view class="department-header">
			<text class="department-title">消化内科</text>
		</view>
		
		<!-- 日期选择器 -->
		<view class="date-selector">
			<view class="date-item" v-for="(item, index) in dates" :key="index" :class="{ active: currentDateIndex === index }" @click="selectDate(index)">
				<text class="date-week">{{ item.week }}</text>
				<text class="date-day">{{ item.month }}/{{ item.day }}</text>
			</view>
		</view>

		<!-- 医生列表 -->
		<view class="doctor-list">
			<view class="doctor-item" v-for="(doctor, index) in doctors" :key="index" @tap="viewDoctorInfo(doctor)">
				<view class="doctor-info">
					<image class="doctor-avatar" src="/static/default-avatar.png" mode="aspectFill"></image>
					<view class="doctor-detail">
						<view class="doctor-name">
							<text class="name">{{ doctor.name }}</text>
							<text class="title">{{ doctor.title }}</text>
						</view>
						<text class="specialty">{{ doctor.specialty }}</text>
						<view class="doctor-schedule">
							<text class="schedule-item" v-for="(schedule, idx) in doctor.schedule" :key="idx">{{ schedule }}</text>
						</view>
					</view>
				</view>
				<view class="doctor-status">
					<text class="price">¥{{ doctor.price }}</text>
					<button class="book-btn" :disabled="doctor.status === 'full'" @tap.stop="bookAppointment(doctor)">
						{{ doctor.status === 'full' ? '约满' : '预约' }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentDateIndex: 0,
			dates: [
				{ week: '今日', month: '1', day: '3' },
				{ week: '周六', month: '1', day: '4' },
				{ week: '周日', month: '1', day: '5' },
				{ week: '周一', month: '1', day: '6' },
				{ week: '周二', month: '1', day: '7' },
				{ week: '周三', month: '1', day: '8' },
				{ week: '周四', month: '1', day: '9' }
			],
			doctors: [
				{
					id: 1,
					name: '赵马',
					title: '主任医师',
					specialty: '消化系统疾病的诊断和治疗，擅长肝胆疾病',
					schedule: ['周一上午', '周三下午', '周五全天'],
					price: 60,
					status: 'available',
					remaining: 30
				},
				{
					id: 2,
					name: '刘萌萌',
					title: '主任医师',
					specialty: '消化系统疾病的诊断和治疗，擅长胃肠疾病',
					schedule: ['周二上午', '周四下午', '周六全天'],
					price: 60,
					status: 'full',
					remaining: 0
				},
				{
					id: 3,
					name: '甄金争',
					title: '副主任医师',
					specialty: '消化系统疾病的诊断和治疗，擅长肝病',
					schedule: ['周一下午', '周三上午', '周五下午'],
					price: 50,
					status: 'available',
					remaining: 20
				},
				{
					id: 4,
					name: '李丽',
					title: '主治医师',
					specialty: '消化系统疾病的诊断和治疗，擅长胃肠镜检查',
					schedule: ['周二下午', '周四上午', '周六上午'],
					price: 40,
					status: 'available',
					remaining: 15
				}
			]
		}
	},
	methods: {
		selectDate(index) {
			this.currentDateIndex = index;
		},
		viewDoctorInfo(doctor) {
			// 保存医生信息
			uni.setStorageSync('selectedDoctor', doctor);
			// 跳转到医生信息页面
			uni.navigateTo({
				url: '/pages/doctor-info/doctor-info'
			});
		},
		bookAppointment(doctor) {
			if (doctor.status === 'available') {
				// 保存医生信息
				uni.setStorageSync('selectedDoctor', doctor);
				// 跳转到预约须知页面
				uni.navigateTo({
					url: '/pages/appointment-notice/appointment-notice'
				});
			}
		}
	}
}
</script>

<style scoped>
.container {
	padding: 0;
	background-color: #f5f5f5;
	min-height: 100vh;
}

/* 科室标题 */
.department-header {
	background-color: #fff;
	padding: 30rpx 40rpx;
	border-bottom: 1rpx solid #eee;
}

.department-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

/* 日期选择器 */
.date-selector {
	display: flex;
	justify-content: space-around;
	background-color: white;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #eee;
}

.date-item {
	width: 80rpx;
	height: 120rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 10rpx;
	cursor: pointer;
}

.date-item.active {
	background-color: #e6f2ff;
	color: #007AFF;
}

.date-week {
	font-size: 24rpx;
	margin-bottom: 10rpx;
}

.date-day {
	font-size: 32rpx;
	font-weight: bold;
}

/* 医生列表 */
.doctor-list {
	background-color: #f5f5f5;
	padding: 20rpx;
}

.doctor-item {
	background-color: white;
	border-radius: 10rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.doctor-info {
	display: flex;
	align-items: center;
	flex: 1;
}

.doctor-avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	background-color: #e6e6e6;
	margin-right: 30rpx;
}

.doctor-detail {
	flex: 1;
}

.doctor-name {
	display: flex;
	align-items: center;
	margin-bottom: 15rpx;
}

.name {
	font-size: 32rpx;
	font-weight: bold;
	margin-right: 15rpx;
}

.title {
	font-size: 26rpx;
	color: #666;
	background-color: #f0f0f0;
	padding: 4rpx 15rpx;
	border-radius: 15rpx;
}

.specialty {
	font-size: 26rpx;
	color: #666;
	margin-bottom: 15rpx;
	display: block;
}

.doctor-schedule {
	display: flex;
	flex-wrap: wrap;
}

.schedule-item {
	font-size: 22rpx;
	color: #999;
	background-color: #fafafa;
	padding: 5rpx 15rpx;
	border-radius: 15rpx;
	margin-right: 15rpx;
	margin-bottom: 10rpx;
}

.doctor-status {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.price {
	font-size: 36rpx;
	color: #ff6b35;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.book-btn {
	width: 150rpx;
	height: 60rpx;
	background-color: #007AFF;
	color: white;
	font-size: 28rpx;
	border-radius: 30rpx;
	line-height: 60rpx;
}

.book-btn[disabled] {
	background-color: #e6e6e6;
	color: #999;
}
</style>