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
      handler (value) {
        this.loadSearchSuggestions(value)
      },
      immediate: true // 开始创建组件时，执行一次函数
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await SearchSuggestions(q)
        this.suggestions = data.data.options
        console.log(data)
      } catch (err) {
        this.$toast('err')
      }
    }
  }
}
</script>

<style scoped>

</style>
