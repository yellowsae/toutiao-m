/**
 * 文章的评论，接口数据
 */
// 引入请求模块
import request from '@/utils/request'

/**
 * 获取文章的评论列表
 */

export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    // 请求参数，封装为一个对象
    params
  })
}
