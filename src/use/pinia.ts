import { useMainStore } from '@/store/main'

export const useMainState = <T extends MainState[]>(
  states: T
): Record<T[number] | 'loading', Ref<any>> => {
  const mainStore = useMainStore()
  const mainState = toRefs(mainStore)

  const res: any = {}
  res['loading'] = mainState['loading']
  states.map((key) => {
    res[key] = mainState[key]
  })
  return res
}

export const useMainActions = <T extends MainAction[]>(actions: T): Record<T[number], Function> => {
  const mainStore: any = useMainStore()
  const res: any = {}
  actions.map((key) => {
    res[key] = mainStore[key]
  })
  return res
}

type ReturnMainStateAction<T extends MainState> = {
  loading: ComputedRef<any>
  actionData: Ref<any>
  action: Function
} & {
  [K in T]: Ref<any>
} & {
  [K in T as `get${Capitalize<K>}`]: Function
}
export const useMainStateAction = <T extends MainState>(stateName: T): ReturnMainStateAction<T> => {
  const actionName = (`get` + stateName[0].toUpperCase() + stateName.slice(1)) as MainAction
  const { loading: actionLoading, [stateName]: actionData } = useMainState([stateName])
  const { [actionName]: action } = useMainActions([actionName])
  const loading = computed(() => {
    return actionLoading.value[actionName]
  })
  const res: any = {
    loading,
    actionData,
    action,
    [stateName]: actionData,
    [actionName]: action
  }
  return res
}
