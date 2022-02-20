<template>
<!--        :src="https://img.yzcdn.cn/vant/cat.jpeg"-->
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o' "
        :loging="commentLoading"
        @click="onCommentLike"
      >{{ comment.like_count  ||  '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
<!--        时间， 使用过滤器 -->
        <span class="comment-pubdate"> {{ comment.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
        >回复 {{ comment.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
// 引入方法
// import { addLiking, deleteLiking} from '@/api/article'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commentLoading: false // 控制点赞的 loading
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 点赞的方法
    async onCommentLike () {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          // 已经点赞， 取消点赞
          // await deleteLiking(this.comment.com_id)
          // 将模拟的数据取消点赞
          this.comment.like_count++
          this.comment.is_liking = false
        } else {
          // 点赞
          // await addLiking(this.comment.com_id) // 发送请求的数据
          this.comment.like_count++
          this.comment.is_liking = true
        }
        // 数据取反
      } catch (err) {
        this.$toast('操作失败')
      }
      this.commentLoading = true
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 25/2px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26/2px;
    }
  }
  .comment-content {
    font-size: 32/2px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19/2px;
    color: #222;
    margin-right: 25/2px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135/2px;
    height: 48/2px;
    line-height: 48/2px;
    font-size: 21/2px;
    color: #222;
  }
  .like-btn {
    height: 30/2px;
    padding: 0;
    border: none;
    font-size: 19/2px;
    line-height: 30/2px;
    margin-right: 7/2px;
    .van-icon {
      font-size: 30/2px;
    }
  }
}
</style>
