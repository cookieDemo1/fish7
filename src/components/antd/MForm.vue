<template>
  <a-form
    ref="formRef"
    class="m-form"
    :layout="layout"
    :label-col="formItemLayout.labelCol"
    :wrapper-col="formItemLayout.wrapperCol"
    :colon="false"
    :hide-required-mark="true"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-form>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    layout: PropTypes.oneOf(['horizontal', 'vertical']).def('vertical')
  })

  const formItemLayout = computed(() => {
    return props.layout === 'horizontal'
      ? {
          labelCol: { span: 5 },
          wrapperCol: { offset: 1, span: 18 }
        }
      : {}
  })

  interface FormMethods {
    resetFields: Function
    validate: Function
    clearValidate: Function
  }

  const formRef = ref<FormMethods>()

  defineExpose({
    validate: () => formRef.value!.validate(),
    resetFields: () => formRef.value!.resetFields(),
    clearValidate: () => formRef.value!.clearValidate()
  })
</script>

<style lang="less"></style>
