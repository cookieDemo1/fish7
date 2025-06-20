<template>
  <div class="empty">
    <img src="@/assets/auto/wurw_img@2x.png" alt="" />
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
    }

    .text {
      font-size: 16px;
      color: #9ea0a6;
    }
  }
</style>
