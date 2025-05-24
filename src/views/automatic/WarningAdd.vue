<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">数据告警-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form ref="formRef" :model="formData" :rules="rules">
            <form-card>
              <a-form-item name="sensor">
                <div class="data-source" style="margin-top: -10px">
                  <div class="label">传感器</div>
                  <div class="value">
                    <normal-select
                      v-model="formData.sensor"
                      :visible-option-num="3"
                      placeholder="请选择传感器"
                      :options="sensorOptions"
                    ></normal-select>
                  </div>
                </div>

                <Line></Line>
              </a-form-item>

              <div class="inner-title">触发条件</div>
              <a-form-item name="compare1">
                <div class="condition">
                  <div class="condition-item">
                    <normal-select
                      v-model="formData.recovery.arg"
                      text-align="left"
                      :visible-option-num="3"
                      placeholder="请选择"
                      :options="dataOptions"
                    ></normal-select>
                    <Line></Line>
                    <div class="tip">数据</div>
                  </div>
                  <div class="condition-item">
                    <normal-select
                      v-model="formData.triggering.compare"
                      text-align="left"
                      :visible-option-num="3"
                      placeholder="请选择"
                      :options="conditionOptions"
                    ></normal-select>
                    <Line></Line>
                    <div class="tip">关系</div>
                  </div>
                  <div class="condition-item">
                    <m-input-inner
                      v-model="formData.triggering.value"
                      placeholder="请输入"
                      type="number"
                    ></m-input-inner>
                    <Line></Line>
                    <div class="tip">值</div>
                  </div>
                </div>
              </a-form-item>

              <div class="inner-title">恢复条件</div>
              <a-form-item name="compare2">
                <div class="condition">
                  <div class="condition-item">
                    <normal-select
                      v-model="formData.recovery.arg"
                      text-align="left"
                      :visible-option-num="3"
                      placeholder="请选择"
                      :options="dataOptions"
                    ></normal-select>

                    <Line></Line>
                    <div class="tip">数据</div>
                  </div>
                  <div class="condition-item">
                    <normal-select
                      v-model="formData.recovery.compare"
                      text-align="left"
                      :visible-option-num="3"
                      placeholder="请选择"
                      :options="conditionOptions"
                    ></normal-select>
                    <Line></Line>
                    <div class="tip">关系</div>
                  </div>
                  <div class="condition-item">
                    <m-input-inner
                      v-model="formData.recovery.value"
                      placeholder="请输入"
                    ></m-input-inner>
                    <Line></Line>
                    <div class="tip">值</div>
                  </div>
                </div>
              </a-form-item>
            </form-card>
          </a-form>
        </div>
      </div>
    </div>
    <template #footer>
      <a-button type="primary" style="width: 90px" @click="onSave">保存</a-button>
    </template>
  </card>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'
  import icon from '@/assets/auto/shujgj_icon@2x.png'
  const router = useRouter()

  const sensorOptions = use.useSensorOptions()
  const conditionOptions = use.useConditionOptions()
  const dataOptions = use.useDataOptions()

  const formRef = ref(null)
  const formData = ref<any>({
    sensor: 1,
    triggering: {
      arg: '',
      compare: '',
      value: ''
    },
    recovery: {
      arg: '',
      compare: '',
      value: ''
    }
  })

  watch(
    () => formData.value.triggering.arg,
    (newVal) => {
      formData.value.recovery.arg = newVal
    }
  )

  watch(
    () => formData.value.recovery.arg,
    (newVal) => {
      formData.value.triggering.arg = newVal
    }
  )

  const rules = {
    sensor: [{ required: true, message: '请选择传感器', trigger: 'change' }],
    compare1: [
      {
        validator: (rule, value) => {
          if (!formData.value.triggering.arg) {
            return Promise.reject('请选择数据')
          }
          if (!formData.value.triggering.compare) {
            return Promise.reject('请选择触发条件关系')
          }
          if (!formData.value.triggering.value) {
            return Promise.reject('请输入触发条件值')
          }
          return Promise.resolve()
        },
        trigger: []
      }
    ],
    compare2: [
      {
        validator: (rule, value) => {
          if (!formData.value.recovery.arg) {
            return Promise.reject('请选择数据')
          }
          if (!formData.value.recovery.compare) {
            return Promise.reject('请选择恢复条件关系')
          }
          if (!formData.value.recovery.value) {
            return Promise.reject('请输入恢复条件值')
          }
          return Promise.resolve()
        },
        trigger: []
      }
    ]
  }

  const onSave = () => {
    formRef.value
      .validate()
      .then((res) => {
        const payload = { ...formData.value }
        console.log('payload', payload)
      })
      .catch((err) => {
        console.log('catch')
        message.error('请输入正确的数据')
      })
  }

  watch(
    formData,
    () => {
      formRef.value.clearValidate()
    },
    {
      deep: true
    }
  )
</script>

<style lang="less" scoped>
  .content {
    height: 100%;
    padding: 22px 20px;
    display: flex;
    flex-direction: column;

    .wrapper {
      flex: 1;
      overflow-y: auto;
    }
    .form {
      width: 466px;
      margin: 0 auto;

      .data-source {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .label {
          font-size: 18px;
        }
        .value {
          width: 280px;
        }
      }

      .inner-title {
        font-size: 18px;
        margin: 14px 0 10px 0;
      }

      .condition {
        display: flex;
        .condition-item {
          flex: 1;
          .tip {
            font-size: 12px;
            margin-top: 7px;
            color: #9ea0a6;
          }
        }
        .condition-item + .condition-item {
          margin-left: 18px;
        }
      }

      .wrapper-condition-operation + .wrapper-condition-operation {
        margin-top: 12px;
      }
    }
  }
</style>
