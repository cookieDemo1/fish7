<template>
  <div class="card-second" :style="{ padding: paddingComputed }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    padding: PropTypes.array.def([20, 24])
  })

  const paddingComputed = computed(() => {
    return props.padding.map((value) => `${value}px`).join(' ')
  })
</script>

<style lang="less" scoped>
  .card-second {
    // padding: 20px 24px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.15);
  }
</style>
