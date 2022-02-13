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
