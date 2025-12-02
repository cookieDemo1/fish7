<template>
  <div class="light">
    <div v-for="item in list" :key="item.name" class="item">
      <span class="dot" :class="{ [item.name]: item.status === 2 }"></span>
      <span>{{ item.key }}</span>
    </div>
    <!-- <div class="item">
      <span class="dot" :class="{ green: true }"></span>
      <span>绿灯</span>
    </div>
    <div class="line"></div>
    <div class="item">
      <span class="dot" :class="{ yellow: true }"></span>
      <span>黄灯</span>
    </div>
    <div class="line"></div>
    <div class="item">
      <span class="dot" :class="{ red: true }"></span>
      <span>红灯</span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired
      })
    ).def([])
  })
</script>

<style lang="less" scoped>
  .light {
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 30px;
    overflow: hidden;
    background-color: #293447;

    .line {
      width: 2px;
      height: 28px;
      background-color: #000916;
    }

    .item {
      width: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #dae4e5;
      font-size: 17px;

      .dot {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        margin-right: 17px;
        background-color: #dae4e5;
        box-shadow: 0 0 6px 1px #949ab5;

        &.green {
          background-color: #16ce67;
          box-shadow: 0 0 6px 1px #16ce67;
        }

        &.yellow {
          background-color: #eca303;
          box-shadow: 0 0 6px 1px #eca303;
        }

        &.red {
          background-color: #ff5446;
          box-shadow: 0 0 6px 1px #ff5446;
        }
      }
    }
  }
</style>
