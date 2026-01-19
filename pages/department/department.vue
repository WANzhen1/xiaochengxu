<template>
	<view class="container">
		<!-- 科室标题 -->
		<view class="department-header">
			<text class="department-title">{{ departmentName }}</text>
		</view>

		<!-- 日期选择器 -->
		<picker class="picker" mode="date">
			<view>
				选择日期
			</view>
		</picker>
		<!-- 		<view class="date-selector">
			<view class="date-item" v-for="(item, index) in dates" :key="index" :class="{ active: currentDateIndex === index }" @click="selectDate(index)">
				<text class="date-week">{{ item.week }}</text>
				<text class="date-day">{{ item.month }}/{{ item.day }}</text>
			</view>
		</view> -->

		<!-- 医生列表 -->
		<view class="doctor-list">
			<view class="doctor-item" v-for="(doctor, index) in doctors" :key="index" @tap="viewDoctorInfo(doctor)">
				<view class="doctor-info">
					<image class="doctor-avatar" :src="doctor.imgUrl" mode="aspectFill"></image>
					<view class="doctor-detail">
						<view class="doctor-name">
							<text class="name">{{ doctor.doctorName }}</text>
							<text class="title">{{ doctor.titlename || '医师' }}</text>
						</view>
						<text class="specialty">{{ doctor.departmentname || '暂无科室信息' }}</text>
					</view>
				</view>
				<view class="doctor-status">
					<text class="price">¥20</text>
					<button class="book-btn" @tap.stop="bookAppointment(doctor)">
						{{ doctor.state === 0 ? '约满' : '预约' }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			currentDateIndex: 0,
			dates: [],
			doctors: [],
			departmentId: '',
			departmentName: ''
		}
	},
	onLoad(options) {
		// 获取URL参数中的departmentId
		this.departmentId = options.departmentId;
		console.log('选择的科室ID'+this.departmentId);
		// 获取选中的科室信息
		request({
				url: '/admin/departmentByID?id=' + this.departmentId,
				method: 'GET'
			}).then(res => {
			if (res.data) {
				console.log('获取科室信息成功:', res.data);
				this.departmentName = res.data.departmentName;
			} else {
				console.error('获取科室信息失败:', res.data);
			}
		}).catch(err => {
			console.error('获取科室信息失败:', err);
			uni.showToast({
				title: '获取科室信息失败',
				icon: 'none'
			});
		});
		// 初始化日期数组
		this.initDates();
		// 获取医生列表
		this.getDoctorsByDepartment();
	},
	methods: {
		// 初始化日期数组
		initDates() {
			const dates = [];
			const today = new Date();

			for (let i = 0; i < 7; i++) {
				const date = new Date(today);
				date.setDate(today.getDate() + i);

				const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
				const month = date.getMonth() + 1;
				const day = date.getDate();

				dates.push({
					week: i === 0 ? '今日' : week,
					month: month,
					day: day
				});
			}

			this.dates = dates;
		},

		selectDate(index) {
			this.currentDateIndex = index;
		},

		// 获取特定科室的医生列表
		getDoctorsByDepartment() {
			uni.showLoading({
				title: '加载中...'
			});
			request({
				url: '/doctor/searchdoctor?departmentid=' + this.departmentId,
				method: 'GET',
			}).then(res => {
				uni.hideLoading();
				this.doctors = res.data;
			}).catch(err => {
				uni.hideLoading();
				console.error('获取医生列表失败:', err);
				uni.showToast({
					title: '获取医生列表失败',
					icon: 'none'
				});
			});
		},

		viewDoctorInfo(doctor) {
			// 保存医生信息
			uni.setStorageSync('selectedDoctor', doctor);
			// 跳转到医生信息页面
			uni.navigateTo({
				url: '/pages/doctor-info/doctor-info?id=' + doctor.DoctorID
			});
		},

		bookAppointment(doctor) {
			// 保存医生信息
			uni.setStorageSync('selectedDoctor', doctor);
			// 跳转到预约须知页面
			uni.navigateTo({
				url: '/pages/appointment-notice/appointment-notice'
			});
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

/* Picker样式美化 */
.picker {
	background-color: white;
	width: 80%;
	margin: 10rpx auto;
	border-bottom: 1rpx solid #eee;
}

.picker view {
	width: 100%;
	height: 100%;
	background-color: #f0f8ff;
	border-radius: 10rpx;
	border: 2rpx solid #007AFF;
	display: flex;
	justify-content: center;
	align-items: center;
}

.picker view text {
	color: #333;
	font-size: 28rpx;
	font-weight: 400;
}

.picker view {
	width: 100%;
	height: 80rpx;
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