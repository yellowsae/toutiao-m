<template>
  <div class="update-photo">
    <img :src="img" ref="img" class="img" alt="">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
// 引入图片裁切的css|js库
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null // 处理图片的数据
    }
  },
  mounted () { // 使用 mounted() 生命周期钩子，才能操作DOM
    const image = this.$refs.img
    // 赋值裁切图片得到的数据
    this.cropper = new Cropper(image, {
      // 配置，图片的裁切
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    onConfirm () {
      // 1. 将得到的参数传给后端，进行裁切
      // console.log(this.cropper.getData())
      // 2. 纯客户端的裁切 使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // 封装为一个方法
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        duration: 0,
        forbidClick: true
      })

      try {
        // 如果接口要求 Content-Type 是 application/json
        // 则传递普通的 JS 对象
        // await updateUserPhoto({
        //   photo: blob
        // })
        // 如果接口要求 Content-Type 是  multipart/form-data
        // 则必须要传入 FormData 对象
        const formData = new FormData()
        // 封装数据
        formData.append('photo', blob)

        // 发送请求
        const { data } = await updateUserPhoto(formData) // 图片不能太大
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        // 提示完成
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000009;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .confirm, .cancel {
      width: 90px;
      height: 90px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}

</style>
