<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">条件任务-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form>
            <a-form-item>
              <m-input placeholder="请输入任务名称"></m-input>
            </a-form-item>

            <form-title style="margin-top: 15px">执行条件</form-title>

            <form-card>
              <div class="data-source" style="margin-top: -10px">
                <div class="label">数据源</div>
                <div class="value">
                  <a-form-item style="margin-bottom: 0">
                    <normal-select
                      :visible-option-num="3"
                      placeholder="请选择数据源"
                      :options="sensorOptions"
                    ></normal-select>
                  </a-form-item>
                </div>
              </div>
              <Line></Line>

              <div class="inner-title">条件</div>

              <div class="condition">
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <normal-select
                      :visible-option-num="3"
                      placeholder="请选择"
                      text-align="left"
                      :options="dataOptions"
                    ></normal-select>
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">数据</div>
                </div>
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <normal-select
                      :visible-option-num="3"
                      placeholder="请选择"
                      text-align="left"
                      :options="conditionOptions"
                    ></normal-select>
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">关系</div>
                </div>
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <m-input-inner></m-input-inner>
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">值</div>
                </div>
              </div>
            </form-card>

            <form-title>执行操作</form-title>

            <condition-operation
              v-for="(item, index) in options"
              :key="index"
              :item="item"
              class="wrapper-condition-operation"
            ></condition-operation>
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
  const onSave = () => {
    console.log('onSave')
  }
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
          width: 250px;
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
