<template>
  <a-switch v-model:checked="value" class="m-switch" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-switch>
</template>

<script setup lang="ts">
  const attrs = useAttrs()
  const slots = useSlots()

  const props = defineProps({
    modelValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
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
  .m-switch {
    width: 40px;
    height: 20px !important;
    min-width: 40px !important;
    line-height: 20px !important;
    background: #778e9e;

    .ant-switch-handle {
      top: 2px !important;
      width: 16px !important;
      height: 16px !important;
      &::before {
        background-color: #fff;
      }
    }

    &.ant-switch.ant-switch-checked {
      background: @primaryColor;
      .ant-switch-handle {
        left: calc(100% - 18px) !important;
      }
      &:focus {
        box-shadow: none;
      }
    }
  }
</style>
