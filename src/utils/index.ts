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
