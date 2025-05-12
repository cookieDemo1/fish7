<template>
  <div :class="{ 'timing-operation': true, active: checkbox }">
    <div class="checkbox">
      <a-checkbox v-model:checked="checkbox"> </a-checkbox>
      <span style="font-size: 18px; padding-left: 10px" @click.stop="checkbox = !checkbox"
        >电机1</span
      >
    </div>

    <div class="item">
      <div class="label">开启时间</div>
      <div class="value">
        <m-select placeholder="请选择开启时间" :options="[]" text-align="right"> </m-select>
      </div>
    </div>
    <Line></Line>
    <div class="item">
      <div class="label">关闭时间</div>
      <div class="value">
        <m-select placeholder="请选择关闭时间" :options="[]" text-align="right"> </m-select>
      </div>
    </div>
    <Line></Line>
  </div>
</template>

<script setup lang="ts">
  const checkbox = ref(false)
</script>

<style lang="less" scoped>
  .timing-operation {
    // height: 62px;
    padding: 18px 20px 20px 20px;
    background-color: #414a58;
    border-radius: 8px;

    &.active {
      background-color: rgba(0, 229, 229, 0.1);
    }

    .checkbox {
      display: flex;
      align-items: center;
      height: 25px;
      margin-bottom: 11px;
    }

    .item {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label {
        font-size: 18px;
      }
      .value {
        width: 250px;
      }
    }
  }
</style>
