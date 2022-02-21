<template>
  <div class="post-comment">
<!--    评论文章的组件 -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onClick"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
// 引入方法
import { addComment } from '@/api/comment'

export default {
  name: 'CommentPost',
  props: {
    target: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const { data } = await addComment({
          // target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          target: this.target,
          content: this.message, // 评论内容
          art_id: null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // 关闭弹出层
        // 将发布内容显示到列表顶部
        // 清空文本框
        this.message = ''
        // 将以上内容到付父组件中完成
        this.$emit('post-success', data.data)
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
  .post-btn {
    font-size: 13px;
    width: 80px;
    color: #6db4fb;
    border: none;
    margin-bottom: 15px;
    text-align: center;
  }
}
</style>
