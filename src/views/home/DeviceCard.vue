<template>
  <div class="device-card">
    <div class="info">
      <img :src="imgMap[item.type].icon" class="icon" alt="" />

      <div class="name">
        <span v-if="item.status === 0" class="offline">离线</span>
        <span class="name-text">{{ item.name }}</span>
      </div>
    </div>

    <img :src="imgMap[item.type]['on']" class="status-icon" alt="" />
  </div>
</template>

<script setup lang="ts">
  const imgMap = constant.imgMap

  const props = defineProps({
    item: PropTypes.object
  })
</script>

<style lang="less" scoped>
  .device-card {
    width: 100%;
    height: 98px;
    border-radius: 11px;
    background-image: url('../../assets/kapbj_img@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 13px 19px;
    position: relative;
    // display: flex;
    .info {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      // align-items: space-between;
      justify-content: space-between;
      .icon {
        width: 46px;
        height: 46px;
      }
      .offline {
        margin-right: 8px;
        color: #0c0c0c;
        display: inline-block;
        width: 48px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 18px;
        background-color: #f53d2d;
        font-size: 13px;
      }
      .name-text {
        font-size: 16px;
      }
    }
    .status-icon {
      position: absolute;
      top: 14px;
      right: 20px;
      width: 53px;
      height: 53px;
    }
  }
</style>
