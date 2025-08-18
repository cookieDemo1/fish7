<template>
  <van-config-provider theme="dark">
    <van-time-picker
      v-model="value"
      class="v-time-picker"
      :show-toolbar="false"
      :title="$t('Select time')"
      :columns-type="['hour', 'minute', 'second']"
      :formatter="formatter"
      :visible-option-num="5"
      v-bind="attrs"
    >
      <template v-for="name in Object.keys(slots)" #[name]>
        <slot :name="name"></slot>
      </template>
    </van-time-picker>
  </van-config-provider>
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

  const formatter = (type, option) => {
    if (type === 'hour') {
      option.text += '时'
    } else if (type === 'minute') {
      option.text += '分'
    } else if (type === 'second') {
      option.text += '秒'
    }
    return option
  }
</script>

<style lang="less">
  .v-time-picker {
    .van-picker__mask {
      display: none;
    }
    .van-picker-column__item {
      font-size: 18px;
      color: #99acbf;
      &.van-picker-column__item--selected {
        font-weight: bold;
        font-size: 18px;
        color: #dae4e5;
      }
    }
  }
</style>
