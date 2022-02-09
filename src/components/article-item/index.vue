<template>
  <!--    文章列表项-->
  <van-cell class="article-item">
    <div>这是文章列表</div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
