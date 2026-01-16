<template>
	<view class="appointment-notice-container">
		<view class="notice-header">
			<text class="notice-title">预约须知</text>
		</view>
		
		<scroll-view class="notice-content" scroll-y="true">
			<view class="notice-item">
				<text class="notice-item-title">1. 预约规则</text>
				<view class="notice-item-content">
					<text class="content-text">- 可预约未来7天的号源，每天08:00开放新号源</text>
					<text class="content-text">- 每个账号最多可预约3个不同科室的号源</text>
					<text class="content-text">- 同一科室同一医生，7天内只能预约1次</text>
					<text class="content-text">- 预约成功后，需在30分钟内完成支付，否则预约自动取消</text>
				</view>
			</view>
			
			<view class="notice-item">
				<text class="notice-item-title">2. 就诊须知</text>
				<view class="notice-item-content">
					<text class="content-text">- 请携带有效身份证件（身份证、医保卡等）就诊</text>
					<text class="content-text">- 请提前30分钟到达医院，进行签到</text>
					<text class="content-text">- 就诊时请遵守医院秩序，听从医护人员安排</text>
					<text class="content-text">- 如有特殊情况不能按时就诊，请提前取消预约</text>
				</view>
			</view>
			
			<view class="notice-item">
				<text class="notice-item-title">3. 取消规则</text>
				<view class="notice-item-content">
					<text class="content-text">- 就诊前1天16:00前取消预约，全额退款</text>
					<text class="content-text">- 就诊前1天16:00后取消预约，收取30%手续费</text>
					<text class="content-text">- 就诊当天取消预约，收取50%手续费</text>
					<text class="content-text">- 爽约3次以上，将被限制预约功能30天</text>
				</view>
			</view>
			
			<view class="notice-item">
				<text class="notice-item-title">4. 其他注意事项</text>
				<view class="notice-item-content">
					<text class="content-text">- 预约号源仅供本人使用，不得转让</text>
					<text class="content-text">- 如遇医生临时停诊，系统将自动取消预约并退款</text>
					<text class="content-text">- 请保持手机畅通，以便接收预约相关通知</text>
					<text class="content-text">- 如有疑问，请拨打医院预约热线：010-12345678</text>
				</view>
			</view>
		</scroll-view>
		
		<view class="confirm-section">
			<view class="checkbox-wrapper">
				<checkbox class="checkbox" />
				<text class="checkbox-text">我已阅读并同意以上预约须知</text>
			</view>
			<button class="confirm-btn" @tap="confirm" :disabled="!agree">确认预约</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			agree: false
		};
	},
	methods: {
		confirm() {
			if (this.agree) {
				// 跳转到确认预约信息页面
				uni.navigateTo({
					url: '/pages/confirm-appointment/confirm-appointment'
				});
			}
		}
	}
};
</script>

<style scoped>
.appointment-notice-container {
	height: 100vh;
	background-color: #f5f5f5;
}

.notice-header {
	background-color: #fff;
	padding: 30rpx 40rpx;
	border-bottom: 1rpx solid #eee;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
}

.notice-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.notice-content {
	margin-top: 100rpx;
	padding: 30rpx;
	height: calc(100vh - 280rpx);
}

.notice-item {
	background-color: #fff;
	border-radius: 10rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.notice-item-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: block;
}

.notice-item-content {
	margin-left: 20rpx;
}

.content-text {
	font-size: 26rpx;
	color: #666;
	line-height: 1.8;
	display: block;
	margin-bottom: 10rpx;
}

.confirm-section {
	background-color: #fff;
	padding: 30rpx;
	border-top: 1rpx solid #eee;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
}

.checkbox-wrapper {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.checkbox {
	transform: scale(1.2);
	margin-right: 15rpx;
}

.checkbox-text {
	font-size: 26rpx;
	color: #666;
}

.confirm-btn {
	width: 100%;
	height: 80rpx;
	background-color: #007AFF;
	color: #fff;
	font-size: 32rpx;
	border-radius: 10rpx;
	line-height: 80rpx;
}

.confirm-btn[disabled] {
	background-color: #e6e6e6;
	color: #999;
}
</style>