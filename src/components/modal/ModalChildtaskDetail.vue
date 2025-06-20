<template>
  <m-modal v-model="visible" :width="780">
    <div class="modal-content">
      <div class="modal-title">
        {{ title }}
        <svg-icon class="right-icon" name="guanbib_button" @click="visible = false"></svg-icon>
      </div>
      <div class="modal-body">
        <div class="childtask-list">
          <div class="childtask-item">
            <div class="title elli">
              <svg-icon class="icon" name="zrenwu_icon"></svg-icon>
              {{ item.name }}
            </div>
            <div class="info-list">
              <div v-for="(opeItem, index) in item.ope" :key="index" class="info">
                <template v-if="opeItem.type == '1'">
                  <div class="dot-wrapper">
                    <div class="dot" :class="opeItem.action == 1 ? 'green' : 'red'"></div>
                  </div>
                  <div class="action">{{ opeItem.action == 1 ? '开启设备' : '关闭设备' }}：</div>
                  <div class="name">{{ opeItem.name }}</div>
                </template>
                <template v-else>
                  <div class="dot-wrapper">
                    <svg-icon class="icon" name="ddshij_h_icon"></svg-icon>
                  </div>
                  <div class="action">等待时长：</div>
                  <div class="name">{{ secondsTostring(opeItem.seconds) }}</div>
                </template>
              </div>
            </div>
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

  const secondsTostring = utils.secondsTostring

  function resetAction() {}

  const { visible, watchVisible } = use.useVisible({ props, emit })
  watchVisible(resetAction)
</script>

<style lang="less" scoped>
  .childtask-list {
    // height: 100%;
    width: 100%;
  }

  .childtask-item {
    max-width: 754px;
    margin: 0 auto;
    padding: 24px 24px 60px;
    position: relative;

    & + .childtask-item {
      margin-top: 20px;
    }

    .title {
      padding: 24px;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 30px;
      color: #dae4e5;
      .icon {
        width: 50px;
        height: 50px;
        margin-right: 24px;
      }
    }
    .info-list {
      padding: 24px;
      background: #424b59;
      border-radius: 12px;
    }
    .info {
      font-size: 16px;
      color: #9ea0a6;
      display: flex;
      align-items: center;

      & + .info {
        margin-top: 12px;
      }

      .dot-wrapper {
        width: 18px;
        height: 18px;
        margin-right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          &.green {
            background: #16ce67;
          }
          &.red {
            background: #ff5446;
          }
        }
        .icon {
          width: 100%;
          height: 100%;
        }
      }
      .action {
        font-size: 16px;
        color: #99acbf;
      }
      .name {
        font-size: 16px;
        color: #dae4e5;
      }
    }
  }
</style>
