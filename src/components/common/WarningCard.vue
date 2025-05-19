<template>
  <div class="warning-card">
    <div class="warning-title">
      <img src="@/assets/auto/shujgj_icon@2x.png" alt="" />
      <span>{{ title || '--' }}</span>
    </div>
    <div class="condition">触发条件：温度 &gt; 40</div>
    <div class="condition">恢复条件：温度 &lt; 3</div>
    <operation :id="1" to="/warning"></operation>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: PropTypes.string
  })
</script>

<style lang="less" scoped>
  .warning-card {
    height: 114px;
    padding: 16px;

    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    position: relative;

    .warning-title {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .condition {
      margin-top: 11px;
      font-size: 12px;
      color: #9ea0a6;
    }
  }
</style>
