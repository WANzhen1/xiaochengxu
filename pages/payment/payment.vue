<template>
  <view class="payment-page">
    <!-- 头部信息 -->
    <view class="header">
      <view class="patient-info">
        <text class="patient-name">{{ userInfo.patientName }}</text>
        <text class="patient-label">本人</text>
      </view>
      <view class="card-info">
        <text class="card-number">{{ maskedCardNumber }}</text>
      </view>
      <view class="balance-info">
        <text class="balance-label">卡内余额</text>
        <text class="balance-amount">¥{{ userInfo.patientWallet.toFixed(2) }}</text>
      </view>
    </view>

    <!-- 充值按钮 -->
    <view class="recharge-section" v-if="showRecharge">
      <button class="recharge-btn" @tap="handleRecharge">充值</button>
    </view>

    <!-- 选项卡 -->
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: activeTab === 'payment' }"
        @tap="switchTab('payment')"
      >
        待缴费
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'history' }"
        @tap="switchTab('history')"
      >
        缴费记录
      </view>
    </view>

    <!-- 待缴费项目 -->
    <view class="pending-payment-section" v-if="activeTab === 'payment'">
      <view class="section-title">待缴费项目</view>
     
      <view class="payment-items" v-if="pendingItems.length > 0">
        <view class="payment-item" v-for="(item, index) in pendingItems" :key="item.mhid || index">
          <view class="item-header">
            <text class="item-type">{{ getItemType(item) }}</text>
            <text class="item-amount">¥{{ safeToFixed(item.totalprice) }}</text>
          </view>
          <view class="item-details">
            <text class="department">诊断: {{ item.description || '无' }}</text>
            <text class="doctor">医生: {{ item.doctorName || '未知' }}</text>
          </view>
          <view class="item-details" v-if="item.phs">
            <text class="medicine">药品: {{ item.phs }}</text>
            <text class="usage" v-if="item.ads">用法: {{ item.ads }}</text>
          </view>
          <view class="item-time">时间: {{ formatDate(item.MHdate) }}</view>
          <view class="item-info">
            <text class="item-label">病历号:</text>
            <text class="item-value">{{ item.mhid || '未知' }}</text>
          </view>
          <view class="item-status">
            <text class="status-label">状态:</text>
            <text class="status-value status-unpaid">未缴费</text>
          </view>
          <button
            class="pay-btn"
            :disabled="isPaying || userInfo.patientWallet < item.totalprice"
            @tap="goToPaymentInfo(item, index)"
          >
            去缴费
          </button>
        </view>
      </view>

      <!-- 待缴费总计 -->
      <view class="total-section" v-if="pendingItems.length > 0">
        <text class="total-label">总计</text>
        <text class="total-amount">¥{{ totalAmount.toFixed(2) }}</text>
      </view>


      <!-- 无待缴费项目 -->
      <view class="empty-state" v-if="pendingItems.length === 0 && !loading">
        <text class="empty-text">暂无待缴费项目</text>
      </view>
    </view>

    <!-- 缴费记录 -->
    <view class="payment-history-section" v-if="activeTab === 'history'">
      <view class="section-title">缴费记录</view>
     
      <view class="history-items" v-if="paymentHistory.length > 0">
        <view class="history-item" v-for="(record, index) in paymentHistory" :key="record.mhid || index">
          <view class="history-header">
            <text class="history-type">{{ record.description || '医疗费用' }}</text>
            <text class="history-amount">-¥{{ safeToFixed(record.totalprice) }}</text>
          </view>
          <view class="history-details">
            <text class="history-doctor">医生: {{ record.doctorName || '未知' }}</text>
            <text class="history-time">{{ formatDate(record.MHdate) }}</text>
          </view>
          <view class="item-details" v-if="record.phs">
            <text class="medicine">药品: {{ record.phs }}</text>
          </view>
          <view class="history-info">
            <text class="history-status">
              <text class="status-label">状态:</text>
              <text class="status-value status-paid">已缴费</text>
            </text>
            <text class="history-id">病历号: {{ record.mhid || '未知' }}</text>
          </view>
        </view>
      </view>
     
      <!-- 加载更多 -->
      <view class="load-more" v-if="hasMoreHistory && paymentHistory.length > 0">
        <button class="load-more-btn" @tap="loadMoreHistory" :disabled="loadingHistory">
          {{ loadingHistory ? '加载中...' : '加载更多' }}
        </button>
      </view>

      <!-- 无缴费记录 -->
      <view class="empty-state" v-if="paymentHistory.length === 0 && !loadingHistory">
        <text class="empty-text">暂无缴费记录</text>
      </view>
    </view>

    <!-- 加载中状态 -->
    <view class="loading-state" v-if="(loading && activeTab === 'payment') || (loadingHistory && activeTab === 'history')">
      <text class="loading-text">加载中...</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

// 响应式数据
const pendingItems = ref([])
const paymentHistory = ref([])
const allMedicalRecords = ref([]) // 所有病历记录
const activeTab = ref('payment')
const showRecharge = ref(true)
const loading = ref(false)
const loadingHistory = ref(false)
const isPaying = ref(false)
const hasMoreHistory = ref(true)
const currentPage = ref(1)
const pageSize = ref(15) // 每页显示15条记录

// 从本地存储获取用户信息
const userInfo = ref(uni.getStorageSync('userInfo') || {})

// 计算属性
const maskedCardNumber = computed(() => {
  const card = userInfo.value.patientIDCard || ''
  if (!card) return ''
  if (card.length < 16) return card
  return card.substring(0, 6) + '********' + card.substring(card.length - 4)
})

const totalAmount = computed(() => {
  return pendingItems.value.reduce((sum, item) => sum + (parseFloat(item.totalprice) || 0), 0)
})

// 生命周期
onMounted(() => {
  // 确保有用户信息
  if (!userInfo.value || !userInfo.value.patientID) {
    // 尝试重新获取
    const storedInfo = uni.getStorageSync('userInfo')
    if (storedInfo) {
      userInfo.value = storedInfo
    } else {
      // 跳转到登录页
      uni.redirectTo({
        url: '/pages/login/login'
      })
      return
    }
  }
 
  fetchPendingPayments()
})

onShow(() => {
  // 刷新用户信息
  fetchPendingPayments()
  const newUserInfo = uni.getStorageSync('userInfo')
  if (newUserInfo) {
    userInfo.value = newUserInfo
  }
})

// 方法
const switchTab = (tab) => {
  activeTab.value = tab
  if (tab === 'payment') {
    fetchPendingPayments()
  } else if (tab === 'history') {
    loadPaymentHistory()
  }
}

const safeToFixed = (value) => {
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '0.00'
  }
  return num.toFixed(2)
}

const fetchPendingPayments = () => {
  loading.value = true
 
  uni.request({
    url: 'http://localhost:8080/patient/notpaid',
    method: 'GET',
    data: {
      id: userInfo.value.patientID
    },
    success: (res) => {
      console.log('待缴费项目响应:', res)
     
      if (res && res.statusCode === 200) {
        const responseData = res.data
       
        if (responseData && responseData.code === 1) {
          // 过滤出 state = 0 的未缴费项目
          pendingItems.value = (responseData.data || []).filter(item => item.state === 0)
          console.log('待缴费项目数据:', pendingItems.value)
        } else {
          uni.showToast({
            title: responseData ? (responseData.msg || '加载失败') : '加载失败',
            icon: 'none'
          })
        }
      } else {
        uni.showToast({
          title: `请求错误: ${res ? res.statusCode : '未知状态码'}`,
          icon: 'none'
        })
      }
    },
    fail: (error) => {
      console.error('请求失败:', error)
      uni.showToast({
        title: '网络错误',
        icon: 'none'
      })
    },
    complete: () => {
      loading.value = false
    }
  })
}

// 加载缴费记录
const loadPaymentHistory = () => {
  if (paymentHistory.value.length > 0 && !hasMoreHistory.value) return
 
  loadingHistory.value = true
  currentPage.value = 1
 
  uni.request({
    url: 'http://localhost:8080/patient/records',
    method: 'GET',
    data: {
      id: userInfo.value.patientID
    },
    success: (res) => {
      console.log('所有病历记录响应:', res)
     
      if (res && res.statusCode === 200) {
        const responseData = res.data
       
        if (responseData && responseData.code === 1) {
          allMedicalRecords.value = responseData.data || []
         
          // 过滤出 state = 1 的已缴费记录
          const paidRecords = allMedicalRecords.value.filter(item => item.state === 1)
         
          // 按时间倒序排序（使用 MHdate 字段）
          paidRecords.sort((a, b) => {
            const dateA = new Date(a.MHdate || 0)
            const dateB = new Date(b.MHdate || 0)
            return dateB - dateA
          })
         
          // 分页显示
          const startIndex = 0
          const endIndex = currentPage.value * pageSize.value
          const pageRecords = paidRecords.slice(startIndex, endIndex)
         
          paymentHistory.value = pageRecords
         
          // 判断是否还有更多数据
          hasMoreHistory.value = paidRecords.length > paymentHistory.value.length
          currentPage.value++
         
          console.log('缴费记录数据:', paymentHistory.value)
        } else {
          uni.showToast({
            title: responseData ? (responseData.msg || '加载失败') : '加载失败',
            icon: 'none'
          })
        }
      }
    },
    fail: (error) => {
      console.error('加载病历记录失败:', error)
      uni.showToast({
        title: '加载失败',
        icon: 'none'
      })
    },
    complete: () => {
      loadingHistory.value = false
    }
  })
}

const loadMoreHistory = () => {
  loadingHistory.value = true
 
  // 从所有记录中过滤出已缴费记录
  const paidRecords = allMedicalRecords.value.filter(item => item.state === 1)
 
  // 按时间倒序排序
  paidRecords.sort((a, b) => {
    const dateA = new Date(a.MHdate || 0)
    const dateB = new Date(b.MHdate || 0)
    return dateB - dateA
  })
 
  // 分页显示
  const startIndex = 0
  const endIndex = currentPage.value * pageSize.value
  const pageRecords = paidRecords.slice(startIndex, endIndex)
 
  paymentHistory.value = pageRecords
 
  // 判断是否还有更多数据
  hasMoreHistory.value = paidRecords.length > paymentHistory.value.length
  currentPage.value++
 
  loadingHistory.value = false
}

const getItemType = (item) => {
  if (item.type) return item.type
 
  if (item.description) {
    const desc = item.description.toLowerCase()
    if (desc.includes('检验')) return '检验费'
    if (desc.includes('检查')) return '检查费'
    if (desc.includes('药品') || desc.includes('药')) return '药费'
  }
 
  if (item.phs) {
    const meds = item.phs.toLowerCase()
    if (meds.includes('西药')) return '西药费'
    if (meds.includes('中药')) return '中药费'
  }
 
  return '医疗费用'
}

const formatDate = (dateString) => {
  if (!dateString) return '--'
  try {
    // 如果是完整的时间戳
    if (dateString.includes(':')) {
      // 尝试格式化为更易读的格式
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return dateString
      }
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    }
    // 如果只有日期，返回原日期
    return dateString
  } catch (e) {
    return dateString
  }
}

const goToPaymentInfo = (item, index) => {
  const amount = parseFloat(item.totalprice) || 0
  if (userInfo.value.patientWallet < amount) {
    uni.showModal({
      title: '余额不足',
      content: `当前余额¥${userInfo.value.patientWallet.toFixed(2)}，支付需要¥${amount.toFixed(2)}，请先充值`,
      confirmText: '去充值',
      success: (res) => {
        if (res.confirm) {
          handleRecharge()
        }
      }
    })
    return
  }
 
  // 处理药品信息（pids和amounts需要转换为列表）
  let phlist = []
  if (item.pids && item.amounts) {
    try {
      const pidArray = item.pids.split(',')
      const amountArray = item.amounts.split(',')
      pidArray.forEach((pid, i) => {
        if (pid && amountArray[i]) {
          phlist.push({
            pid: parseInt(pid.trim()),
            amount: parseInt(amountArray[i].trim())
          })
        }
      })
    } catch (e) {
      console.error('解析药品信息失败:', e)
    }
  }
 
  // 保存当前支付项目信息
  uni.setStorageSync('currentPayment', {
    item: item,
    index: index,
    type: 'single',
    amount: amount,
    patientId: userInfo.value.patientID,
    mhid: item.mhid,
    phlist: phlist
  })
 
  // 跳转到支付信息页面
  uni.navigateTo({
    url: '/pages/payment-info/payment-info'
  })
}

const goToPaymentInfoForAll = () => {
  if (userInfo.value.patientWallet < totalAmount.value) {
    uni.showModal({
      title: '余额不足',
      content: `当前余额¥${userInfo.value.patientWallet.toFixed(2)}，支付需要¥${totalAmount.value.toFixed(2)}，请先充值`,
      confirmText: '去充值',
      success: (res) => {
        if (res.confirm) {
          handleRecharge()
        }
      }
    })
    return
  }
 
  // 处理所有项目的药品信息
  const itemsWithPhlist = pendingItems.value.map(item => {
    let phlist = []
    if (item.pids && item.amounts) {
      try {
        const pidArray = item.pids.split(',')
        const amountArray = item.amounts.split(',')
        pidArray.forEach((pid, i) => {
          if (pid && amountArray[i]) {
            phlist.push({
              pid: parseInt(pid.trim()),
              amount: parseInt(amountArray[i].trim())
            })
          }
        })
      } catch (e) {
        console.error('解析药品信息失败:', e)
      }
    }
    return {
      ...item,
      phlist
    }
  })
 
  // 保存所有支付项目信息
  uni.setStorageSync('currentPayment', {
    items: itemsWithPhlist,
    type: 'all',
    amount: totalAmount.value,
    patientId: userInfo.value.patientID
  })
 
  // 跳转到支付信息页面
  uni.navigateTo({
    url: '/pages/payment-info/payment-info'
  })
}

const handleRecharge = () => {
  // 跳转到 recharge.vue 页面
  uni.navigateTo({
    url: '/pages/recharge/recharge?patientId=' + userInfo.value.patientID
  })
}

// 支付成功后回调，更新用户余额和待缴费列表
const onPaymentSuccess = (paidAmount, paidItem) => {
  // 更新本地用户余额
  if (userInfo.value.patientWallet !== undefined) {
    userInfo.value.patientWallet -= paidAmount
    // 更新本地存储
    uni.setStorageSync('userInfo', userInfo.value)
  }
 
  // 刷新待缴费列表
  fetchPendingPayments()
 
  // 刷新缴费记录
  if (activeTab.value === 'history') {
    // 清空缓存，重新加载
    paymentHistory.value = []
    allMedicalRecords.value = []
    loadPaymentHistory()
  }
}

// 暴露给其他页面调用的方法
defineExpose({
  onPaymentSuccess
})
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.header {
  background: linear-gradient(135deg, #4a90e2, #63b3ed);
  padding: 40rpx 30rpx;
  color: white;
}

.patient-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.patient-name {
  font-size: 40rpx;
  font-weight: bold;
  margin-right: 20rpx;
}

.patient-label {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.card-info {
  margin-bottom: 30rpx;
}

.card-number {
  font-size: 32rpx;
  letter-spacing: 2rpx;
}

.balance-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance-label {
  font-size: 28rpx;
  opacity: 0.9;
}

.balance-amount {
  font-size: 48rpx;
  font-weight: bold;
}

.recharge-section {
  padding: 30rpx;
  background-color: white;
  margin-bottom: 20rpx;
}

.recharge-btn {
  background-color: #4a90e2;
  color: white;
  border-radius: 50rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 32rpx;
}

.tab-bar {
  display: flex;
  background-color: white;
  margin-bottom: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 30rpx 0;
  font-size: 32rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #4a90e2;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80rpx;
  height: 4rpx;
  background-color: #4a90e2;
  border-radius: 2rpx;
}

.pending-payment-section,
.payment-history-section {
  background-color: white;
  min-height: 400rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  padding: 30rpx 30rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.payment-items, .history-items {
  padding: 0 30rpx;
}

.payment-item, .history-item {
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.payment-item:last-child, .history-item:last-child {
  border-bottom: none;
}

.item-header, .history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.item-type, .history-type {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.item-amount, .history-amount {
  font-size: 36rpx;
  font-weight: bold;
}

.item-amount {
  color: #e74c3c;
}

.history-amount {
  color: #27ae60;
}

.item-details, .history-details {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  margin-bottom: 15rpx;
}

.department, .doctor, .medicine, .usage,
.history-doctor, .history-time {
  font-size: 28rpx;
  color: #666;
  line-height: 1.4;
}

.history-details {
  flex-direction: row;
  justify-content: space-between;
}

.history-time {
  color: #999;
}

.item-time {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 15rpx;
}

.item-info, .history-info,
.item-status {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15rpx;
  font-size: 26rpx;
  color: #888;
}

.item-status, .history-status {
  margin-bottom: 20rpx;
}

.status-label {
  color: #666;
}

.status-value {
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status-unpaid {
  background-color: #ffeaea;
  color: #e74c3c;
}

.status-paid {
  background-color: #e8f7ef;
  color: #27ae60;
}

.pay-btn {
  background-color: #4a90e2;
  color: white;
  border-radius: 40rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 28rpx;
  width: 200rpx;
}

.pay-btn[disabled] {
  background-color: #cccccc;
  color: #666666;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 30rpx;
  border-top: 2rpx solid #f0f0f0;
  margin-top: 20rpx;
}

.total-label {
  font-size: 36rpx;
  font-weight: bold;
}

.total-amount {
  font-size: 48rpx;
  font-weight: bold;
  color: #e74c3c;
}

.onekey-pay-section {
  padding: 30rpx 30rpx 50rpx;
}

.onekey-pay-btn {
  background-color: #e74c3c;
  color: white;
  border-radius: 50rpx;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 32rpx;
  font-weight: bold;
  width: 100%;
}

.onekey-pay-btn[disabled] {
  background-color: #ffb8b3;
}

.load-more {
  padding: 40rpx 0;
  text-align: center;
}

.load-more-btn {
  background-color: #f0f0f0;
  color: #666;
  border-radius: 40rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 28rpx;
  width: 200rpx;
}

.load-more-btn[disabled] {
  background-color: #e0e0e0;
  color: #999;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #999;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
}

.loading-text {
  font-size: 32rpx;
  color: #666;
}
</style>