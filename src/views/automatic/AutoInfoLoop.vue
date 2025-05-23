<template>
  <div class="auto-info-loop">
    <!-- <operation class="more" title="循环任务"></operation> -->

    <card :padding="[28, 20, 20, 20]">
      <title-auto :icon="icon">循环增氧</title-auto>

      <a-row :gutter="[20, 12]">
        <a-col v-for="i in 5" :key="i" :span="12">
          <div class="item">
            <span>开始时间：</span>
            <span>20:00:00</span>
          </div>
        </a-col>
      </a-row>

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
  import icon from '@/assets/auto/xunh_icon@2x.png'
</script>

<style lang="less" scoped>
  .auto-info-loop {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }

    .item {
      height: 42px;
      line-height: 42px;
      padding-left: 16px;
      font-size: 17px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }

    .auto-info-item-wrapper + .auto-info-item-wrapper {
      margin-top: 12px;
    }
  }
</style>
