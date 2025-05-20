<template>
  <div :class="{ 'loop-operation': true, active: checkbox }" @click.stop="checkbox = !checkbox">
    <div class="checkbox">
      <a-checkbox v-model:checked="checkbox"> </a-checkbox>
      <span style="font-size: 18px; padding-left: 10px" @click.stop="checkbox = !checkbox">{{
        item.text
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const checkbox = ref(false)
  const props = defineProps({
    item: PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.number
    })
  })
</script>

<style lang="less" scoped>
  .loop-operation {
    height: 62px;
    padding: 11px 20px;
    background-color: #414a58;
    border-radius: 8px;
    display: flex;
    align-items: center;

    &.active {
      background-color: rgba(0, 229, 229, 0.1);
    }

    .checkbox {
      display: flex;
      align-items: center;
    }
  }
</style>
