import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/home', // 默认子路由，只能有1个
        name: 'home',
        component: () => import('@/views/home')
      },
      /* {
        path: '/quan',
        name: 'quan',
        component: () => import('@/views/quan')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      }, */
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path:'/search',
    name:'search',
    component:() => import('../views/search/search.vue')
  },
  {
    path:'/article/:articleId',
    name:'article',
    component:() => import('../views/article'),
    props:true
  },
  {
    path:'/userInfo',
    name:'userinfo',
    component:() => import('../views/user-profile/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
