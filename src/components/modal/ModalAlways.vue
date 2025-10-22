<template>
  <m-modal v-model="visible" :width="780">
    <div class="modal-content" style="max-height: 513px; overflow: auto">
      <div class="modal-title">
        {{ $t('Always Open And Always Closed') }}
        <svg-icon class="right-icon" name="guanbib_button" @click="visible = false"></svg-icon>
      </div>
      <div class="modal-body">
        <div class="device">
          <template v-if="form.on_off == '2' || form.on_off == '3'">
            <div
              class="status"
              :class="{ green: form.on_off == '2', red: form.on_off == '3' }"
            ></div>
          </template>
          <img class="icon" :src="item.icon" alt="" />
          <div class="name">{{ $t(item.name) }}</div>
        </div>

        <div class="form">
          <div class="sub-title">{{ $t('Always Open And Always Closed') }}</div>
          <div class="item" :class="{ active: form.on_off == 1 }" @click="form.on_off = 1">
            <span class="text">{{ $t('Disabled') }}</span>
            <span class="circle"></span>
          </div>
          <div class="item" :class="{ active: form.on_off == 2 }" @click="form.on_off = 2">
            <span class="text">{{ $t('Keep it on') }}</span>
            <span class="circle"></span>
          </div>
          <div class="item" :class="{ active: form.on_off == 3 }" @click="form.on_off = 3">
            <span class="text">{{ $t('Keep it off') }}</span>
            <span class="circle"></span>
          </div>
          <div class="seconds-box">
            <template v-if="form.on_off == 2 || form.on_off == 3">
              <div class="sub-title">{{ $t('Over-limit duration') }}</div>
              <div class="item" @click="actions.handleTime">
                <span class="text">{{ $t('Duration') }}</span>
                <div class="seconds-wrapper">
                  <span class="seconds">{{ timeFormat }}</span>
                  <img class="arrow" src="@/assets/img/jiantou_icon@2x.png" alt="" />
                </div>
              </div>
            </template>
          </div>
        </div>

        <m-button
          class="button"
          shape="round"
          type="primary"
          style="width: 200px; margin-top: 50px"
          @click="onOk"
          >{{ $t('Save') }}</m-button
        >
      </div>
    </div>
    <ModalTimePicker
      v-model="actions.showTime"
      :title="$t('Select Over-limit Duration')"
      :default-value="form.seconds"
      @callback="handleTime"
    ></ModalTimePicker>
  </m-modal>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue'
  const props = defineProps({
    modelValue: PropTypes.bool.def(false),
    title: PropTypes.string.def('常开常闭'),
    item: PropTypes.object.def({})
  })
  const emit = defineEmits(['update:modelValue', 'callback'])

  const form = ref({
    DO: props.item.do,
    on_off: props.item.on_off,
    seconds: props.item.seconds
  })

  const { visible, watchVisible } = use.useVisible({ props, emit })

  const resetAction = () => {
    form.value.DO = props.item.do
    form.value.on_off = props.item.on_off
    form.value.seconds = props.item.seconds
  }

  watchVisible(resetAction)

  const { actions } = use.useActions(['time'])

  const timeFormat = computed(() => {
    return utils.secondsTostring(form.value.seconds)
  })

  const handleTime = (value) => {
    console.log('time change', value)
    const [hh, mm, ss] = value.split(':').map((v) => parseInt(v))
    form.value.seconds = hh * 3600 + mm * 60 + ss
  }

  const { getAlways } = use.useMainStateAction('always')

  const { postAlways } = use.useMainAction('postAlways')
  const onOk = () => {
    const params = { ...form.value }
    postAlways(params).then((res) => {
      const { code, msg } = res
      if (code === 200) {
        getAlways()
        visible.value = false
      } else {
        message.error(msg)
      }
    })
  }
</script>

<style lang="less" scoped>
  .modal-body {
    padding: 0 24px 30px;
    .device {
      height: 80px;
      width: 100%;
      background-color: #424b59;
      border-radius: 12px;
      display: flex;
      align-items: center;
      position: relative;

      padding: 15px 30px;

      .icon {
        width: 60px;
        height: 60px;
      }

      .name {
        margin-left: 16px;
        font-size: 16px;
        font-weight: bold;
        color: #dae4e5;
      }

      .status {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 10px;

        &.green {
          background-color: #16ce67;
        }

        &.red {
          background-color: #ff5446;
        }
      }
    }

    .form {
      width: 100%;
      .sub-title {
        margin-top: 31px;
        margin-bottom: 18px;
        font-size: 18px;
      }

      .seconds-box {
        height: 136px;
        margin-top: 31px;
      }

      .item {
        height: 80px;
        background-color: #424b59;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 30px;
        .text {
          font-size: 20px;
          font-weight: bold;
          color: #dae4e5;
        }
        .circle {
          border-radius: 50%;
          border: 1px solid #99acbf;
          width: 22px;
          height: 22px;
        }

        &.active {
          background-color: fade(#00e5e5, 20%);
          .text {
            color: #00e5e5;
          }
          .circle {
            border-radius: 50%;
            border: 6px solid #00e5e5;
          }
        }

        .seconds-wrapper {
          display: flex;
          align-items: center;
          .seconds {
            font-size: 20px;
            font-weight: bold;
            color: #dae4e5;
            margin-right: 12px;
          }

          .arrow {
            width: 9px;
            height: 16px;
          }
        }
      }

      .item + .item {
        margin-top: 16px;
      }
    }
  }
</style>
