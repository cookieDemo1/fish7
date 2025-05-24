import { defineStore } from 'pinia'
export const useItemStore = defineStore('item', () => {
  // 保存正在操作的item. 有些查看详情，或者修改的item。是路由跳转的方式，跳转前存item, 在跳转到的页面取item
  const item = ref<any>({})
  const setItem = (payload) => {
    item.value = payload
  }
  return {
    item,
    setItem
  }
})
