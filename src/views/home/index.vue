<template>
  <div class="home">
    <a-row :gutter="[14, 14]">
      <a-col v-for="(item, index) in switchList" :key="index" :span="6">
        <DeviceCardMode :item="item" @callback="() => getSwitch()" />
      </a-col>
    </a-row>
    <div class="char">
      <LineChar />
    </div>
  </div>
</template>

<script setup lang="ts">
  import DeviceCardMode from './DeviceCardMode.vue'

  import LineChar from './LineChar.vue'

  // switch是关键字需要重命名一下
  const { getSwitch, switch: switchState } = use.useMainStateAction('switch')
  getSwitch()

  const switchList = ref([])

  watch(switchState, (val) => {
    console.log(val)
    switchList.value = val
  })
</script>

<style lang="less" scoped>
  .home {
    .char {
      margin-top: 12px;
    }
  }
</style>
