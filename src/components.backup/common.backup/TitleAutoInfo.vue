<template>
  <div class="title-auto-info">
    <span class="title">{{ title }}</span>
    <span v-if="subTitle" class="sub-title">{{ subTitle }}</span>
  </div>
</template>

<script setup lang="ts">
  import { LoadingOutlined } from '@ant-design/icons-vue'
  import { h } from 'vue'
  const props = defineProps({
    title: PropTypes.string.def(''),
    subTitle: PropTypes.string.def('')
  })

  const indicator = h(LoadingOutlined, {
    style: {},
    spin: true
  })
</script>

<style lang="less" scoped>
  .title-auto-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
    line-height: 25px;
    margin-bottom: 12px;
    .title {
      font-size: 17px;
    }
    .sub-title {
      font-size: 16px;
      font-weight: bold;
      color: #949ab5;
    }
  }
</style>
