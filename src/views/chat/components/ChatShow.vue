<template>
  <div class="chat-show-area" ref="chatShowAreaRef">
    <div
      v-for="item in msgRecord"
      class="msg-item"
      :key="item.id"
      :class="{ right: item.fromId === userId }"
    >
      <linyu-msg :msg="item" :user="userListMap.get(item.fromId)" />
    </div>
    <chat-skeleton v-if="isChatRecordLoading && msgRecord?.length <= 0 && !isComplete" />
    <div v-if="isSendLoading" class="flex w-full justify-center items-center">
      <linyu-loading label="发送中" />
    </div>
    <div v-if="currentNewMsgCount > 0" class="new-msg-count" @click="scrollToBottom">
      <img alt="" class="h-[18px] mr-[5px]" src="/down.png" />
      {{ currentNewMsgCount }} 条新消息
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, defineProps, defineEmits } from 'vue'
import LinyuMsg from '@/components/Msg/LinyuMsg.vue'
import ChatSkeleton from '@/components/ChatSkeleton.vue'
import LinyuLoading from '@/components/LinyuLoading.vue'

// 定义消息类型
interface Message {
  id: string | number;
  fromId: string;
}

// 定义用户信息类型
interface User {
  id: string | number;
  name: string;
}

// 定义 props 类型
const props = defineProps<{
  msgRecord: Message[];
  userId: string;
  userListMap: Map<string | number, User>;
  isChatRecordLoading: boolean;
  isComplete: boolean;
  isSendLoading: boolean;
  currentNewMsgCount: number;
}>()

// 定义 emits 类型
const emits = defineEmits<{
  (event: 'scrollToBottom'): void;
  (event: 'scrollToTop'): void;
}>()

const chatShowAreaRef = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  if (chatShowAreaRef.value) {
    nextTick(() => (chatShowAreaRef.value!.scrollTop = chatShowAreaRef.value!.scrollHeight))
  }
}

const handleScroll = () => {
  if (chatShowAreaRef.value) {
    const { scrollTop, clientHeight, scrollHeight } = chatShowAreaRef.value
    const isBottom = scrollTop + clientHeight >= scrollHeight - 1
    if (isBottom) {
      emits('scrollToBottom')
    }
    if (scrollTop === 0) {
      emits('scrollToTop')
    }
  }
}

onMounted(() => {
  if (chatShowAreaRef.value) {
    chatShowAreaRef.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (chatShowAreaRef.value) {
    chatShowAreaRef.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.chat-show-area {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.msg-item {
  display: flex;
}

.new-msg-count {
  position: fixed;
  right: 15px;
  bottom: 80px;
  padding: 4px 15px;
  border-radius: 20px;
  background-color: rgba(var(--background-color), 0.8);
  backdrop-filter: blur(10px);
  color: rgba(var(--primary-color));
  font-size: 14px;
  user-select: none;
  border: rgba(var(--background-color)) 2px solid;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>    