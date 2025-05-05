import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/module/useUserStore'
import ws from '@/utils/ws'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/index.vue'),
    },
    {
      path: '/',
      name: 'chat',
      component: ()=>import('@/views/chat/index.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('x-token')
  let user = window.localStorage.getItem('user')
  const userStore = useUserStore()
  if (token) {
    ws.connect(token)
    userStore.setToken(token)
    userStore.setUser(JSON.parse(user as string))
  }
  if (!token && to.path !== '/login') {
    next({ path: '/login' })
    return
  }
  if ((token && to.path === '/login') || !to.matched.length) {
    next({ path: '/' })
    return
  }
  next()
})

export default router








