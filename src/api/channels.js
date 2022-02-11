/**
 * 获取全部的频道列表
 */

// 引入请求模块
import request from '@/utils/request'

// 获取列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
