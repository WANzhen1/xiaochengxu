<template>
	<view class="login-container">
		<view class="logo-section">
			<image src="/static/logo.png" class="logo"></image>
			<text class="login-title">医疗预约挂号傻逼系统</text>
		</view>
		
		<view class="form-section">
			<view class="input-item">
				<text class="input-label">账号</text>
				<input type="number" v-model="phone" placeholder="请输入账号" class="input" />
			</view>
			
			<view class="input-item">
				<text class="input-label">密码</text>
				<input type="password" v-model="password" placeholder="请输入密码" class="input" />
			</view>
			
			<button class="login-btn" @tap="login">登录</button>
			
			<view class="forgot-password">
				<text @tap="forgotPassword">忘记密码？</text>
			</view>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			phone: '',
			password: ''
		};
	},
	methods: {
		login() {
			// 表单验证
			if (!this.phone) {
				uni.showToast({
					title: '请输入账号',
					icon: 'none'
				});
				return;
			}
			if (!this.password) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}
			// 登录逻辑
			uni.showLoading({
				title: '登录中...'
			});
			// 调用登录接口
			request({
				url: '/login',
				method: 'POST',
				data: {
					username: this.phone,
					password: this.password
				}
			}).then(res => {
				uni.hideLoading();
				// 保存用户信息和token
				uni.setStorageSync('userInfo', res.data.patient);
				uni.setStorageSync('token', res.data.token);
				console.log('存储的内容:', uni.getStorageSync('userInfo'));
				// 登录成功，跳转到首页
				uni.switchTab({
					url: '/pages/index/index'
				});
			}).catch(err => {
				uni.hideLoading();
				console.error('登录失败:', err);
			});
		},
		forgotPassword() {
			// 忘记密码逻辑
			uni.showToast({
				title: '忘记密码功能暂未开放',
				icon: 'none'
			});
		}
	}
};
</script>

<style scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
	background-color: #f8f8f8;
	height: 100vh;
}
.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 60rpx;
	margin-top: 100rpx;
}
.logo {
	width: 200rpx;
	height: 200rpx;
	margin-bottom: 30rpx;
}
.login-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}
.form-section {
	width: 100%;
	background-color: #fff;
	padding: 40rpx;
	border-radius: 10rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.input-item {
	margin-bottom: 30rpx;
}

.input-label {
	display: block;
	font-size: 28rpx;
	color: #666;
	margin-bottom: 10rpx;
}

.input {
	width: 100%;
	height: 80rpx;
	border: 1rpx solid #eee;
	border-radius: 5rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
	box-sizing: border-box;
}

.login-btn {
	width: 100%;
	height: 80rpx;
	background-color: #007aff;
	color: #fff;
	font-size: 32rpx;
	border-radius: 5rpx;
	margin-top: 20rpx;
}

.forgot-password {
	display: flex;
	justify-content: flex-end;
	margin-top: 20rpx;
}

.forgot-password text {
	font-size: 26rpx;
	color: #007aff;
}
</style>