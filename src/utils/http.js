import axios from 'axios'
import qs from 'qs';

// 创建axios实例，全局的配置
const instance = axios.create({
  baseURL: 'http://www.pudge.wang:3000/api',
  timeout: 10000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config.params)
  // config.params.token = localStorage.getItem('token')
  // if (config.method === 'get') {
  //   config.params.token = localStorage.getItem('token')
  // } else if (config.method === 'post') {
  //   config.data += '&token=' + localStorage.getItem('token')
  // }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const http = {
  get (url, params) {
    return new Promise((resolve, reject) => {
      instance.get(url, {
        params: params
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      instance.post(url, qs.stringify(data))
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    })
  }
}

export default http