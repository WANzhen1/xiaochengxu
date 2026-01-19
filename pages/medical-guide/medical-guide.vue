<template>
	<view class="about-container">
		<view class="about-header">
			<view class="hospital-logo">
				<image src="/static/logo.png" class="logo"></image>
			</view>
			<text class="hospital-name">就医指南</text>
			<text class="hospital-subtitle">为您提供便捷、高效的医疗服务</text>
		</view>

		<view class="content-section">
			<view class="section-item">
				<text class="section-title">就医流程</text>
				<view class="process-flow">
					<view class="process-item">
						<view class="process-step">1</view>
						<text class="process-title">预约挂号</text>
						<text class="process-content">通过小程序、官网或电话进行预约挂号</text>
					</view>
					<view class="process-arrow">➡️</view>
					<view class="process-item">
						<view class="process-step">2</view>
						<text class="process-title">报到取号</text>
						<text class="process-content">凭身份证或医保卡到医院自助机取号</text>
					</view>
					<view class="process-arrow">➡️</view>
					<view class="process-item">
						<view class="process-step">3</view>
						<text class="process-title">候诊就诊</text>
						<text class="process-content">在候诊区等待叫号，按顺序就诊</text>
					</view>
					<view class="process-arrow">➡️</view>
					<view class="process-item">
						<view class="process-step">4</view>
						<text class="process-title">检查缴费</text>
						<text class="process-content">根据医生建议进行检查，完成缴费</text>
					</view>
					<view class="process-arrow">➡️</view>
					<view class="process-item">
						<view class="process-step">5</view>
						<text class="process-title">取药离开</text>
						<text class="process-content">凭缴费凭证到药房取药，完成就医</text>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">预约须知</text>
				<view class="notice-list">
					<view class="notice-item">
						<text class="notice-icon">⚠️</text>
						<text class="notice-content">预约挂号请提前1-7天，可通过小程序、官网或电话进行预约</text>
					</view>
					<view class="notice-item">
						<text class="notice-icon">⚠️</text>
						<text class="notice-content">预约成功后，请携带身份证或医保卡到医院自助机取号</text>
					</view>
					<view class="notice-item">
						<text class="notice-icon">⚠️</text>
						<text class="notice-content">请至少提前30分钟到院，超过预约时间30分钟未取号，预约将自动取消</text>
					</view>
					<view class="notice-item">
						<text class="notice-icon">⚠️</text>
						<text class="notice-content">如需取消预约，请提前24小时操作，否则将视为爽约，影响后续预约</text>
					</view>
					<view class="notice-item">
						<text class="notice-icon">⚠️</text>
						<text class="notice-content">初诊患者请携带身份证、医保卡等相关证件，以便建立电子病历</text>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">医保政策</text>
				<view class="insurance-section">
					<view class="insurance-item">
						<text class="insurance-title">医保定点</text>
						<text class="insurance-content">我院是北京市医保定点医院，支持城镇职工基本医疗保险、城乡居民基本医疗保险等多种医保类型</text>
					</view>
					<view class="insurance-item">
						<text class="insurance-title">报销比例</text>
						<text class="insurance-content">城镇职工基本医疗保险：门诊报销70%-90%，住院报销85%-95%</text>
						<text class="insurance-content">城乡居民基本医疗保险：门诊报销50%-70%，住院报销60%-85%</text>
					</view>
					<view class="insurance-item">
						<text class="insurance-title">报销流程</text>
						<text class="insurance-content">1. 就诊时出示医保卡，进行医保结算</text>
						<text class="insurance-content">2. 自费部分可通过现金、银行卡、微信、支付宝等方式支付</text>
						<text class="insurance-content">3. 如需报销异地医保，请提前办理异地就医备案手续</text>
					</view>
					<view class="insurance-item">
						<text class="insurance-title">注意事项</text>
						<text class="insurance-content">1. 请确保医保卡处于正常状态，无挂失、冻结等情况</text>
						<text class="insurance-content">2. 部分诊疗项目和药品可能不在医保报销范围内，具体以医保政策为准</text>
						<text class="insurance-content">3. 如有疑问，请咨询医保窗口或客服热线010-12345678</text>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">常见问题</text>
				<view class="faq-list">
					<view class="faq-item">
						<view class="faq-question">
							<text class="faq-icon">Q</text>
							<text class="faq-text">如何进行网上预约挂号？</text>
						</view>
						<view class="faq-answer">
							<text class="faq-icon">A</text>
							<text class="faq-text">您可以通过我院小程序、官网或电话进行预约挂号。登录后选择科室、医生和就诊时间，填写相关信息即可完成预约。</text>
						</view>
					</view>
					<view class="faq-item">
						<view class="faq-question">
							<text class="faq-icon">Q</text>
							<text class="faq-text">预约成功后如何取号？</text>
						</view>
						<view class="faq-answer">
							<text class="faq-icon">A</text>
							<text class="faq-text">请携带身份证或医保卡到医院自助机取号，按照屏幕提示操作即可。也可以在人工窗口取号。</text>
						</view>
					</view>
					<view class="faq-item">
						<view class="faq-question">
							<text class="faq-icon">Q</text>
							<text class="faq-text">如何取消预约？</text>
						</view>
						<view class="faq-answer">
							<text class="faq-icon">A</text>
							<text class="faq-text">您可以通过小程序、官网或电话取消预约。请至少提前24小时操作，否则将视为爽约。</text>
						</view>
					</view>
					<view class="faq-item">
						<view class="faq-question">
							<text class="faq-icon">Q</text>
							<text class="faq-text">就医需要携带哪些证件？</text>
						</view>
						<view class="faq-answer">
							<text class="faq-icon">A</text>
							<text class="faq-text">初诊患者请携带身份证、医保卡等相关证件；复诊患者请携带医保卡或就诊卡。</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="about-footer">
			<text class="copyright">© 2026 医疗预约挂号系统. All rights reserved.</text>
			<text class="version">版本号：1.0.0</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 静态页面，无需动态数据
		};
	},
	methods: {
		// 静态页面，无需交互方法
	}
};
</script>

<style scoped>
.about-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.about-header {
	background-color: white;
	border-radius: 10rpx;
	padding: 40rpx 20rpx;
	margin-bottom: 20rpx;
	text-align: center;
}

.hospital-logo {
	margin-bottom: 20rpx;
}

.logo {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
}

.hospital-name {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 10rpx;
}

.hospital-subtitle {
	font-size: 24rpx;
	color: #666;
}

.content-section {
	background-color: white;
	border-radius: 10rpx;
	padding: 20rpx;
}

.section-item {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	border-left: 8rpx solid #007AFF;
	padding-left: 15rpx;
	margin-bottom: 20rpx;
	display: block;
}

/* 就医流程样式 */
.process-flow {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	align-items: center;
}

.process-item {
	background-color: #f0f8ff;
	padding: 20rpx;
	border-radius: 10rpx;
	width: 100%;
	display: flex;
	align-items: center;
}

.process-step {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	background-color: #007AFF;
	color: white;
	font-size: 32rpx;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
}

.process-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-right: 20rpx;
}

.process-content {
	font-size: 26rpx;
	color: #666;
	flex: 1;
}

.process-arrow {
	font-size: 48rpx;
	color: #007AFF;
	margin: 10rpx 0;
}

/* 预约须知样式 */
.notice-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.notice-item {
	display: flex;
	background-color: #fff3cd;
	padding: 20rpx;
	border-radius: 10rpx;
	align-items: flex-start;
}

.notice-icon {
	font-size: 32rpx;
	margin-right: 20rpx;
	margin-top: 8rpx;
}

.notice-content {
	font-size: 26rpx;
	color: #856404;
	flex: 1;
	line-height: 1.5;
}

/* 医保政策样式 */
.insurance-section {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.insurance-item {
	background-color: #f8f9fa;
	padding: 20rpx;
	border-radius: 10rpx;
}

.insurance-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.insurance-content {
	font-size: 26rpx;
	color: #666;
	margin-bottom: 8rpx;
	display: block;
	line-height: 1.5;
}

.insurance-content:last-child {
	margin-bottom: 0;
}

/* 常见问题样式 */
.faq-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.faq-item {
	background-color: #f8f9fa;
	border-radius: 10rpx;
	overflow: hidden;
}

.faq-question {
	display: flex;
	background-color: #e9ecef;
	padding: 20rpx;
	align-items: flex-start;
}

.faq-answer {
	display: flex;
	padding: 20rpx;
	align-items: flex-start;
}

.faq-icon {
	font-size: 32rpx;
	font-weight: bold;
	color: #007AFF;
	margin-right: 15rpx;
	margin-top: 8rpx;
	min-width: 32rpx;
}

.faq-text {
	font-size: 26rpx;
	color: #333;
	flex: 1;
	line-height: 1.5;
}

.about-footer {
	margin-top: 40rpx;
	padding: 20rpx;
	text-align: center;
	color: #999;
	font-size: 24rpx;
}

.copyright {
	display: block;
	margin-bottom: 10rpx;
}

.version {
	display: block;
}
</style>