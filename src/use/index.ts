export * from './pinia'
export * from './modal'
export * from './table'
export * from './list'
export * from './form'
export * from './options'
export * from './lang'

export const useResetPosition = ({ resetPosition }: { resetPosition: Function }) => {
  function tempResetPosition() {
    nextTick(() => {
      resetPosition && resetPosition()
    })
  }
  // const debounce = createDebounce(tempResetPosition, 300);
  onMounted(() => {
    resetPosition()
    window.addEventListener('resize', tempResetPosition)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', tempResetPosition)
  })
}
