<template>
  <div class="flex-center">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .flex-center {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
