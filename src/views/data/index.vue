<template>
  <div class="data">
    <div>
      <Meter :data="meter"></Meter>
    </div>
    <div class="char" style="margin-top: 16px">
      <LineChar />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Meter from './Meter.vue'
  import LineChar from './LineChar.vue'

  const { char, getChar, loading } = use.useMainStateAction('char')
  const meter = ref({})
  watch(
    char,
    (val) => {
      const { date, sensor_data = { s20b: {} }, status, x, y } = val || {}
      const { ele } = sensor_data
      if (ele) {
        meter.value = ele
      }
    },
    {
      immediate: true
    }
  )
</script>

<style lang="less" scoped></style>
