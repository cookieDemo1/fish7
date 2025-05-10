import { useMainStateAction } from './pinia'

interface UseListParams {
  searchData?: any
  stateName: MainState
}

export const useList = ({ searchData, stateName }: UseListParams) => {
  const { loading, actionData, action } = useMainStateAction(stateName)
  const search = reactive({ ...searchData })

  const list = ref()

  function getList() {
    const params = { ...search }
    action(params)
  }

  watch(actionData, (newValue) => {
    if (newValue) {
      const { list: tempList } = newValue
      list.value = tempList
    }
  })

  return { loading, search, list, getList }
}

interface UseListActiveParams {
  list: Ref<any[]>
  stateName: MainState
  activeDataFun?: Function
}
export const useListActive = ({ list, stateName, activeDataFun }: UseListActiveParams) => {
  const activeIndex = ref(0)
  const activeItem = ref<any>({})
  const { loading, actionData, action: activeAction } = use.useMainStateAction(stateName)

  watch(list, (newValue) => {
    if (newValue) {
      if (activeIndex.value > newValue.length - 1) {
        activeIndex.value = 0
      }
    }
  })
  watch(
    () => [list.value, activeIndex.value],
    () => {
      if (activeDataFun) {
        activeDataFun()
      } else {
        getActiveData()
      }
    }
  )
  watch(actionData, (newValue) => {
    if (newValue) {
      activeItem.value = newValue
    }
  })

  function getActiveData() {
    const length = list.value.length
    const index = activeIndex.value

    if (index < length) {
      const item = list.value[index]
      const { garden_id } = item
      const params = { garden_id }
      activeAction(params)
    }
  }

  function handleActive(index) {
    activeIndex.value = index
  }
  return {
    activeIndex,
    activeItem,
    activeAction,
    handleActive,
    getActiveData
  }
}

export const usePushList = ({ stateName, searchData }: UseListParams) => {
  const { loading, actionData, action } = useMainStateAction(stateName)

  const pushSearch = reactive({ ...searchData })

  function getPushList() {
    const params = { ...pushSearch }
    action(params)
  }
  const pushList = ref<any>([])
  watch(actionData, (newValue) => {
    if (newValue) {
      pushList.value = newValue
    }
  })
  return {
    loading,
    pushSearch,
    pushList,

    getPushList
  }
}
