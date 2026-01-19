<template>
	<view class="confirm-appointment-container">
		<view class="header">
			<text class="title">确认预约信息</text>
		</view>
		
		<scroll-view class="content" scroll-y="true">
			<!-- 就诊人信息 -->
			<view class="info-section">
				<text class="section-title">就诊人信息</text>
				<view class="info-item">
					<text class="info-label">姓名：</text>
					<text class="info-value">{{ patient.PatientName || '' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">性别：</text>
					<text class="info-value">{{ patient.PatientGender || '' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">年龄：</text>
					<text class="info-value">{{ getAge(patient.PatientIDCard) }}岁</text>
				</view>
				<view class="info-item">
					<text class="info-label">身份证号：</text>
					<text class="info-value">{{ formatIdCard(patient.PatientIDCard) }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">手机号：</text>
					<text class="info-value">{{ patient.PatientAccount || '' }}</text>
				</view>
			</view>
			
			<!-- 医生信息 -->
			<view class="info-section">
				<text class="section-title">医生信息</text>
				<view class="info-item">
					<text class="info-label">姓名：</text>
					<text class="info-value">{{ doctor.DoctorName || '' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">科室：</text>
					<text class="info-value">{{ department.DepartmentName || doctor.departmentname || '' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">职称：</text>
					<text class="info-value">{{ doctor.titlename || '' }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">出诊时间：</text>
					<text class="info-value">周一上午</text>
				</view>
			</view>
			
			<!-- 预约信息 -->
			<view class="info-section">
				<text class="section-title">预约信息</text>
				<view class="info-item">
					<text class="info-label">就诊时间：</text>
					<text class="info-value">{{ appointmentDate }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">就诊类型：</text>
					<text class="info-value">普通门诊</text>
				</view>
				<view class="info-item">
					<text class="info-label">挂号费用：</text>
					<text class="info-value price">¥50</text>
				</view>
			</view>
			
			<!-- 温馨提示 -->
			<view class="tip-section">
				<text class="tip-title">温馨提示</text>
				<text class="tip-content">- 请携带有效身份证件按时就诊</text>
				<text class="tip-content">- 请提前30分钟到达医院签到</text>
				<text class="tip-content">- 如需取消预约，请提前24小时操作</text>
			</view>
		</scroll-view>
		
		<!-- 费用和确认按钮 -->
		<view class="footer">
			<view class="total-price">
				<text class="price-label">总计：</text>
				<text class="price-value">¥50</text>
			</view>
			<button class="confirm-btn" @tap="confirmAppointment">确认预约</button>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			patient: {},
			doctor: {},
			department: {},
			appointmentDate: ''
		};
	},
	onLoad() {
		// 从本地存储获取信息
		this.patient = uni.getStorageSync('selectedPatient') || {};
		this.doctor = uni.getStorageSync('selectedDoctor') || {};
		this.department = uni.getStorageSync('selectedDepartment') || {};
		
		// 设置默认预约日期
		const now = new Date();
		this.appointmentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
	},
	methods: {
		formatIdCard(idCard) {
			// 格式化身份证号，中间显示为星号
			if (!idCard) return '';
			return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
		},
		// 根据身份证号计算年龄
		getAge(idCard) {
			if (!idCard || idCard.length < 18) return 0;
			const birthYear = parseInt(idCard.substring(6, 10));
			const currentYear = new Date().getFullYear();
			return currentYear - birthYear;
		},
		confirmAppointment() {
			// 确认预约
			uni.showLoading({
				title: '预约中...'
			});
			
			// 模拟预约成功，实际应调用后端接口
		setTimeout(() => {
			uni.hideLoading();
			// 跳转到预约成功页面
			uni.navigateTo({
				url: '/pages/appointment-success/appointment-success'
			});
		}, 1500);
		}
	}
};
</script>

<style scoped>
.confirm-appointment-container {
	height: 100vh;
	background-color: #f5f5f5;
}

.header {
	background-color: #fff;
	padding: 30rpx 40rpx;
	border-bottom: 1rpx solid #eee;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.content {
	padding: 30rpx;
	height: calc(100vh - 200rpx);
}

.info-section {
	background-color: #fff;
	border-radius: 10rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: block;
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.info-item:last-child {
	border-bottom: none;
}

.info-label {
	font-size: 28rpx;
	color: #666;
}

.info-value {
	font-size: 28rpx;
	color: #333;
	text-align: right;
	flex: 1;
}

.price {
	color: #ff6b35;
	font-weight: bold;
}

.tip-section {
	background-color: #fff9e6;
	border-radius: 10rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
}

.tip-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #ff9800;
	margin-bottom: 20rpx;
	display: block;
}

.tip-content {
	font-size: 26rpx;
	color: #ff6b35;
	line-height: 1.8;
	display: block;
	margin-bottom: 10rpx;
}

.footer {
	background-color: #fff;
	padding: 30rpx;
	border-top: 1rpx solid #eee;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}

.total-price {
	display: flex;
	align-items: center;
}

.price-label {
	font-size: 28rpx;
	color: #666;
}

.price-value {
	font-size: 40rpx;
	color: #ff6b35;
	font-weight: bold;
	margin-left: 10rpx;
}

.confirm-btn {
	width: 200rpx;
	height: 80rpx;
	background-color: #007AFF;
	color: #fff;
	font-size: 32rpx;
	border-radius: 40rpx;
	line-height: 80rpx;
}
</style>