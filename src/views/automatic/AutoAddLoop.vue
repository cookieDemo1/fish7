<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">循环任务-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form>
            <a-form-item>
              <m-input placeholder="请输入任务名称"></m-input>
            </a-form-item>

            <form-title style="margin-top: 15px">运行时间</form-title>

            <form-card style="padding-top: 10px; padding-bottom: 10px">
              <div class="data-source">
                <div class="label">开始时间</div>
                <div class="value">
                  <form-item>
                    <m-select
                      placeholder="请选择开始时间"
                      :options="dataSourceOptions"
                      text-align="right"
                    >
                    </m-select>
                  </form-item>
                </div>
              </div>
              <Line></Line>

              <div class="data-source">
                <div class="label">结束时间</div>
                <div class="value">
                  <form-item>
                    <m-select
                      placeholder="请选择结束时间"
                      :options="dataSourceOptions"
                      text-align="right"
                    >
                    </m-select>
                  </form-item>
                </div>
              </div>
              <Line></Line>

              <div class="data-source">
                <div class="label">开启时长</div>
                <div class="value">
                  <form-item>
                    <m-select
                      placeholder="请选择开启时长"
                      :options="dataSourceOptions"
                      text-align="right"
                    >
                    </m-select>
                  </form-item>
                </div>
              </div>
              <Line></Line>

              <div class="data-source">
                <div class="label">关闭时长</div>
                <div class="value">
                  <form-item>
                    <m-select
                      placeholder="请选择关闭时长"
                      :options="dataSourceOptions"
                      text-align="right"
                    >
                    </m-select>
                  </form-item>
                </div>
              </div>
              <Line></Line>

              <div class="data-source">
                <div class="label">循环时长</div>
                <div class="value" style="text-align: right; font-size: 18px; font-weight: bold">
                  --小时
                </div>
              </div>
            </form-card>

            <form-title>执行操作</form-title>

            <loop-operation v-for="i in 7" :key="i" class="wrapper-loop-operation"></loop-operation>
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
  import icon from '@/assets/auto/xunh_icon@2x.png'
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

      .wrapper-loop-operation + .wrapper-loop-operation {
        margin-top: 12px;
      }
    }
  }
</style>
