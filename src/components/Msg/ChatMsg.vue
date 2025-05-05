<template>
  <div class="msg-box" :class="{ right: right }">
    <template> </template>
    <time-msg v-if="props.msg.isShowTime" :content="props.msg.createTime" />
    
    <div v-else class="msg-box-wrapper" :class="{ right: right }">
      <chat-avatar
        :info="msgStore.userListMap.get(props.msg.fromId)"
        size="40px"
        class="chat-avatar"
      />
      <div class="msg-box-info">
        <!--用户信息-->
        <div class="mgs-box-user-info" :class="{ right: right }">
          <div class="msg-username">
            {{ msgStore.userListMap.get(props.msg.fromId).name }}
          </div>
          <div class="mgs-ip">
            [成员]
          </div>
         
        </div>
        <!--消息内容-->
        <chat-msg-content :right="right" :msg="props.msg" />

      </div>
    </div>
  </div>
</template>

<script setup>
import ChatMsgContent from '@/components/Msg/ChatMsgContent.vue'
import ChatAvatar from '@/components/ChatAvatar.vue'
import TimeMsg from '@/components/Msg/MsgContent/TimeMsg.vue'

import { useUserInfoStore } from '@/store/useUserInfoStore'
import { useChatMsgStore } from '@/store/useChatMsgStore'

const userInfoStore = useUserInfoStore()
const msgStore = useChatMsgStore()

const props = defineProps({
  msg: Object,
  user: Object,
})


const right = props.msg.fromId === userInfoStore.userId
</script>

<style lang="less" scoped>
.msg-box {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: column;

  .msg-box-wrapper {
    display: flex;

    .chat-avator {
      margin: 0 5px;
    }

    .msg-box-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      .mgs-box-user-info {
        display: flex;
        align-items: center;
        height: 30px;

        &.right {
          flex-direction: row-reverse;
        }

        .msg-username {
          color: rgba(var(--text-color), 0.7);
          user-select: none;
          font-size: 14px;
          font-weight: 600;
        }

        .mgs-ip {
          margin: 0 2px;
          color: rgba(var(--text-color), 0.6);
          user-select: none;
          font-size: 12px;
          font-weight: 600;
        }
      }

      .msg-box-info-reference {
        max-width: 60%;
        word-break: break-word;
        margin-top: 5px;
        padding: 2px 10px;
        border-radius: 4px;
        background-color: rgba(var(--text-color), 0.05);
        user-select: none;
        display: flex;
        font-size: 14px;
        color: rgba(var(--text-color), 0.7);
        border: rgba(var(--text-color), 0.07) 1px solid;

        &.right {
          flex-direction: row-reverse;

          i {
            margin-right: 10px;
            margin-left: 0;
          }
        }
      }
    }

    &.right {
      flex-direction: row-reverse;
    }
  }

  &.right {
    justify-content: flex-end;

    .msg-box-info {
      align-items: flex-end;
    }
  }
}
</style>
