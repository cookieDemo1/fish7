<template>
  <div class="title-auto">
    <img :src="icon" alt="" />
    <span><slot></slot></span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    icon: PropTypes.any
  })
</script>

<style lang="less" scoped>
  .title-auto {
    height: 29px;
    line-height: 29px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 26px;
      height: 26px;
      margin-right: 8px;
    }
    span {
      font-size: 20px;
    }
  }
</style>
