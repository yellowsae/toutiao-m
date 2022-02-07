import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login')

Vue.use(VueRouter)

const routes = [
  // 登录页面的路由
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
