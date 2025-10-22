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
  import SwitchItem from './components/SwitchItem.vue'
  import Tip from './components/Tip.vue'

  const imgMap = constant.imgMap

  const controlList = ref([])

  const { always, getAlways } = use.useMainStateAction('always')
  getAlways()

  watch(always, (newVal) => {
    let tempAlways = []
    newVal.forEach((item) => {
      tempAlways.push({ ...item, icon: imgMap[item.icon_type][2] })
    })
    controlList.value = tempAlways
  })
</script>

<style scoped lang="less">
  .page-inner {
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
