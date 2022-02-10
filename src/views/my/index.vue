<template>
  <div class="my-container">
    <!--    已经登录展示的 header -->
    <div v-if="user" class="header user-info">
      <!--      展示的用户信息-->
      <!--      基础信息-->
      <div class="base-info">
        <!--        左边头像信息-->
        <div class="left">
          <van-image
            fit="cover"
            class="avatar"
            round
            :src="userInfo.photo"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <!--        右边编辑资料 -->
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <!--      数据信息-->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
<!--    not-login 没有登录展示的 header -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
<!--    导航 -->
    <van-grid  class='grid-nav' :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-dengdai"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
<!--   消息通知 | 小智同学 -->
    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学"  is-link/>
    <van-cell
      v-if="user"
      @click="onLogout"
      class="logout-cell"
      clickable
      title="退出登录"  />
  </div>
</template>

<script>
// 使用 Vuex 中方法获取数据
import { mapState } from 'vuex'
import { removeItem } from '@/utils/storage'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 如果用户登录了， 则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录的方法
    onLogout () {
      // 退出提示 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // 确认退出： 清除登录状态 （Vuex中的user +  本地存储中的 token ）
          // 将 Vuex 中的 store.user = null
          this.$store.commit('setUser', null)
          removeItem('TOUTIAO_USER')
        })
        .catch((not) => {
        })
    },

    // 获取用户自己信息的方法
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // 保存数据
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败， 请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 180px;
    /* 在CSS中要使用@符号简化路径， 使用 ~@ 才不会报错 */
  background: url('~@/assets/banner.png');
  background-size: cover;
  }
  /* 没有登录的页面布局 */
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 66px;
        height: 66px;
        margin-bottom: 7px;
      }
      .text {
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .user-info {
    /* 用户基础信息展示 */
    .base-info {
      height: 115px;
      padding: 38px 16px 11px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 66px;
          height: 66px;
          margin-right: 12px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 15px;
          color: #fff;
        }
      }
    }
    /* 数据展示样式 */
    .data-stats {
      display: flex;
      .data-item {
        height: 65px;
        flex: 1;
        /*  水平居中的布局  */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 20px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
  }

  /* 导航栏样式 */
  .grid-nav {
    .grid-item {
      height: 70px;
      i.iconfont {
        font-size: 23px;
      }
      .icon-shoucang {
        color: #eb5357;
      }
      .icon-dengdai {
        color: #ff9d1d;
      }
      span.text {
        font-size: 14px;
      }
    }
  }

  /* my组件数据展示底部的布局 */
  .mb-9 {

  }
  .logout-cell {
    margin-top: 10px;
    text-align: center;
    color: #c95050;
  }
}
</style>
