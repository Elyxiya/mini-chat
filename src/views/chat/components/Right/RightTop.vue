<template>
  <div class="box">
    <chat-avatar
    :info="{ name: userStore.user.userName, avatar: userStore.user.avatar }"
    size="40px"
    style="margin: 0 5px;"
    />
    <div class="user-name">{{ userStore.user.userName }}</div>
    <div class="toptool">
      <div class="icon">
        <svg-icon name="light" width="25" height="25" ></svg-icon>
      </div>
      <div class="icon" @click="handleLogout">
        <svg-icon  name="logout" width="25" height="25" ></svg-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/store/module/useUserStore'
import ChatAvatar from '@/components/ChatAvatar.vue';
const userStore = useUserStore();

const handleLogout = ()=>{
  userStore.logout();
}
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;

}

.user-name {
  color: rgb(var(--text-color));
  font-size: 16px;
  font-weight: 600;
}

.toptool {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  .icon {
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
    &:hover {
      background-color: rgba(var(--background-color));
    }
  }
}
</style>