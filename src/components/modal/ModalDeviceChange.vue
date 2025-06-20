<template>
  <m-modal v-model="visible" :width="780">
    <div class="modal-content">
      <div class="modal-title">
        {{ title }}
        <svg-icon class="right-icon" name="guanbib_button" @click="visible = false"></svg-icon>
      </div>
      <div class="modal-body">
        <div class="device-switch">
          <div class="device-block">
            <div class="device-name">{{ actions.item.name }}</div>
            <a-radio-group
              v-model:value="actions.item.action"
              class="radio-group"
              name="radioGroup"
            >
              <div
                class="device-action"
                :class="{ green: actions.item.action == 1 }"
                @click="actions.item.action = 1"
              >
                <div class="name">开启</div>
                <div>
                  <m-radio class="radio" :value="1"></m-radio>
                </div>
              </div>
              <div
                class="device-action"
                :class="{ green: actions.item.action == 2 }"
                @click="actions.item.action = 2"
              >
                <div class="name">关闭</div>
                <div>
                  <m-radio class="radio" :value="2"></m-radio>
                </div>
              </div>
            </a-radio-group>
          </div>
          <div class="action-button">
            <m-button type="primary" class="button" @click="onOk">保存</m-button>
          </div>
        </div>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: PropTypes.bool.def(false),
    title: PropTypes.string.def(''),
    item: PropTypes.object.def({})
  })
  const emit = defineEmits(['update:modelValue', 'callback'])

  function resetAction() {
    actions.item = { ...props.item }
  }

  function onOk() {
    visible.value = false
    emit('callback', actions.item)
  }

  const { visible, watchVisible } = use.useVisible({ props, emit })
  watchVisible(resetAction)

  const { actions } = use.useActions([])
</script>

<style lang="less" scoped>
  .modal-body {
    height: 450px;
  }
  .device-switch {
    width: 100%;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;

    .device-block {
      flex: 1;
      .device-name {
        font-weight: bold;
        font-size: 30px;
        color: #dae4e5;
        margin-bottom: 20px;
      }

      .device-action {
        cursor: pointer;
        width: 100%;
        height: 90px;
        background: #414a58;
        border-radius: 8px;
        padding: 0 28px;
        margin-bottom: 16px;
        font-weight: bold;
        font-size: 20px;
        color: #dae4e5;
        display: flex;
        align-items: center;
        &.green {
          background: fade(#00e5e5, 15%);
          color: #00e4f8;
        }
        .name {
          flex: 1;
        }
      }
      .radio-group {
        display: block;
      }
    }

    .action-button {
      margin-bottom: 80px;
      display: flex;
      justify-content: center;
      .button {
        width: 200px;
      }
    }
  }
</style>
