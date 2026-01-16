<template>
	<view class="invoice-success-container">
		<view class="success-section">
			<view class="success-icon">
				<uni-icons type="success" size="120" color="#07c160" />
			</view>
			<text class="success-title">开票成功</text>
			<text class="success-desc">您的电子发票已开具成功</text>
		</view>
		
		<!-- 发票信息卡片 -->
		<view class="invoice-card">
			<view class="card-header">
				<text class="card-title">发票信息</text>
			</view>
			<view class="card-content">
				<view class="info-item">
					<text class="info-label">发票类型：</text>
					<text class="info-value">电子普通发票</text>
				</view>
				<view class="info-item">
					<text class="info-label">发票金额：</text>
					<text class="info-value price">¥{{ invoice.amount || 100.00 }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">开票时间：</text>
					<text class="info-value">{{ invoiceTime }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">发票号码：</text>
					<text class="info-value">{{ invoiceNo }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">开票项目：</text>
					<text class="info-value">{{ invoice.item || '门诊充值' }}</text>
				</view>
			</view>
		</view>
		
		<!-- 温馨提示 -->
		<view class="tip-section">
			<text class="tip-title">温馨提示</text>
			<text class="tip-content">- 电子发票已发送至您的手机邮箱</text>
			<text class="tip-content">- 您可以在"已开具电子发票"中查看和下载</text>
			<text class="tip-content">- 如有疑问，请联系医院客服：010-12345678</text>
		</view>
		
		<!-- 操作按钮 -->
		<view class="btn-container">
			<button class="btn primary" @tap="viewInvoices">查看已开发票</button>
			<button class="btn secondary" @tap="returnBack">返回</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			invoice: {
				id: '',
				item: '门诊充值',
				amount: 100.00
			},
			invoiceTime: '',
			invoiceNo: ''
		};
	},
	onLoad(options) {
		// 从参数中获取发票ID
		if (options.invoiceId) {
			this.invoice.id = options.invoiceId;
		}
		
		// 设置当前时间
		const now = new Date();
		this.invoiceTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
		
		// 生成随机发票号码
		this.invoiceNo = this.generateInvoiceNo();
	},
	methods: {
		generateInvoiceNo() {
			// 生成10位随机发票号码
			const random = Math.floor(1000000000 + Math.random() * 9000000000);
			return random.toString();
		},
		viewInvoices() {
			// 跳转到已开具电子发票页面
			uni.navigateTo({
				url: '/pages/invoiced/invoiced'
			});
		},
		returnBack() {
			// 返回上一页
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style scoped>
.invoice-success-container {
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
	margin-bottom: 10rpx;
}

.success-desc {
	font-size: 28rpx;
	color: #666;
}

/* 发票信息卡片 */
.invoice-card {
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