<template>
  <div class="warning-card">
    <div class="warning-title">
      <img src="@/assets/auto/shujgj_icon@2x.png" alt="" />
      <span>{{ $t('Oxygen + temperature + PH three-in-one sensor') }}</span>
    </div>
    <div class="condition">
      {{ $t('Trigger condition') }}：{{ option[item.triggering.arg] }}
      {{ compare[item.triggering.compare] }}
      {{ item.triggering.value }}
    </div>
    <div class="condition">
      {{ $t('Restoration conditions') }}：{{ option[item.recovery.arg] }}
      {{ compare[item.recovery.compare] }}
      {{ item.recovery.value }}
    </div>
    <!-- 操作先隐藏 -->
    <!-- <operation :id="1" to="/warning" title="告警设置"></operation> -->
  </div>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const option = {
    ph: 'PH',
    temp: t('Temperature'),
    oxygen: t('Oxygen')
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
