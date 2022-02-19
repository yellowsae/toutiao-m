<template>
  <div class="search-result">
<!--    搜索结果
  focus: 获得焦点时触发
-->
    <van-list
      v-model="loading"
      show-action
      :error.sync="error"
      error-text="数据加载失败"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
<!--      绑定点击事件，点击跳转到文章组件 -->
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :to="{
          // 根据路由名称进行跳转
          name: 'article',
          params: {
            articleId: item.art_id
          }
        }"
      />
    </van-list>
  </div>
</template>

<script>
// 引入搜索的接口模块
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false, // 加载数据的状态
      page: 1, // 请求参数, 页码
      perPage: 20, // 请求参数的结果的页数
      error: false
    }
  },
  methods: {
    // 加载搜索出来的数据
    async onLoad () {
      try {
        //  发送请求
        // 1. 请求数据
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 查询关键词
        })
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 3. 将本次加载中的 loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          // 如果还有 更新获取下一个数据的页面
          this.page++
        } else {
          // 如果没有, 则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('数据加载失败, 请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
