<template>
  <section class="main-layout">
    <header-bar></header-bar>

    <main class="main">
      <router-view />
    </main>
  </section>
</template>

<script setup lang="ts">
  import HeaderBar from './HeaderBar.vue'
</script>

<style scoped lang="less">
  .main-layout {
    z-index: 0;
    position: relative;
    width: 1024px;
    height: 600px;
    overflow: hidden;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;

    .header {
      z-index: 1000;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;

      .content {
        height: 100%;
        padding: 0 20px;
      }
    }

    .header-placeholder {
      height: 60px;
    }

    .main {
      position: relative;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 12px 24px;
    }
  }
</style>
