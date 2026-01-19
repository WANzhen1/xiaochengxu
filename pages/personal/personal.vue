<template>
	<view class="container">
		<view class="user-info">
		<view class="user-details">
			<text class="user-name">{{ userInfo.patientName || '未知用户' }}</text>
			<text class="user-id">就诊卡号：{{ userInfo.patientIDCard || '未知卡号' }}</text>
		</view>
		</view>
		<view class="menu-section">
			<view class="menu-item" v-for="(item, index) in menuItems" :key="index"  @click="navigateTo(item.path)">
				<text class="menu-text">{{ item.title }}</text>
				<text class="menu-arrow">➔</text>
			</view>
		</view>
		<view class="logout-btn" @click="logout">退出登录</view>
	</view>
</template>

<script>
	
export default {
	data() {
		return {
			menuItems: [
				{ title: '我的预约' },
				{ title: '我的缴费' },
				{ title: '我的报告' },
				{ title: '我的消息' },
				{ title: '设置' },
				{ title: '关于我们', path: '/pages/guanyuwomen/guanyuwomen'}
			],
			userInfo: {} // 初始化userInfo为空对象
		}
	},
	onLoad() {
	// 从本地缓存获取用户信息
	this.getUserInfo();
	},
	methods: {
		// 页面跳转方法
		navigateTo(url) {
		uni.navigateTo({
			url: url
		});
		},
		// 获取用户信息
		getUserInfo() {
		// 从本地缓存获取用户信息
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			this.userInfo = userInfo;
			console.log('获取用户信息成功:', this.userInfo);
		} else {
			console.log('未找到用户信息');
			// 如果没有用户信息，跳转到登录页面
			uni.reLaunch({
			url: '/pages/login/login'
			});
		}
		},
		logout() {
			// 退出登录逻辑
			uni.showToast({
				title: '退出登录成功',
				icon: 'success'
			});
			console.log('退出登录成功');
			// 删除本地缓存的用户信息和token
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('token');
			// 跳转到登录页面
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}, 1000);
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

.user-info {
	display: flex;
	align-items: center;
	background-color: white;
	padding: 30rpx;
	border-radius: 10rpx;
	margin-bottom: 20rpx;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	background-color: #e6e6e6;
	margin-right: 30rpx;
}

.user-details {
	flex: 1;
}

.user-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 10rpx;
}

.user-id {
	font-size: 24rpx;
	color: #666;
}

.menu-section {
	background-color: white;
	border-radius: 10rpx;
	margin-bottom: 40rpx;
}

.menu-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 25rpx 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
	cursor: pointer;
}

.menu-item:last-child {
	border-bottom: none;
}

.menu-text {
	font-size: 28rpx;
	color: #333;
}

.menu-arrow {
	font-size: 28rpx;
	color: #999;
}

.logout-btn {
	height: 80rpx;
	background-color: white;
	color: #ff4757;
	font-size: 28rpx;
	font-weight: bold;
	border-radius: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	margin: 0 20rpx;
}
</style>