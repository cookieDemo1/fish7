<template>
  <section class="main-layout">
    <template v-if="mode === 'inch10'">
      <header-bar-inch10></header-bar-inch10>
    </template>
    <template v-else-if="mode === 'inch21'">
      <header-bar-inch21></header-bar-inch21>
    </template>
    <template v-else>
      <HeaderBar></HeaderBar>
    </template>

    <main class="main" :class="{ padding: isHome }">
      <router-view />
    </main>
  </section>
</template>

<script setup lang="ts">
  import HeaderBar from './HeaderBar.vue'
  import HeaderBarInch10 from './HeaderBarInch10.vue'
  import HeaderBarInch21 from './HeaderBarInch21.vue'

  const mode = import.meta.env.MODE

  const route = useRoute()
  const isHome = ref(false)
  watch(
    route,
    () => {
      isHome.value = route.path === '/home'
    },
    {
      immediate: true
    }
  )
</script>

<style scoped lang="less">
  .main-layout {
    z-index: 0;
    position: relative;
    // width: 1024px;
    // height: 600px;
    width: 100%;
    height: 100%;
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

      &.padding {
        padding: 12px 0 25px 0;
      }
    }
  }
</style>
