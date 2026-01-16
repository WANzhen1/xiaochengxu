<template>
	<view class="select-department-container">
		<view class="header">
			<text class="title">选择科室</text>
		</view>
		
		<view class="department-list">
			<view class="department-item" v-for="(department, index) in departments" :key="index" @tap="selectDepartment(department)">
				<view class="department-info">
					<text class="department-name">{{ department.name }}</text>
					<text class="department-desc">{{ department.desc }}</text>
				</view>
				<view class="arrow-icon">
					<uni-icons type="right" size="28" color="#ccc" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			departments: [
				{
					id: 1,
					name: '消化内科',
					desc: '擅长消化系统疾病的诊断和治疗',
					path: '/pages/department/department'
				},
				{
					id: 2,
					name: '心血管内科',
					desc: '擅长心血管疾病的诊断和治疗',
					path: '/pages/department/department'
				},
				{
					id: 3,
					name: '呼吸内科',
					desc: '擅长呼吸系统疾病的诊断和治疗',
					path: '/pages/department/department'
				},
				{
					id: 4,
					name: '神经内科',
					desc: '擅长神经系统疾病的诊断和治疗',
					path: '/pages/department/department'
				},
				{
					id: 5,
					name: '外科',
					desc: '擅长外科疾病的诊断和治疗',
					path: '/pages/department/department'
				},
				{
					id: 6,
					name: '妇产科',
					desc: '擅长妇产科疾病的诊断和治疗',
					path: '/pages/department/department'
				},
				{
					id: 7,
					name: '儿科',
					desc: '擅长儿科疾病的诊断和治疗',
					path: '/pages/department/department'
				}
			]
		};
	},
	methods: {
		selectDepartment(department) {
			// 保存选中的科室信息
			uni.setStorageSync('selectedDepartment', department);
			// 跳转到对应科室页面
			uni.navigateTo({
				url: department.path
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