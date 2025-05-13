<template>
  <a-input-password
    v-if="props.type === 'password'"
    ref="inputRef"
    v-model:value="value"
    class="m-input"
    :allow-clear="true"
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
    class="m-input m-input-number"
    :allow-clear="true"
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
    class="m-input"
    :allow-clear="true"
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
    modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })

  const emit = defineEmits(['update:modelValue'])

  const inputRef = ref<HTMLInputElement>()

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
  .m-input {
    &.ant-input-affix-wrapper,
    &.ant-input-affix-wrapper:hover {
      line-height: 38px;
      padding: 4px 20px;
      background-color: #414a58;
      border: none !important;
      border-radius: 8px;
      box-shadow: none !important;
    }

    .ant-input::placeholder {
      color: #9a9a9a;
    }

    .ant-input {
      &,
      &:hover {
        padding-left: 3px !important;
        font-size: 17px;
        line-height: 38px !important;
        color: @textPrimaryColor !important;
        background-color: #414a58 !important;
      }
      &-clear-icon {
        color: @textPrimaryColor!important;
        &:hover {
          color: @textPrimaryColor!important;
        }
      }
      &-suffix {
        color: @textSubColor;
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
