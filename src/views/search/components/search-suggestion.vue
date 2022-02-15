<template>
  <div class="search-suggestion">
<!--    遍历数组展示数据 -->
<!--    @click="$emit('search', text)" 绑定点击事件 给父级组件传递数据, 并展示在搜索结果里面
 -->
    <van-cell
      v-for="(text, index) of suggestions"
      :key="index"
      @click="$emit('search', text)"
      icon="search">
<!--      实现输入数据时候 文本的高亮 -->
<!--      使用 slot 插槽的方式, 并使用v-html设置文本高亮的函数 -->
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
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
    // 父级组件传过来的内容, 搜索框输入的数据 searchText
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
    // 请求获取搜索联想数据的方法
    async loadSearchSuggestions (q) {
      try {
        const { data } = await SearchSuggestions(q)
        this.suggestions = data.data.options // 赋值给suggestions，显示在模板上
      } catch (err) {
        this.$toast('err')
      }
    },

    // 设置文本高亮的方法
    highlight (text) {
      // v-html指定的函数要有返回值
      // 使用正则表达式匹配选定文本
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #5babfb;
  }
}
</style>
