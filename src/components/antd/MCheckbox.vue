<template>
  <a-checkbox v-model:value="value" class="m-checkbox" shape="circle" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-checkbox>
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

<style lang="less"></style>

<style lang="less">
  .m-checkbox {
    &.ant-checkbox-wrapper {
      font-size: 17px;
      color: #dae4e5;
      display: flex;
      align-items: center;
    }

    .ant-checkbox {
      top: 0.1em;
      .ant-checkbox-inner {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border-color: #9ea0a6;
        display: flex;
        align-items: center;

        &::after {
          left: 30%;
        }
      }

      &::after {
        border-radius: 50%;
      }
    }
    .ant-checkbox:not(.ant-checkbox-checked) {
      .ant-checkbox-inner {
        background-color: transparent;
        border-color: #9ea0a6;
      }
    }
  }
</style>
