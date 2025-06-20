<template>
  <a-popover
    v-model:visible="value"
    placement="bottomRight"
    overlay-class-name="m-popover"
    trigger="click"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-popover>
</template>
<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    modelValue: PropTypes.bool
  })

  const emit = defineEmits(['update:modelValue'])

  const value = computed({
    get: () => {
      return props.modelValue
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  })
</script>

<style lang="less">
  .m-popover {
    &.ant-popover {
      padding: 0;
    }
    .ant-popover-inner {
      background: transparent;
      box-shadow: none;
    }
    .ant-popover-inner-content {
      padding: 0;
    }

    .ant-popover-content > .ant-popover-arrow {
      display: none;
    }
  }
</style>
