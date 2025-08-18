<template>
  <div class="time-select">
    <div class="content" @click="isOpen = true">
      <span v-if="modelValue" class="value">{{ modelValue }}</span>
      <span v-if="!modelValue" class="value placeholder">{{
        placeholder || $t('Please select')
      }}</span>
      <span v-if="suffix" class="suffix">{{ suffix }}</span>
      <img src="@/assets/auto/xiala_icon@2x.png" class="icon" alt="" />
    </div>
    <div v-if="isOpen" class="select-modal-wrapper" @click="isOpen = false">
      <div class="select-modal" @click.stop="() => {}">
        <div class="title">{{ timePickerValue.join(':') }}</div>

        <van-time-picker
          ref="picker"
          v-model="timePickerValue"
          :title="$t('Select time')"
          :show-toolbar="false"
          :columns-type="['hour', 'minute', 'second']"
          :option-height="50"
          :visible-option-num="visibleOptionNum"
          @confirm="onConfirm"
          @change="onChange"
        />

        <div class="footer">
          <div class="cancel" @click="close">{{ $t('Cancel') }}</div>
          <div class="ok" @click="confirm">{{ $t('Ok') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: PropTypes.any.def(null),
    placeholder: PropTypes.string.def(''),
    suffix: PropTypes.string.def(''),
    visibleOptionNum: PropTypes.number.def(5)
  })

  const emit = defineEmits(['update:modelValue'])
  const isOpen = ref(false)
  const picker = ref(null)

  const timePickerValue = ref([])

  watchEffect(() => {
    timePickerValue.value = props.modelValue ? props.modelValue.split(':') : ['00', '00', '00']
  })

  const onChange = (event: any) => {
    console.log(event)
  }

  const confirm = (value: any) => {
    picker.value.confirm()
  }
  const close = () => {
    isOpen.value = false
  }
  const onConfirm = (event: any) => {
    const timePickerValue = event.selectedValues
    const result = timePickerValue.join(':')
    emit('update:modelValue', result)
    isOpen.value = false
  }
</script>

<style lang="less" scoped>
  .time-select {
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
      z-index: 999;
    }

    .select-modal {
      position: absolute;
      width: 780px;
      // padding: 20px 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #353e51;
      border-radius: 12px;
      overflow: hidden;
      .title {
        height: 74px;
        line-height: 74px;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;

        text-align: center;
      }
      .footer {
        height: 66px;
        // width: 66px;
        // width: 100%;
        display: flex;
        // align-items: center;

        .cancel,
        .ok {
          flex: 1;
          font-size: 18px;
          color: #9ea0a6;
          line-height: 66px;
          text-align: center;
        }

        .ok {
          color: #00e4f8;
        }
      }
    }
  }
</style>

<style lang="less">
  .time-select {
    .van-picker {
      background-color: #353e51;
      .van-picker__mask {
        background-image: linear-gradient(180deg, #353e51, rgba(53, 62, 81, 0.3)),
          linear-gradient(0deg, #353e51, rgba(53, 62, 81, 0.3));
      }
      .van-picker-column__item {
        color: #dae4e5;
      }
      [class*='van-hairline']:after {
        border-color: rgba(218, 228, 229, 0.25);
      }
    }
  }
</style>
