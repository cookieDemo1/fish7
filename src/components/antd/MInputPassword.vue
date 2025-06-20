<template>
  <a-input-password
    ref="input"
    v-model:value="value"
    class="m-input-password"
    :spellcheck="false"
    :maxlength="30"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-input-password>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
  const emit = defineEmits(['update:modelValue'])

  const input = ref<HTMLInputElement>()
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
      setTimeout(input.value!.focus, 0)
    }
  })
</script>

<style lang="less">
  .m-input-password {
    .anticon.ant-input-clear-icon {
      color: rgba(255, 255, 255, 0.45);
      &:hover {
        color: #7da9b3;
      }
    }

    .ant-input-password-icon {
      color: rgba(255, 255, 255, 0.45);
      &:hover {
        color: #7da9b3;
      }
    }
  }
</style>
