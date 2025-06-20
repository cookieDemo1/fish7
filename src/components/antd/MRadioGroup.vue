<template>
  <a-radio-group v-model:value="value" class="m-radio-group" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-radio-group>
</template>
<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

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
  .m-radio-group.m-radio-group-round {
    // &.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    // 	color: @primaryColor;
    // }

    background: #293447;
    border-radius: 32px !important;
    // overflow: hidden;
    .ant-radio-button-wrapper {
      border-radius: 32px !important;
      width: 190px;
      height: 56px;
      line-height: 54px;
      font-weight: bold;
      text-align: center;
      border: none;
      background-color: #293447;
      box-shadow: none !important;
      font-size: 20px;
      color: #dae4e5;

      &::before {
        display: none;
      }

      // &.ant-radio-button-wrapper-checked {
      // 	font-weight: bold;
      // }
    }
  }
</style>
