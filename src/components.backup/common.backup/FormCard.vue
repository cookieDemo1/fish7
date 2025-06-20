<template>
  <div class="form-card">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .form-card {
    border-radius: 8px;
    background-color: #414a58;
    padding: 20px;
  }
</style>
