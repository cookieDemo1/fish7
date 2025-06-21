import { useVisible } from './index'
import { useMainAction } from './pinia'

interface UseFormParams {
  formData: any
  resetAction?: Function
  completeAction?: Function
  actionName: MainAction
}

export const useForm = (
  { props, emit },
  { formData, resetAction, completeAction, actionName }: UseFormParams
) => {
  const { [actionName]: action } = useMainAction(actionName)
  const { visible, watchVisible } = useVisible({ props, emit })
  const okButton = ref(false)
  const formRef = ref()
  const form = reactive({ ...formData })
  const changeForm = reactive<any>({})

  watchVisible(() => {
    okButton.value = false
    formRef.value?.resetFields()
    resetAction && resetAction()
  })

  function onOk() {
    okButton.value = true
    formRef.value
      .validate()
      .then(() => {
        const params = { ...form, ...changeForm }
        action(params)
          .then((res) => {
            okButton.value = false
            if (res.code === 200) {
              emit('callback')
              visible.value = false
              completeAction && completeAction()
            }
          })
          .catch((e) => {
            okButton.value = false
          })
      })
      .catch((e) => {
        setTimeout(() => {
          okButton.value = false
        }, 600)
      })
  }

  return { visible, okButton, form, formRef, changeForm, onOk }
}

export const useDelete = (
  { props, emit },
  { formData, resetAction, actionName }: UseFormParams
) => {
  const { [actionName]: action } = useMainAction(actionName)
  const { visible, watchVisible } = useVisible({ props, emit })
  const okButton = ref(false)
  const form = reactive({ ...formData })
  const changeForm = reactive({})

  watchVisible(() => {
    okButton.value = false
    resetAction && resetAction()
  })

  function onOk() {
    okButton.value = true
    const params = { ...form, ...changeForm }
    action(params)
      .then((res) => {
        okButton.value = false
        if (res.code === 200) {
          emit('callback')
          visible.value = false
        }
      })
      .catch(() => {
        okButton.value = false
      })
  }

  return { visible, okButton, form, changeForm, onOk }
}

export const useComfirm = (
  { props, emit },
  { formData, resetAction, actionName }: UseFormParams
) => {
  const { [actionName]: action } = useMainAction(actionName)
  const { visible, watchVisible } = useVisible({ props, emit })
  const okButton = ref(false)
  const form = reactive({ ...formData })
  const changeForm = reactive({})

  watchVisible(() => {
    okButton.value = false
    resetAction && resetAction()
  })

  function onOk() {
    okButton.value = true
    const params = { ...form, ...changeForm }
    action(params)
      .then((res) => {
        okButton.value = false
        if (res.code === 200) {
          emit('callback')
          visible.value = false
        }
      })
      .catch(() => {
        okButton.value = false
      })
  }

  return { visible, okButton, form, changeForm, onOk }
}
