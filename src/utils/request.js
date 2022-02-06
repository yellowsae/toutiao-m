// 请求模块
import axios from 'axios'

export default axios.create({
  // 接口的基础路径
  baseURL: 'http://api-toutiao-web.itheima.net/'

  // 请求拦截器
  // 相应拦截器
})

// 如何使用： 将请求对象挂载到 Vue.prototype 原型对象上， 然后通过 this.xxx 调用请求模块
