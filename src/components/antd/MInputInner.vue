<template>
  <a-input-password
    v-if="props.type === 'password'"
    ref="inputRef"
    v-model:value="value"
    class="m-input-inner"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-input-password>
  <a-input-number
    v-else-if="props.type === 'number'"
    ref="inputRef"
    v-model:value="value"
    class="m-input-inner m-input-number"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-input-number>
  <a-input
    v-else
    ref="inputRef"
    v-model:value="value"
    class="m-input-inner"
    v-bind="attrs"
    autocomplete="off"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-input>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    type: PropTypes.oneOf(['input', 'number', 'password']).def('input'),
    modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textAlign: PropTypes.oneOf(['left', 'center', 'right']).def('left')
  })

  const emit = defineEmits(['update:modelValue'])

  const inputRef = ref<HTMLInputElement>()
  const textAlign = ref(props.textAlign)
  const value = computed({
    get: () => {
      return props.modelValue
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  })

  defineExpose({
    focus: () => {
      setTimeout(inputRef.value!.focus, 0)
    }
  })
</script>

<style lang="less">
  .m-input-inner {
    // &.ant-input-affix-wrapper,
    // &.ant-input-affix-wrapper:hover {
    //   line-height: 38px;
    //   padding: 6px 0px;
    //   background-color: #414a58;
    //   border: none !important;
    //   border-radius: 8px;
    //   box-shadow: none !important;
    // }

    &.ant-input::placeholder {
      color: #9a9a9a;
    }

    &.ant-input {
      &,
      &:hover {
        text-align: v-bind(textAlign);
        height: 50px;
        line-height: 50px !important;
        font-size: 17px;
        color: @textPrimaryColor !important;
        background-color: #414a58 !important;
        padding-left: 3px !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0;
      }
    }

    &.ant-input-affix-wrapper.readonly {
      border-color: @borderColor;
      background-color: @innerComponentBackground;
      .ant-input {
        color: @textAuxiliaryColor;
      }
      &:focus,
      &:hover,
      &:active {
        box-shadow: none;
        border-color: @borderColor;
      }
    }
    .anticon.ant-input-clear-icon {
      font-size: 18px;
    }
  }

  .m-input-number {
    width: 100%;
  }
</style>
