export const times = Array.from(Array(24))
  .map((item, index) => {
    const hh = index < 10 ? '0' + index : '' + index
    return Array.from(Array(12)).map((item, index) => {
      const mm = index < 2 ? '0' + index * 5 : '' + index * 5
      return `${hh}:${mm}`
    })
  })
  .concat(['24:00'])
  .flat()
export const createDebounce = (fn, delay) => {
  let timer // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timer) // 每当用户操作把前一个 setTimeout clear 掉
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

export const getTimer = (delay = 5000, timeout = 5 * 60 * 1000) => {
  let timer
  // const start = new Date().getTime();
  function startTimer(fn: Function) {
    timer = setInterval(() => {
      // const now = new Date().getTime();
      // if (timeout !== 0 && now - start >= timeout) {
      // 	//超时
      // 	fn && fn(true);
      // 	stopTimer();
      // } else {
      // 	fn && fn(false);
      // }
      fn && fn(false)
    }, delay)
  }
  function stopTimer() {
    clearInterval(timer)
    timer = null
  }

  return { startTimer, stopTimer }
}

export const getStorage = (key: string, defaultValue?: any) => {
  if (!key) {
    throw new Error('key 不能为空！')
  }
  const value = window.localStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  }
  return defaultValue
}

export const setStorage = (key: string, value: any) => {
  if (!key) {
    throw new Error('key 不能为空！')
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage = (key: string) => {
  if (!key) {
    throw new Error('key 不能为空！')
  }
  window.localStorage.removeItem(key)
}

export const checkAccountRule = (rule: any, value: string) => {
  return new Promise<void>((resolve, reject) => {
    if (/^[0-9a-zA-Z]{10,16}$/.test(value)) {
      resolve()
    } else {
      reject()
    }
  })
}

export function toSeconds(time = '') {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  const res = hours * 3600 + minutes * 60 + seconds
  return res
}

export function secondsTostring(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  let result = ''
  if (h > 0) result += `${h}小时`
  if (m > 0) result += `${m}分钟`
  if (s > 0) result += `${s}秒`
  return result || '0秒' // 处理秒数为0的情况
}

const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export function formatWeek(item: any) {
  const res = Array.from(Array(7))
    .map((i, index) => {
      return item[`w${index + 1}`] == '1' ? weekOptions[index] : ''
    })
    .filter((item) => item)
  return res.length === 7 ? '每天' : res.join('、')
}

export function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  // 格式化输出（补零处理）
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    secs
  ).padStart(2, '0')}`
}
