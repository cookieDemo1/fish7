<template>
  <div class="auto-info-condition">
    <card :padding="[28, 20, 20, 20]">
      <!-- {{ item }} -->
      <title-auto :icon="icon">{{ item.name }}</title-auto>
      <Line style="margin-bottom: 24px"></Line>
      <card-second>
        <div class="item">
          <span class="name">传感器：</span>
          {{ item.arg === 'DI8' ? '浮球开关' : '溶解氧+温度+PH 三合一传感器' }}
        </div>
        <div class="item">
          <span class="name">条件：</span>
          <span class="value"
            >{{ warningOption[item.arg] }}{{ compareOptions[item.compare] }}{{ item.value }}</span
          >
        </div>
      </card-second>

      <template v-if="open.length">
        <title-auto-info title="开启设备" style="margin-top: 24px"></title-auto-info>
        <card-second>
          <auto-info-item
            v-for="(item, index) in open"
            :key="index"
            class="auto-info-item-wrapper"
            :type="item.id"
            :name="item.name"
          ></auto-info-item>
        </card-second>
      </template>

      <template v-if="close.length">
        <title-auto-info title="关闭设备" style="margin-top: 24px"></title-auto-info>
        <card-second>
          <auto-info-item
            v-for="(item, index) in close"
            :key="index"
            class="auto-info-item-wrapper"
            :type="item.id"
            :name="item.name"
          ></auto-info-item>
        </card-second>
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/tiaojrw_icon@2x.png'

  const compareOptions = {
    '>': '＞',
    '=': '＝',
    '<': '＜'
  }
  const warningOption = {
    oxygen: '溶解氧',
    temp: '温度',
    ph: 'PH',
    DI8: 'DI8'
  }
  const test = {
    id: '91',
    name: '条件任务测试023',
    arg: 'DI8',
    compare: '=',
    value: '1',
    open: [
      { id: '1', name: '回水泵', action: '1' },
      { id: '2', name: '溶氧锥泵', action: '1' }
    ],
    close: []
  }
  const itemStore = store.useItemStore()
  const item = ref<any>({})
  const open = ref<Array<any>>([])
  const close = ref<Array<any>>([])
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
</script>

<style lang="less" scoped>
  .auto-info-condition {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }

    .item {
      font-size: 18px;
      font-weight: 600;
    }

    .item + .item {
      margin-top: 3px;
    }

    .auto-info-item-wrapper + .auto-info-item-wrapper {
      margin-top: 12px;
    }
  }
</style>
