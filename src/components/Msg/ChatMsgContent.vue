<template>
  <div class="msg" :class="{ right: props.right }">
    <div
      class="msg-content"
      :class="{ right: props.right }"
    >
      <div v-if="props.msg.type === TextContentType.Text">
        <text-msg :msg="props.msg" :right="right" />
      </div>

    </div>
    <!--消息相关操作-->

  </div>
</template>

<script setup>
import { ref } from 'vue'
import TextMsg from '@/components/Msg/MsgContent/TextMsg.vue'



const TextContentType = {
  Text: 'text', // 文本
  At: 'at', // at用户
}
const props = defineProps({
  msg: Object,
  right: { type: Boolean, default: false },
})







</script>

<style lang="scss" scoped>
.msg {
  position: relative;
  width: 100%;
  display: flex;

  .msg-content {
    display: inline-block;
    word-break: break-word;
    max-width: 70%;
    background-color: white;
    padding: 8px;
    border-radius: 0 10px 10px 10px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;

    &.right {
      border-radius: 10px 0 10px 10px;
      background-color: rgb(var(--primary-color));
      color: white;
    }
  }

  .msg-menu {
    padding: 0 10px;
    height: 30px;
    border-radius: 10px;
    background-color: rgba(var(--background-color), 0.5);
    user-select: none;
    border: rgba(255, 255, 255, 0.8) 2px solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2px;
  }

  &.right {
    justify-content: end;
    flex-direction: row-reverse;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
