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
				<view class="service-card pink" @click="navigateTo('/pages/select-department/select-department')">
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

		<!-- 科室列表 -->
		<view class="service-section">
		<view class="section-title">
			<view class="title-icon"></view>
			<text class="title-text">科室列表</text>
		</view>
		<view class="department-list">
			<view class="department-item" v-for="(department, index) in departmentList" :key="index" @click="navigateTo('/pages/select-department/select-department')">
			<text class="department-name">{{ department.departmentName }}</text>
			</view>
		</view>
		</view>

		<!-- 医生推荐 -->
		<view class="service-section">
			<view class="section-title">
				<view class="title-icon"></view>
				<text class="title-text">医生推荐</text>
			</view>
			<view class="doctor-list">
				<view class="doctor-item" v-for="(doctor, index) in doctorList" :key="index" @click="navigateTo('/pages/doctor-info/doctor-info?id=' + doctor.DoctorID)">
					<image class="doctor-avatar" :src="doctor.imgUrl"></image>
					<view class="doctor-info">
						<view class="doctor-name">{{ doctor.doctorName }}</view>
						<view class="doctor-title">{{ doctor.titlename }} | {{ doctor.departmentname }}</view>
						<view class="doctor-desc">擅长：内科常见病、多发病的诊断与治疗</view>
					</view>
				</view>
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
/* import {ref,onMounted} from 'vue'
const departmentList = ref([]);
const doctorList = ref([]); */
// 在页面组件中
import request from '../../utils/request';

export default {
  data() {
    return {
      departmentList: [],
      doctorList: []
    }
  },
  onLoad() {
    this.getDepartmentList();
	this.getDoctorList();
  },
  methods: {
    // 获取科室列表
    getDepartmentList() {
      // 显示加载动画
      uni.showLoading({
        title: '加载中...'
      });
      
      // 发送GET请求
      request({
        url: '/api/departments',
        method: 'GET'
      }).then(res => {
        // 隐藏加载动画
        uni.hideLoading();
        // 请求成功，更新科室列表
        this.departmentList = res.data;
        console.log('科室列表:', this.departmentList);
      }).catch(err => {
        // 隐藏加载动画
        uni.hideLoading();
        
        // 请求失败，处理错误
        console.error('获取科室列表失败:', err);
      });
    },
	  // 获取医生列表
    getDoctorList() {
      // 显示加载动画
      uni.showLoading({
        title: '加载中...'
      });
      // 发送GET请求
      request({
        url: '/doctor/alldoctors',
        method: 'GET'
      }).then(res => {
        // 隐藏加载动画
        uni.hideLoading();
        // 请求成功，更新医生列表
        // 检查数据是否存在
        if (res.data && Array.isArray(res.data)) {
          // 只截取前4位医生作为推荐
          this.doctorList = res.data.slice(0, 4);
          console.log('医生列表赋值后:', this.doctorList);
        } else {
          console.error('医生列表数据格式错误:', res.data);
          this.doctorList = [];
        }
      }).catch(err => {
        // 隐藏加载动画
        uni.hideLoading();
        // 请求失败，处理错误
        console.error('获取医生列表失败:', err);
        this.doctorList = [];
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

	/* 科室列表样式 */
	.department-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10rpx 0;
	}

	.department-item {
		width: 48%;
		height: 80rpx;
		background-color: #f5f5f5;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		border: 1rpx solid #e0e0e0;
	}

	.department-name {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
	}

	/* 医生推荐样式 */
	.doctor-list {
		padding: 10rpx 0;
	}

	.doctor-item {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.doctor-item:last-child {
		border-bottom: none;
	}

	.doctor-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #e0e0e0;
		margin-right: 20rpx;
	}

	.doctor-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.doctor-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.doctor-title {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 10rpx;
	}

	.doctor-desc {
		font-size: 22rpx;
		color: #999;
	}
</style>
