<template>
  <div class="update_birthday">
<!--    时间选择器 -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      // value 得到的时间
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: true
      })

      try {
        // 对日期进行处理
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        // console.log(currentDate) YYYY-MM-DD
        await updateUserProfile({
          birthday: currentDate
        })
        // 更新视图
        this.$emit('input', currentDate)
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
.update_birthday {
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
