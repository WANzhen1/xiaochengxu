// 封装uni.request请求
const BASE_URL = 'http://localhost:8080';

const request = (options) => {
  return new Promise((resolve, reject) => {
    // 处理GET请求的查询参数
    let fullUrl = BASE_URL + options.url;
    let requestData = options.data || {};
    
    if (options.method === 'GET' && options.data) {
      // 将GET请求的data参数转换为URL查询参数
      const queryParams = [];
      for (const key in options.data) {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`);
      }
      if (queryParams.length > 0) {
        fullUrl += '?' + queryParams.join('&');
        requestData = {}; // GET请求不使用body数据
      }
    }
    
    uni.request({
      url: fullUrl,
      method: options.method || 'GET',
      data: requestData,
      header: {
        'content-type': 'application/json',
        'Authorization': uni.getStorageSync('token') || ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 1 || res.data.code === 200) {
            resolve(res.data);
          } else {
            uni.showToast({
              title: res.data.msg || '请求失败',
              icon: 'none'
            });
            reject(res.data);
          }
        } else {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          });
          reject(res);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络连接失败',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

export default request;