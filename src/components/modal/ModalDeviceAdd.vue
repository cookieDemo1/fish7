<template>
  <m-modal v-model="visible" :width="780">
    <div class="modal-content">
      <div class="modal-title">
        <svg-icon
          v-if="actions.showNext"
          class="left-icon"
          name="fanhuitc_button"
          @click="actions.showNext = false"
        ></svg-icon>
        {{ title }}
        <svg-icon class="right-icon" name="guanbib_button" @click="visible = false"></svg-icon>
      </div>
      <div class="modal-body">
        <transition name="slide" mode="out-in">
          <div v-if="!actions.showNext" class="device-list">
            <div
              v-for="(item, index) in switchList"
              :key="index"
              class="device-item"
              @click="actions.handleNext(item)"
            >
              <div class="name elli">{{ item.name }}</div>
              <svg-icon class="arrow" name="jiantou_icon"></svg-icon>
            </div>
          </div>
          <div v-else class="device-switch">
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
                  <div class="name">{{ $t('Enalbe') }}</div>
                  <div>
                    <m-radio class="radio" :value="1"></m-radio>
                  </div>
                </div>
                <div
                  class="device-action"
                  :class="{ green: actions.item.action == 2 }"
                  @click="actions.item.action = 2"
                >
                  <div class="name">{{ $t('Disable') }}</div>
                  <div>
                    <m-radio class="radio" :value="2"></m-radio>
                  </div>
                </div>
              </a-radio-group>
            </div>
            <div class="action-button">
              <m-button type="primary" class="button" @click="onOk">{{ $t('Save') }}</m-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: PropTypes.bool.def(false),
    title: PropTypes.string.def('')
  })
  const emit = defineEmits(['update:modelValue', 'callback'])

  const { taskSwitch, getTaskSwitch } = use.useMainStateAction('taskSwitch')
  const switchList = computed(() => {
    const { list = [] } = taskSwitch.value || []
    return list.map((item) => ({ ...item, id: item.do }))
  })

  function resetAction() {
    getTaskSwitch()
  }

  function onOk() {
    visible.value = false
    emit('callback', actions.item)
  }

  const { visible, watchVisible } = use.useVisible({ props, emit })
  watch(visible, () => {
    if (visible.value) {
      resetAction()
    } else {
      nextTick(() => {
        actions.showNext = false
      })
    }
  })

  const { actions } = use.useActions(['next'])
</script>

<style lang="less" scoped>
  .modal-body {
    height: 450px;
  }

  .device-list {
    width: 100%;
    height: 100%;
    padding: 24px;
    overflow: auto;
    .device-item {
      cursor: pointer;
      padding: 0 28px;
      height: 90px;
      background: #414a58;
      border-radius: 8px;

      &:hover {
        background: fade(#414a58, 90%);
      }

      display: flex;
      align-items: center;
      .name {
        flex: 1;
        font-weight: bold;
        font-size: 20px;
        color: #dae4e5;
      }
      .arrow {
        width: 13px;
        height: 23px;
      }

      & + .device-item {
        margin-top: 16px;
      }
    }
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

  .slide-enter-active {
    transition: all 0.5s ease-out;
  }

  .slide-leave-active {
    transition: all 0.3s ease-in;
  }

  .slide-enter {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
</style>
