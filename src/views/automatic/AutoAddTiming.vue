<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">定时任务-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form ref="formRef" :model="formData" :rules="rules">
            <m-form-item name="name">
              <m-input v-model="formData.name" placeholder="请输入任务名称"></m-input>
            </m-form-item>

            <form-title style="margin-top: 15px">执行日期</form-title>

            <m-form-item name="week">
              <form-card style="padding-top: 11px; padding-bottom: 11px">
                <div class="data-select">
                  <div
                    v-for="item in dataOptions"
                    :key="item.label"
                    :class="{
                      'data-select-item': true,
                      active: formData.week.includes(item.value)
                    }"
                    @click="handleWeekSelect(item.value)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </form-card>
            </m-form-item>
            <form-title>执行操作</form-title>
            <m-form-item name="switch">
              <timing-operation
                v-for="(item, index) in deviceOptions"
                :key="index"
                :item="item"
                class="wrapper-timing-operation"
              ></timing-operation>
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
  import icon from '@/assets/auto/dingsrw_icon@2x.png'
  import { message } from 'ant-design-vue'

  const router = useRouter()
  const formRef = ref(null)

  const deviceOptions = use.useDeviceOptions()

  const dataOptions = [
    { label: '一', value: 1 },
    { label: '二', value: 2 },
    { label: '三', value: 3 },
    { label: '四', value: 4 },
    { label: '五', value: 5 },
    { label: '六', value: 6 },
    { label: '日', value: 7 }
  ]
  const formData = ref({
    name: '',
    week: [],
    switch: []
  })

  const rules = {
    name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
    week: [
      {
        validator: (rule, value) => {
          if (!formData.value.week.length) {
            return Promise.reject('请选择执行日期')
          }
          return Promise.resolve()
        },
        trigger: []
      }
    ],
    switch: []
  }

  const handleWeekSelect = (value: number) => {
    const tempweek = [...formData.value.week]
    if (tempweek.includes(value)) {
      tempweek.splice(formData.value.week.indexOf(value), 1)
    } else {
      tempweek.push(value)
    }
    formData.value.week = tempweek
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

      .data-select {
        display: flex;
        justify-content: space-between;
        .data-select-item {
          height: 40px;
          width: 47px;
          text-align: center;
          line-height: 40px;
          background-attachment: fixed;
          border-radius: 32px;
          background-color: rgba(255, 255, 255, 0.2);
          color: #dae4e5;
          &.active {
            background-color: #00e4fb;
            color: #0c0c0c;
          }
        }
      }

      .wrapper-timing-operation + .wrapper-timing-operation {
        margin-top: 12px;
      }
    }
  }
</style>
