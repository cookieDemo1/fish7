<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">数据告警-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form>
            <form-card>
              <div class="data-source" style="margin-top: -10px">
                <div class="label">传感器</div>
                <div class="value">
                  <a-form-item style="margin-bottom: 0">
                    <m-select
                      placeholder="请选择传感器"
                      :options="dataSourceOptions"
                      text-align="right"
                    >
                    </m-select>
                  </a-form-item>
                </div>
              </div>
              <Line></Line>

              <div class="inner-title">触发条件</div>

              <div class="condition">
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <m-select placeholder="请选择"></m-select>
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">数据</div>
                </div>
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <m-select
                      placeholder="请选择"
                      :options="[
                        { value: 1, label: '>' },
                        { value: 2, label: '=' },
                        { value: 3, label: '<' }
                      ]"
                    ></m-select>
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">关系</div>
                </div>
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <m-input-inner></m-input-inner>
                    <!-- <m-select placeholder="请选择"></m-select> -->
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">值</div>
                </div>
              </div>

              <div class="inner-title">恢复条件</div>

              <div class="condition">
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <m-select placeholder="请选择"></m-select>
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">数据</div>
                </div>
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <m-select
                      placeholder="请选择"
                      :options="[
                        { value: 1, label: '>' },
                        { value: 2, label: '=' },
                        { value: 3, label: '<' }
                      ]"
                    ></m-select>
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">关系</div>
                </div>
                <div class="condition-item">
                  <a-form-item style="margin-bottom: 0">
                    <m-input-inner></m-input-inner>

                    <!-- <m-select placeholder="请选择"></m-select> -->
                  </a-form-item>
                  <Line></Line>
                  <div class="tip">值</div>
                </div>
              </div>
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
  import icon from '@/assets/auto/shujgj_icon@2x.png'
  const router = useRouter()

  const dataSourceOptions = ref([
    {
      value: 1,
      label: '1#罗茨风机'
    },
    {
      value: 2,
      label: '2#罗茨风机'
    },
    {
      value: 3,
      label: '循环水泵'
    },

    {
      value: 4,
      label: '紫外线杀菌灯'
    },
    {
      value: 5,
      label: '微型过滤机'
    },
    {
      value: 6,
      label: '微滤机喷水泵'
    },
    {
      value: 7,
      label: '电磁阀1'
    }
  ])

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
