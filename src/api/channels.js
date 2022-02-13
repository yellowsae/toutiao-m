/**
 * 获取全部的频道列表
 */

// 引入请求模块
import request from '@/utils/request'

// 获取所有列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 * 添加用户频道
 */
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    // 请求所带的参数
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户指定频道
 */

export const deleteChannel = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
