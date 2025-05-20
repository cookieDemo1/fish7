export const useDeviceOptions = () => {
  const options = [
    { text: '1#罗茨风机', value: 1 },
    { text: '2#罗茨风机', value: 2 },
    { text: '循环水泵', value: 3 },
    { text: '紫外线杀菌灯', value: 4 },
    { text: '微型过滤机', value: 5 },
    { text: '微滤机喷水泵', value: 6 },
    { text: '蛋分机', value: 7 }
  ]
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
      value: 1
    },
    {
      text: '温度',
      value: 2
    },
    {
      text: 'PH',
      value: 3
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
      value: 1
    },
    {
      text: '＝',
      value: 2
    },
    {
      text: '＜',
      value: 3
    }
  ]
  return options
}
