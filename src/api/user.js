/**
 * 用户相关模块
 */

// 引入请求方法 axiox
import request from '@/utils/request'
// import store from '@/store'

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

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 关注用户
 */

export const addFollower = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    // 参数 用户的ID
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollower = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户个人资料
 */
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

/**
 * 修改用户个人资料
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    // 参数， 改谁就传递谁的参数
    data
  })
}

/**
 * 更新用户的头像
 */
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
