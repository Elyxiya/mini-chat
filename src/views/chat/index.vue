<template>
  <div class="chat-container">
    <div class="chat-bg">
      <div class="chat-box">

        <div class="box-left">
          <div class="chat-list-title">
            消息列表
          </div>

          <div class="middle-title">
            群聊
          </div>
          <div class="chat-list-item">

          </div>

          <div class="middle-title">
            私聊
          </div>
          <div class="chat-list-item">

          </div>

        </div>

        <div class="box-middle">
          <div class="middle-top">
            <template v-if="targetId === '1'">
              {{ groupChat?.targetInfo.name }}（{{ msgStore.userListMap.size }}）
            </template>
            <template v-else>
              {{ currentSelectTarget?.targetInfo?.name }}
            </template>
          </div>
          <div class="middle-content">
            <div class="chat-show-area">

            </div>
            <div class="chat-input-area">

            </div>
          </div>
        </div>

        <div class="box-right">
          <div class="right-top">

          </div>
          <div class="right-content">

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;

  background: var(--screen-bg-color);
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.chat-bg {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
 
  background-image: var(--scrren-grid-bg-color);
  background-size: 50px 50px;
  overflow: hidden;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.chat-box {
  width: 80%;
  height: 90%;
  display: flex;
  position: relative;
  min-width: 0;

  @media screen and (max-width: 900px) {
    width: 95%;
    height: 95%;
  }
}

.box-left {
  display: flex;
  flex-direction: column;

  margin-right: 5px;
  padding: 0 10px;
  width: 280px;
  min-width: 280px;

  background-color: rgba(var(--background-color), 0.5);
  backdrop-filter: blur(8px); 
  border-radius: 5px;
  border: rgba(var(--background-color), 0.5) 3px solid;
  
  @media screen and (max-width: 900px) {
    position: fixed;
    left: -280px;
    top: 0;
    bottom: 0;
    margin: 0;
    z-index: 11;
    background-color: rgba(var(--background-color), 0.9);
    transition: all 0.3s;

    &.show-left {
      left: 0;
    }
  }

  .chat-list-title {
    color: rgb(var(--text-color));
    height: 60px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    user-select: none;
    @media screen and (max-width: 900px) {
      justify-content: space-between;
    }
  }

  .middle-title {
    color: rgb(var(--text-color));
    padding: 5px 0 10px 0;
  }

  .chat-list-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    padding: 10px;
    height: 60px;
    
    border-radius: 5px;
    cursor: pointer;
    user-select: none;

    .chat-item-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      overflow: hidden;

      .chat-content-name {
        font-size: 14px;
        color: white;
      }

      .chat-content-msg {
        width: 100%;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &.blue {
      background-color: rgb(var(--primary-color));

      &:hover {
        background-color: rgba(var(--primary-color), 0.7);
      }
    }

    &.black {
      background-image: url('/group-bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    &.white {
      background-color: rgba(var(--background-color), 0.5);

      .chat-item-content {
        .chat-content-name {
          color: rgb(var(--text-color));
        }

        .chat-content-msg {
          color: rgba(var(--text-color), 0.6);
        }
      }

      &:hover {
        background-color: rgba(var(--background-color), 0.8);
      }
    }
  }

}

.chat-list-content {
  flex: 1;
  overflow-y: scroll;
  padding-right: 5px;
  margin-right: -10px;
  margin-bottom: 20px;
}

.box-middle {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;
  margin-right: 5px;
  border-radius: 5px;
  

  @media screen and (max-width: 900px) {
    margin: 0;
  }

  .middle-top {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    padding: 0 15px;
    height: 60px;
    min-height: 60px;
    
    background-color: rgba(var(--background-color), 0.5);
    backdrop-filter: blur(8px);
    border-radius: 5px;
    border: rgba(var(--background-color), 0.5) 3px solid;
    font-size: 18px;
    font-weight: 600;
    user-select: none;
    color: rgb(var(--text-color));

    .menu-btn {
      cursor: pointer;
      font-size: 24px;
    }

    @media screen and (max-width: 900px) {
      justify-content: space-between;
    }

    @media screen and (min-width: 900px) {
      .menu-btn {
        display: none;
      }
    }
  }

  .middle-content {
    display: flex;
    flex-direction: column;
    flex: 1;

    min-height: 300px;
    border-radius: 5px;
    background-image: linear-gradient(
      130deg,
      rgba(var(--background-color), 0.3),
      rgba(var(--background-color), 0.5)
    );
    backdrop-filter: blur(10px);
    border: rgba(var(--background-color), 0.5) 3px solid;
    
  }

}

.box-right {
  display: flex;
  flex-direction: column;

  width: 280px;
  min-width: 280px;

  border-radius: 5px;
  
  @media screen and (max-width: 900px) {
    position: fixed;
    right: -280px;
    top: 0;
    bottom: 0;
    margin: 0;
    z-index: 11;
    transition: all 0.3s;

    &.show-right {
      right: 0;
    }

    .right-top {
      background-color: rgba(var(--background-color), 0.9) !important;
    }

    .right-content {
      background-color: rgba(var(--background-color), 0.9) !important;
    }
  }

  .right-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 60px;
    min-height: 60px;
    padding: 5px;
    margin-bottom: 5px;

    border-radius: 5px;
    border: rgba(var(--background-color), 0.5) 3px solid;
    background-color: rgba(var(--background-color), 0.5);
    backdrop-filter: blur(8px);
    user-select: none;
  }

  .right-content {
    display: flex;
    flex-direction: column;
    flex: 1;

    min-height: 300px;
    padding: 5px;
    background-color: rgba(var(--background-color), 0.5);
    backdrop-filter: blur(8px);
    border-radius: 5px;
    border: rgba(var(--background-color), 0.5) 3px solid;
  }

}
</style>