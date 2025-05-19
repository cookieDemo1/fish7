<template>
  <div>
    <button @click="showTimePicker = true">选择时间</button>
    <div>当前时间: {{ currentTime }}</div>

    <TimePicker v-model="currentTime" v-model:show="showTimePicker" @confirm="onTimeConfirm" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const currentTime = ref('12:30:45')
  const showTimePicker = ref(false)

  const onTimeConfirm = (time) => {
    console.log('确认选择的时间:', time)
  }
</script>
