<template>
  <div class="warning-card">
    <div class="warning-title">
      <img src="@/assets/auto/shujgj_icon@2x.png" alt="" />
      <span>溶解氧+温度+PH 三合一传感器</span>
    </div>
    <div class="condition">
      触发条件：{{ option[item.triggering.arg] }} {{ compare[item.triggering.compare] }}
      {{ item.triggering.value }}
    </div>
    <div class="condition">
      恢复条件：{{ option[item.recovery.arg] }} {{ compare[item.recovery.compare] }}
      {{ item.recovery.value }}
    </div>
    <!-- 操作先隐藏 -->
    <!-- <operation :id="1" to="/warning" title="告警设置"></operation> -->
  </div>
</template>

<script setup lang="ts">
  const option = {
    ph: 'PH',
    temp: '温度',
    oxygen: '溶解氧'
  }

  const compare = {
    '>': '＞',
    '<': '＜',
    '=': '＝'
  }

  const props = defineProps({
    item: PropTypes.any.def({})
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
