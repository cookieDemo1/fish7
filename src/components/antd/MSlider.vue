<template>
  <a-slider v-model:value="value" class="m-slider" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-slider>
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
  .m-slider {
    margin: 0;

    .ant-slider-dot {
      display: none;
    }
    .ant-slider-handle {
      background-color: #fff;
    }
    .ant-slider-rail {
      background-color: #181d26 !important;
    }
  }
</style>
