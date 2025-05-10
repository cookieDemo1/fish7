export const useVisible = ({ props, emit }: VueComponentInput) => {
  const visible = computed({
    get: () => {
      return props.modelValue
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  })

  const watchVisible = (callback?: Function) => {
    watch(
      () => visible.value,
      (newValue) => {
        if (newValue && callback) {
          callback()
        }
      }
    )
  }
  return {
    visible,
    watchVisible
  }
}

type ShowActionName<T extends string> = {
  [Property in T as `show${Capitalize<Property>}`]: boolean
}
type HandleActionName<T extends string> = {
  [Property in T as `handle${Capitalize<Property>}`]: Function
}
type ReturnActions<T extends string> = {
  actions: ShowActionName<T> & HandleActionName<T> & { item: any }
}
export const useActions = <T extends string>(actionNames: T[]): ReturnActions<T> => {
  const actions: any = reactive({
    item: {}
  })
  actionNames.forEach((actionName) => {
    const showActionName = 'show' + actionName[0].toUpperCase() + actionName.slice(1)
    const handleActionName = 'handle' + actionName[0].toUpperCase() + actionName.slice(1)
    actions[showActionName] = false
    actions[handleActionName] = (data?: any) => {
      actions[showActionName] = true
      actions.item = data ?? {}
    }
  })
  return { actions }
}
