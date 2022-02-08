<template>
<!--  主页面-->
  <div class="layout-container">
  <!--    子路由出口-->
  <router-view></router-view>
  <!--    /子路由出口-->
<!--    子路由跳转的Banner-->

<!--    使用 Vant tabbar 标签 进行布局 -->
<!--    route 开启路由模式 用于搭配 vue-router 使用。路由模式下会匹配页面路径和标签的 to 属性，并自动选中对应的标签。
 -->
    <van-tabbar
      route
      class="layout-tabbar">
      <van-tabbar-item to="/">
<!--        使用 slot 自定义图标 -->
        <i slot="icon" class="iconfont icon-home"></i>
        <span class="text">主页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-xinxi1"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-24gl-playSquare"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-yonghu"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 20px;
    }
    span.text {
      font-size: 10px;
    }
  }
}
</style>
