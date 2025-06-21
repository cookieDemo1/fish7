<template>
  <div class="m-time-picker" @click="handleShow">
    <slot>
      <div class="time-inner" :class="{ right: align === 'right' }">
        <template v-if="valueStr">
          <div class="time-text">{{ valueStr }}</div>
        </template>
        <template v-else>
          <div class="time-placeholder">{{ placeholder }}</div>
        </template>
        <svg-icon class="arrow" name="jiantou_icon"></svg-icon>
      </div>
    </slot>

    <modal-time-picker
      v-model="show"
      :default-value="value"
      @callback="handleComfirm"
    ></modal-time-picker>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    disabled: PropTypes.bool.def(false),
    placeholder: PropTypes.string.def('请选择'),
    modelValue: PropTypes.string.def(''),
    align: PropTypes.oneOf(['left', 'right']).def('right'),
    fomatter: PropTypes.func
  })
  const emit = defineEmits(['update:modelValue', 'callback'])

  const value = computed({
    get: () => {
      // seconds & hh:mm:ss
      return props.modelValue
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  })

  const valueStr = computed(() => {
    if (value.value) {
      if (props.fomatter) {
        return props.fomatter(value.value)
      } else {
        return value.value
      }
    }
    return ''
  })

  const show = ref(false)
  function handleShow() {
    if (props.disabled) {
      return
    }
    show.value = true
  }

  function handleComfirm(res) {
    value.value = res
  }
</script>

<style scoped lang="less">
  .m-time-picker {
    cursor: pointer;
    .time-inner {
      min-width: 100px;
      display: flex;
      align-items: center;
      .time-text {
        flex: 1;
        font-size: 20px;
        color: #dae4e5;
      }
      .time-placeholder {
        flex: 1;
        font-size: 20px;
        color: #99acbf;
      }
      &.right {
        display: flex;
        justify-content: flex-end;
        .time-text {
          text-align: right;
        }
        .time-placeholder {
          text-align: right;
        }
      }

      .arrow {
        margin-left: 12px;
        width: 9px;
        height: 16px;
        margin-top: 3px;
        // transition: all linear 0.1s;
        // &.rotate {
        // 	transform: rotate(180deg);
        // }
      }
    }
  }
</style>
