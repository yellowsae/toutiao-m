<template>
  <div class="home-container">
    <!--    导航栏 -->
<!--    fixed 固定定位 -->
    <van-nav-bar class="page-nav-bar" fixed>
<!--      添加按钮 -->
      <van-button
      class="search-btn"
      round
      size="small"
      type="info"
      icon="search"
      slot="title"
      >搜索
      </van-button>
    </van-nav-bar>
<!--    频道列表 -->
<!--    通过 animated 属性可以开启切换标签内容时的转场动画。
        通过 swipeable 属性可以开启滑动切换标签页。-->
    <van-tabs
      class="channel-tabs"
      v-model="active"
      swipeable
      animated>
      <van-tab
        fixed
        v-for="item of channels"
        :key="item.id"
        :title="item.name">
        <!--    文章列表 -->
        <ArticleList :channel="item" />
        <!--    /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = !isChannelEditShow">
        <i class="iconfont icon-31liebiao"></i>
      </div>
    </van-tabs>
    <!--    /频道列表 -->
<!--    频道编辑弹出层
        isChannelEditShow 是否展示弹出层
         -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      get-container="body"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
<!--      弹出层内容  my-channels 传给子组件  active 传递索引值给子组件 -->
      <ChannelEdit
        :myChannels="channels"
        @update-active="onUpdateActive"
        :active="active" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      active: 0, // 展示当前频道的索引值
      channels: [], // 导航列表
      isChannelEditShow: false // 控制导航列表是否展示
    }
  },
  computed: {
    ...mapState(['user']) // 登录的信息
  },
  created () {
    // 执行方法获取频道列表
    this.loadChannels()
  },
  methods: {
    // 执行方法获取频道列表
    async loadChannels () {
      // 定义一个数组
      // 使用数组进行操作， 最后列表存储数据赋值的数组
      // eslint-disable-next-line no-unused-vars
      let channels = []
      if (this.user) {
        // 已登录， 获取用户频道列表
        try {
          const { data } = await getUserChannels()
          channels = data.data.channels // 赋值给本地数据
        } catch (err) {
          this.$toast('获取列表失败，请重试')
        }
      } else {
        // 未登录， 获取本地存储的列表
        const localChannel = getItem('TOUTIAO_CHANNEL') // 获取本地数据
        // 本地是否有数据
        if (localChannel) {
          // 有， 就拿来直接使用
          channels = localChannel
        } else {
          // 没有，执行请求匿名接口，获取哦数据
          try {
            const { data } = await getUserChannels()
            channels = data.data.channels // 赋值给本地数据
          } catch (err) {
            this.$toast('获取列表失败，请重试')
          }
        }
      }
      // 最后赋值给 channels
      this.channels = channels
    },

    // 子组件传递的信息， 更新频道的切换信息
    onUpdateActive (index, isChannelEditShow = true) {
      // console.log('home', index)
      // 修改频道展示数据的 active
      this.active = index
      // 关闭弹出层
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 50px;
  padding-top: 87px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    font-size: 14px;
    .van-icon {
      font-size: 16px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 46px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 41px;
    }
    .van-tab {
      min-width: 100px;
      font-size: 15px;
      color: #777777;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 6px;
      width: 15px;
      height: 3px;
      background: #3296fa;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 33px;
      height: 41px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
    }
    i.iconfont {
      font-size: 16px;
    }
    .placeholder {
      width: 33px;
      height: 41px;
      flex-shrink: 0;
    }
  }
}
</style>
