<template>
  <card>
    <div class="content">
      <title-auto :icon="icon">定时任务-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form>
            <a-form-item>
              <m-input placeholder="请输入任务名称"></m-input>
            </a-form-item>

            <form-title style="margin-top: 15px">执行日期</form-title>

            <form-card style="padding-top: 11px; padding-bottom: 11px">
              <div class="data-select">
                <div
                  v-for="item in dataOptions"
                  :key="item.label"
                  :class="{ 'data-select-item': true, active: form.date.includes(item.value) }"
                  @click="handleSelect(item.value)"
                >
                  {{ item.label }}
                </div>
              </div>
            </form-card>

            <form-title>执行操作</form-title>

            <timing-operation
              v-for="i in 7"
              :key="i"
              class="wrapper-timing-operation"
            ></timing-operation>
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
  const router = useRouter()

  const dataOptions = [
    { label: '一', value: 1 },
    { label: '二', value: 2 },
    { label: '三', value: 3 },
    { label: '四', value: 4 },
    { label: '五', value: 5 },
    { label: '六', value: 6 },
    { label: '日', value: 7 }
  ]

  const form = ref({
    date: []
  })

  const handleSelect = (value: number) => {
    const tempDate = [...form.value.date]
    if (tempDate.includes(value)) {
      tempDate.splice(form.value.date.indexOf(value), 1)
    } else {
      tempDate.push(value)
    }
    form.value.date = tempDate
  }

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
            background-color: #00e5e5;
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
