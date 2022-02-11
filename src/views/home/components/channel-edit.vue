<template>
  <div class="channel-edit">
<!--    我的频道布局 -->
    <van-cell :border="false" >
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        round
        type="danger"
        plain
        size="mini"
      >编辑</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear">
<!--      使用插槽插入传入过来的文本数据   使用 v-bind:class 帮定类名-->
        <span
          :class="{ active: index === active}"
          slot="text"
          class="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!--    /我的频道布局 -->

<!--    频道推荐 -->
    <van-cell>
      <div slot="title"  class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
      />
    </van-grid>
<!--    /频道推荐-->
  </div>
</template>

<script>
// 引入获取全局频道列表的方法
import { getAllChannels } from '@/api/channels'

export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [] // 所有频道
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    // 过滤出来的属性
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        const res = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // 如果不属于添加到channels
        if (!res) {
          channels.push(channel)
        }
      })
      // 将计算结果返回
      return channels
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 16px;
    color: #333333;
  }

  .edit-btn {
    width: 52px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      white-space: nowrap; // 不允许折行
      background-color: #f5f5f6;
      .van-grid-item__text, .text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 13px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 14px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
