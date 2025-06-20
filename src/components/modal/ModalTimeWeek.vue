<template>
  <m-modal v-model="visible" :width="780">
    <div class="modal-content">
      <div class="modal-title">
        {{ item.type === 'add' ? '添加执行时间' : '修改执行时间' }}
      </div>
      <div class="modal-body">
        <m-form ref="formRef" class="form" :model="form" :rules="rules" style="height: 100%">
          <m-form-item label="" name="time">
            <div class="time-card">
              <div class="select-item">
                <div class="label">时间</div>
                <m-time-picker
                  v-model="form.time"
                  class="m-time-picker-right"
                  placeholder="请选择"
                  align="right"
                ></m-time-picker>
              </div>
            </div>
          </m-form-item>
          <m-form-item label="" name="week">
            <div class="week-card">
              <div class="week-item">
                <div class="label">执行日期</div>
                <div class="week-checkbox-group">
                  <div
                    v-for="(item, index) in weekOptions"
                    :key="index"
                    class="week-button"
                    :class="{ active: form[`w${index + 1}`] == '1' }"
                    @click="form[`w${index + 1}`] = form[`w${index + 1}`] == '1' ? '' : '1'"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </m-form-item>
        </m-form>
      </div>
      <div class="modal-footer">
        <a-button type="link" class="button" style="color: #dae4e5" @click="visible = false"
          >取消</a-button
        >
        <a-button type="link" class="button" @click="onOk">保存</a-button>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: PropTypes.bool.def(false),
    item: PropTypes.object.def({})
  })
  const emit = defineEmits(['callback'])

  const autoTaskStore = store.useAutoTask()
  const { tempComposTask } = toRefs(autoTaskStore)

  const weekOptions = ['一', '二', '三', '四', '五', '六', '日']
  const rules = {
    time: [{ required: true, message: '请选择时间', trigger: ['change', 'blur'] }],
    week: [
      {
        required: true,
        message: '请选择日期',
        validator: (rule, value, callback) => {
          return new Promise<void>((resolve, reject) => {
            let flag = Object.keys(form).some((key) => {
              if (key != 'time') {
                return form[key]
              }
              return false
            })
            flag ? resolve() : reject()
          })
        },
        trigger: ['change', 'blur']
      }
    ]
  }
  const formData = {
    time: '',
    w1: '',
    w2: '',
    w3: '',
    w4: '',
    w5: '',
    w6: '',
    w7: ''
  }

  function resetAction() {
    console.log('here1')
    // console.log(tempComposTask.value.time, props.index, props.type);
    Object.assign(
      form,
      props.item.type === 'add'
        ? {
            time: '',
            w1: '',
            w2: '',
            w3: '',
            w4: '',
            w5: '',
            w6: '',
            w7: ''
          }
        : tempComposTask.value.time[props.item.index]
    )
  }

  function onOk() {
    okButton.value = true
    formRef.value
      .validate()
      .then(() => {
        visible.value = false
        if (props.item.type === 'add') {
          tempComposTask.value.time.push({ ...form })
        } else {
          tempComposTask.value.time.splice(props.item.index, 1, { ...form })
        }
        emit('callback', tempComposTask.value.time)
      })
      .catch((e) => {
        setTimeout(() => {
          okButton.value = false
        }, 600)
      })
  }

  const {
    visible,
    okButton,
    form,
    changeForm,
    formRef,
    onOk: onTempOk
  } = use.useForm(
    { props, emit },
    {
      formData,
      resetAction,
      actionName: props.item.type === 'add' ? 'postAutoTaskTimer' : 'putAutoTaskTimer'
    }
  )
</script>

<style lang="less" scoped>
  .modal-body {
    height: 400px;
  }

  .time-card {
    padding: 0 28px;
    height: 90px;
    background: #414a58;
    border-radius: 8px;

    .select-item {
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label {
        font-size: 20px;
        color: #dae4e5;
      }
    }
  }

  .week-card {
    padding: 28px;
    background: #414a58;
    border-radius: 8px;

    .week-item {
      .label {
        margin-bottom: 30px;
        font-weight: bold;
        font-size: 20px;
        color: #dae4e5;
      }
      .week-checkbox-group {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .week-button {
          position: relative;
          cursor: pointer;
          width: 80px;
          height: 40px;
          border-radius: 32px;
          background: fade(#ffffff, 20%);
          font-size: 14px;
          color: #dae4e5;
          display: flex;
          justify-content: center;
          align-items: center;
          & + .week-button {
            margin-left: 16px;
          }
          &.active {
            background: #00e4f8;
            color: #000916;
          }
        }
      }
    }
  }
</style>
