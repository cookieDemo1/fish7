import { useFullscreen as vueUseFullscreen } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const pageContent = ref<HTMLElement>(document.body)
  const { isFullscreen, toggle: toggleFullScreen } = vueUseFullscreen(pageContent)

  const resetPosition = utils.createDebounce(tempResetPosition, 300)
  const resizeChange = ref(true)
  function tempResetPosition() {
    resizeChange.value = false
    nextTick(() => {
      resizeChange.value = true
    })
  }
  use.useResetPosition({ resetPosition })

  const isRouterAlive = ref(true)
  function refreshRouteView() {
    isRouterAlive.value = false
    nextTick(() => {
      isRouterAlive.value = true
    })
  }

  const globalFunction: any = {
    refresh: new Function()
  }
  function registerFunction(func) {
    globalFunction.refresh = func
  }

  return {
    pageContent,
    isFullscreen,
    toggleFullScreen,
    resizeChange,
    isRouterAlive,
    refreshRouteView,
    globalFunction,
    registerFunction
  }
})
