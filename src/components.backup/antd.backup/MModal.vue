<template>
  <a-modal
    class="m-modal"
    :width="300"
    :visible="visible"
    :mask-closable="false"
    :keyboard="false"
    :title="title"
    centered
    v-bind="attrs"
    :footer="null"
    :closable="false"
    @cancel="visible = false"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    modelValue: PropTypes.bool,
    title: PropTypes.string.def('')
  })

  const emit = defineEmits(['update:modelValue'])

  const { visible } = use.useVisible({ props, emit })
</script>
<style lang="less">
  .m-modal {
    .ant-modal {
      &-content {
        z-index: 0;
        position: relative;
        background: #353e51;
        box-shadow: none;
        border-radius: 12px;
      }

      &-header {
        padding: 0;
        // padding: 10px 20px;
        border-bottom: none;
        border-radius: 12px 12px 0 0;
        background-color: #353e51;
      }
      &-title {
        font-size: 17px;
        font-weight: bold;
        text-align: center;
        height: 69px;
        line-height: 69px;
        color: #dae4e5;
      }
      &-body {
        padding: 0;
      }
    }
  }

  .ant-btn > .ant-btn-loading-icon {
    height: 14px;
  }
</style>
