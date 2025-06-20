<template>
  <a-input-number
    v-model:value="value"
    class="m-input-number"
    :allow-clear="true"
    :bordered="false"
    :controls="false"
    size="large"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-input-number>
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
  .m-input-number {
    &.m-input-number-right {
      .ant-input-number-input {
        text-align: right;
        padding: 0;
      }
    }
    &.m-input-number-compact {
      .ant-input-number-input {
        padding: 0;
      }
    }
  }
  // .m-input {
  // 	.anticon.ant-input-clear-icon {
  // 		color: rgba(255, 255, 255, 0.45);
  // 		&:hover {
  // 			color: #7da9b3;
  // 		}
  // 	}
  // }
  // .m-input-number {
  // 	width: 100%;
  // }
</style>
