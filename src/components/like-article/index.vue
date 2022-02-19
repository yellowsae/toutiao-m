<template>
<!--  共享点赞的组件-->
  <van-icon
    v-if="value !== 1"
    name="good-job-o"
    :loading="loading"
    @click="onCollect"/>
  <van-icon
    v-else
    :loading="loading"
    @click="onCollect"
    color="#e5645f"
    name="good-job"/>
</template>

<script>
// 引入点赞和取消点赞的方法
import { addLiking, deleteLiking } from '@/api/article'
export default {
  name: 'LikeIndex',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        // 定义一个参数，用于给父组件传递参数更改视图
        let status = -1
        if (this.value === 1) { // 1
          // 如果是已点赞的情况， 取消点赞
          await deleteLiking(this.articleId)
        } else {
          // 如果没有点赞，则进行点赞操作
          await addLiking(this.articleId)
          status = 1
        }
        // 更新模板的视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('错误')
      }
      // 取消loading
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
