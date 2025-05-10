<template>
  <div class="home">
    <a-row :gutter="[14, 14]">
      <a-col v-for="(item, index) in items" :key="index" :span="6">
        <DeviceCard :item="item" />
      </a-col>
    </a-row>
    <div class="char">
      <LineChar />
    </div>
  </div>
</template>

<script setup lang="ts">
  import DeviceCard from './DeviceCard.vue'
  import LineChar from './LineChar.vue'
  const items = ref([
    {
      type: 1,
      name: '1#罗茨风机',
      status: 0
    },
    {
      type: 1,
      name: '2#罗茨风机',
      status: 1
    },
    {
      type: 2,
      name: '循环水泵',
      status: 2
    },

    {
      type: 3,
      name: '紫外线杀菌灯',
      status: 2
    },
    {
      type: 4,
      name: '微型过滤机',
      status: 2
    },
    {
      type: 5,
      name: '微滤机喷水泵',
      status: 2
    },
    {
      type: 6,
      name: '电磁阀1',
      status: 1
    }
  ])
</script>

<style lang="less" scoped>
  .home {
    .char {
      margin-top: 12px;
    }
  }
</style>
