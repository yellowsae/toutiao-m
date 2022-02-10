/**
 * dayjs 使用
 */
import dayjs from 'dayjs'
import Vue from 'vue'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置为全局使用
dayjs.locale('zh-cn')

// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// 定义一个全局过滤器，就可以在任何模板中使用
Vue.filter('relativeTime', value => {
  // 返回依据数据的时间
  return dayjs().to(dayjs(value))
})
