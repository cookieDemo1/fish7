<template>
  <div class="auto-info-timing">
    <operation class="more"></operation>

    <card :padding="[28, 20, 20, 20]">
      <title-auto :icon="icon">2米鱼池定时杀菌</title-auto>
      <div class="date">
        <span>执行日期：</span>
        <span>周一、周二、周五</span>
      </div>

      <Line style="margin: 24px 0"></Line>

      <auto-info-timing-item
        v-for="i in 6"
        :key="i"
        class="auto-info-timing-item-wrapper"
        :type="i"
        name="循环水泵"
      ></auto-info-timing-item>
    </card>
  </div>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/dingsrw_icon@2x.png'
</script>

<style lang="less" scoped>
  .auto-info-timing {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }

    .date {
      font-size: 16px;
    }

    .auto-info-timing-item-wrapper + .auto-info-timing-item-wrapper {
      margin-top: 24px;
    }
  }
</style>
