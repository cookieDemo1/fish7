<template>
  <div class="screen">
    <a-config-provider :locale="locale" :auto-insert-space-in-button="false">
      <template #renderEmpty>
        <m-empty></m-empty>
      </template>
      <router-view />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import autofit from '@/utils/autofit'

  const locale = zhCN

  // import { ConfigProvider } from 'ant-design-vue'
  //       ConfigProvider.config({
  //         theme: {
  //           primaryColor: '#00a4ff', // 全局主色
  //           successColor: '#0dc55d', // 成功色
  //           warningColor: '#ee9e03', // 警告色
  //           errorColor: '#f53a4e' // 错误色
  //         }
  //       })

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
  .chart-tooltip {
    width: 120px;
    .value {
      font-size: 16px;
      color: #202d40;
    }
    .name {
      font-size: 14px;
      color: #9ca1ad;
    }
  }
</style>
