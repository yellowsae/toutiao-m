/**
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 请求获取文章列表数据
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    // 需要传递参数 一个对象
    params
  })
}

/**
 * 获取当前用户的文章
 */

export const getUserArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/articles',
    params
  })
}

/**
 * 根据id获取文章
 */
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
