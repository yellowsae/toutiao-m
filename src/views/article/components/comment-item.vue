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
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {}
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
