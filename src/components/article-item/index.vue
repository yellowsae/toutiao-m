<template>
  <!--    文章列表项-->
  <van-cell class="article-item" >
<!--    使用插槽的方式进行数据的展示-->
    <div slot="title"  class="title van-multi-ellipsis--l2">{{article.title}}</div>
<!--    使用插槽 文章底部内容信息-->
    <div slot="label">
<!--      当封面图为3的时候，这里展示 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          v-for="(img, index) in article.cover.images"
          :key="index"
          class="cover-item">
<!--          多图片显示 -->
          <van-image
            class="cover-img-item"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
<!--      底部信息 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
<!--    文章右边的插槽，插入一张图片信息 -->
<!--      插入图片 -->
      <van-image
        v-if="article.cover.type === 1"
        class="right-cover"
        slot="default"
        fit="cover"
        :src="article.cover.images[0]"
      />
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

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 13px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .label-info-wrap span {
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img-item {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>
