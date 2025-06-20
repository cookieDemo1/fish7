<template>
  <m-modal
    v-model="visible"
    :title="`删除${title}`"
    cancel-text="取消"
    ok-text="删除"
    :ok-button-props="{ danger: true }"
    :confirm-loading="okButton"
    @ok="onOk"
  >
    <div class="modal-content">
      <div class="modal-title">{{ title }}</div>
      <div class="modal-body">
        <slot>{{ message }}</slot>
      </div>
      <div class="modal-footer">
        <a-button type="link" style="color: #dae4e5" class="button" @click="visible = false"
          >取消</a-button
        >
        <a-button type="link" danger class="button" @click="onOk">删除</a-button>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    modelValue: boolean
    title: string
    message: string
    item: any
    actionName: MainAction
  }>()
  const emit = defineEmits(['update:modelValue', 'callback'])

  const formData = {}
  function resetAction() {
    Object.assign(form, formData, props.item)
  }

  const { visible, okButton, form, onOk } = use.useDelete(
    { props, emit },
    {
      formData,
      resetAction,
      actionName: props.actionName
    }
  )
</script>

<style lang="less" scoped></style>
