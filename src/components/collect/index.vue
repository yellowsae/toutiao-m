<template>
  <van-icon
    v-if="!is_collected"
    color="#777"
    @click="onCollect"
    name="star-o"
  />
  <van-icon
    v-else
    @click="onCollect"
    name="star"
    color="yellow" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'

export default {
  // 自定的prop和自定义事件
  model: {
    prop: 'is_collected',
    event: 'update_collected'
  },
  props: {
    // 文章是否被收藏
    is_collected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  name: 'CollectIndex',
  methods: {
    // 设置点击收藏
    async onCollect () {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示toast
        message: '操作中...',
        forbidClick: true // 是否禁止点击背景
      })

      // 实现文章收藏的逻辑
      try {
        // is_collected 确定文章是否被收藏
        if (this.is_collected) {
          // 取消收藏
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          // 收藏文章
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        // 设置判断收藏的取反
        // this.article.is_collected = !this.article.is_collected
        this.$emit('update_collected', !this.is_collected)
      } catch (err) {
        this.$toast.fail('操作失败, 请稍后重试')
      }
    }
  }
}
</script>

<style scoped>

</style>
