<template>
  <div class="article-container">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: false, // 控制错误列表
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null // 设置初始的时间戳为null
    }
  },
  methods: {
    // 初始化或滚动到底部的时候回触发调用 oLoad 方法
    /**
    onLoad () {
      console.log('调用onLoad')
      // 异步更新数据
      // 1. 请求获取数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 2. 把请求结果数据放到list数组中
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        // loading 关闭以后才能触发下一次的加载更多
        // 加载状态结束
        this.loading = false

        // 4. 判断数据时候全部加载完成，如果没有数据了，把finished 设置为true, 之后不再触发加载更多了
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
     */
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(), // 时间戳, 简单理解就是请求数据的页码
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        console.log(data)
        // 2. 把请求结果数据放到list数组中
        // 赋值给list
        const { results } = data.data
        this.list.push(...results) // 使用 ... 结构赋值
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据时候全部加载完成，如果没有数据了，把finished 设置为true, 之后不再触发加载更多了
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了, 将 finished 设置为 true , 不再加载更多数据
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        // console.log('请求数据失败, 稍后重试', err)
      }
    }
  }
}
</script>

<style scoped>

</style>
