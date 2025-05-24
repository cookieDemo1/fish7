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

  const locale = zhCN

  // 使用key刷新页面，location.reload()会导致页面退出全屏
  const storeRefresh = store.useRefreshStore()

  watch(
    () => storeRefresh.radom,
    () => {
      nextTick(() => {
        autofit.init({
          dw: 1024,
          dh: 600,
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
      dw: 1024,
      dh: 600,
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

  .ant-form-item {
    margin-bottom: 0 !important;
  }

  .ant-form-item-explain-error {
    color: #fb6051 !important;
  }
</style>
