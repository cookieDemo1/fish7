<template>
  <a-time-picker
    v-model:value="value"
    class="m-time-picker"
    popup-class-name="m-popup-time-picker"
    :bordered="false"
    :allow-clear="false"
    size="large"
    format="HH:mm:ss"
    value-format="HH:mm:ss"
    v-bind="attrs"
  >
    <template #suffixIcon>
      <!-- <smile-outlined class="ant-select-suffix" /> -->
      <down-outlined class="ant-picker-suffix" style="width: 12px; height: 12px" />
    </template>
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-time-picker>
</template>

<script setup lang="ts">
  import { DownOutlined } from '@ant-design/icons-vue'
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    modelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })

  const emit = defineEmits(['update:modelValue'])

  const value = computed({
    get: () => {
      return props.modelValue
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  })
</script>

<style lang="less">
  .m-time-picker {
    &.m-time-picker-right {
      .ant-picker-input > input {
        text-align: right;
        font-size: 18px;
      }
      .ant-picker-suffix {
        color: #99acbf;
      }
    }

    .ant-picker-clear {
      // background: transparent;
    }
  }
  // .modal-time-picker {
  // 	width: 100%;
  // 	opacity: 0;
  // }
  .m-popup-time-picker {
    // .ant-picker-panel-container {
    // 	background: #1f2839;
    // }

    .ant-picker-panel {
      border-color: #414a58 !important;

      .ant-picker-time-panel-column:not(:first-child) {
        border-color: #414a58;
      }

      .ant-picker-footer {
        border-top-color: #414a58;
        .ant-btn-primary[disabled],
        .ant-btn-primary[disabled]:hover,
        .ant-btn-primary[disabled]:focus,
        .ant-btn-primary[disabled]:active {
          background-color: #414a58;
        }
      }
    }

    .ant-picker-time-panel-column
      > li.ant-picker-time-panel-cell
      .ant-picker-time-panel-cell-inner {
      font-size: 18px;
      color: #99acbf;
      text-align: center;
      height: 38px;
      line-height: 38px;
      &:hover {
        background-color: #414a58;
      }
    }
    .ant-picker-time-panel-column
      > li.ant-picker-time-panel-cell-selected
      .ant-picker-time-panel-cell-inner {
      background-color: #414a58;
      font-weight: bold;
      font-size: 18px;
      color: #dae4e5;
    }
  }
</style>
