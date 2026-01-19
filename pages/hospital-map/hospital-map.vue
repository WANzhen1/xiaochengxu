<template>
	<view class="about-container">
		<view class="about-header">
			<view class="hospital-logo">
				<image src="/static/logo.png" class="logo"></image>
			</view>
			<text class="hospital-name">医院导航</text>
			<text class="hospital-subtitle">为您提供便捷、高效的医疗服务</text>
		</view>

		<view class="content-section">
			<view class="section-item">
				<text class="section-title">医院位置</text>
				<view class="map-container">
					<!-- 地图占位 -->
					<view class="map-placeholder">
						<text class="map-icon">🗺️</text>
						<text class="map-text">医院地图</text>
						<view class="map-info">
							<text>地址：北京市朝阳区健康路88号</text>
							<text>电话：010-12345678</text>
						</view>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">交通路线</text>
				<view class="transport-list">
					<view class="transport-item">
						<view class="transport-icon">🚇</view>
						<view class="transport-content">
							<text class="transport-title">地铁</text>
							<text class="transport-info">乘坐地铁10号线到健翔桥站下车，D出口向北步行500米即到</text>
						</view>
					</view>
					<view class="transport-item">
						<view class="transport-icon">🚌</view>
						<view class="transport-content">
							<text class="transport-title">公交</text>
							<text class="transport-info">乘坐公交85路、387路、694路到健翔桥北站下车，向东步行200米即到</text>
						</view>
					</view>
					<view class="transport-item">
						<view class="transport-icon">🚗</view>
						<view class="transport-content">
							<text class="transport-title">自驾</text>
							<text class="transport-info">从北四环中路健翔桥出口向北行驶，进入健康路后行驶约500米，医院位于道路右侧</text>
						</view>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">院内导航</text>
				<text class="floor-title">楼层分布</text>
				
				<!-- 楼层导航标签 -->
				<view class="floor-tabs">
					<view class="tab-item" :class="{ active: selectedFloor === 1 }" @click="selectedFloor = 1">
						<text class="tab-text">1F</text>
					</view>
					<view class="tab-item" :class="{ active: selectedFloor === 2 }" @click="selectedFloor = 2">
						<text class="tab-text">2F</text>
					</view>
					<view class="tab-item" :class="{ active: selectedFloor === 3 }" @click="selectedFloor = 3">
						<text class="tab-text">3F</text>
					</view>
					<view class="tab-item" :class="{ active: selectedFloor === 4 }" @click="selectedFloor = 4">
						<text class="tab-text">4F</text>
					</view>
				</view>
				
				<!-- 一层 -->
				<view class="floor-plan" v-if="selectedFloor === 1">
					<text class="floor-name">一层平面图</text>
					<view class="floor-placeholder">
						<text class="floor-icon">🏢</text>
						<text class="floor-info">这里展示一层的科室分布</text>
					</view>
					<view class="floor-departments">
						<view class="department-item">
							<text class="department-name">门诊大厅</text>
							<text class="department-location">大厅中央</text>
						</view>
						<view class="department-item">
							<text class="department-name">导诊台</text>
							<text class="department-location">大厅入口处</text>
						</view>
						<view class="department-item">
							<text class="department-name">挂号处</text>
							<text class="department-location">大厅左侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">收费处</text>
							<text class="department-location">大厅右侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">药房</text>
							<text class="department-location">大厅北侧</text>
						</view>
					</view>
				</view>
				
				<!-- 二层 -->
				<view class="floor-plan" v-if="selectedFloor === 2">
					<text class="floor-name">二层平面图</text>
					<view class="floor-placeholder">
						<text class="floor-icon">🏢</text>
						<text class="floor-info">这里展示二层的科室分布</text>
					</view>
					<view class="floor-departments">
						<view class="department-item">
							<text class="department-name">内科</text>
							<text class="department-location">东侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">外科</text>
							<text class="department-location">西侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">儿科</text>
							<text class="department-location">南侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">妇产科</text>
							<text class="department-location">北侧</text>
						</view>
					</view>
				</view>
				
				<!-- 三层 -->
				<view class="floor-plan" v-if="selectedFloor === 3">
					<text class="floor-name">三层平面图</text>
					<view class="floor-placeholder">
						<text class="floor-icon">🏢</text>
						<text class="floor-info">这里展示三层的科室分布</text>
					</view>
					<view class="floor-departments">
						<view class="department-item">
							<text class="department-name">口腔科</text>
							<text class="department-location">东侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">眼科</text>
							<text class="department-location">西侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">耳鼻喉科</text>
							<text class="department-location">南侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">皮肤科</text>
							<text class="department-location">北侧</text>
						</view>
					</view>
				</view>
				
				<!-- 四层 -->
				<view class="floor-plan" v-if="selectedFloor === 4">
					<text class="floor-name">四层平面图</text>
					<view class="floor-placeholder">
						<text class="floor-icon">🏢</text>
						<text class="floor-info">这里展示四层的科室分布</text>
					</view>
					<view class="floor-departments">
						<view class="department-item">
							<text class="department-name">中医科</text>
							<text class="department-location">东侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">针灸科</text>
							<text class="department-location">西侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">推拿科</text>
							<text class="department-location">南侧</text>
						</view>
						<view class="department-item">
							<text class="department-name">康复科</text>
							<text class="department-location">北侧</text>
						</view>
					</view>
				</view>
			</view>

			<view class="section-item">
				<text class="section-title">停车场信息</text>
				<view class="parking-info">
					<view class="parking-item">
						<text class="parking-icon">🚗</text>
						<text class="parking-title">地面停车场</text>
						<text class="parking-content">医院正门南侧，车位200个</text>
					</view>
					<view class="parking-item">
						<text class="parking-icon">🏢</text>
						<text class="parking-title">地下停车场</text>
						<text class="parking-content">医院门诊楼地下一层，车位500个</text>
					</view>
					<view class="parking-item">
						<text class="parking-icon">💵</text>
						<text class="parking-title">停车收费</text>
						<text class="parking-content">首小时5元，之后每小时2元，每天最高20元</text>
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
			// 楼层切换数据
			selectedFloor: 1
		};
	},
	methods: {
		// 无需额外方法
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

/* 地图样式 */
.map-container {
	margin-bottom: 20rpx;
}

.map-placeholder {
	width: 100%;
	height: 400rpx;
	background-color: #f0f0f0;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.map-icon {
	font-size: 120rpx;
	margin-bottom: 20rpx;
}

.map-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.map-info {
	font-size: 26rpx;
	color: #666;
	line-height: 1.5;
}

/* 交通路线样式 */
.transport-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.transport-item {
	display: flex;
	background-color: #f9f9f9;
	padding: 20rpx;
	border-radius: 10rpx;
	align-items: flex-start;
}

.transport-icon {
	font-size: 48rpx;
	margin-right: 20rpx;
	margin-top: 10rpx;
}

.transport-content {
	flex: 1;
}

.transport-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.transport-info {
	font-size: 26rpx;
	color: #666;
	line-height: 1.5;
}

/* 楼层导航样式 */
.floor-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: block;
}

/* 楼层标签样式 */
.floor-tabs {
	display: flex;
	gap: 10rpx;
	margin-bottom: 20rpx;
	justify-content: center;
}

.tab-item {
	padding: 15rpx 30rpx;
	border-radius: 25rpx;
	background-color: #f0f0f0;
	cursor: pointer;
	transition: all 0.3s ease;
}

.tab-item.active {
	background-color: #007AFF;
	color: white;
}

.tab-text {
	font-size: 28rpx;
	font-weight: bold;
}

.floor-plan {
	margin-bottom: 30rpx;
	background-color: #f9f9f9;
	border-radius: 10rpx;
	padding: 20rpx;
}

.floor-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: block;
	text-align: center;
}

.floor-placeholder {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 30rpx;
}

.floor-icon {
	font-size: 80rpx;
	margin-bottom: 20rpx;
}

.floor-info {
	font-size: 26rpx;
	color: #666;
}

.floor-departments {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
	align-items: flex-start;
}

.department-item {
	background-color: white;
	padding: 15rpx;
	border-radius: 8rpx;
	width: 100%;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.department-name {
	font-size: 26rpx;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 5rpx;
}

.department-location {
	font-size: 24rpx;
	color: #666;
}

/* 停车场信息样式 */
.parking-info {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.parking-item {
	background-color: #f9f9f9;
	padding: 20rpx;
	border-radius: 10rpx;
	text-align: center;
}

.parking-icon {
	font-size: 48rpx;
	margin-bottom: 10rpx;
	display: block;
}

.parking-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.parking-content {
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