<template>
	<view class="doctor-info-container">
		<scroll-view scroll-y="true">
			<!-- 医生基本信息 -->
			<view class="doctor-basic-info">
				<image class="doctor-avatar" src="/static/default-avatar.png" mode="aspectFill"></image>
				<view class="doctor-detail-info">
					<view class="doctor-name-section">
						<text class="doctor-name">{{ doctor.DoctorName || '暂无姓名' }}</text>
						<text class="doctor-title">{{ doctor.titlename || '医师' }}</text>
					</view>
					<text class="doctor-department">{{ departmentName || '暂无科室信息' }}</text>
					<text class="doctor-specialty">{{ doctor.departmentname || '暂无专业信息' }}</text>
				</view>
			</view>
			
			<!-- 医生简介 -->
			<view class="doctor-intro">
				<text class="section-title">医生简介</text>
				<text class="intro-content">{{ doctor.intro || '该医生暂无简介信息，如有疑问，请咨询医院工作人员。' }}</text>
			</view>
			
			<!-- 出诊时间 -->
			<view class="doctor-schedule-section">
				<text class="section-title">出诊时间</text>
				<view class="schedule-grid">
					<view class="schedule-item">周一 上午</view>
					<view class="schedule-item">周三 上午</view>
					<view class="schedule-item">周五 下午</view>
				</view>
			</view>
			
			<!-- 擅长领域 -->
			<view class="doctor-skills">
				<text class="section-title">擅长领域</text>
				<view class="skills-list">
					<text class="skill-item">内科常见病</text>
					<text class="skill-item">多发病</text>
					<text class="skill-item">疑难病症</text>
				</view>
			</view>
		</scroll-view>
		
		<!-- 预约按钮 -->
		<view class="appointment-section">
			<view class="price-info">
				<text class="price-label">挂号费：</text>
				<text class="price">¥50</text>
			</view>
			<button class="appointment-btn" @tap="bookAppointment" :disabled="doctor.state === 0">
				{{ doctor.state === 0 ? '约满' : '立即预约' }}
			</button>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			doctor: {},
			doctorId: '',
			departmentName: ''
		};
	},
	onLoad(options) {
		// 获取URL参数中的doctorId
		this.doctorId = options.id;
		// 获取医生详情
		this.getDoctorInfo();
	},
	methods: {
		// 获取医生详情
		getDoctorInfo() {
			uni.showLoading({
				title: '加载中...'
			});
			// 先从本地存储获取医生信息
			const selectedDoctor = uni.getStorageSync('selectedDoctor');
			if (selectedDoctor && selectedDoctor.DoctorID == this.doctorId) {
				// 如果本地存储有该医生信息，直接使用
				this.doctor = selectedDoctor;
				this.departmentName = selectedDoctor.departmentname || '';
				uni.hideLoading();
			} else {
				// 否则调用接口获取医生信息
				request({
					url: '/doctor/alldoctors',
					method: 'GET'
				}).then(res => {
					uni.hideLoading();
					// 从所有医生中找到当前医生
					const doctor = res.data.find(d => d.DoctorID == this.doctorId);
					if (doctor) {
						this.doctor = doctor;
						this.departmentName = doctor.departmentname || '';
						// 保存到本地存储
						uni.setStorageSync('selectedDoctor', doctor);
					} else {
						uni.showToast({
							title: '获取医生信息失败',
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.hideLoading();
					console.error('获取医生信息失败:', err);
					uni.showToast({
						title: '获取医生信息失败',
						icon: 'none'
					});
				});
			}
		},
		bookAppointment() {
			// 保存医生信息
			uni.setStorageSync('selectedDoctor', this.doctor);
			// 跳转到预约须知页面
			uni.navigateTo({
				url: '/pages/appointment-notice/appointment-notice'
			});
		}
	}
};
</script>

<style scoped>
.doctor-info-container {
	height: 100vh;
	background-color: #f5f5f5;
}

/* 医生基本信息 */
.doctor-basic-info {
	display: flex;
	padding: 40rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.doctor-avatar {
	width: 180rpx;
	height: 180rpx;
	border-radius: 50%;
	background-color: #e6e6e6;
	margin-right: 40rpx;
}

.doctor-detail-info {
	flex: 1;
	justify-content: center;
}

.doctor-name-section {
	display: flex;
	align-items: center;
	margin-bottom: 15rpx;
}

.doctor-name {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
	margin-right: 20rpx;
}

.doctor-title {
	font-size: 28rpx;
	color: #666;
	background-color: #f0f0f0;
	padding: 5rpx 15rpx;
	border-radius: 20rpx;
}

.doctor-department {
	font-size: 28rpx;
	color: #007AFF;
	margin-bottom: 10rpx;
	display: block;
}

.doctor-specialty {
	font-size: 26rpx;
	color: #666;
	display: block;
}

/* 通用标题样式 */
.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: block;
}

/* 医生简介 */
.doctor-intro {
	padding: 30rpx 40rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.intro-content {
	font-size: 26rpx;
	color: #666;
	line-height: 1.8;
	text-align: justify;
}

/* 出诊时间 */
.doctor-schedule-section {
	padding: 30rpx 40rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.schedule-grid {
	display: flex;
	flex-wrap: wrap;
}

.schedule-item {
	background-color: #e6f2ff;
	color: #007AFF;
	font-size: 26rpx;
	padding: 15rpx 30rpx;
	border-radius: 25rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}

/* 擅长领域 */
.doctor-skills {
	padding: 30rpx 40rpx;
	background-color: #fff;
	margin-bottom: 120rpx;
}

.skills-list {
	display: flex;
	flex-wrap: wrap;
}

.skill-item {
	background-color: #f5f5f5;
	color: #666;
	font-size: 26rpx;
	padding: 15rpx 30rpx;
	border-radius: 25rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}

/* 预约按钮区域 */
.appointment-section {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	padding: 30rpx 40rpx;
	border-top: 1rpx solid #eee;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.price-info {
	display: flex;
	align-items: center;
}

.price-label {
	font-size: 28rpx;
	color: #666;
}

.price {
	font-size: 40rpx;
	color: #ff6b35;
	font-weight: bold;
}

.appointment-btn {
	width: 200rpx;
	height: 80rpx;
	background-color: #007AFF;
	color: #fff;
	font-size: 32rpx;
	border-radius: 40rpx;
	line-height: 80rpx;
}

.appointment-btn[disabled] {
	background-color: #e6e6e6;
	color: #999;
}
</style>