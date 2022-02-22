<template>
  <div class="user-profile">
    <!--    导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
    ></van-nav-bar>
    <!--    /导航栏 -->

    <!-- 选中文件弹窗层  -->
    <input hidden ref="file" type="file" @change="onFileChange">
    <!--    个人信息-->
    <van-cell title="头像" is-link center @click="$refs.file.click()" >
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user_profile.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user_profile.name"
      is-link
      @click="isUpdateNameShow = true" />
    <van-cell
      title="性别"
      :value="user_profile.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true" />
    <van-cell
      @click="isUpdateBirthdayShow = true"
      title="生日"
      :value="user_profile.birthday"
      is-link />
    <!--   / 个人信息-->

    <!--    编辑昵称 -->
    <van-popup
      style="height: 100%"
      position="bottom"
      v-model="isUpdateNameShow">
      <!--  内容封装为组件
         数据既要用又要改， 使用 v-model 绑定数据-->
      <UpdateName
        v-model="user_profile.name"
        @close="isUpdateNameShow = false" />
    </van-popup>
    <!--    /编辑昵称 -->

    <!--    编辑性别 -->
    <van-popup
      position="bottom"
      v-model="isUpdateGenderShow">
      <UpdateGender
        v-if="isUpdateGenderShow"
        v-model="user_profile.gender"
        @close="isUpdateGenderShow = false"/>
    </van-popup>
    <!--    /编辑性别 -->

    <!--  编辑生日   -->
    <van-popup
      position="bottom"
      v-model="isUpdateBirthdayShow">
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="user_profile.birthday"/>
    </van-popup>
    <!--  /编辑生日   -->

    <!--  编辑头像   -->
    <van-popup
      position="bottom"
      style="height: 100%"
      v-model="isUpdatePhotoShow">
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        @close="isUpdatePhotoShow = false"
        @update-photo="user_profile.photo = $event"
        :img="img" />
    </van-popup>
    <!--  /编辑头像   -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user_profile: {}, // 用户信息对象
      isUpdateNameShow: false, // 控制修改昵称的弹出层
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadedUserProfile()
  },
  methods: {
    // 请求获取用户的个人资料
    async loadedUserProfile () {
      const { data } = await getUserProfile()
      this.user_profile = data.data
    },

    // onFileChange 获取图片
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // file-input 如果选了同一个文件不会触发change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 30px;
    height: 30px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
