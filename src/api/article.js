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

/**
 * 收藏文章
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    // 参数
    data: {
      target
    }
  })
}
/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

/**
 * 对文章的点赞
 */

export const addLiking = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    // 参数 文章的ID
    data: {
      target
    }
  })
}

/**
 * 取消对文章的点赞
 */
export const deleteLiking = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}
