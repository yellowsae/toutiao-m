<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list></template>

<script>
// 引入请求获取评论的方法
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false, // 显示数据正在加载中
      finished: false, // 控制数据加载完成
      offset: null, // 获取下一页数据的时间戳
      limit: 10 // 评论大小的数量，每页10条
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          type: 'a',
          // 源id，文章id或评论id
          source: this.source,
          // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          offset: this.offset, // 页码，时间戳
          // 获取的评论数据个数
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data
        this.list = results
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
      // 2. 将数据添加到list
      // 3. 关闭loading
      // 4. 判断是否还有数据  ?  更新数据获取下一页的页面  : 将finished设置为结束
    }
  }
}
</script>

<style scoped>

</style>
