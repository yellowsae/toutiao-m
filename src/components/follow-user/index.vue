<template>
<!--  关注中的组件， 封装为一个公共的组件-->
  <van-button
    @click="onFollow"
    v-if="value"
    class="follow-btn"
    round
    :loading="isFollowLoading"
    size="small"
  >已关注</van-button>
  <van-button
    v-else
    :loading="isFollowLoading"
    @click="onFollow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
  >关注</van-button>
</template>

<script>
import { addFollower, deleteFollower } from '@/api/user'

export default {
  name: 'FollowIndex',
  data () {
    return {
      isFollowLoading: false
    }
  },
  props: {
    user_id: {
      type: [Number, Object, String],
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    // 关注|取消关注
    async onFollow () {
      // 开启加载中的状态
      this.isFollowLoading = true
      try {
        // 获取关注的信息
        if (this.value) {
          // 如果关注了, 取消关注
          await deleteFollower(this.user_id)
        } else {
          // 没有关注, 执行关注操作
          await addFollower(this.user_id)
        }
        // 更新视图
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('update_follower', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast('操作失败')
      }
      // 关闭loading 状态
      this.isFollowLoading = false
    }
  }
}
</script>

<style scoped>

</style>
