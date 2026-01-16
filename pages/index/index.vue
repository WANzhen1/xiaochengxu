<template>
	<view class="container">
		<!-- 轮播图 -->
		<swiper class="swiper" indicator-dots autoplay interval="3000">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<view class="swiper-item">{{ item.title }}</view>
			</swiper-item>
		</swiper>

		<!-- 门诊服务 -->
		<view class="service-section">
			<view class="section-title">
				<view class="title-icon"></view>
				<text class="title-text">门诊服务</text>
			</view>

			<!-- 主要服务卡片 -->
			<view class="main-service">
				<view class="service-card pink" @click="navigateTo('/pages/department/department')">
					<text class="service-title">预约挂号</text>
					<text class="service-desc">在线挂号预约</text>
					<view class="service-circle pink"></view>
				</view>
				<view class="service-card green" @click="navigateTo('/pages/recharge/recharge')">
					<text class="service-title green">在线充值</text>
					<text class="service-desc">就诊卡预存充值</text>
					<view class="service-circle green"></view>
				</view>
			</view>

			<!-- 其他服务卡片 -->
			<view class="other-service">
				<view class="service-item" v-for="(item, index) in otherServices" :key="index">
					<view class="service-icon"></view>
					<text class="service-text">{{ item.title }}</text>
				</view>
			</view>

			<!-- 报告查询 -->
			<view class="service-item single-item">
				<view class="service-icon"></view>
				<text class="service-text">报告查询</text>
			</view>
		</view>

		<!-- 医院服务 -->
		<view class="service-section">
			<view class="section-title">
				<view class="title-icon"></view>
				<text class="title-text">医院服务</text>
			</view>

			<!-- 医院服务卡片 -->
			<view class="other-service">
				<view class="service-item" v-for="(item, index) in hospitalServices" :key="index">
					<view class="service-icon"></view>
					<text class="service-text">{{ item.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [
					{ title: '预约须知' },
					{ title: '医院公告' },
					{ title: '健康知识' },
					{ title: '就诊指南' }
				],
				otherServices: [
					{ title: '候诊查询' },
					{ title: '自助缴费' },
					{ title: '门诊费用' },
					{ title: '在线退款' }
				],
				hospitalServices: [
					{ title: '医院介绍' },
					{ title: '医院导航' },
					{ title: '就医指南' },
					{ title: '健康百科' }
				]
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
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

	/* 轮播图 */
	.swiper {
		margin-top: 20rpx;
		height: 200rpx;
		background-color: #007AFF;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 40rpx;
		font-weight: bold;
	}

	/* 服务section */
	.service-section {
		margin-top: 30rpx;
		background-color: white;
		border-radius: 10rpx;
		padding: 20rpx;
	}

	/* 标题样式 */
	.section-title {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.title-icon {
		width: 10rpx;
		height: 30rpx;
		background-color: #007AFF;
		margin-right: 10rpx;
	}

	.title-text {
		font-size: 32rpx;
		font-weight: bold;
	}

	/* 主要服务卡片 */
	.main-service {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.service-card {
		width: 48%;
		height: 160rpx;
		border-radius: 10rpx;
		padding: 20rpx;
		position: relative;
		box-sizing: border-box;
	}

	.service-card.pink {
		background-color: #fff2f0;
	}

	.service-card.green {
		background-color: #f0fff4;
	}

	.service-title {
		font-size: 28rpx;
		font-weight: bold;
		color: #ff4757;
	}

	.service-title.green {
		color: #2ed573;
	}

	.service-desc {
		font-size: 22rpx;
		color: #999;
		margin-top: 10rpx;
		display: block;
	}

	.service-circle {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		opacity: 0.5;
	}

	.service-circle.pink {
		background-color: #ffccc7;
	}

	.service-circle.green {
		background-color: #c8e6c9;
	}

	/* 其他服务卡片 */
	.other-service {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.service-item {
		width: 23%;
		height: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.service-item.single-item {
		width: 100%;
		height: 100rpx;
		border-top: 1rpx solid #f0f0f0;
		margin-top: 10rpx;
	}

	.service-icon {
		width: 50rpx;
		height: 50rpx;
		background-color: #e6e6e6;
		border-radius: 50%;
		margin-bottom: 10rpx;
	}

	.service-text {
		font-size: 24rpx;
		color: #333;
	}
</style>
