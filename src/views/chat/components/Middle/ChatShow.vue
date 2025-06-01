<template>
  <div class="chat-show-area" ref="chatShowAreaRef"  @scroll="handleScroll">
    <div v-if="msgStore.loading" class="loading-indicator">
      <ChatLoading label="加载中..." />
    </div>
    
    <div v-for="item in msgStore.messages" 
         class="msg-item" 
         :key="item.id" 
         :class="{ 'right': item.fromId === userStore.user.userId }">
      <ChatMsg :msg="item" :user="userStore.userMap.get(item.fromId)" />
    </div>
    
    <ChatSkeleton v-if="isInitialLoad && msgStore.messages.length <= 0" />
    
    <div v-if="isSendLoading" class="send-loading">
      <ChatLoading label="发送中" />
    </div>
    
          <div 
           v-if="currentNewMsgCount > 0" 
           class="new-msg-count" 
           @click="scrollToBottom()"
           :title="`有${currentNewMsgCount}条新消息`">
           <span class="icon-down"></span>
           {{ currentNewMsgCount }} 条新消息
         </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';


// 组件
import ChatMsg from '@/components/Msg/ChatMsg.vue';
import ChatSkeleton from '@/components/ChatSkeleton.vue';
import ChatLoading from '@/components/ChatLoading.vue';
import { useUserStore } from '@/store/module/useUserStore';
import { useChatMsgStore } from '@/store/module/useChatMsgStore';
import { ElMessage } from 'element-plus';


const userStore = useUserStore();
const msgStore = useChatMsgStore();

// 获取消息记录
const fetchMessages = async () => {
    if (!msgStore.targetId) return

    try {
        msgStore.loading = true
        currentPage.value = 0
        hasMore.value = true
        const params: RecordParams = {
            index: 0,
            num: 30,
            targetId: msgStore.targetId
        }
        const res = await record(params)
        if (res.code === 0) {
            msgStore.setMessages(res.data)
            await scrollToBottom(false)
        } else {
            ElMessage.error(res.msg || '获取消息记录失败')
        }
    } catch (error: any) {
        ElMessage.error(error.message || '获取消息记录失败')
    } finally {
        msgStore.loading = false
    }
}
// 处理滚动事件
const handleScroll = async () => {
    if (!messageList.value || isLoadingMore.value || !hasMore.value) return

    const { scrollTop } = messageList.value
    // 当滚动到顶部时加载更多消息
    if (scrollTop < 50) {
        isLoadingMore.value = true
        const oldHeight = messageList.value.scrollHeight
        await loadMoreMessages()
        // 保持滚动位置
        await nextTick()
        if (messageList.value) {
            const newHeight = messageList.value.scrollHeight
            messageList.value.scrollTop = newHeight - oldHeight
        }
        isLoadingMore.value = false
    }
}
// 滚动到底部
const scrollToBottom = async (smooth = true) => {
    await nextTick()
    requestAnimationFrame(() => {
        if (messageList.value) {
            const scrollHeight = messageList.value.scrollHeight
            messageList.value.scrollTop = scrollHeight

            // 双重检查确保滚动到底部
            setTimeout(() => {
                if (messageList.value) {
                    messageList.value.scrollTop = messageList.value.scrollHeight
                }
            }, 100)
        }
    })
}

// 监听targetId变化
watch(() => msgStore.targetId, (newId) => {
    if (msgStore.targetId === '') msgStore.clearMessages()
    if (newId) {
        fetchMessages()
    }
})
</script>

<style scoped>
.chat-show-area {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;
}

.msg-item {
  display: flex;
  margin-bottom: 12px;
}

.msg-item.right {
  justify-content: flex-end;
}

.loading-indicator,
.send-loading {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.new-msg-count {
  position: fixed;
  right: 20px;
  bottom: 90px;
  padding: 6px 16px;
  border-radius: 20px;
  background-color: var(--bg-color-secondary);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--primary-color);
  font-size: 14px;
  user-select: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.new-msg-count:hover {
  background-color: var(--bg-color-tertiary);
  transform: translateY(-2px);
}

.icon-down {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  background-image: url('/down.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* 优化滚动条样式 */
.chat-show-area::-webkit-scrollbar {
  width: 6px;
}

.chat-show-area::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color);
  border-radius: 3px;
}

.chat-show-area::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>