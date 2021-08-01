import axios from 'axios';

// 公共路由(网络请求地址)
axios.defaults.baseURL ='https://www.fastmock.site/mock/df6a9659a720f5eb98239a76d22a627c/userinfo';
// 请求响应超时时间
axios.defaults.timeout = 5000;

export default {
  get: function(path = '', data = {}) {
    return new Promise(function(resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function(response) {
          // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  post: function(path = '', data = {}) {
    return new Promise(function(resolve, reject) {
      axios.post(path, data)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  put: function(path = '', data = {}) {
    return new Promise(function(resolve, reject) {
      axios.put(path, data)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
};
