<template>
  <a-select
    v-model:value="value"
    class="m-select"
    dropdown-class-name="m-select-dropdown"
    size="large"
    :allow-clear="false"
    :bordered="false"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-select>
</template>

<script setup lang="ts">
  const attrs = useAttrs()
  const slots = useSlots()

  const props = defineProps({
    modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
  .m-select {
    font-size: 18px !important;
    &.m-select-right {
      .ant-select-selection-placeholder {
        text-align: right;
      }
      .ant-select-selection-item {
        text-align: right;
      }
      .ant-select-arrow {
        color: #99acbf;
      }
    }
    &.m-select-compact {
      &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        padding: 0;
      }
      .ant-select-arrow {
        color: #99acbf;
      }
    }
  }

  .m-select-dropdown {
    .ant-select-item {
      font-size: 18px;
      padding: 12px 12px;
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: #414a58 !important;
    }
    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: #414a58 !important;
    }
  }
</style>
