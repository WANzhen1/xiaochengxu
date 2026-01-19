<template>
	<view class="container">
		<!-- 页面标题 -->
		<view class="page-header">
			<text class="page-title">门诊充值</text>
		</view>
		
		<!-- 就诊人信息卡片 -->
		<view class="patient-card">
			<view class="card-header">
				<text class="header-title">就诊人信息</text>
				<text class="switch-btn" @tap="switchPatient">切换</text>
			</view>
			<view class="card-content">
				<view class="name-tag">
					<text class="patient-name">{{ patient.PatientName || '蒋峰' }}</text>
					<view class="relationship-tag">本人</view>
				</view>
				<text class="card-number">就诊卡：{{ patient.PatientAccount || '622**********0909' }}</text>
			</view>
		</view>

		<!-- 卡内余额 -->
		<view class="balance-section">
			<text class="balance-label">卡内余额</text>
			<text class="balance-amount">¥{{ balance || 60.00 }}</text>
		</view>

		<!-- 在线充值 -->
		<view class="recharge-section">
			<view class="section-header">
				<text class="section-title">在线充值</text>
			</view>
			
			<!-- 充值金额选项 -->
			<view class="amount-options">
				<view class="amount-item" v-for="amount in amounts" :key="amount" :class="{ active: selectedAmount === amount }" @tap="selectAmount(amount)">
					<text class="amount-text">¥{{ amount }}</text>
				</view>
				<view class="amount-item custom" :class="{ active: selectedAmount === 'custom' }" @tap="selectAmount('custom')">
					<text class="amount-text">自定义</text>
				</view>
			</view>
			
			<!-- 自定义金额输入 -->
			<view class="custom-amount" v-if="selectedAmount === 'custom'">
				<text class="amount-prefix">¥</text>
				<input type="number" class="amount-input" v-model="customAmount" placeholder="请输入充值金额" />
			</view>
			
			<!-- 充值记录 -->
			<view class="record-section">
				<text class="record-link" @tap="viewRecords">充值记录 ></text>
			</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="payment-section">
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

		<!-- 确认充值按钮 -->
		<view class="confirm-section">
			<view class="total-amount">
				<text class="total-label">充值金额：</text>
				<text class="total-value">¥{{ finalAmount }}</text>
			</view>
			<button class="confirm-btn" @tap="confirmRecharge" :disabled="!canRecharge">确认充值</button>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			patient: {},
			balance: 0.00,
			selectedAmount: 100,
			customAmount: '',
			amounts: [50, 100, 200, 500, 1000],
			selectedPayment: 'wechat',
			paymentMethods: [
				{ id: 'wechat', name: '微信支付', icon: '/static/wechat.png' },
				{ id: 'alipay', name: '支付宝', icon: '/static/alipay.png' }
			]
		}
	},
	computed: {
		finalAmount() {
			if (this.selectedAmount === 'custom') {
				return parseFloat(this.customAmount) || 0;
			}
			return this.selectedAmount;
		},
		canRecharge() {
			if (this.selectedAmount === 'custom') {
				const amount = parseFloat(this.customAmount);
				return !isNaN(amount) && amount > 0;
			}
			return this.selectedAmount > 0;
		}
	},
	onLoad() {
		// 从本地存储获取就诊人信息
		this.patient = uni.getStorageSync('selectedPatient') || {};
		// 获取卡内余额
		this.getBalance();
	},
	onShow() {
		// 页面显示时重新获取就诊人信息和余额
		this.patient = uni.getStorageSync('selectedPatient') || {};
		this.getBalance();
	},
	methods: {
		switchPatient() {
			// 跳转到选择就诊人页面
			uni.navigateTo({
				url: '/pages/select-patient/select-patient'
			});
		},
		getBalance() {
			// 调用后端接口获取卡内余额
			if (!this.patient.PatientID) return;
			
			uni.showLoading({
				title: '加载中...'
			});
			
			request({
				url: `/patient/findpatient?id=${this.patient.PatientID}`,
				method: 'GET'
			}).then(res => {
				uni.hideLoading();
				if (res.data) {
					this.balance = res.data.PatientWallet || 0;
				}
			}).catch(err => {
				uni.hideLoading();
				console.error('获取余额失败:', err);
				uni.showToast({
					title: '获取余额失败',
					icon: 'none'
				});
			});
		},
		selectAmount(amount) {
			this.selectedAmount = amount;
			if (amount !== 'custom') {
				this.customAmount = '';
			}
		},
		selectPayment(payment) {
			this.selectedPayment = payment;
		},
		viewRecords() {
			// 跳转到充值记录页面
			uni.showToast({
				title: '查看充值记录',
				icon: 'none'
			});
		},
		confirmRecharge() {
			if (this.canRecharge) {
				// 跳转到确认缴费信息页面
				uni.navigateTo({
					url: `/pages/confirm-payment/confirm-payment?amount=${this.finalAmount}&type=recharge&patientId=${this.patient.PatientID}`
				});
			}
		}
	}
}
</script>

<style scoped>
.container {
	padding: 0 30rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

/* 页面标题 */
.page-header {
	padding: 30rpx 0;
	text-align: center;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.page-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

/* 就诊人信息卡片 */
.patient-card {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.header-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

.switch-btn {
	font-size: 26rpx;
	color: #007AFF;
}

.card-content {
	padding-top: 20rpx;
}

.name-tag {
	display: flex;
	align-items: center;
	margin-bottom: 15rpx;
}

.patient-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-right: 20rpx;
}

.relationship-tag {
	font-size: 24rpx;
	color: #007AFF;
	background-color: #e6f2ff;
	padding: 5rpx 15rpx;
	border-radius: 15rpx;
}

.card-number {
	font-size: 26rpx;
	color: #666;
}

/* 卡内余额 */
.balance-section {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.balance-label {
	font-size: 30rpx;
	color: #333;
}

.balance-amount {
	font-size: 48rpx;
	font-weight: bold;
	color: #ff6b35;
}

/* 在线充值 */
.recharge-section {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-header {
	margin-bottom: 30rpx;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

/* 充值金额选项 */
.amount-options {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 30rpx;
}

.amount-item {
	width: 31%;
	height: 100rpx;
	border: 2rpx solid #e0e0e0;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20rpx;
	background-color: #fafafa;
}

.amount-item.active {
	border-color: #007AFF;
	background-color: #e6f2ff;
}

.amount-text {
	font-size: 32rpx;
	color: #333;
}

.amount-item.active .amount-text {
	color: #007AFF;
	font-weight: bold;
}

/* 自定义金额输入 */
.custom-amount {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
	border: 2rpx solid #e0e0e0;
	border-radius: 10rpx;
	padding: 0 20rpx;
	height: 100rpx;
}

.amount-prefix {
	font-size: 36rpx;
	color: #333;
	margin-right: 20rpx;
}

.amount-input {
	flex: 1;
	font-size: 36rpx;
	color: #333;
	height: 100%;
}

/* 充值记录 */
.record-section {
	display: flex;
	justify-content: flex-end;
}

.record-link {
	font-size: 26rpx;
	color: #007AFF;
}

/* 支付方式 */
.payment-section {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 120rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
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

/* 确认充值按钮 */
.confirm-section {
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

.total-amount {
	display: flex;
	align-items: center;
}

.total-label {
	font-size: 28rpx;
	color: #666;
}

.total-value {
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

.confirm-btn[disabled] {
	background-color: #e6e6e6;
	color: #999;
}
</style>