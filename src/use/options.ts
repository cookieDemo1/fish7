export const useDeviceOptions = () => {
  const { getSwitch, switch: switchState } = use.useMainStateAction('switch')
  const options = ref([])
  if (!options.value.length) {
    getSwitch()
  }

  watch(
    switchState,
    (newVal) => {
      if (newVal) {
        options.value = []
        for (let i = 0; i < newVal.length; i++) {
          options.value.push({ text: newVal[i].name, value: newVal[i].id })
        }
      }
    },
    {
      immediate: true
    }
  )

  return options
}

export const useTimeOptions = () => {
  const options = [
    { text: '秒钟', value: 1 },
    { text: '分钟', value: 2 },
    { text: '小时', value: 3 }
  ]
  return options
}

export const useDataOptions = () => {
  const options = [
    {
      text: '溶解氧',
      value: 'oxygen'
    },
    {
      text: '温度',
      value: 'temp'
    },
    {
      text: 'PH',
      value: 'ph'
    }
  ]
  return options
}

export const useSensorOptions = () => {
  const options = [
    {
      text: '溶解氧+温度+PH 三合一传感器',
      value: 1
    }
  ]
  return options
}

export const useConditionOptions = () => {
  const options = [
    {
      text: '＞',
      value: '>'
    },
    {
      text: '＝',
      value: '='
    },
    {
      text: '＜',
      value: '<'
    }
  ]
  return options
}
