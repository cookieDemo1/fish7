<template>
  <div class="meter" @click="actions.showDetail = true">
    <div class="left">
      <template v-if="true">
        <img class="icon" src="@/assets/data/sdianb_icon@2x.png" alt="" />
      </template>
      <template v-else>
        <span class="offline">离线</span>
      </template>
      <span class="value"
        >{{ data.w !== undefined && data.w !== null && data.w !== '' ? data.w : '--' }} W</span
      >
    </div>

    <div class="right">
      <img src="@/assets/data/jiantoul_icon@2x.png" class="arrow" alt="" />
    </div>
  </div>

  <ModalMeter v-model="actions.showDetail" :data="data" />
</template>

<script setup lang="ts">
  const { actions } = use.useActions(['detail'])

  const props = defineProps({
    data: PropTypes.object.def({})
  })
</script>

<style lang="less" scoped>
  .meter {
    height: 48px;
    width: 190px;
    border-radius: 32px;
    overflow: hidden;
    padding: 0 20px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background-color: #293447;
    color: #dae4e5;
    font-size: 18px;

    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 28px;
        height: 28px;
      }

      .offline {
        width: 42px;
        height: 21px;
        border-radius: 18px;
        text-align: center;
        line-height: 21px;
        color: #000916;
        font-size: 13px;
        background-color: #ff5446;
      }

      .value {
        font-size: 18px;
        margin-left: 12px;
        font-weight: bold;
      }
    }

    .right {
      // padding-left: 15px;
      padding: 10px 0 10px 20px;

      .arrow {
        width: 9px;
        height: 16px;
      }
    }
  }
</style>
