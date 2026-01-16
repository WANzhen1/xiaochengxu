<template>
	<view class="payment-info-container">
		<view class="success-section">
			<view class="success-icon">
				<uni-icons type="success" size="120" color="#07c160" />
			</view>
			<text class="success-title">缴费成功</text>
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
					<text class="info-label">缴费金额：</text>
					<text class="info-value price">¥{{ amount || 0 }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">支付方式：</text>
					<text class="info-value">{{ paymentMethod }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">交易时间：</text>
					<text class="info-value">{{ paymentTime }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">交易单号：</text>
					<text class="info-value">{{ tradeNo }}</text>
				</view>
			</view>
		</view>
		
		<!-- 温馨提示 -->
		<view class="tip-section">
			<text class="tip-title">温馨提示</text>
			<text class="tip-content">- 缴费成功后，费用将直接计入您的就诊账户</text>
			<text class="tip-content">- 您可以在"我的订单"中查看缴费记录</text>
			<text class="tip-content">- 如需开具电子发票，请点击下方"开具电子发票"按钮</text>
		</view>
		
		<!-- 操作按钮 -->
		<view class="btn-container">
			<button class="btn primary" @tap="viewInvoice">开具电子发票</button>
			<button class="btn secondary" @tap="returnHome">返回首页</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			paymentType: 'recharge', // recharge: 门诊充值, treatment: 门诊缴费
			paymentItem: '门诊充值',
			amount: 0,
			paymentMethod: '微信支付',
			paymentTime: '',
			tradeNo: ''
		};
	},
	onLoad(options) {
		// 从参数中获取金额和类型
		if (options.amount) {
			this.amount = parseFloat(options.amount);
		}
		if (options.type) {
			this.paymentType = options.type;
			this.paymentItem = this.paymentType === 'recharge' ? '门诊充值' : '门诊缴费';
		}
		
		// 设置当前时间
		const now = new Date();
		this.paymentTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
		
		// 生成随机交易单号
		this.tradeNo = this.generateTradeNo();
	},
	methods: {
		generateTradeNo() {
			// 生成16位随机交易单号
			const timestamp = new Date().getTime();
			const random = Math.floor(Math.random() * 10000);
			return `TX${timestamp}${random.toString().padStart(4, '0')}`;
		},
		viewInvoice() {
			// 跳转到待开具电子发票页面
			uni.navigateTo({
				url: '/pages/to-be-invoiced/to-be-invoiced'
			});
		},
		returnHome() {
			// 返回首页
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style scoped>
.payment-info-container {
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
}

.success-icon {
	margin-bottom: 20rpx;
}

.success-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

/* 缴费信息卡片 */
.payment-card {
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
	font-size: 36rpx;
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

/* 操作按钮 */
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
	background-color: #007AFF;
	color: white;
}

.btn.secondary {
	background-color: #f0f0f0;
	color: #333;
	border: 2rpx solid #e0e0e0;
}
</style>