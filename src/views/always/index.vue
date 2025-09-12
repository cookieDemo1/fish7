<template>
  <page-container>
    <div class="page-inner">
      <Tip />
      <div class="switch-list">
        <SwitchItem
          v-for="(item, index) in controlList"
          :key="index"
          class="switch-item-wrapper"
          :item="item"
        />
      </div>
    </div>
  </page-container>
</template>

<script setup lang="ts">
  import light from '@/assets/img/dengggb_icon@2x.png'

  import SwitchItem from './components/SwitchItem.vue'
  import Tip from './components/Tip.vue'

  const controlOptions = use.useDoumenControlOptions()

  const controlList = ref([])

  const tempList = {
    '6': { do: '6', name: '三色绿灯', icon: light },
    '7': { do: '7', name: '三色黄灯', icon: light },
    '8': { do: '8', name: '三色红灯', icon: light }
  }
  controlOptions.controlList.value.forEach((items) => {
    items.forEach((item) => {
      item.groups.forEach((group) => {
        group.items.forEach((i) => {
          if (!i.do.includes('di')) tempList[i.do] = { ...i, icon: i.icons[2] }
        })
      })
    })
  })

  const { always, getAlways } = use.useMainStateAction('always')
  getAlways()

  watch(always, (newVal) => {
    let tempAlways = []
    newVal.forEach((item) => {
      tempAlways.push({ ...item, icon: tempList[item.do].icon })
    })
    controlList.value = tempAlways
  })
</script>

<style scoped lang="less">
  .page-inner {
    width: 1300px;
    margin: 0 auto;
    padding: 20px;
    background-color: #1f2838;
    border-radius: 12px;
    height: 100%;
    overflow: auto;

    .switch-list {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .switch-item-wrapper + .switch-item-wrapper {
        margin-top: 20px;
      }
    }
  }
</style>
