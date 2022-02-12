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
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        @click="onMyChannelClick(channel, index)"
        v-for="(channel, index) in myChannels"
        :key="index"
        >
<!--        使用插槽控制icon 图标的的显示
            !fiexChannels.includes(channel.id) 查找相同的固定id，不展示icon
 -->
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
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
        @click="onAddChannel(channel)"
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
      isEdit: false, // 控制编辑的icon 图标显示
      fiexdChannels: [0], // 固定频道
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
    // 计算属性会观测内部依赖数据的变化 如果依赖的数据发生变化， 则计算属性会重新执行
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
    // 获取弹出层中的所有数据
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    },

    // 点击添加属性频道属性到上边
    onAddChannel (channel) {
      // 添加数据到频道列表中
      this.myChannels.push(channel)
    },

    // 点击我的频道 属性事件
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道展示，不给删除
        if (this.fiexdChannels.includes(index)) {
          return
        }
        // 判断编辑状态， 执行删除频道
        // 思路根据在删除状态下的索引index
        // 1. 如果是固定频道则不删除
        // 2. 删除频道选项
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }
        // 3. 如果删除的激活频道之前的频道，则更新激活的频道项
        this.myChannels.splice(index, 1)
      } else {
        // 非编辑状态， 执行切换频道
        // 使用 $emit() 发布事件 让父组件修改数据, 传输index 点击数据的索引值
        this.$emit('update-active', index, false)
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
      .van-grid-item__icon-wrapper {
        position: unset;
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
