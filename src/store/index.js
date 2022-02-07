import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象， 存储当前登录用户信息 （token等数据）
    // user: null
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  mutations: {
    // 对 state 中的数据进行修改
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
