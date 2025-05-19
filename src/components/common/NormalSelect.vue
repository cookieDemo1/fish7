<template>
  <div class="normal-select">
    <div class="content" @click="isOpen = true">
      <span v-if="modelValue" class="value">{{ modelValue }}</span>
      <span v-if="!modelValue" class="value placeholder">{{ placeholder }}</span>
      <span v-if="suffix" class="suffix">{{ suffix }}</span>
      <img src="@/assets/auto/xiala_icon@2x.png" class="icon" alt="" />
    </div>
    <div v-if="isOpen" class="select-modal-wrapper" @click="isOpen = false">
      <div class="select-modal" @click.stop="() => {}"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: PropTypes.any.def(null),
    options: PropTypes.array.def([]), // 格式: [{ label: '显示文本', value: '值' }]
    placeholder: PropTypes.string.def('请选择'),
    suffix: PropTypes.string.def('')
  })

  const value = computed(() => {
    const option = props.options.find((item) => item.value === props.modelValue)
    return option?.label || ''
  })

  const emit = defineEmits(['update:modelValue'])

  const isOpen = ref(false)
</script>

<style lang="less" scoped>
  .normal-select {
    height: 50px;
    width: 100%;
    line-height: 50px;

    .content {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;

      .value {
        color: #dae4e5;
        text-align: right;
        flex: 1;
      }
      .value.placeholder {
        color: #9ea0a6;
      }
      .suffix {
        margin-left: 20px;
        font-weight: bold;
        color: #dae4e5;
      }

      .icon {
        width: 16px;
        height: 9px;
        margin-left: 12px;
      }
    }

    .select-modal-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .select-modal {
      position: absolute;
      width: 780px;
      padding: 20px 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #353e51;
      border-radius: 12px;
    }
  }
</style>
