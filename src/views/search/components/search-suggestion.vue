<template>
  <div class="search-suggestion">
<!--    遍历数组展示数据 -->
    <van-cell
      v-for="(text, index) of suggestions"
      :key="index"
      :title="text"
      icon="search"></van-cell>
  </div>
</template>

<script>
import { SearchSuggestions } from '@/api/search'
// debounce 页面防抖的函数
import { debounce } from 'loadsh'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [] // 联想搜索数组的数据
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  // 使用监视属性监听 searchText
  watch: {
    searchText: {
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      // 使用 handler的完整写法 debounce配置输入时候的防抖
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true // 开始创建组件时，执行一次函数
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await SearchSuggestions(q)
        this.suggestions = data.data.options // 赋值给suggestions，显示在模板上
      } catch (err) {
        this.$toast('err')
      }
    }
  }
}
</script>

<style scoped>

</style>
