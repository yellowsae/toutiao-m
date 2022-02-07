import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '@/utils/storage'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象， 存储当前登录用户信息 （token等数据）
    // user: null
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
    // 使用封装方法获取数据
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    // 对 state 中的数据进行修改
    setUser (state, data) {
      state.user = data
      // 使用封装方法 ----- 这个方法不行
      // setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
