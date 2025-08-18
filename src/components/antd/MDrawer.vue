<template>
  <a-drawer
    v-model:visible="visible"
    destroy-on-close
    placement="right"
    class="m-drawer"
    :keyboard="true"
    :title="title"
    v-bind="attrs"
  >
    <template #footer>
      <a-button class="button" type="ghost" @click="handleClose">{{ $t('Cancel') }}</a-button>
      <a-button class="button" type="primary" :loading="props.confirmLoading" @click="handleOk">{{
        $t('Save')
      }}</a-button>
    </template>
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    modelValue: PropTypes.bool,
    type: PropTypes.string,
    title: PropTypes.string,
    confirmLoading: PropTypes.bool.def(false)
  })

  const emit = defineEmits(['update:modelValue', 'close', 'ok'])

  const { visible } = use.useVisible({ props, emit })

  const handleClose = () => {
    visible.value = false
    emit('close')
  }

  const handleOk = () => emit('ok')
</script>

<style lang="less">
  .m-drawer {
    .ant-drawer {
      &-header {
        height: 50px;
        padding: 14px 20px;
        border-bottom: none;
        background-color: #192a33;
      }

      &-header-title {
        flex: 1;
        flex-direction: row-reverse;
      }
      &-title {
        flex: 1;
        color: @textPrimaryColor;
        font-weight: bold;
      }
      &-close {
        top: 13px;
        right: 20px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        margin-right: 0;
        color: @textAuxiliaryColor;

        &:hover {
          color: @textSecondaryColor;
        }
      }

      &-body {
        padding: 20px 24px 0 24px;
        height: calc(100% - 50px);
        background-color: @innerComponentBackground;
      }

      &-body {
        display: flex;
        flex-direction: column;
        .drawer-content {
          flex: 1;
          overflow-x: hidden;
          overflow-y: hidden;
        }
      }

      &-footer {
        text-align: right;
        padding: 8px 24px 20px;
        border-top: none;
        background-color: @innerComponentBackground;

        .ant-bth {
          padding-top: 9px;
          text-align: center;
        }

        .button {
          min-width: 90px;
        }

        .ant-btn + .ant-btn {
          margin-left: 16px;
        }
      }
    }
  }

  .m-drawer-custom {
    height: auto;

    .ant-drawer {
      &-content-wrapper {
        height: auto;
        box-shadow: none !important;
      }
      &-content {
        background: transparent;
      }
      &-wrapper-body {
        height: auto;
      }
      &-body {
        padding: 0;
      }
    }
  }
</style>
