<template>
  <div class="container">
    <div class="shape-container">
      <div class="page">
        <Login/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Login from './views/login/index.vue'
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
  
  .shape-container {
    position: relative;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    
    background: linear-gradient(135deg,#d9eaff,#b5d3f3);
    background-size: 50px 50px;
    background-image: linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                      linear-gradient(90deg,rgba(255,255,255,0.4) 1px, transparent 1px);
    
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

  }
}
</style>
