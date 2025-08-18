<template>
  <div class="card-container">
    <div v-if="showHeader" class="card-header">
      <slot name="title">
        <div class="title">{{ title }}</div>
      </slot>
      <slot name="action"> </slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    showHeader: PropTypes.bool.def(true),
    title: PropTypes.string
  })
</script>

<style scoped lang="less">
  .card-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #1f2838;
    border-radius: 18px;

    display: flex;
    flex-direction: column;

    .card-header {
      height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid rgba(218, 228, 229, 0.15);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        flex: 1;
        .text-ellipsis();
        font-weight: bold;
        font-size: 20px;
        color: #dae4e5;
      }
    }

    .card-body {
      position: relative;
      flex: 1;
      overflow: auto;
      padding: 20px;
    }
  }
</style>
