import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Qa = () => import('@/views/qa')
const Video = () => import('@/views/video')
const My = () => import('@/views/my')
const Search = () => import('@/views/search')

Vue.use(VueRouter)

const routes = [
  // 登录页面的路由
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 主页面
  {
    path: '/',
    // name: 'Layout', // 如果父路由有默认子路由，那它的 name 没有意义
    component: Layout,
    children: [
    //  设置子路由
      {
        path: '', // path 不设置路径， 默认组页面展示这个， 一个路由自能设置一个
        name: 'home',
        component: Home
      },
      {
        path: '/qa',
        name: 'qa',
        component: Qa
      },
      {
        path: '/video',
        name: 'video',
        component: Video
      },
      {
        path: '/my',
        name: 'my',
        component: My
      }
    ]
  },

  // 搜索页面
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
