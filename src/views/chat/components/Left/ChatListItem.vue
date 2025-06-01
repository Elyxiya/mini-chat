<template>
  <div :class="{active:isActive}" class="box" @click="handlShow(id)">
    <div class="left">
      <Avatar
      :info="{ name: name, avatar: avatar }"
      size="45px"
      style="margin: 0 7px;"
    />
    <div class="rl" >
      <div class="name">{{ name }}</div>
      <div class="message" v-if="lastname">{{ contentValue }}</div>
    </div>
    </div>
    <div class="right" v-if="type !== 'group' && isActive" @click="handleDelete(id)">
      移除
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import Avatar from '@/components/ChatAvatar.vue'
import { useChatListStore } from '@/store/module/useChatListStore'
const chatListStore = useChatListStore()
const props = defineProps<{
  id: string;
  targetId: string;
  name: string;
  avatar: string | null;
  lastname: string | null;
  message: string | null;
  type: string;
}>()
const isActive = computed(() => {
  return props.id === chatListStore.currentChat.id
})
 const handleDelete = (id: string) => {
  console.log(id)
  chatListStore.deleteChat(id,props.targetId)
}

const handlShow = (id:string) => {
  console.log(id)
  const chat = [...chatListStore.privateList].find(item => item.id === id) || chatListStore.groupList;
  chatListStore.setCurrentChat(chat)
}
// 使用 ref 来存储解析后的数据
const parsedData = ref([])
const contentValue = computed(() => {
  if (props.type !== 'group') return parsedData.value[0]?.content || '无内容'
  if (!props.lastname) return ''
  if (parsedData.value.length === 0) return '无消息内容'
  return `${props.lastname}:${parsedData.value[0]?.content || '无内容'}`
})

// 安全解析 JSON 的函数
const safeParseJson = (jsonString: string | null) => {
  if (!jsonString) return []
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('JSON 解析错误:', error)
    return []
  }
}

// 组件挂载后解析数据
onMounted(() => {
  parsedData.value = safeParseJson(props.message)
})
</script>

<style scoped lang="scss">
.active {
  background: pink !important;
}
.box {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ddebf9;
  border-radius: 5px;
  border: 1px  solid #fff;
}
.left {
  display: flex;
  flex-direction: row;
  .rl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      padding:5px;
      font-size: 16px;
      font-weight: 600;
      color: rgb(var(--text-color));
    }
    .message {
      padding: 0 5px;
      font-size: 14px;
      color: rgb(var(--text-color));
    }
  }
}
.right {
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
</style>