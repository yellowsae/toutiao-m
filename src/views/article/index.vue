<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="onClickLeft"
      title="头条">
    </van-nav-bar>
    <!-- /导航栏 -->

    <div  class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>

<!--          $event， 模板中的$event是子组件传递过来的参数
             知识点 ： 当我们在传给给子组件的数据 既要用，还要改时可以使用 v-model
                默认传递时：
                传递 ： props  ->  :is_followed="article.is_followed"
                修改 ： 自定义事件 ->  @update_follower="article.is_followed = $event"

                简写： 在组件上使用v-model
                 子组件的value为 value="article.is_followed"
                 修改 @input="article.is_followed = $event"
                 详细参考 ： https://v3.cn.vuejs.org/guide/component-custom-events.html#%E5%A4%84%E7%90%86-v-model-%E4%BF%AE%E9%A5%B0%E7%AC%A6
-->
<!--          关注用户的组件 -->
          <FollowIndex
            v-model="article.is_followed"
            :user_id="article.aut_id" />
<!--          <van-button-->
<!--            @click="onFollow"-->
<!--            v-if="article.is_followed"-->
<!--            class="follow-btn"-->
<!--            round-->
<!--            :loading="isFollowLoading"-->
<!--            size="small"-->
<!--          >已关注</van-button>-->
<!--          <van-button-->
<!--            v-else-->
<!--            :loading="isFollowLoading"-->
<!--            @click="onFollow"-->
<!--            class="follow-btn"-->
<!--            type="info"-->
<!--            color="#3296fa"-->
<!--            round-->
<!--            size="small"-->
<!--            icon="plus"-->
<!--          >关注</van-button>-->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章的评论列表   -->
        <CommentList :source="article.art_id" />
        <!-- /文章的评论列表   -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :info="totalCommentCount"
            color="#777"
          />
          <!--     收藏的组件 使用 v-model 双向数据绑定，和传递 articleId. 实现功能基本和上边的关注一样-->
          <CollectIndex
            v-model="article.is_collected"
            :articleId="articleId"
          />
<!--          点赞的组件， 同样跟收藏和关注功能一样的实现方法 -->
          <LikeIndex
          v-model="article.attitude"
          :articleId="articleId"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!--    弹出层位置    -->
        <van-popup
          v-model="isPostShow"
          position="bottom">
<!--          CommentPost 弹出层封装的组件 -->
          <CommentPost />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button
          @click="getArticles"
          class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import FollowIndex from '@/components/follow-user'
import CollectIndex from '@/components/collect'
import LikeIndex from '@/components/like-article'
// 引入文章的评论的列表
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'
export default {
  name: 'ArticleIndex',
  components: { FollowIndex, CollectIndex, LikeIndex, CommentList, CommentPost },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      errorStatus: 0, // 设置失败的状态码
      loading: true, // 加载中的loading 状态
      article: {}, // 文章详情
      totalCommentCount: 5, // 文章的评论总数
      isPostShow: false // 控制评论弹出层
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 获取文章信息
    async getArticles () {
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data // 赋值
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorStatus = 404
        }
        this.$toast('获取信息失败')
      }
      this.loading = false // 关闭加载中, 无论成功还是失败
    },
    // 点击返回上个页面
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92/2px;
    bottom: 88/2px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40/2px;
      padding: 50/2px 32/2px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32/2px;
      .avatar {
        width: 70/2px;
        height: 70/2px;
        margin-right: 17/2px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24/2px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23/2px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170/2px;
        height: 58/2px;
      }
    }

    .article-content {
      padding: 55/2px 32/2px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200/2px 32/2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200/2px 32/2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122/2px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30/2px;
      color: #666666;
      margin: 33/2px 0 46/2px;
    }
    .retry-btn {
      width: 280/2px;
      height: 70/2px;
      line-height: 70/2px;
      border: 1px solid #c3c3c3;
      font-size: 30/2px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}
</style>
