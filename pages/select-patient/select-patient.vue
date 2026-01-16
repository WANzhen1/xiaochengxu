<template>
	<view class="select-patient-container">
		<view class="header">
			<text class="title">选择就诊人</text>
		</view>
		
		<view class="patient-list">
			<view class="patient-item" v-for="(patient, index) in patients" :key="index" @tap="selectPatient(patient)">
				<view class="patient-info">
					<view class="patient-name">
						<text class="name">{{ patient.name }}</text>
						<text class="gender">{{ patient.gender }}</text>
						<text class="age">{{ patient.age }}岁</text>
					</view>
					<text class="id-card">{{ patient.idCard }}</text>
					<text class="phone">{{ patient.phone }}</text>
				</view>
				<view class="select-icon">
					<uni-icons type="checkbox" size="30" :color="selectedPatientId === patient.id ? '#007aff' : '#ccc'" />
				</view>
			</view>
		</view>
		
		<view class="add-patient">
			<button class="add-btn" @tap="addPatient">
				<uni-icons type="plus" size="24" color="#007aff" />
				<text class="add-text">添加就诊人</text>
			</button>
		</view>
		
		<view class="confirm-section">
			<button class="confirm-btn" @tap="confirm" :disabled="!selectedPatientId">确认</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			patients: [
				{
					id: 1,
					name: '张三',
					gender: '男',
					age: 30,
					idCard: '110101199001011234',
					phone: '13800138000'
				},
				{
					id: 2,
					name: '李四',
					gender: '女',
					age: 25,
					idCard: '110101199501011234',
					phone: '13800138001'
				}
			],
			selectedPatientId: null
		};
	},
	methods: {
		selectPatient(patient) {
			this.selectedPatientId = patient.id;
		},
		addPatient() {
			// 添加就诊人逻辑
			uni.showToast({
				title: '添加就诊人功能暂未开放',
				icon: 'none'
			});
		},
		confirm() {
			if (this.selectedPatientId) {
				const selectedPatient = this.patients.find(p => p.id === this.selectedPatientId);
				// 保存选中的就诊人信息
				uni.setStorageSync('selectedPatient', selectedPatient);
				// 跳转到选择科室页面
				uni.navigateTo({
					url: '/pages/select-department/select-department'
				});
			}
		}
	}
};
</script>

<style scoped>
.select-patient-container {
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

.patient-list {
	background-color: #fff;
	border-radius: 10rpx;
	padding: 20rpx;
}

.patient-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #eee;
}

.patient-item:last-child {
	border-bottom: none;
}

.patient-info {
	flex: 1;
}

.patient-name {
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
}

.name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-right: 20rpx;
}

.gender {
	font-size: 26rpx;
	color: #666;
	margin-right: 20rpx;
}

.age {
	font-size: 26rpx;
	color: #666;
}

.id-card {
	display: block;
	font-size: 24rpx;
	color: #999;
	margin-bottom: 10rpx;
}

.phone {
	display: block;
	font-size: 24rpx;
	color: #999;
}

.select-icon {
	margin-left: 20rpx;
}

.add-patient {
	margin: 20rpx 0;
}

.add-btn {
	width: 100%;
	height: 80rpx;
	background-color: #fff;
	color: #007aff;
	font-size: 30rpx;
	border-radius: 10rpx;
	border: 1rpx dashed #007aff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.add-text {
	margin-left: 10rpx;
}

.confirm-section {
	padding: 20rpx 0;
}

.confirm-btn {
	width: 100%;
	height: 80rpx;
	background-color: #007aff;
	color: #fff;
	font-size: 32rpx;
	border-radius: 10rpx;
}

.confirm-btn[disabled] {
	background-color: #ccc;
}
</style>