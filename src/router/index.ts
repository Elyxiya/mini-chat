import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/module/useUserStore'
import { useChatListStore } from '@/store/module/useChatListStore'
import ws from '@/utils/ws'
import { GET_TOKEN,GET_USER } from '@/utils/token'
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

router.beforeEach(async(to, from, next) => {
  let token = GET_TOKEN()
  let user = GET_USER()
  const userStore = useUserStore()
  const chatListStore = useChatListStore()
  if (token) {
    ws.connect(token)
    userStore.setToken(token)
    userStore.setUser(JSON.parse(user as string))
    await Promise.all([
      userStore.getUserMap(),
      chatListStore.setGroup(),
      chatListStore.setPrivate()
    ]);
    chatListStore.setCurrentChat(chatListStore.groupList)
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








