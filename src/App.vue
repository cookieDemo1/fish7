<template>
  <div :key="storeRefresh.radom" class="screen">
    <a-config-provider :locale="locale" :auto-insert-space-in-button="false">
      <template #renderEmpty>
        <empty></empty>
      </template>
      <router-view />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import autofit from '@/utils/autofit'

  const mode = import.meta.env.VITE_APP_MODE as string

  const width = mode === 'inch21' ? 1920 : mode === 'inch10' ? 1280 : 1024
  const height = mode === 'inch21' ? 1080 : mode === 'inch10' ? 800 : 600

  console.log(document.documentElement.clientWidth, document.documentElement.clientHeight)
  // const width =
  //   mode === 'inch21'
  //     ? document.documentElement.clientWidth
  //     : mode === 'inch10'
  //     ? document.documentElement.clientWidth
  //     : 1024
  // const height =
  //   mode === 'inch21'
  //     ? document.documentElement.clientHeight
  //     : mode === 'inch10'
  //     ? document.documentElement.clientHeight
  //     : 600

  const locale = zhCN

  // 使用key刷新页面，location.reload()会导致页面退出全屏
  const storeRefresh = store.useRefreshStore()

  watch(
    () => storeRefresh.radom,
    () => {
      nextTick(() => {
        autofit.init({
          dw: width,
          dh: height,
          el: '.screen',
          // limit: 0.8,
          resize: true
          // 忽略掉元素
          // ignore: ['.m-map']
        })
      })
    }
  )

  onMounted(() => {
    autofit.init({
      dw: width,
      dh: height,
      el: '.screen',
      // limit: 0.8,
      resize: true
      // 忽略掉元素
      // ignore: ['.m-map']
    })
    // 计算元素
    // autofit.elRectification('.m-map')
  })
  onUnmounted(() => {
    autofit.off()
  })
</script>

<style scoped lang="less"></style>
<style lang="less">
  // 全局样式
  .ant-message-notice-content {
    border-radius: 4px !important;
    color: #0c0c0c;
  }
</style>
