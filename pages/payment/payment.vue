<template>
	<view class="container">
		<!-- 就诊人信息 -->
		<view class="patient-info">
			<view class="info">
				<view class="name-tag">
					<text class="name">蒋峰</text>
					<view class="tag">本人</view>
				</view>
				<text class="card-no">622**********0909</text>
			</view>
			<view class="switch-btn" @click="switchPatient">切换就诊人</view>
		</view>

		<!-- 卡内余额 -->
		<view class="balance-info">
			<text class="balance-label">卡内余额</text>
			<text class="balance-amount">¥60.00</text>
		</view>

		<!-- 待缴费项目 -->
		<view class="payment-section">
			<text class="section-title">待缴费项目</text>
			<view class="payment-item" v-for="(item, index) in paymentItems" :key="index">
				<view class="item-info">
					<text class="item-name">{{ item.name }}</text>
					<text class="item-doctor">{{ item.doctor }}</text>
					<text class="item-time">{{ item.time }}</text>
				</view>
				<view class="item-amount">
					<text class="amount">¥{{ item.amount }}</text>
					<view class="pay-btn" @click="payItem(item)">去缴费</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			paymentItems: [
				{
					name: '西药费',
					doctor: '神经内科 刘美',
					time: '2020-06-15 11:05',
					amount: 60.00
				},
				{
					name: '检验费',
					doctor: '神经内科 刘美',
					time: '2020-06-15 11:05',
					amount: 60.00
				},
				{
					name: '检查费',
					doctor: '神经内科 刘美',
					time: '2020-06-15 11:05',
					amount: 60.00
				}
			]
		}
	},
	methods: {
		switchPatient() {
			// 切换就诊人逻辑
			uni.showToast({
				title: '切换就诊人',
				icon: 'none'
			});
		},
		payItem(item) {
			// 缴费逻辑
			uni.showToast({
				title: `缴纳 ${item.name} ¥${item.amount}`,
				icon: 'none'
			});
		}
	}
}
</script>

<style scoped>
.container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

/* 就诊人信息 */
.patient-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	padding: 20rpx;
	border-radius: 10rpx;
	margin-bottom: 20rpx;
}

.info {
	flex: 1;
}

.name-tag {
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
}

.name {
	font-size: 28rpx;
	font-weight: bold;
	margin-right: 10rpx;
}

.tag {
	font-size: 20rpx;
	color: white;
	background-color: #007AFF;
	padding: 2rpx 10rpx;
	border-radius: 10rpx;
}

.card-no {
	font-size: 24rpx;
	color: #666;
}

.switch-btn {
	font-size: 24rpx;
	color: #007AFF;
	display: flex;
	align-items: center;
}

/* 卡内余额 */
.balance-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	padding: 20rpx;
	border-radius: 10rpx;
	margin-bottom: 20rpx;
}

.balance-label {
	font-size: 28rpx;
	color: #333;
}

.balance-amount {
	font-size: 36rpx;
	font-weight: bold;
	color: #ff4757;
}

/* 待缴费项目 */
.payment-section {
	background-color: white;
	padding: 20rpx;
	border-radius: 10rpx;
}

.section-title {
	font-size: 28rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
}

.payment-item {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.payment-item:last-child {
	border-bottom: none;
}

.item-info {
	flex: 1;
}

.item-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 10rpx;
}

.item-doctor, .item-time {
	font-size: 24rpx;
	color: #666;
	display: block;
	margin-bottom: 5rpx;
}

.item-amount {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
}

.amount {
	font-size: 28rpx;
	color: #ff4757;
	font-weight: bold;
	margin-bottom: 15rpx;
}

.pay-btn {
	height: 50rpx;
	width: 120rpx;
	background-color: #007AFF;
	color: white;
	font-size: 24rpx;
	border-radius: 25rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
</style>