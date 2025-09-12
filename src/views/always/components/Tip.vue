<template>
  <div class="tip">
    <div class="tip-title">常开常闭功能是为了防止操作失误，从而导致发生事故</div>
    <div class="tip-row">
      示例1：可将增氧泵设为常开，超限时长为10分钟。假如人为关闭增氧泵，并且关闭时间超过10分钟，系统将自动开启增氧泵，以防止鱼池缺氧。
    </div>
    <div class="tip-row">
      示例2：可将鱼池排空阀设为常闭，超限时长为30秒。假如人为开启鱼池排空阀，并且开启时间超过30秒，系统将自动关闭鱼池排空阀，以防止鱼池中的水排空。
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
