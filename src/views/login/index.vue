<template>
  <div class="login-container">
<!--    导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
<!--      导航栏中的返回按钮 -->
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>

<!--    登录的表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
<!--     手机号 -->
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
<!--        Vant中使用 slot=left-icon  设置自定义图标 -->
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>

<!--      验证码 -->
      <van-field
        name="code"
        left-icon="smile-o"
        v-model="user.code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-jiesuo"></i>
<!--        插入验证码按钮-->
        <template #button>
<!--          计时  time : 倒计时时间   finish: 倒计时结束触发事件 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button  class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',

  // 数据绑定
  data () {
    return {
      // 表单获取数据
      user: {
        mobile: '13911111111', //  手机号
        code: '246810' // 验证码
      },
      // userFormRules 配置表单验证规则
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /1[3|5|7|8]\d{9}/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /\d{6}/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },

  // 方法
  methods: {
    // 登录方法
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      // 安装Vant后，会在this上绑定 $toast 提示的组件，  Toast 组件的使用
      this.$toast.loading({ // loading加载中
        message: '登录中...',
        forbidClick: true, // 禁用背景
        duration: 0 // 持续时间 默认是 2s ， 如果为0 则持续展示
      })
      // 3. 提交表单请求登录
      try {
        // 成功的逻辑
        const { data } = await login(user)
        // 将返回的token使用 Vuex 进行处理
        this.$store.commit('setUser', data.data)
        // 将获取到的token保存到本地
        window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(data.data))
        this.$toast.success('登录成功')

        // 登录成功， 跳转回原来页面
        this.$router.back()
        // this.$route.push('/my')
      } catch (err) {
        // 捕获错误
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败， 请稍后重试')
        }
      }
      // 4. 根据请求响应结果处理后续操作
    },

    // 获取验证码
    async onSendSms () {
      // 1. 校验手机号 通过在form表单设置ref，然后使用 validate() 方法可以进行数据的验证;
      // 返回的是Promise 需要 async await 进行异步处理
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        // 使用return 直接返回，之后不执行
        return console.log('验证失败', err)
      }

      // 2. 验证通过， 显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败， 关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败， 请稍后重试')
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .iconfont {
    margin-top: 3px;
  }
  .send-sms-btn {
    background-color: #ededed;
    line-height: 23px;
    height: 23px;
    width: 95px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 23px 13px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
