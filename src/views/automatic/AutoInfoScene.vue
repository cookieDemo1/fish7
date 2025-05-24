<template>
  <div class="auto-info-scene">
    <!-- <operation class="more" title="场景任务"></operation> -->

    <card :padding="[28, 20, 20, 20]">
      <!-- {{ item }} -->
      <title-auto :icon="icon">{{ item.name }}</title-auto>

      <div :class="{ execute: true, loading: loading }" @click="onEcecute">
        <div v-if="!loading" class="execute-inner">立即执行</div>
        <img v-if="loading" class="loading-icon" src="@/assets/auto/loading_exe.png" />
      </div>

      <template v-if="open?.length">
        <title-auto-info title="开启设备" sub-title="开关状态"></title-auto-info>
        <card-second>
          <auto-info-item
            v-for="(item, index) in open"
            :key="index"
            class="auto-info-item-wrapper"
            :type="item.id"
            :name="item.name"
            :status="item.action"
            :index="index"
            :result="execOpen"
            :success-value="true"
          ></auto-info-item>
        </card-second>
      </template>

      <template v-if="close?.length">
        <title-auto-info
          title="关闭设备"
          sub-title="开关状态"
          style="margin-top: 28px"
        ></title-auto-info>
        <card-second>
          <auto-info-item
            v-for="(item, index) in close"
            :key="index"
            class="auto-info-item-wrapper"
            :type="item.id"
            :name="item.name"
            :status="item.action"
            :index="index"
            :result="execClose"
            :success-value="false"
          ></auto-info-item>
        </card-second>
      </template>

      <!-- <div class="title">
        <img src="@/assets/auto/changjrw_icon@2x.png" alt="" />
        <span>一键浇水</span>
      </div> -->
    </card>
  </div>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/changjrw_icon@2x.png'
  import { message } from 'ant-design-vue'
  const { postExecuteTask } = use.useMainActions(['postExecuteTask'])
  const itemStore = store.useItemStore()

  const loading = ref(false)

  const item = ref<any>({})
  const open = ref<Array<any>>([])
  const close = ref<Array<any>>([])

  // 执行结果
  const execOpen = ref<Array<any>>([])
  const execClose = ref<Array<any>>([])

  watch(
    () => itemStore.item,
    (newVal) => {
      item.value = newVal
      open.value = newVal.open || []
      close.value = newVal.close || []
    },
    {
      immediate: true
    }
  )

  const onEcecute = () => {
    const payload = {
      task_id: item.value.id
    }

    loading.value = true
    postExecuteTask(payload)
      .then((res) => {
        if (res.code === 200) {
          message.success('执行完成')
          execOpen.value = res.data.open || []
          execClose.value = res.data.close || []
        } else {
          message.error('执行失败')
        }
      })
      .catch((err) => {
        message.error('执行失败')
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<style lang="less" scoped>
  @keyframes rotate360 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  .auto-info-scene {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }
    .execute {
      width: 158px;
      height: 158px;
      position: relative;
      margin: 59px auto 52px;
      border-radius: 50%;
      background-color: rgba(22, 206, 103, 0.3);
      &.loading {
        background-color: rgba(22, 206, 103, 0.2);
      }
      .execute-inner {
        width: 144px;
        height: 144px;
        text-align: center;
        line-height: 144px;
        font-size: 22px;
        font-weight: bold;
        color: #0c0c0c;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #16ce67;
        border-radius: 50%;
      }
    }

    .loading-icon {
      width: 64px;
      height: 64px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: rotate360 1.6s infinite linear;
    }

    .auto-info-item-wrapper + .auto-info-item-wrapper {
      margin-top: 12px;
    }
  }
</style>
