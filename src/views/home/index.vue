<template>
  <div class="home-container">
    <!--    导航栏 -->
    <van-nav-bar class="page-nav-bar">
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
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style lang="less" scoped>
.home-container {
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
}
</style>
