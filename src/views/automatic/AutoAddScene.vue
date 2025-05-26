<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">场景任务-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form ref="formRef" :model="formData" :rules="rules">
            <!-- {{ formData }} -->
            <m-form-item name="name">
              <m-input v-model="formData.name" placeholder="请输入任务名称"></m-input>
            </m-form-item>

            <form-title style="margin-top: 15px">执行操作</form-title>
            <m-form-item name="switch">
              <condition-operation
                v-for="(item, index) in deviceOptions"
                :key="index"
                :item="item"
                class="wrapper-condition-operation"
                @change="handleChange"
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
  import icon from '@/assets/auto/changjrw_icon@2x.png'
  const router = useRouter()

  const deviceOptions = use.useDeviceOptions()
  const formRef = ref(null)

  const formData = ref({
    name: '',
    switch: []
  })

  const handleChange = (key, value) => {}

  const rules = {
    name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
    switch: [
      {
        validator: (rule, value) => {
          if (!formData.value.switch.length) {
            return Promise.reject('请选择执行操作')
          }
        },
        message: '请选择执行操作',
        trigger: ''
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
