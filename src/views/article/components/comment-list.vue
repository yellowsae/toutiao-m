<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败，请点击重试"
  >
<!--    封装每一条评论为一个组件，并循环创建-->
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
    />
  </van-list>
</template>

<script>
// 引入请求获取评论的方法
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      // list: [],
      list: [
        {
          com_id: 123,
          aut_id: 1,
          aut_name: 'lucky',
          content: 'hello',
          pubdate: '2020-04-12',
          is_top: 0,
          is_liking: false,
          reply_count: 1,
          like_count: 0,
          aut_photo: 'http://toutiao-img.itheima.net/FtWmO52inle3qYrlOHxGrT1DyfhD'
        },
        {
          com_id: 123,
          aut_id: 1,
          aut_name: 'lucky',
          content: 'hello',
          pubdate: '2020-04-12',
          is_top: 0,
          is_liking: false,
          reply_count: 1,
          like_count: 0,
          aut_photo: 'http://toutiao-img.itheima.net/FtWmO52inle3qYrlOHxGrT1DyfhD'
        },
        {
          com_id: 123,
          aut_id: 1,
          aut_name: 'lucky',
          content: 'hello',
          pubdate: '2020-04-12',
          is_top: 0,
          is_liking: false,
          reply_count: 1,
          like_count: 0,
          aut_photo: 'http://toutiao-img.itheima.net/FtWmO52inle3qYrlOHxGrT1DyfhD'
        },
        {
          com_id: 123,
          aut_id: 1,
          aut_name: 'lucky',
          content: 'hello',
          pubdate: '2020-04-12',
          is_top: 0,
          is_liking: false,
          reply_count: 1,
          like_count: 0,
          aut_photo: 'http://toutiao-img.itheima.net/FtWmO52inle3qYrlOHxGrT1DyfhD'
        },
        {
          com_id: 123,
          aut_id: 1,
          aut_name: 'lucky',
          content: 'hello',
          pubdate: '2020-04-12',
          is_top: 0,
          is_liking: false,
          reply_count: 1,
          like_count: 0,
          aut_photo: 'http://toutiao-img.itheima.net/FtWmO52inle3qYrlOHxGrT1DyfhD'
        }
      ], // 模拟的评论数据
      loading: false, // 显示数据正在加载中
      finished: false, // 控制数据加载完成
      error: false, // 设置数据加载失败的提示
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

        // 2. 将数据添加到list
        const { results } = data.data
        // this.list.push(...results)

        // 3. 关闭loading
        this.loading = false

        // 4. 判断是否还有数据  ?  更新数据获取下一页的页面  : 将finished设置为结束
        if (results.length) {
          // 更新页码，获取数据
          this.offset = data.data.list_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
