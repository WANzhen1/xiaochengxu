<template>
	<view class="invoiced-container">
		<view class="header">
			<text class="title">已开具电子发票</text>
		</view>
		
		<!-- 筛选条件 -->
		<view class="filter-section">
			<view class="filter-item" :class="{ active: activeFilter === 'all' }" @tap="setFilter('all')">
				<text class="filter-text">全部</text>
			</view>
			<view class="filter-item" :class="{ active: activeFilter === 'recharge' }" @tap="setFilter('recharge')">
				<text class="filter-text">门诊充值</text>
			</view>
			<view class="filter-item" :class="{ active: activeFilter === 'treatment' }" @tap="setFilter('treatment')">
				<text class="filter-text">门诊缴费</text>
			</view>
		</view>
		
		<!-- 发票列表 -->
		<view class="invoice-list">
			<view class="invoice-item" v-for="(invoice, index) in filteredInvoices" :key="index">
				<view class="invoice-header">
					<text class="invoice-type">{{ invoice.type === 'recharge' ? '门诊充值' : '门诊缴费' }}</text>
					<text class="invoice-status">{{ invoice.status }}</text>
				</view>
				<view class="invoice-content">
					<view class="invoice-info">
						<view class="info-row">
							<text class="info-label">开票时间：</text>
							<text class="info-value">{{ invoice.invoiceTime }}</text>
						</view>
						<view class="info-row">
							<text class="info-label">发票号码：</text>
							<text class="info-value">{{ invoice.invoiceNo }}</text>
						</view>
						<view class="info-row">
							<text class="info-label">交易单号：</text>
							<text class="info-value">{{ invoice.tradeNo }}</text>
						</view>
					</view>
					<view class="invoice-amount">
						<text class="amount-label">金额：</text>
						<text class="amount-value">¥{{ invoice.amount.toFixed(2) }}</text>
					</view>
				</view>
				<view class="invoice-footer">
					<view class="invoice-actions">
						<button class="action-btn" @tap="viewInvoice(invoice)">查看</button>
						<button class="action-btn" @tap="downloadInvoice(invoice)">下载</button>
						<button class="action-btn" @tap="shareInvoice(invoice)">分享</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-if="filteredInvoices.length === 0">
			<uni-icons type="document" size="100" color="#ccc" />
			<text class="empty-text">暂无已开具发票</text>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request';

export default {
	data() {
		return {
			activeFilter: 'all',
			invoices: []
		};
	},
	computed: {
		filteredInvoices() {
			if (this.activeFilter === 'all') {
				return this.invoices;
			}
			return this.invoices.filter(invoice => invoice.type === this.activeFilter);
		}
	},
	onLoad() {
		// 获取已开具发票列表
		this.getInvoicedList();
	},
	methods: {
		setFilter(filter) {
			this.activeFilter = filter;
		},
		// 获取已开具发票列表
		getInvoicedList() {
			uni.showLoading({
				title: '加载中...'
			});
			// 模拟调用后端接口获取已开具发票列表
			request({
				url: '/api/invoices/invoiced',
				method: 'GET'
			}).then(res => {
				uni.hideLoading();
				this.invoices = res.data || [];
			}).catch(err => {
				uni.hideLoading();
				console.error('获取已开具发票列表失败:', err);
				// 如果接口调用失败，使用模拟数据
				this.invoices = [
					{
						id: 1,
						type: 'recharge',
						status: '已开具',
						invoiceTime: '2026-01-16 14:30:00',
						invoiceNo: '1234567890',
						tradeNo: 'TX202601161430001234',
						amount: 100.00,
						item: '门诊充值'
					},
					{
						id: 2,
						type: 'treatment',
						status: '已开具',
						invoiceTime: '2026-01-15 10:15:00',
						invoiceNo: '0987654321',
						tradeNo: 'TX202601151015005678',
						amount: 258.50,
						item: '门诊缴费'
					},
					{
						id: 3,
						type: 'recharge',
						status: '已开具',
						invoiceTime: '2026-01-14 16:45:00',
						invoiceNo: '1122334455',
						tradeNo: 'TX202601141645009012',
						amount: 50.00,
						item: '门诊充值'
					}
				];
			});
		},
		// 查看发票详情
		viewInvoice(invoice) {
			// 模拟调用后端接口查看发票详情
			request({
				url: `/api/invoices/view/${invoice.id}`,
				method: 'GET'
			}).then(res => {
				// 处理发票详情数据
				uni.showToast({
					title: '查看发票：' + invoice.invoiceNo,
					icon: 'none'
				});
			}).catch(err => {
				console.error('查看发票失败:', err);
				uni.showToast({
					title: '查看发票失败，请重试',
					icon: 'none'
				});
			});
		},
		// 下载发票
		downloadInvoice(invoice) {
			// 模拟调用后端接口下载发票
			request({
				url: `/api/invoices/download/${invoice.id}`,
				method: 'GET'
			}).then(res => {
				// 处理发票下载逻辑
				uni.showToast({
					title: '下载发票：' + invoice.invoiceNo,
					icon: 'none'
				});
			}).catch(err => {
				console.error('下载发票失败:', err);
				uni.showToast({
					title: '下载发票失败，请重试',
					icon: 'none'
				});
			});
		},
		// 分享发票
		shareInvoice(invoice) {
			// 模拟调用后端接口分享发票
			request({
				url: `/api/invoices/share/${invoice.id}`,
				method: 'POST'
			}).then(res => {
				// 处理发票分享逻辑
				uni.showToast({
					title: '分享发票：' + invoice.invoiceNo,
					icon: 'none'
				});
			}).catch(err => {
				console.error('分享发票失败:', err);
				uni.showToast({
					title: '分享发票失败，请重试',
					icon: 'none'
				});
			});
		}
	}
};
</script>

<style scoped>
.invoiced-container {
	background-color: #f5f5f5;
	min-height: 100vh;
}

.header {
	background-color: #fff;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #eee;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
	display: block;
}

/* 筛选条件 */
.filter-section {
	display: flex;
	background-color: #fff;
	padding: 20rpx;
	border-bottom: 1rpx solid #eee;
}

.filter-item {
	flex: 1;
	height: 70rpx;
	background-color: #f5f5f5;
	border-radius: 35rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 10rpx;
}

.filter-item.active {
	background-color: #007AFF;
}

.filter-text {
	font-size: 28rpx;
	color: #333;
}

.filter-item.active .filter-text {
	color: #fff;
	font-weight: bold;
}

/* 发票列表 */
.invoice-list {
	padding: 20rpx;
}

.invoice-item {
	background-color: #fff;
	border-radius: 15rpx;
	padding: 25rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.invoice-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.invoice-type {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

.invoice-status {
	font-size: 24rpx;
	color: #07c160;
	background-color: #f0f9eb;
	padding: 5rpx 15rpx;
	border-radius: 15rpx;
}

.invoice-content {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 20rpx;
}

.invoice-info {
	flex: 1;
}

.info-row {
	display: flex;
	margin-bottom: 15rpx;
}

.info-row:last-child {
	margin-bottom: 0;
}

.info-label {
	font-size: 26rpx;
	color: #666;
	margin-right: 15rpx;
}

.info-value {
	font-size: 26rpx;
	color: #333;
	flex: 1;
}

.invoice-amount {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
}

.amount-label {
	font-size: 26rpx;
	color: #666;
	margin-bottom: 5rpx;
}

.amount-value {
	font-size: 36rpx;
	color: #ff6b35;
	font-weight: bold;
}

.invoice-footer {
	border-top: 1rpx solid #f0f0f0;
	padding-top: 20rpx;
}

.invoice-actions {
	display: flex;
	justify-content: flex-end;
	gap: 15rpx;
}

.action-btn {
	padding: 10rpx 25rpx;
	background-color: #f0f0f0;
	color: #333;
	font-size: 24rpx;
	border-radius: 20rpx;
	line-height: normal;
	height: auto;
}

/* 空状态 */
.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100rpx 0;
}

.empty-text {
	font-size: 28rpx;
	color: #999;
	margin-top: 30rpx;
}
</style>