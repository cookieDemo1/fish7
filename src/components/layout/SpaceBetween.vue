<template>
  <div class="space-between">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    align: PropTypes.oneOf(['start', 'end', 'center', 'baseline']).def('center')
  })

  const alignItems = computed(() => {
    if (['start', 'end'].includes(props.align)) {
      return 'flex-' + props.align
    }
    return props.align
  })
</script>

<style scoped lang="less">
  .space-between {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: v-bind(alignItems);
  }
</style>
