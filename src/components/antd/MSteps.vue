<template>
  <a-steps v-model:current="current" class="m-steps" size="small" v-bind="attrs">
    <a-step v-for="title in titles" :key="title" :title="title" />
  </a-steps>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()
  const props = defineProps({
    modelValue: PropTypes.number,
    titles: PropTypes.arrayOf(PropTypes.string)
  })
  const emit = defineEmits(['update:modelValue'])

  const current = computed({
    get: () => {
      return props.modelValue
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  })
</script>

<style lang="less">
  .m-steps {
    .ant-steps {
      height: 24px;

      &-item-title {
        margin-top: 2px;
        line-height: 20px;

        &::after {
          top: 12px;
        }
      }

      &-item-icon {
        width: 24px;
        height: 24px;
        font-size: 14px;
        line-height: 24px;
      }
    }

    .ant-steps-item-process
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title {
      color: @primaryColor;
    }

    .ant-steps-item-process
      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title::after {
      background-color: @lineColor;
    }

    .ant-steps-item-wait .ant-steps-item-icon {
      border-color: @textAuxiliaryColor;
      background: transparent;
    }

    .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
      color: @textAuxiliaryColor;
    }

    .ant-steps
      .ant-steps-item:not(.ant-steps-item-active)
      > .ant-steps-item-container[role='button'] {
      cursor: none;
    }
  }
</style>
