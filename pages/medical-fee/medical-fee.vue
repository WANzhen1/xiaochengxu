<template>
	<view class="medical-fee-container">
		<view class="header">
			<text class="title">门诊费用</text>
		</view>
		
		<!-- 就诊人信息 -->
		<view class="patient-info">
			<view class="info-item">
				<text class="info-label">就诊人：</text>
				<text class="info-value">{{ patient.name || '张三' }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">就诊卡号：</text>
				<text class="info-value">{{ patient.cardNo || '622**********0909' }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">就诊时间：</text>
				<text class="info-value">{{ visitTime }}</text>
			</view>
		</view>
		
		<!-- 费用明细列表 -->
		<view class="fee-section">
			<view class="section-header">
				<text class="section-title">费用明细</text>
			</view>
			<view class="fee-list">
				<view class="fee-item" v-for="(fee, index) in fees" :key="index">
					<view class="fee-info">
						<text class="fee-name">{{ fee.name }}</text>
						<text class="fee-spec">{{ fee.spec }}</text>
					</view>
					<view class="fee-amount">
						<text class="fee-count">{{ fee.count }} {{ fee.unit }}</text>
						<text class="fee-price">¥{{ fee.price.toFixed(2) }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 费用总计 -->
		<view class="total-section">
			<view class="total-item">
				<text class="total-label">小计：</text>
				<text class="total-value">¥{{ subtotal.toFixed(2) }}</text>
			</view>
			<view class="total-item">
				<text class="total-label">医保统筹：</text>
				<text class="total-value">¥{{ medicalInsurance.toFixed(2) }}</text>
			</view>
			<view class="total-item">
				<text class="total-label">个人自付：</text>
				<text class="total-value price">¥{{ personalPay.toFixed(2) }}</text>
			</view>
		</view>
		
		<!-- 操作按钮 -->
		<view class="btn-container">
			<button class="btn primary" @tap="payNow">立即缴费</button>
			<button class="btn secondary" @tap="viewInvoice">开具电子发票</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			patient: {},
			visitTime: '',
			fees: [
				{
					name: '血常规',
					spec: '',
					count: 1,
					unit: '次',
					price: 25.00
				},
				{
					name: '肝功能检查',
					spec: '',
					count: 1,
					unit: '次',
					price: 80.00
				},
				{
					name: 'B超检查',
					spec: '腹部',
					count: 1,
					unit: '次',
					price: 120.00
				},
				{
					name: '阿莫西林胶囊',
					spec: '0.25g*24粒',
					count: 2,
					unit: '盒',
					price: 15.50
				},
				{
					name: '奥美拉唑肠溶胶囊',
					spec: '20mg*14粒',
					count: 1,
					unit: '盒',
					price: 28.00
				}
			],
			subtotal: 0,
			medicalInsurance: 0,
			personalPay: 0
		};
	},
	onLoad() {
		// 从本地存储获取就诊人信息
		this.patient = uni.getStorageSync('selectedPatient') || {};
		
		// 设置就诊时间
		const now = new Date();
		this.visitTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
		
		// 计算费用
		this.calculateFees();
	},
	methods: {
		calculateFees() {
			// 计算小计
			this.subtotal = this.fees.reduce((sum, fee) => sum + (fee.price * fee.count), 0);
			// 模拟医保统筹（50%）
			this.medicalInsurance = this.subtotal * 0.5;
			// 计算个人自付
			this.personalPay = this.subtotal - this.medicalInsurance;
		},
		payNow() {
			// 跳转到确认缴费信息页面
			uni.navigateTo({
				url: '/pages/confirm-payment/confirm-payment?amount=' + this.personalPay + '&type=treatment'
			});
		},
		viewInvoice() {
			// 跳转到待开具电子发票页面
			uni.navigateTo({
				url: '/pages/to-be-invoiced/to-be-invoiced'
			});
		}
	}
};
</script>

<style scoped>
.medical-fee-container {
	padding: 0 30rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.header {
	background-color: #fff;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #eee;
	margin-bottom: 20rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
	display: block;
}

/* 就诊人信息 */
.patient-info {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx 0;
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

/* 费用明细 */
.fee-section {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-header {
	margin-bottom: 20rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.fee-list {
	margin-top: 20rpx;
}

.fee-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.fee-item:last-child {
	border-bottom: none;
}

.fee-info {
	flex: 1;
}

.fee-name {
	font-size: 30rpx;
	color: #333;
	display: block;
	margin-bottom: 5rpx;
}

.fee-spec {
	font-size: 24rpx;
	color: #999;
}

.fee-amount {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.fee-count {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 5rpx;
}

.fee-price {
	font-size: 30rpx;
	color: #333;
	font-weight: bold;
}

/* 费用总计 */
.total-section {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 30rpx;
	margin-bottom: 120rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.total-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx 0;
}

.total-item:last-child {
	border-top: 2rpx solid #f0f0f0;
	margin-top: 10rpx;
	padding-top: 20rpx;
}

.total-label {
	font-size: 30rpx;
	color: #666;
}

.total-value {
	font-size: 30rpx;
	color: #333;
	font-weight: bold;
}

.price {
	color: #ff6b35;
	font-size: 36rpx;
}

/* 操作按钮 */
.btn-container {
	background-color: #fff;
	padding: 30rpx;
	border-top: 1rpx solid #eee;
	display: flex;
	gap: 20rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}

.btn {
	flex: 1;
	height: 88rpx;
	border-radius: 44rpx;
	font-size: 32rpx;
	font-weight: bold;
	line-height: 88rpx;
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