import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MessageRecord, SendMessageParams } from '@/types/message'
import { send } from '@/api/message'

export const useChatMsgStore = defineStore('message', () => {
    // 当前聊天对象的ID
    const targetId = ref('1')
    // 消息列表
    const messages = ref<MessageRecord[]>([])
    // 加载状态
    const loading = ref(false)
    // 聊天名称
    const chatName = ref('')
    // 消息来源（如：'group'或'user'）
    const source = ref('')

    // 计算属性：获取最新消息
    const latestMessage = computed(() => {
        if (messages.value.length === 0) return null
        return messages.value[messages.value.length - 1]
    })

    /**
     * 发送消息
     * @param message - 要发送的消息参数
     */
    async function sendMessage(message: SendMessageParams) {
        const res = await send(message)
        if (res.code === 0) {
            messages.value.push(res.data)
        }
    }

    /**
     * 设置当前聊天对象ID
     * @param id - 聊天对象ID
     */
    function setTargetId(id: string) {
        targetId.value = id
    }

    /**
     * 设置聊天名称
     * @param name - 聊天名称
     */
    function setChatName(name: string) {
        chatName.value = name
    }

    /**
     * 获取聊天名称
     * @param id - 聊天对象ID（当前未使用）
     * @returns 聊天名称
     */
    function getChatName(id: string) {
        return chatName.value
    }

    /**
     * 设置消息列表（会自动按时间排序）
     * @param list - 消息列表
     */
    function setMessages(list: MessageRecord[]) {
        messages.value = list.sort((a, b) =>
            new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
        )
    }

    /**
     * 添加单条消息到消息列表末尾
     * @param message - 要添加的消息
     */
    function addMessage(message: MessageRecord) {
        messages.value.push(message)
    }

    /**
     * 追加单条消息到消息列表末尾（与addMessage功能相同）
     * @param message - 要追加的消息
     */
    function appendMessage(message: MessageRecord) {
        messages.value.push(message)
    }

    /**
     * 在消息列表前面插入多条消息（通常用于加载历史消息）
     * @param list - 要插入的消息列表
     */
    function prependMessages(list: MessageRecord[]) {
        const sortedList = list.sort((a, b) =>
            new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
        )
        messages.value = [...sortedList, ...messages.value]
    }

    /**
     * 清空消息列表并重置相关状态
     */
    function clearMessages() {
        messages.value = []
        targetId.value = ''
        source.value = ''
    }

    /**
     * 获取消息的文本内容
     * @param message - 消息对象
     * @returns 消息的文本表示
     */
    function getMessageText(message: MessageRecord): string {
        if (!message) return ''

        // 表情消息返回固定文本
        if (message.type === 'emoji') return '[表情]'

        // 处理消息内容为数组的情况（如包含文本和@的混合内容）
        if (Array.isArray(message.message)) {
            return message.message.map(item  => {
                if (item.type === 'text') return item.content
                if (item.type === 'at') {
                    try {
                        return '@' + JSON.parse(item.content).name
                    } catch {
                        return '@用户'
                    }
                }
                return ''
            }).join('')
        }

        // 处理消息内容为字符串的情况
        if (typeof message.message === 'string') {
            try {
                const messageArr = JSON.parse(message.message)
                if (Array.isArray(messageArr)) {
                    return messageArr.map(item => item.content || '').join('')
                }
                return message.message
            } catch {
                return message.message
            }
        }

        return ''
    }

    return {
        targetId,
        messages,
        loading,
        latestMessage,
        chatName,
        source,
        setTargetId,
        setChatName,
        getChatName,
        setMessages,
        addMessage,
        appendMessage,
        prependMessages,
        clearMessages,
        getMessageText,
        sendMessage,
    }
})