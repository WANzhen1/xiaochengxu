<template>
	<view class="container">
		<view class="success-section">
			<view class="success-icon">
				<uni-icons type="success" size="120" color="#07c160" />
			</view>
			<text class="success-title">预约成功</text>
			<text class="success-desc">您已成功预约，请持本人身份证按时就诊</text>
		</view>
		
		<!-- 预约信息卡片 -->
		<view class="appointment-card">
			<view class="card-header">
				<text class="card-title">预约信息</text>
			</view>
			<view class="card-content">
				<view class="info-item">
					<text class="info-label">就诊人：</text>
					<text class="info-value">{{ patient.name || '张三' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">科室：</text>
					<text class="info-value">{{ department.name || '消化内科' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">医生：</text>
					<text class="info-value">{{ doctor.name || '赵马' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">就诊时间：</text>
					<text class="info-value">{{ appointmentDate }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">挂号费用：</text>
					<text class="info-value price">¥{{ doctor.price || 60 }}</text>
				</view>
			</view>
		</view>
		
		<!-- 温馨提示 -->
		<view class="tip-section">
			<text class="tip-title">温馨提示</text>
			<text class="tip-content">- 请携带有效身份证件按时就诊</text>
			<text class="tip-content">- 请提前30分钟到达医院签到</text>
			<text class="tip-content">- 如需取消预约，请提前24小时操作</text>
		</view>
		
		<!-- 按钮区域 -->
		<view class="btn-container">
			<button class="btn primary" @tap="viewDetails">查看预约详情</button>
			<button class="btn secondary" @tap="returnHome">返回首页</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			patient: {},
			doctor: {},
			department: {},
			appointmentDate: ''
		};
	},
	onLoad() {
		// 从本地存储获取信息
		this.patient = uni.getStorageSync('selectedPatient') || {};
		this.doctor = uni.getStorageSync('selectedDoctor') || {};
		this.department = uni.getStorageSync('selectedDepartment') || {};
		
		// 设置预约日期
		const now = new Date();
		this.appointmentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
	},
	methods: {
		viewDetails() {
			// 查看预约详情逻辑
			uni.showToast({
				title: '查看预约详情',
				icon: 'none'
			});
		},
		returnHome() {
			// 返回首页
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx 30rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.success-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40rpx;
	background-color: #fff;
	padding: 60rpx 40rpx;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	width: 100%;
}

.success-icon {
	margin-bottom: 30rpx;
}

.success-title {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.success-desc {
	font-size: 28rpx;
	color: #666;
	text-align: center;
	line-height: 1.6;
}

/* 预约信息卡片 */
.appointment-card {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	width: 100%;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.card-header {
	margin-bottom: 20rpx;
}

.card-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.card-content {
	padding-top: 20rpx;
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.info-item:last-child {
	border-bottom: none;
}

.info-label {
	font-size: 28rpx;
	color: #666;
}

.info-value {
	font-size: 28rpx;
	color: #333;
	text-align: right;
	flex: 1;
}

.price {
	color: #ff6b35;
	font-weight: bold;
}

/* 温馨提示 */
.tip-section {
	background-color: #fff9e6;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 40rpx;
	width: 100%;
}

.tip-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #ff9800;
	margin-bottom: 20rpx;
	display: block;
}

.tip-content {
	font-size: 26rpx;
	color: #ff6b35;
	line-height: 1.8;
	display: block;
	margin-bottom: 10rpx;
}

/* 按钮区域 */
.btn-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.btn {
	height: 88rpx;
	border-radius: 44rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-weight: bold;
}

.btn.primary {
	background-color: #07c160;
	color: white;
}

.btn.secondary {
	background-color: #f0f0f0;
	color: #333;
	border: 2rpx solid #e0e0e0;
}
</style>