<template>
  <div class="auto-info-scene">
    <img class="more" src="@/assets/auto/gengd_nor@2x.png" alt="" />
    <card :padding="[28, 20, 20, 20]">
      <title-auto :icon="icon">一键浇水</title-auto>

      <div class="execute" @click="onEcecute">
        <div class="execute-inner">立即执行</div>
      </div>

      <title-auto-info title="开启设备" sub-title="开关状态"></title-auto-info>
      <card-second>
        <auto-info-item
          v-for="i in 6"
          :key="i"
          class="auto-info-item-wrapper"
          :type="i"
          name="循环水泵"
          :status="i % 4"
        ></auto-info-item>
      </card-second>

      <title-auto-info
        title="关闭设备"
        sub-title="开关状态"
        style="margin-top: 28px"
      ></title-auto-info>
      <card-second>
        <auto-info-item
          v-for="i in 6"
          :key="i"
          class="auto-info-item-wrapper"
          :type="i"
          name="循环水泵"
          :status="i % 4"
        ></auto-info-item>
      </card-second>

      <!-- <div class="title">
        <img src="@/assets/auto/changjrw_icon@2x.png" alt="" />
        <span>一键浇水</span>
      </div> -->
    </card>
  </div>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/changjrw_icon@2x.png'

  const onEcecute = () => {
    console.log('执行一键浇水')
  }
</script>

<style lang="less" scoped>
  .auto-info-scene {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }
    .execute {
      width: 158px;
      height: 158px;
      position: relative;
      margin: 59px auto 52px;
      border-radius: 50%;
      background-color: rgba(22, 206, 103, 0.3);
      .execute-inner {
        width: 144px;
        height: 144px;
        text-align: center;
        line-height: 144px;
        font-size: 22px;
        font-weight: bold;
        color: #0c0c0c;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #16ce67;
        border-radius: 50%;
      }
    }

    .auto-info-item-wrapper + .auto-info-item-wrapper {
      margin-top: 12px;
    }
  }
</style>
