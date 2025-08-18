<template>
  <m-modal
    v-model="visible"
    :title="$t('Delete') + `${title}`"
    :cancel-text="$t('Cancel')"
    :ok-text="$t('Delete')"
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
        <a-button type="link" style="color: #dae4e5" class="button" @click="visible = false">{{
          $t('Cancel')
        }}</a-button>
        <a-button type="link" danger class="button" @click="onOk">{{ $t('Delete') }}</a-button>
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
