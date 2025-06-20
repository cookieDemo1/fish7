<template>
  <a-input
    ref="inputRef"
    v-model:value="value"
    class="m-input"
    size="large"
    :spellcheck="false"
    :maxlength="30"
    autocomplete="off"
    :allow-clear="true"
    v-bind="attrs"
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
    .anticon.ant-input-clear-icon {
      color: rgba(255, 255, 255, 0.45);
      &:hover {
        color: #7da9b3;
      }
    }
  }
  .m-input-number {
    width: 100%;
  }
</style>
