<template>
	<view class="select-department-container">
		<view class="header">
			<text class="title">选择科室</text>
		</view>
		
		<view class="department-list">
			<view class="department-item" v-for="(department, index) in departments" :key="index" @tap="selectDepartment(department)">
				<view class="department-info">
					<text class="department-name">{{ department.departmentName }}</text>
					<text class="department-desc">{{ department.desc || '该科室暂无描述信息' }}</text>
				</view>
				<view class="arrow-icon">
					<uni-icons type="right" size="28" color="#ccc" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			departments: []
		};
	},
	onLoad() {
		// 获取科室列表
		this.getDepartmentList();
	},
	methods: {
		selectDepartment(department) {
			// 保存选中的科室信息
			uni.setStorageSync('selectedDepartment', department);
			// 跳转到对应科室页面
			uni.navigateTo({
				url: '/pages/department/department?departmentId=' + department.departmentID
			});
		},
		// 获取科室列表
		getDepartmentList() {
			uni.showLoading({
				title: '加载中...'
			});
			request({
				url: '/api/departments',
				method: 'GET'
			}).then(res => {
				uni.hideLoading();
				this.departments = res.data.data;
			}).catch(err => {
				uni.hideLoading();
				console.error('获取科室列表失败:', err);
				uni.showToast({
					title: '获取科室列表失败',
					icon: 'none'
				});
			});
		}
	}
};
</script>

<style scoped>
.select-department-container {
	padding: 20rpx;
	background-color: #f8f8f8;
	height: 100vh;
}

.header {
	text-align: center;
	margin-bottom: 30rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.department-list {
	background-color: #fff;
	border-radius: 10rpx;
	padding: 0 20rpx;
}

.department-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #eee;
}

.department-item:last-child {
	border-bottom: none;
}

.department-info {
	flex: 1;
}

.department-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}

.department-desc {
	font-size: 24rpx;
	color: #999;
	display: block;
}

.arrow-icon {
	margin-left: 20rpx;
}
</style>