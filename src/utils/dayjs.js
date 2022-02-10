/**
 * dayjs 使用
 */
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 配置为全局使用
dayjs.locale('zh-cn')

// dayjs() 获取当前最新时间
console.log(dayjs().format('YYYY-MM-DD'))
