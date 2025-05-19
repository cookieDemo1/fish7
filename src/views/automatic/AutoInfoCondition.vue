<template>
  <div class="auto-info-condition">
    <operation class="more"></operation>
    <card :padding="[28, 20, 20, 20]">
      <title-auto :icon="icon">自动循环水泵</title-auto>
      <Line style="margin-bottom: 24px"></Line>
      <card-second>
        <div class="item">
          <span class="name">传感器：</span>
          <span class="value">空气质量变送器</span>
        </div>
        <div class="item">
          <span class="name">条件：</span>
          <span class="value">温度＞38</span>
        </div>
      </card-second>

      <Line style="margin: 24px 0"></Line>

      <title-auto-info title="操作设备"></title-auto-info>
      <card-second>
        <auto-info-item
          v-for="i in 6"
          :key="i"
          class="auto-info-item-wrapper"
          :type="i"
          name="循环水泵"
        ></auto-info-item>
      </card-second>
    </card>
  </div>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/tiaojrw_icon@2x.png'
</script>

<style lang="less" scoped>
  .auto-info-condition {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }

    .item {
      font-size: 18px;
      font-weight: 600;
    }

    .item + .item {
      margin-top: 3px;
    }

    .auto-info-item-wrapper + .auto-info-item-wrapper {
      margin-top: 12px;
    }
  }
</style>
