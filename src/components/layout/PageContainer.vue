<template>
  <div class="page-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({})
</script>

<style scoped>
  .page-container {
    height: 100%;
    overflow: hidden;
    /* padding: 20px 0; */
    padding: 0 0 10px 0;
  }
</style>
