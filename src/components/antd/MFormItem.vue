<template>
  <a-form-item class="m-form-item" validate-first v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-form-item>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()
</script>

<style lang="less">
  .m-form-item {
    &.ant-form-item {
      margin-bottom: 0;
    }
    .ant-form-item-explain-error {
      color: #fb6051;
    }
  }
</style>
