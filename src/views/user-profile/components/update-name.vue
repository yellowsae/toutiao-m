<template>
  <div class="update_name_bar">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <!--  输入框 -->
    <van-field
      class="field_div"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>

</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  model: {
    prop: 'name',
    event: 'update_name'
  },
  name: 'UpdateName',
  props: {
    name: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      // 赋值
      message: this.name
    }
  },
  methods: {
    // 修改昵称
    async onClickRight () {
      // 提示loading
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止点击背景
        duration: 0 // 持续展示
      })
      try {
        const message = this.message
        if (!message.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: this.message
        })
        // 更新视图
        this.$emit('update_name', message)
        // 关闭弹层
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
.update_name_bar {
  /deep/ .field_div {
    margin-top: 20px;
    padding: 10px;
  }
}
</style>
