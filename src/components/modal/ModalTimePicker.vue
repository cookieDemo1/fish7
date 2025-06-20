<template>
  <m-modal v-model="visible" :width="780">
    <div class="modal-content">
      <div class="modal-title">
        {{ title }}
      </div>
      <div class="modal-body">
        <div class="time-picker-container">
          <div class="time">{{ timeStr }}</div>
          <v-time-picker v-model="time" />
        </div>
      </div>
      <div class="modal-footer">
        <a-button type="link" class="button" style="color: #dae4e5" @click="visible = false"
          >取消</a-button
        >
        <a-button type="link" class="button" @click="onOk">确定</a-button>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps({
    title: PropTypes.string.def('')
  })
  const emit = defineEmits(['callback'])

  const time = ref(['0', '0', '0'])

  const timeStr = computed(() => {
    const [h, m, s] = time.value
    return `${h}时${m}分${s}秒`
  })

  const { visible, watchVisible } = use.useVisible({ props, emit })
  watchVisible(resetAction)

  function resetAction() {}

  function onOk() {
    visible.value = false
    emit('callback', time.value.join(':'))
  }
</script>

<style lang="less" scoped>
  .modal-body {
    height: 300px;
  }

  .time-picker-container {
    position: relative;
    width: 100%;
    height: 100%;
    .time {
      font-weight: bold;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      margin-bottom: 24px;
    }
  }
</style>
