<template>
  <div class="container">
    <div class="shape-container">
      <div class="page" :data-theme="themeStore.theme">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/module/useThemeStore'

const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg,#d9eaff,#b5d3f3);
  overflow: hidden;
}

.shape-container {
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  
  background: linear-gradient(135deg,#d9eaff,#b5d3f3);
  background-size: 50px 50px;
  /*
   * 第一层渐变 linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)：
   * 这是一个垂直方向的渐变，rgba(255,255,255,0.4) 表示白色且透明度为 0.4 的颜色。
   * 1px 表示在渐变的起始位置，颜色为 rgba(255,255,255,0.4)，且这个颜色只占据 1 像素的高度。
   * transparent 表示透明色，从第 1 像素开始，背景变为透明。
   * 因此，这一层渐变会在垂直方向上创建间隔为 1 像素的白色半透明线条。
  */
  /*
   * 第二层渐变 linear-gradient(90deg,rgba(255,255,255,0.4) 1px, transparent 1px)：
   * 90deg 表示这是一个水平方向的渐变。
   * 在渐变的起始位置有 1 像素高度的 rgba(255,255,255,0.4) 颜色，之后变为透明。
   * 这一层渐变会在水平方向上创建间隔为 1 像素的白色半透明线条。
  */
  background-image: linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                    linear-gradient(90deg,rgba(255,255,255,0.4) 1px, transparent 1px);
}

.page {
  width: calc(100vw - 400px);
  height: calc(100vh - 100px);
  min-width: 680px;
  max-width: 1180px;
  border-radius: 5px;

  @media (max-width: 700px){
    height: 100%;
    width: 100%;
    min-width: 200px !important;
  }
}


</style>
