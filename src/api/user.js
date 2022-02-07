/**
 * 用户相关模块
 */

// 引入请求方法 axiox
import request from '@/utils/request'

// 登录的请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data // 用户数据参数 mobile code
  })
}

// 请求发送验证码, 每手机号每分钟1次
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
