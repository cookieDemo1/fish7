import { defineStore } from 'pinia'
export const useRefreshStore = defineStore('refresh', () => {
  const radom = ref(Math.random())
  const setRadom = () => {
    radom.value = Math.random()
  }
  return {
    radom,
    setRadom
  }
})
