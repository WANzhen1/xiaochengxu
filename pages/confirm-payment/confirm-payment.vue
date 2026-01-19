<template>
	<view class="confirm-payment-container">
		<view class="header">
			<text class="title">确认缴费信息</text>
		</view>
		
		<scroll-view class="content" scroll-y="true">
			<!-- 缴费类型 -->
			<view class="type-section">
				<view class="type-item" :class="{ active: paymentType === 'recharge' }">
					<text class="type-text">门诊充值</text>
				</view>
				<view class="type-item" :class="{ active: paymentType === 'treatment' }">
					<text class="type-text">门诊缴费</text>
				</view>
			</view>
			
			<!-- 缴费信息卡片 -->
			<view class="payment-card">
				<view class="card-header">
					<text class="card-title">缴费信息</text>
				</view>
				<view class="card-content">
					<view class="info-item">
						<text class="info-label">缴费项目：</text>
						<text class="info-value">{{ paymentItem }}</text>
					</view>
					<view class="info-item">
					<text class="info-label">就诊人：</text>
					<text class="info-value">{{ patient.PatientName || '张三' }}</text>
				</view>
					<view class="info-item">
						<text class="info-label">金额：</text>
						<text class="info-value price">¥{{ amount || 0 }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">缴费时间：</text>
						<text class="info-value">{{ paymentTime }}</text>
					</view>
				</view>
			</view>
			
			<!-- 支付方式 -->
			<view class="payment-method-section">
				<view class="section-header">
					<text class="section-title">支付方式</text>
				</view>
				<view class="payment-options">
					<view class="payment-item" :class="{ active: selectedPayment === 'wechat' }" @tap="selectPayment('wechat')">
						<view class="payment-info">
							<image class="payment-icon" src="/static/wechat.png" mode="aspectFit"></image>
							<text class="payment-name">微信支付</text>
						</view>
						<view class="radio" :class="{ checked: selectedPayment === 'wechat' }"></view>
					</view>
					<view class="payment-item" :class="{ active: selectedPayment === 'alipay' }" @tap="selectPayment('alipay')">
						<view class="payment-info">
							<image class="payment-icon" src="/static/alipay.png" mode="aspectFit"></image>
							<text class="payment-name">支付宝</text>
						</view>
						<view class="radio" :class="{ checked: selectedPayment === 'alipay' }"></view>
					</view>
				</view>
			</view>
			
			<!-- 温馨提示 -->
			<view class="tip-section">
				<text class="tip-title">温馨提示</text>
				<text class="tip-content">- 缴费成功后，费用将直接计入就诊人账户</text>
				<text class="tip-content">- 请确认缴费信息无误后再进行支付</text>
				<text class="tip-content">- 如有疑问，请联系医院客服：010-12345678</text>
			</view>
		</scroll-view>
		
		<!-- 费用和确认按钮 -->
		<view class="footer">
			<view class="total-price">
				<text class="price-label">总计：</text>
				<text class="price-value">¥{{ amount || 0 }}</text>
			</view>
			<button class="confirm-btn" @tap="confirmPayment">确认缴费</button>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			paymentType: 'recharge', // recharge: 门诊充值, treatment: 门诊缴费
			paymentItem: '门诊充值',
			patient: {},
			amount: 0,
			paymentTime: '',
			selectedPayment: 'wechat',
			patientId: ''
		};
	},
	onLoad(options) {
		// 从参数中获取金额、类型和患者ID
		if (options.amount) {
			this.amount = parseFloat(options.amount);
		}
		if (options.type) {
			this.paymentType = options.type;
			this.paymentItem = this.paymentType === 'recharge' ? '门诊充值' : '门诊缴费';
		}
		if (options.patientId) {
			this.patientId = options.patientId;
		}
		
		// 从本地存储获取就诊人信息
		this.patient = uni.getStorageSync('selectedPatient') || {};
		
		// 设置当前时间
		const now = new Date();
		this.paymentTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
	},
	methods: {
		selectPayment(payment) {
			this.selectedPayment = payment;
		},
		confirmPayment() {
			// 调用后端充值接口
			uni.showLoading({
				title: '支付中...'
			});
			
			request({
				url: '/patient/addmoney',
				method: 'POST',
				data: {
					PatientID: this.patientId || this.patient.PatientID,
					money: this.amount
				}
			}).then(res => {
				uni.hideLoading();
				// 跳转到缴费信息页面
				uni.navigateTo({
					url: `/pages/payment-info/payment-info?amount=${this.amount}&type=${this.paymentType}`
				});
			}).catch(err => {
				uni.hideLoading();
				console.error('支付失败:', err);
				uni.showToast({
					title: '支付失败，请重试',
					icon: 'none'
				});
			});
		}
	}
};
</script>

<style scoped>
.confirm-payment-container {
	height: 100vh;
	background-color: #f5f5f5;
}

.header {
	background-color: #fff;
	padding: 30rpx 40rpx;
	border-bottom: 1rpx solid #eee;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.content {
	height: calc(100vh - 200rpx);
}

/* 缴费类型 */
.type-section {
	display: flex;
	background-color: #fff;
	padding: 20rpx;
	margin-bottom: 20rpx;
}

.type-item {
	flex: 1;
	height: 80rpx;
	background-color: #f5f5f5;
	border-radius: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 10rpx;
}

.type-item.active {
	background-color: #007AFF;
}

.type-text {
	font-size: 30rpx;
	color: #333;
}

.type-item.active .type-text {
	color: #fff;
	font-weight: bold;
}

/* 缴费信息卡片 */
.payment-card {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin: 0 30rpx 20rpx;
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
	font-size: 36rpx;
}

/* 支付方式 */
.payment-method-section {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin: 0 30rpx 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-header {
	margin-bottom: 30rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.payment-options {
	margin-top: 20rpx;
}

.payment-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 25rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.payment-item:last-child {
	border-bottom: none;
}

.payment-info {
	display: flex;
	align-items: center;
}

.payment-icon {
	width: 48rpx;
	height: 48rpx;
	margin-right: 20rpx;
}

.payment-name {
	font-size: 30rpx;
	color: #333;
}

.radio {
	width: 32rpx;
	height: 32rpx;
	border: 2rpx solid #ddd;
	border-radius: 50%;
	position: relative;
}

.radio.checked {
	border-color: #007AFF;
	background-color: #007AFF;
}

.radio.checked::after {
	content: '';
	position: absolute;
	width: 16rpx;
	height: 16rpx;
	background-color: #fff;
	border-radius: 50%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

/* 温馨提示 */
.tip-section {
	background-color: #fff9e6;
	border-radius: 15rpx;
	padding: 30rpx;
	margin: 0 30rpx 20rpx;
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

/* 费用和确认按钮 */
.footer {
	background-color: #fff;
	padding: 30rpx;
	border-top: 1rpx solid #eee;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}

.total-price {
	display: flex;
	align-items: center;
}

.price-label {
	font-size: 28rpx;
	color: #666;
}

.price-value {
	font-size: 40rpx;
	color: #ff6b35;
	font-weight: bold;
	margin-left: 10rpx;
}

.confirm-btn {
	width: 200rpx;
	height: 80rpx;
	background-color: #007AFF;
	color: #fff;
	font-size: 32rpx;
	border-radius: 40rpx;
	line-height: 80rpx;
}
</style>