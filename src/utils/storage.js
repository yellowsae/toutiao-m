/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
export const setTime = (key, value) => {
  // 将数组、对象类型的数据转换为 JSON 格式的字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // 写入本地存储
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // 将字符串转为JSON数据
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除数据
 */
