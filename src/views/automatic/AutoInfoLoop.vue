<template>
  <div class="auto-info-loop">
    <!-- <operation class="more" title="循环任务"></operation> -->

    <card :padding="[28, 20, 20, 20]">
      <!-- {{ item }} -->
      <title-auto :icon="icon">{{ item.name }}</title-auto>

      <a-row :gutter="[20, 12]">
        <a-col v-for="(item, index) in times" :key="index" :span="12">
          <div class="item">
            <span>{{ item.name }}：</span>
            <span>{{ item.value }}{{ item.unit ? item.unit : '' }}</span>
          </div>
        </a-col>
      </a-row>

      <Line style="margin: 24px 0"></Line>

      <title-auto-info title="操作设备"></title-auto-info>
      <card-second>
        <auto-info-item
          v-for="(item, index) in list"
          :key="index"
          class="auto-info-item-wrapper"
          :type="item.id"
          :name="item.name"
        ></auto-info-item>
      </card-second>
    </card>
  </div>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/xunh_icon@2x.png'
  const itemStore = store.useItemStore()
  const item = ref<any>({})
  const list = ref<any>([])
  const timeOptions = {
    '0': '秒钟',
    '1': '分钟',
    '2': '小时',
    '0.0': '秒钟',
    '1.0': '分钟',
    '2.0': '小时'
  }
  const times = ref<Array<any>>([
    { name: '开始时间', key: 'start', value: '--' },
    { name: '结束时间', key: 'end', value: '--' },
    { name: '关闭时长', key: 'shutdown_duration', value: '--', unitKey: 'shutdown_unit', unit: '' },
    { name: '开启时长', key: 'open_duration', value: '--', unitKey: 'open_unit', unit: '' },
    { name: '循环时长', key: 'cycle_duration', value: '--', unit: '小时' }
  ])
  watch(
    () => itemStore.item,
    (newVal) => {
      item.value = newVal
      list.value = newVal.list || []
      const tempItems = [...times.value]
      tempItems.forEach((item) => {
        item.value = newVal[item.key] !== null ? newVal[item.key] : '--'
        if (item.unitKey) {
          item.unit = timeOptions[newVal[item.unitKey]]
        }
      })
    },
    {
      immediate: true
    }
  )
  // const item = computed(() => itemStore.item)
</script>

<style lang="less" scoped>
  .auto-info-loop {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }

    .item {
      height: 42px;
      line-height: 42px;
      padding-left: 16px;
      font-size: 17px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }

    .auto-info-item-wrapper + .auto-info-item-wrapper {
      margin-top: 12px;
    }
  }
</style>
