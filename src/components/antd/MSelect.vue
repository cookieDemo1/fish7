<template>
  <a-select
    v-model:value="value"
    class="m-select"
    dropdown-class-name="m-select-dropdown"
    v-bind="attrs"
    :get-popup-container="(triggerNode) => triggerNode.parentNode"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>

    <template #suffixIcon> <img src="@/assets/auto/xiala_icon@2x.png" alt="" /> </template>
  </a-select>
</template>

<script setup lang="ts">
  const attrs = useAttrs()
  const slots = useSlots()

  const props = defineProps({
    modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textAlign: PropTypes.string.def('left')
  })

  const textAlign = ref(props.textAlign)

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
    width: 100%;
    line-height: 50px !important;
    height: 50px !important;
    .ant-select-selection-placeholder {
      line-height: 50px !important;
      height: 50px !important;
      text-align: v-bind(textAlign);
      color: #9ea0a6;
      padding-right: 25px !important;
    }

    &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-radius: 12px;
      border: none;
      height: 50px;
      background-color: transparent;
      font-size: 18px;
    }

    &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      border: none;
      box-shadow: none;
    }

    &.ant-select-single.ant-select-open .ant-select-selection-item {
      color: @textPrimaryColor;
      line-height: 50px !important;
      text-align: v-bind(textAlign);
      height: 50px !important;
    }

    &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      padding: 0 0;
    }

    .ant-select-arrow {
      color: #9ea0a6;
      right: 0;
      font-size: 18px;
      font-weight: bold;
      width: 16px;
      height: 9px;
      // top: 48%;
      top: 27px;
      // transform: translateY(-50%);
      &:hover {
        color: @textPrimaryColor;
      }
    }

    .ant-input-clear-icon {
      color: @textSecondaryColor;

      &:hover {
        color: @textSecondaryColor;
      }
    }

    .ant-select-clear {
      color: @textSecondaryColor;
      background: transparent;
    }
  }

  .m-select-dropdown {
    &.ant-select-dropdown {
      background-color: #676e79;
      border-radius: 4px;
    }

    .ant-select-item {
      text-align: v-bind(textAlign);
    }

    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background: #787e87 !important;
    }

    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: #787e87;
    }

    &.ant-select-dropdown-empty {
      .m-empty .ant-empty-image img {
        width: 150px;
        margin-top: 20px;
      }
    }
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height: 50px !important;
    text-align: v-bind(textAlign);
    padding-right: 25px !important;
  }
</style>
