<template>
  <div class="auto-info-timing">
    <!-- <operation class="more" title="定时任务"></operation> -->

    <card :padding="[28, 20, 20, 20]">
      <!-- {{ item }} -->
      <title-auto :icon="icon">{{ item.name }}</title-auto>
      <div class="date">
        <span>执行日期：</span>
        <span>{{ weeks.join('、') }}</span>
      </div>

      <Line style="margin: 24px 0"></Line>

      <auto-info-timing-item
        v-for="(item, index) in list"
        :key="index"
        class="auto-info-timing-item-wrapper"
        :type="item.id"
        :item="item"
        :name="item.name"
      ></auto-info-timing-item>
    </card>
  </div>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/dingsrw_icon@2x.png'

  const weekOptions = {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日'
  }
  const itemStore = store.useItemStore()
  const item = ref<any>({})
  const list = ref<Array<any>>([])
  const weeks = ref<Array<any>>([])
  watch(
    () => itemStore.item,
    (newVal) => {
      item.value = newVal
      list.value = newVal.list || []
      weeks.value = newVal.week.split(',').map((v) => weekOptions[v])
    },
    {
      immediate: true
    }
  )
</script>

<style lang="less" scoped>
  .auto-info-timing {
    position: relative;

    .more {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 44px;
      height: 44px;
    }

    .date {
      font-size: 16px;
    }

    .auto-info-timing-item-wrapper + .auto-info-timing-item-wrapper {
      margin-top: 24px;
    }
  }
</style>
