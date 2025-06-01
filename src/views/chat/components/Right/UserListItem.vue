<template>
  <div class="box" :class="{ active:isActive}">
    <div class="left">
      <Avatar
        :info="{ name: name, avatar: avatar }"
        size="40px"
        style="margin: 0 7px;"
      />
      <div class="name">{{ name }}</div>
    </div>
    <div class="right" v-if="id !== userStore.user.userId" @click="handlePrivateChat(id)">
      私聊
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from '@/components/ChatAvatar.vue'
import { computed } from 'vue'
import { useUserStore } from '@/store/module/useUserStore';
import { useChatListStore } from '@/store/module/useChatListStore'
const userStore = useUserStore()
 const chatListStore = useChatListStore()
const props = defineProps({
  name: String,
  avatar: String,
  id: String
})
const isActive = computed(() => {
  return userStore.user.userId === props.id
})
const handlePrivateChat = (id: string) => {
  console.log(id)
  chatListStore.createChat({ targetId: id })
}
</script>
<style scoped lang="scss">
.active {
   background: linear-gradient(to right, #eef5b1, #dcedbe) !important;
}
.box {
  width: 100%;
  height: 54px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #f5f5f5;
} 
.left {
  display: flex;
  flex-direction: row;
  align-items: center;

  .name {
    color: rgb(var(--text-color));
  }
}
.right {
  display: none;
  width: 40px;
  height: 20px;
  background-color: #e7f1fe;
  margin-right: 10px;
  border-radius: 5px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: rgb(var(--text-color));
  cursor: pointer;
  &:hover {
    background-color: rgb(var(--primary-color));
    color: white;
  }
}
.box:hover .right {
  display: block; /* 鼠标悬停时显示 */
}
</style>