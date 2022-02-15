<template>
  <div class="search-history">
    <van-cell title="历史记录">
<!--      使用 v-if 展示 -->
      <template v-if="isDeleteShow">
        <span @click="searchHistories = []">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>
<!--    循环展示历史记录 -->
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onHistoryClick(item, index)"
    >
<!--     展示删除的 icon
        @click="searchHistories.splice(index, 1)" 点击删除数组元素
-->
      <van-icon
        v-show="isDeleteShow"
        @click="searchHistories.splice(index, 1)"
        name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      // 控制删除元素的显示状态
      isDeleteShow: false
    }
  },
  methods: {
    // 点击历史记录文本的操作
    onHistoryClick (item, index) {
      // 判断是否是删除状态
      if (this.isDeleteShow) {
        // 为真 删除数据
        this.searchHistories.splice(index, 1)
      } else {
        // 执行搜索查找数据方法
        // 展示搜索的结果
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped>

</style>
