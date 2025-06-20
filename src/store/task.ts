import { defineStore } from 'pinia'

// 子任务的修改
export const useAutoTask = defineStore('task', () => {
  const tempChildTask = ref<any>({
    name: '',
    ope: []
  })
  const taskType = ref<'scene' | 'timer' | 'condition' | 'loop'>('scene')

  const scene = {
    typeName: '场景任务',
    name: '',
    sub_tasks: []
  }

  const timer = {
    typeName: '定时任务',
    name: '',
    time: [
      // {
      // 	time: '',
      // 	w1: '',
      // 	w2: '',
      // 	w3: '',
      // 	w4: '',
      // 	w5: '',
      // 	w6: '',
      // 	w7: ''
      // }
    ],
    sub_tasks: []
  }

  const condition = {
    typeName: '条件任务',
    name: '',
    sensor_type: '',
    sensor_id: 0,
    arg: '',
    compare: '>',
    value: '',
    sub_tasks: []
  }

  const loop = {
    typeName: '循环任务',
    name: '',
    time: '',
    interval: 0,
    sub_tasks: []
  }

  const composTaskObj = {
    scene,
    timer,
    condition,
    loop
  }

  const tempComposTask = ref<any>({ ...loop })

  const tempTaskWarning = ref<any>({
    sensor_id: '',
    triggering: {
      arg: '',
      compare: '>',
      value: ''
    },
    recovery: {
      arg: '',
      compare: '<',
      value: ''
    },
    delay: 0,
    sms: '0',
    contacts: []
  })

  return {
    composTaskObj,
    tempChildTask,
    taskType,
    tempComposTask,
    tempTaskWarning
  }
})
