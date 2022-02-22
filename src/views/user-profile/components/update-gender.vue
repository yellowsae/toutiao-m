<template>
  <div class="update_user_gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    // 点击确认触发事件
    async onConfirm (value, index) {
      // loading 开启
      this.$toast.loading({
        message: '保存中...',
        duration: 0,
        forbidClick: true
      })
      // 当前值， 索引值
      try {
        await updateUserProfile({
          gender: index
        })
        // 更新视图
        this.$emit('input', index)
        // 关闭弹窗
        this.$emit('close')
        // 提示成功
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update_user_gender {
  /deep/ .van-picker__toolbar {
    .van-picker__cancel {
      color: #1989fa;
    }
    .van-picker__confirm {
      color: #1989fa;
    }
  }
}

</style>
