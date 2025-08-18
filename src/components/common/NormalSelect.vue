<template>
  <div class="normal-select">
    <div class="content" @click="isOpen = true">
      <span v-if="!modelValue" class="value placeholder">{{
        placeholder || $t('Please select')
      }}</span>
      <span v-if="modelValue" class="value">{{ text }}</span>

      <img src="@/assets/auto/xiala_icon@2x.png" class="icon" alt="" />
    </div>
    <div v-if="isOpen" class="select-modal-wrapper" @click="isOpen = false">
      <div class="select-modal" @click.stop="() => {}">
        <!-- <div class="title">{{ text }}</div> -->

        <van-picker
          ref="picker"
          v-model="selectedValues"
          :show-toolbar="false"
          :columns="options"
          :option-height="50"
          :visible-option-num="5"
          @confirm="onConfirm"
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
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired, // 必须包含 label
        value: PropTypes.any.isRequired // 必须包含 value，类型可以是任意
      })
    ).def([]),
    placeholder: PropTypes.string.def(''),
    visibleOptionNum: PropTypes.number.def(3),
    textAlign: PropTypes.string.def('right')
  })
  const emit = defineEmits(['update:modelValue'])

  const isOpen = ref(false)
  const picker = ref(null)
  const text = ref('')
  const textAlign = ref(props.textAlign)

  const selectedValues = ref([])
  watch(
    () => props.modelValue,
    (value) => {
      selectedValues.value = [value]
      let selected = props.options.find((item) => item.value === props.modelValue)
      text.value = selected?.text || ''
    },
    {
      immediate: true
    }
  )

  const confirm = () => {
    picker.value.confirm()
  }
  const close = () => {
    isOpen.value = false
  }
  const onConfirm = (event: any) => {
    selectedValues.value = event.selectedValues
    const value = selectedValues.value[0]
    emit('update:modelValue', value)
    isOpen.value = false
  }
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
        text-align: v-bind(textAlign);

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
  .normal-select {
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
