<template>
  <div class="tip">
    <div class="tip-title">{{ $t('tip1') }}</div>
    <div class="tip-row">
      {{ $t('tip2') }}
    </div>
    <div class="tip-row">
      {{ $t('tip3') }}
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .tip {
    background-color: #424b59;
    border-radius: 12px;
    padding: 20px;
    .tip-title {
      font-size: 16px;
      font-weight: bold;
      color: #dae4e5;
    }

    .tip-row {
      font-size: 14px;
      color: #99acbf;
      margin-top: 10px;
    }
  }
</style>
