<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps({
    name: PropTypes.string
  })

  const iconName = computed(() => `#icon-${props.name}`)
</script>

<style lang="less">
  .svg-icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
    overflow: hidden;

    &:focus {
      outline: none;
    }
  }
</style>
