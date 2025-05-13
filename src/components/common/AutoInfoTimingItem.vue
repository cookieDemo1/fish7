<template>
  <div class="auto-info-timing-item">
    <img class="icon" :src="imgMap[type].icon" alt="" />
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="value">
        <span>08:00:00 开启</span>
        <span class="split">|</span>
        <span>20:00:00 关闭</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const imgMap = constant.imgMap
  const props = defineProps({
    type: PropTypes.number.isRequired,
    name: PropTypes.string.def('')
  })
</script>

<style lang="less" scoped>
  .auto-info-timing-item {
    height: 98px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    background-color: #414a58;
    // justify-content: space-between;
    padding: 20px;

    .icon {
      width: 58px;
      height: 58px;
      margin-right: 16px;
    }
    .info {
      height: 58px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 19px;
        font-weight: 600;
      }

      .value {
        font-size: 18px;
        color: #b6b8bf;
        font-weight: 600;
      }

      .split {
        margin: 0 9px;
      }
    }
  }
</style>
