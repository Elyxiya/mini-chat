<template>
  <div class="top-title">
    {{ title }}
    <p v-if="isGroup">({{ nums }})</p>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useChatListStore } from '@/store/module/useChatListStore'
import { useUserStore } from '@/store/module/useUserStore'
const userStore = useUserStore()
const chatListStore = useChatListStore()
const title = computed(() => {
  const chat = chatListStore.currentChat
  return chat?.targetInfo?.name || ''
})
const isGroup = computed(() => {
  const chat = chatListStore.currentChat
  return chat?.type === 'group'
})
const nums = computed(() => {
  const obj = userStore.userMap
  return  Object.keys(obj).length
})
</script>
<style scoped>
.top-title { 
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 60px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color:  rgb(var(--text-color));
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans
}
.top-title p { 
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color:  rgb(var(--text-color));
  -webkit-font-smoothing: antialiased;

}
</style>