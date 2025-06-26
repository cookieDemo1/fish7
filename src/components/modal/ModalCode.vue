<template>
  <div v-if="visible" class="modal-wrapper">
    <div class="modal-inner">
      <h3 class="title">小程序：远程控制码</h3>

      <div class="code-wrapper">
        <img src="" alt="QR Code" />
      </div>

      <p class="tip">请使用微信扫一扫，解锁手机远程控制！</p>

      <img
        src="@/assets/guanbib_button@2x.png"
        alt=""
        class="close-icon"
        @click="visible = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const proprs = defineProps({
    modelValue: PropTypes.bool.def(false)
  })
  const emit = defineEmits(['update:modelValue'])
  const visible = computed({
    get() {
      return proprs.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })
</script>

<style lang="less" scoped>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;

    .modal-inner {
      width: 430px;
      // height: 350px;
      position: absolute;
      background-color: #353e51;
      border-radius: 6px;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);

      .title {
        font-size: 18px;
        color: #fff;
        text-align: center;
        margin-top: 25px;
        font-weight: bold;
      }

      .code-wrapper {
        width: 200px;
        height: 200px;
        margin: 35px auto;
        padding: 18px;
        background-image: url('@/assets/saomiao_icon@2x.png');
        background-size: 100% 100%;
      }

      .tip {
        font-size: 14px;
        color: #99acbf;
        text-align: center;
        margin-bottom: 30px;
      }

      .close-icon {
        position: absolute;
        top: calc(100% + 20px);
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
      }
    }
  }
</style>
