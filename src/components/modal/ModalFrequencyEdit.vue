<template>
  <m-modal v-model="visible" :width="672" title="回水泵">
    <div class="m-modal-wrapper">
      <div class="content">
        <div class="left">频率</div>
        <div class="slider">
          <a-slider
            v-model:value="value"
            class="m-slider"
            :marks="marks"
            :min="0"
            :max="100"
            :step="1"
          ></a-slider>
        </div>
        <div class="right">
          <span>
            <a-input-number
              v-model:value="value"
              class="m-input-number2"
              :min="0"
              :max="100"
            ></a-input-number>
          </span>
          <span class="unit">%</span>
        </div>
      </div>
      <div class="footer">
        <div class="footer-item cancel" @click.stop="handleCancel">取消</div>
        <div class="footer-item ok" @click.stop="handleOk">保存</div>
      </div>
    </div>
    <m-loading :loading="loading"></m-loading>
  </m-modal>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue'
  const props = defineProps<{
    modelValue: boolean
    item: any
  }>()
  const emit = defineEmits(['update:modelValue'])
  const value = ref(parseInt(props.item.freq))
  const loading = ref(false)
  const marks = ref<Record<number, any>>({
    0: '0%',
    100: '100%'
  })

  const { postFreq } = use.useMainActions(['postFreq'])

  watch(
    () => props.modelValue,
    () => {
      value.value = parseInt(props.item.freq)
    },
    {
      immediate: true
    }
  )

  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  function handleCancel(event) {
    event.stopPropagation()
    visible.value = false
  }
  const { getSwitch } = use.useMainStateAction('switch')

  function handleOk(event) {
    event.stopPropagation()
    loading.value = true
    postFreq({ DO: parseInt(props.item.id), freq: value.value })
      .then((res) => {
        if (res.code !== 200) {
          loading.value = false
          message.error('设置失败')
        } else {
          setTimeout(() => {
            message.success('设置成功')
            getSwitch()
            loading.value = false
            visible.value = false
          }, 2000)
        }
      })
      .catch((err) => {
        message.error('设置失败')
        loading.value = false
      })
  }
</script>

<style lang="less" scoped>
  .m-modal-wrapper {
    .content {
      // padding-bottom: 28px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      color: #dae4e5;
      font-size: 16px;
      padding: 0 40px 28px 40px;
      display: flex;
      .left {
        margin-right: 20px;
        font-size: 20px;
      }
      .slider {
        flex: 1;
      }
      .right {
        margin-left: 35px;

        .unit {
          font-size: 18px;
          font-weight: bold;
          margin-left: 8px;
        }
      }
      // text-align: center;
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
        color: #00e4f8;
      }
    }
  }
</style>

<style lang="less">
  .m-slider {
    .ant-slider-rail {
      background-color: #181d26;
      height: 7px;
    }
    &.ant-slider:hover .ant-slider-track {
      background-color: #00e4f8;
    }
    &.ant-slider:hover .ant-slider-rail {
      background-color: #181d26;
    }
    .ant-slider-track {
      height: 7px;
      background-color: #00e4f8;
    }
    .ant-slider-step {
      height: 7px;
    }
    .ant-slider-handle {
      width: 27px;
      height: 27px;
      margin-top: -9px;
      border: 5px solid #00e4f8;
    }
    .ant-slider-dot {
      display: none;
    }
    .ant-slider-mark-text {
      margin-top: 10px;
      font-size: 15px;
      color: #99acbf;
    }
  }

  .m-input-number2 {
    background-color: #181d26;
    border-radius: 8px;
    border: none;

    .ant-input-number-input {
      width: 74px;
      height: 42px;
      padding-left: 20px;
      font-size: 18px;
      font-weight: bold;
    }
    &.ant-input-number:focus,
    &.ant-input-number-focused {
      box-shadow: 0 0 0 2px rgba(0, 228, 248, 0.3) !important;
    }
  }
</style>
