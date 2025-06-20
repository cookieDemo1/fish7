<template>
  <a-radio class="m-radio" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-radio>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({})
</script>

<style lang="less">
  .m-radio {
    .ant-radio-inner {
      width: 24px;
      height: 24px;
      &::after {
        position: absolute;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
      }
    }
  }
</style>
