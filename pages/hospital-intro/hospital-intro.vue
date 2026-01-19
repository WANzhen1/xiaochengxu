<template>
	<view class="about-container">
		<view class="about-header">
			<view class="hospital-logo">
				<image src="/static/logo.png" class="logo"></image>
			</view>
			<text class="hospital-name">医院介绍</text>
			<text class="hospital-subtitle">为您提供便捷、高效的医疗服务</text>
		</view>

		<view class="content-section">
			<view class="section-item">
				<text class="section-title">医院简介</text>
				<text class="section-content">
					我们是一家综合性医院，成立于2000年，占地面积50亩，建筑面积3万平方米。医院拥有先进的医疗设备和专业的医护团队，致力于为患者提供高质量的医疗服务。
					
					医院设有内科、外科、妇产科、儿科、急诊科、口腔科、眼科、耳鼻喉科、皮肤科、中医科等多个临床科室，以及医学影像科、检验科、药剂科等医技科室。
					
					我们始终坚持"以患者为中心"的服务理念，不断提高医疗技术水平和服务质量，努力打造成为区域内领先的医疗机构。
				</text>
			</view>

			<view class="section-item">
				<text class="section-title">医院文化</text>
				<view class="culture-grid">
					<view class="culture-item">
						<text class="culture-title">院训</text>
						<text class="culture-content">敬业、精医、诚信、仁爱</text>
					</view>
					<view class="culture-item">
						<text class="culture-title">使命</text>
						<text class="culture-content">救死扶伤，服务社会</text>
					</view>
					<view class="culture-item">
						<text class="culture-title">愿景</text>
						<text class="culture-content">成为患者信赖的现代化医院</text>
					</view>
					<view class="culture-item">
						<text class="culture-title">价值观</text>
						<text class="culture-content">以人为本，以质取胜</text>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">医院特色</text>
				<view class="feature-list">
					<view class="feature-item">
						<text class="feature-icon">✨</text>
						<text class="feature-content">先进的医疗设备</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">👨⚕️</text>
						<text class="feature-content">专业的医护团队</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">🏥</text>
						<text class="feature-content">舒适的就医环境</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">💻</text>
						<text class="feature-content">便捷的预约挂号系统</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">⏰</text>
						<text class="feature-content">高效的诊疗服务</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">🤝</text>
						<text class="feature-content">人性化的服务理念</text>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">联系我们</text>
				<view class="contact-info">
					<view class="contact-item">
						<text class="contact-label">医院地址：</text>
						<text class="contact-value">北京市朝阳区健康路88号</text>
					</view>
					<view class="contact-item">
						<text class="contact-label">联系电话：</text>
						<text class="contact-value">010-12345678</text>
					</view>
					<view class="contact-item">
						<text class="contact-label">急诊电话：</text>
						<text class="contact-value">010-87654321</text>
					</view>
					<view class="contact-item">
						<text class="contact-label">医院邮箱：</text>
						<text class="contact-value">info@hospital.com</text>
					</view>
					<view class="contact-item">
						<text class="contact-label">工作时间：</text>
						<text class="contact-value">周一至周日 8:00-20:00</text>
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
			// 页面数据
		};
	},
	methods: {
		// 页面方法
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

.section-content {
	font-size: 28rpx;
	color: #666;
	line-height: 1.6;
	text-align: justify;
}

.culture-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
}

.culture-item {
	background-color: #f0f8ff;
	padding: 20rpx;
	border-radius: 8rpx;
	text-align: center;
}

.culture-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.culture-content {
	font-size: 24rpx;
	color: #666;
}

.feature-list {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
}

.feature-item {
	display: flex;
	align-items: center;
	background-color: #f9f9f9;
	padding: 20rpx;
	border-radius: 8rpx;
}

.feature-icon {
	font-size: 36rpx;
	margin-right: 15rpx;
}

.feature-content {
	font-size: 26rpx;
	color: #333;
}

.contact-info {
	background-color: #f9f9f9;
	border-radius: 8rpx;
	padding: 20rpx;
}

.contact-item {
	margin-bottom: 20rpx;
	display: flex;
	flex-direction: column;
}

.contact-item:last-child {
	margin-bottom: 0;
}

.contact-label {
	font-size: 26rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 5rpx;
}

.contact-value {
	font-size: 26rpx;
	color: #666;
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