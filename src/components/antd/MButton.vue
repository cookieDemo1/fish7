<template>
  <a-button shape="round" size="large" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-button>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()
</script>

<style lang="less"></style>
