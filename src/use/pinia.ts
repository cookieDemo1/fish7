import { useMainStore } from '@/store/main'

type ReturnMainAction<T extends MainAction> = {
  action: (...args: any[]) => any
} & {
  [K in T]: (...args: any[]) => any
}
export const useMainAction = <T extends MainAction>(actionName: T): ReturnMainAction<T> => {
  const mainStore = useMainStore()
  const action = mainStore[actionName]
  const res: any = {
    action,
    [actionName]: action
  }
  return res
}

type ReturnMainStateAction<T extends MainState> = {
  loading: ComputedRef<any>
  actionData: Ref<any>
  action: (...args: any[]) => any
} & {
  [K in T]: Ref<any>
} & {
  [K in T as `get${Capitalize<K>}`]: (...args: any[]) => any
}
export const useMainStateAction = <T extends MainState>(stateName: T): ReturnMainStateAction<T> => {
  const mainStore = useMainStore()
  const { loading: actionLoading, [stateName]: actionData } = toRefs(mainStore)

  const loading = computed(() => {
    return actionLoading.value[actionName]
  })
  const actionName = (`get` + stateName[0].toUpperCase() + stateName.slice(1)) as MainAction
  const action = mainStore[actionName]

  const res: any = {
    loading,
    action,
    [actionName]: action,
    actionData,
    [stateName]: actionData
  }
  return res
}
