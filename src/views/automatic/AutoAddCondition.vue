<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">条件任务-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form ref="formRef" :model="formData" :rules="rules">
            <m-form-item name="name">
              <m-input v-model="formData.name" placeholder="请输入任务名称"></m-input>
            </m-form-item>

            <form-title style="margin-top: 15px">执行条件</form-title>
            <m-form-item name="sensor">
              <form-card>
                <div class="data-source" style="margin-top: -10px">
                  <div class="label">数据源</div>
                  <div class="value">
                    <normal-select
                      v-model="formData.sensor.sensor_id"
                      :visible-option-num="3"
                      placeholder="请选择数据源"
                      :options="sensorOptions"
                    ></normal-select>
                  </div>
                </div>
                <Line></Line>

                <div class="inner-title">条件</div>

                <div class="condition">
                  <div class="condition-item">
                    <normal-select
                      v-model="formData.sensor.arg"
                      :visible-option-num="3"
                      placeholder="请选择"
                      text-align="left"
                      :options="dataOptions"
                    ></normal-select>
                    <Line></Line>
                    <div class="tip">数据</div>
                  </div>
                  <div class="condition-item">
                    <normal-select
                      v-model="formData.sensor.compare"
                      :visible-option-num="3"
                      placeholder="请选择"
                      text-align="left"
                      :options="conditionOptions"
                    ></normal-select>
                    <Line></Line>
                    <div class="tip">关系</div>
                  </div>
                  <div class="condition-item">
                    <m-input-inner
                      v-model="formData.sensor.value"
                      placeholder="请输入"
                    ></m-input-inner>
                    <Line></Line>
                    <div class="tip">值</div>
                  </div>
                </div>
              </form-card>
            </m-form-item>

            <form-title>执行操作</form-title>
            <m-form-item name="switch">
              <condition-operation
                v-for="(item, index) in options"
                :key="index"
                :item="item"
                class="wrapper-condition-operation"
              ></condition-operation>
            </m-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <template #footer>
      <a-button style="margin-right: 20px; width: 90px" @click="router.go(-1)">上一步</a-button>
      <a-button type="primary" style="width: 90px" @click="onSave">保存</a-button>
    </template>
  </card>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'

  import icon from '@/assets/auto/tiaojrw_icon@2x.png'
  const router = useRouter()

  const options = use.useDeviceOptions()
  const sensorOptions = use.useSensorOptions()
  const conditionOptions = use.useConditionOptions()
  const dataOptions = use.useDataOptions()

  const formRef = ref(null)
  const formData = ref<any>({
    name: '',
    sensor: {
      sensor_id: 1,
      arg: '',
      compare: '',
      value: ''
    },
    switch: []
  })

  const rules = {
    name: [{ required: true, message: '请输入任务名称', trigger: 'change' }],
    sensor: [
      {
        validator: (rule, value) => {
          if (!formData.value.sensor_id) {
            return Promise.reject('请选择数据源')
          }
          if (!formData.value.arg) {
            return Promise.reject('请选择数据')
          }
          if (!formData.value.compare) {
            return Promise.reject('请输入触发条件')
          }
          if (!formData.value.value) {
            return Promise.reject('请输入触发条件值')
          }
          return Promise.resolve()
        },
        trigger: []
      }
    ],
    switch: [
      {
        validator: (rule, value) => {
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
          width: 285px;
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
