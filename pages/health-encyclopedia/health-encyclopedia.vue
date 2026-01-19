<template>
	<view class="about-container">
		<view class="about-header">
			<view class="hospital-logo">
				<image src="/static/logo.png" class="logo"></image>
			</view>
			<text class="hospital-name">健康百科</text>
			<text class="hospital-subtitle">为您提供便捷、高效的医疗服务</text>
		</view>

		<view class="content-section">
			<view class="section-item">
				<text class="section-title">健康分类</text>
				<view class="category-grid">
					<view class="category-item">
						<text class="category-icon">🫀</text>
						<text class="category-name">内科</text>
					</view>
					<view class="category-item">
						<text class="category-icon">🦵</text>
						<text class="category-name">外科</text>
					</view>
					<view class="category-item">
						<text class="category-icon">👶</text>
						<text class="category-name">儿科</text>
					</view>
					<view class="category-item">
						<text class="category-icon">👩</text>
						<text class="category-name">妇产科</text>
					</view>
					<view class="category-item">
						<text class="category-icon">🦷</text>
						<text class="category-name">口腔科</text>
					</view>
					<view class="category-item">
						<text class="category-icon">👁️</text>
						<text class="category-name">眼科</text>
					</view>
					<view class="category-item">
						<text class="category-icon">🌿</text>
						<text class="category-name">中医科</text>
					</view>
					<view class="category-item">
						<text class="category-icon">🛡️</text>
						<text class="category-name">预防保健</text>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">热门文章</text>
				<view class="article-list">
					<view class="article-item">
						<view class="article-content">
							<text class="article-title">冬季如何预防感冒？</text>
							<text class="article-excerpt">冬季是感冒的高发季节，预防感冒需要注意保暖、加强锻炼、合理饮食等多个方面。保持室内空气流通，勤洗手，避免前往人员密集的场所，都是有效的预防措施。</text>
							<view class="article-meta">
								<text class="article-category">预防保健</text>
								<text class="article-date">2026-01-15</text>
							</view>
						</view>
						<view class="article-placeholder">
							<text class="article-icon">📄</text>
						</view>
					</view>
					<view class="article-item">
						<view class="article-content">
							<text class="article-title">高血压患者的饮食注意事项</text>
							<text class="article-excerpt">高血压患者需要注意饮食清淡，减少盐的摄入，多吃蔬菜和水果。避免食用高脂肪、高胆固醇的食物，保持适量的运动，定期监测血压。</text>
							<view class="article-meta">
								<text class="article-category">内科</text>
								<text class="article-date">2026-01-10</text>
							</view>
						</view>
						<view class="article-placeholder">
							<text class="article-icon">📄</text>
						</view>
					</view>
					<view class="article-item">
						<view class="article-content">
							<text class="article-title">儿童疫苗接种时间表</text>
							<text class="article-excerpt">儿童疫苗接种是预防传染病的重要措施，家长需要了解疫苗接种的时间表和注意事项。按照国家规定的免疫程序，及时为孩子接种疫苗，可以有效预防多种传染病。</text>
							<view class="article-meta">
								<text class="article-category">儿科</text>
								<text class="article-date">2026-01-05</text>
							</view>
						</view>
						<view class="article-placeholder">
							<text class="article-icon">📄</text>
						</view>
					</view>
					<view class="article-item">
						<view class="article-content">
							<text class="article-title">口腔保健小知识</text>
							<text class="article-excerpt">良好的口腔卫生习惯对于预防龋齿和牙周疾病非常重要。每天刷牙两次，使用牙线，定期进行口腔检查，可以保持口腔健康。</text>
							<view class="article-meta">
								<text class="article-category">口腔科</text>
								<text class="article-date">2026-01-01</text>
							</view>
						</view>
						<view class="article-placeholder">
							<text class="article-icon">📄</text>
						</view>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">健康小常识</text>
				<view class="tips-list">
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">每天喝8杯水，保持身体水分平衡</text>
					</view>
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">坚持每天运动30分钟，增强身体免疫力</text>
					</view>
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">保持充足的睡眠，每天睡眠时间不少于7小时</text>
					</view>
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">多吃新鲜蔬菜和水果，少吃油腻和辛辣食物</text>
					</view>
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">定期体检，及时发现和治疗疾病</text>
					</view>
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">保持良好的心态，避免过度压力</text>
					</view>
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">勤洗手，保持个人卫生</text>
					</view>
					<view class="tip-item">
						<text class="tip-icon">💡</text>
						<text class="tip-content">避免吸烟和过量饮酒</text>
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

/* 分类样式 */
.category-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20rpx;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f0f8ff;
	padding: 20rpx;
	border-radius: 10rpx;
	text-align: center;
}

.category-icon {
	font-size: 48rpx;
	margin-bottom: 10rpx;
}

.category-name {
	font-size: 24rpx;
	color: #333;
}

/* 文章列表样式 */
.article-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.article-item {
	display: flex;
	background-color: #f9f9f9;
	padding: 20rpx;
	border-radius: 10rpx;
	align-items: flex-start;
}

.article-content {
	flex: 1;
	margin-right: 20rpx;
}

.article-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.article-excerpt {
	font-size: 24rpx;
	color: #666;
	margin-bottom: 10rpx;
	display: block;
	line-height: 1.5;
}

.article-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.article-category {
	font-size: 22rpx;
	color: #007AFF;
	background-color: #e3f2fd;
	padding: 5rpx 15rpx;
	border-radius: 15rpx;
}

.article-date {
	font-size: 22rpx;
	color: #999;
}

.article-placeholder {
	width: 120rpx;
	height: 120rpx;
	background-color: #e0e0e0;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.article-icon {
	font-size: 60rpx;
	color: #999;
}

/* 健康小常识样式 */
.tips-list {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15rpx;
}

.tip-item {
	display: flex;
	background-color: #f0f8ff;
	padding: 20rpx;
	border-radius: 10rpx;
	align-items: flex-start;
}

.tip-icon {
	font-size: 32rpx;
	margin-right: 20rpx;
	margin-top: 8rpx;
	color: #007AFF;
}

.tip-content {
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