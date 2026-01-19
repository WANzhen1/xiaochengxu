// 封装uni.request请求
const BASE_URL = 'http://localhost:8080';

const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
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