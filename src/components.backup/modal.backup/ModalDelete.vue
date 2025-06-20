<template>
  <m-modal
    v-model="visible"
    :title="`删除${title}`"
    cancel-text="取消"
    ok-text="删除"
    :ok-button-props="{ danger: true }"
    :confirm-loading="okButton"
    @ok="onOk"
    @click="handleClick"
  >
    <div class="m-modal-wrapper">
      <div class="text">{{ `确定删除该${title}吗？` }}</div>
      <div class="footer">
        <div class="footer-item cancel" @click.stop="handleCancel">取消</div>
        <div class="footer-item ok" @click.stop="handleOk">删除</div>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    modelValue: boolean
    title: string
    item: any
    actionName: MainAction
  }>()
  const emit = defineEmits(['update:modelValue', 'callback', 'cancel'])
  const handleClick = (event) => {
    event.stopPropagation()
  }
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

  function handleCancel(event) {
    event.stopPropagation()
    visible.value = false
  }

  function handleOk(event) {
    event.stopPropagation()
  }
</script>

<style lang="less" scoped>
  .m-modal-wrapper {
    .text {
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      color: #9ea0a6;
      font-size: 16px;
      text-align: center;
    }
    .footer {
      height: 47px;
      line-height: 47px;
      display: flex;
      align-items: center;
      .footer-item {
        flex: 1;
        text-align: center;
        color: #dae4e5;
        font-size: 16px;
      }
      .ok {
        border-left: 1px solid rgba(255, 255, 255, 0.15);
        color: #e93323;
      }
    }
  }
</style>
