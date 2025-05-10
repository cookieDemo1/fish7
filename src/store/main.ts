import mainRequests, { requestApi, RequestApi, Requests } from '@/api'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

interface Payload {
  [key: string]: any
  id?: string | number
  search?: object
}
type State = Partial<Record<keyof RequestApi, any>> & {
  loading: Partial<Record<keyof Requests, Boolean>>
}

export const useMainStore = defineStore('main', () => {
  const state: State = reactive({
    loading: {}
  })
  Object.entries(requestApi).forEach(([name, { methods }]) => {
    if (methods.includes('GET')) {
      state[name] = null
    }
  })

  // const loading: Partial<Record<keyof Requests, Boolean>> = ({} = reactive({}));
  Object.keys(mainRequests).forEach((key) => {
    state.loading[key] = false
  })

  function updateState(payload: any) {
    if (typeof payload !== 'object') {
      return
    }

    Object.keys(payload).forEach((key) => {
      state[key] = payload[key]
    })
  }

  const createActions = {
    GET: (actionKey: string | number, stateName: any) => (payload: Payload) => {
      return new Promise((resolve, reject) => {
        updateState({ loading: { ...state.loading, [actionKey]: true } })
        mainRequests[actionKey](payload)
          .then((res) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            const { code, data } = res
            if (code === 200) {
              updateState({ [stateName]: data })
            }
            resolve(res)
          })
          .catch((err) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            reject(err)
          })
      })
    },
    POST: (actionKey: string | number, stateName: any) => (payload: Payload) => {
      return new Promise((resolve, reject) => {
        updateState({ loading: { ...state.loading, [actionKey]: true } })
        mainRequests[actionKey](payload)
          .then((res) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            const { code, data } = res
            if (code === 200) {
              message.success('操作成功')
            }
            resolve(res)
          })
          .catch((err) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            resolve(err)
          })
      })
    },
    PUT: (actionKey: string | number, stateName: any) => (payload: Payload) => {
      return new Promise((resolve, reject) => {
        updateState({ loading: { ...state.loading, [actionKey]: true } })
        mainRequests[actionKey](payload)
          .then((res) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            const { code } = res
            if (code === 200) {
              message.success('操作成功')
            }
            resolve(res)
          })
          .catch((err) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            reject(err)
          })
      })
    },
    DELETE: (actionKey: string | number, stateName: any) => (payload: Payload) => {
      return new Promise((resolve, reject) => {
        updateState({ loading: { ...state.loading, [actionKey]: true } })
        mainRequests[actionKey](payload)
          .then((res) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            const { code } = res
            if (code === 200) {
              message.success('删除成功')
            }
            resolve(res)
          })
          .catch((err) => {
            updateState({ loading: { ...state.loading, [actionKey]: false } })
            reject(err)
          })
      })
    }
  }

  const actions: Partial<Record<keyof Requests, Function>> = {}
  Object.entries(requestApi).forEach(([name, { url, methods }]) => {
    methods.forEach((method) => {
      const actionKey = method.toLowerCase() + name[0].toUpperCase() + name.slice(1)
      actions[actionKey] = createActions[method](actionKey, name)
    })
  })

  // const obj = ;
  return { ...toRefs(state), ...actions }
})
