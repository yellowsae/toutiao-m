/**
 * 主页搜索文章的search API
 */

// 引入请求
import request from '@/utils/request'

export const SearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果的请求
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    // 请求的参数 params 是一个对象{}
    params
  })
}
