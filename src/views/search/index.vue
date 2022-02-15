<template>
<!--  在主页点击搜索 跳转到这里 search 组件-->
  <div class="search-container">
<!--    搜索栏 -->
<!--    使用van-search 组件
      search 事件在点击键盘上的搜索/回车按钮后触发，
      cancel 事件在点击搜索框右侧取消按钮时触发。
 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!--    /搜索栏 -->

<!-- 搜索的页面显示的不同，分别展示搜索组件的内容     -->
    <!--    搜索结果 v-if="isResultShow" -->
    <SearchResult
      :searchText="searchText"
      v-if="isResultShow"/>
    <!--    /搜索结果 -->

    <!--    联想建议
    :searchText="searchText" 给子组件传递数据，然后让子组件监视数据，发送数据变化时候的请求
     -->
    <SearchSuggestion
      :searchText="searchText"
      v-else-if="searchText"
      @search="onSearch"
    />
    <!--    /联想建议-->

    <!--    搜索历史， 默认展示这个组件 -->
    <SearchHistory
      @search="onSearch"
      :searchHistories="searchHistories"
      v-else/>
    <!--    /搜索历史 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
// 引入本地数据存储方法
import { getItem, setTime } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      isResultShow: false, // 处理搜索结果页面的展示
      searchText: '', // 搜索的文本
      searchHistories: getItem('search-history') || [] // 保存搜索的历史, 优先从本地存储中获取
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  // 监听搜索历史记录
  watch: {
    searchHistories (val) {
      // val 是一个数组, 数据时在onSearch中添加到 数组中的数据
      // 同步到本地存储数据, 将
      // console.log(val) // ['a', 'test', 'b', __ob__: Observer]
      setTime('search-history', val) // 在本地存储一个搜索历史的数组
    }
  },
  methods: {
    // 设置展示结果的方法
    // 在确定搜索时候触发
    onSearch (value) {
      // 获取的输入的数据后,展示在搜索框这里, 并且把输入的数据传给搜索结果组件
      this.searchText = value // 输入的内容展示到搜索框中

      // 存储搜索历史记录
      // 要求: 不要有重复的内容, 最新的排在最前面
      const index = this.searchHistories.indexOf(value)
      // 判断是否有重复的内容
      if (index !== -1) {
        // 如果有重复内容 删除数组中的数据
        this.searchHistories.splice(index, 1)
      }
      // 其他情况, 将输入的数据默认加到数组的最上方
      this.searchHistories.unshift(value)

      this.isResultShow = true // 展示搜索的结果
    },
    onCancel () {
      // 取消按钮
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 54px;
  .search-form {
    // 顶部的搜索框固定定位
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}

</style>
