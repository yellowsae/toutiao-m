// 请求模块
import axios from 'axios'
import store from '@/store'

// 创建实例
const request = axios.create({
  // 接口的基础路径
  baseURL: 'http://api-toutiao-web.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意，这里务必要返回config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  return Promise.reject(error)
})

// 相应拦截器

// 如何使用： 将请求对象挂载到 Vue.prototype 原型对象上， 然后通过 this.xxx 调用请求模块

export default request
