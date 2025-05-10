import { useMainStateAction } from './pinia'
interface UseTableParams {
  searchData?: any
  paginationData?: object
  stateName: MainState
}

export const useTable = ({ searchData, paginationData, stateName }: UseTableParams) => {
  const { loading, actionData, action } = useMainStateAction(stateName)

  const search = reactive({
    pageSize: 10,
    pageNum: 1,
    ...searchData
  })

  const list = ref<any[]>([])

  const pagination = reactive({
    total: 0,
    pageSize: search.pageSize,
    current: 1,
    onChange: handleTableChange,
    showTotal: (total) => `共 ${total} 台`,
    ...paginationData
  })

  function handleSearchChange() {
    search.pageNum = 1
    pagination.current = 1
    getList()
  }

  function handleTableChange(e, s) {
    const { pageSize } = search
    pagination.current = e
    search.pageNum = e
    pagination.pageSize = s
    search.pageSize = s
    getList()
  }

  function getList() {
    const params = { ...search }
    action(params)
  }

  watch(actionData, (newValue) => {
    if (newValue) {
      const { list: tempList = [], total } = newValue
      list.value = tempList
      pagination.total = total
    }
  })

  return {
    loading,
    search,
    list,
    pagination,

    handleSearchChange,
    handleTableChange,
    getList
  }
}

export const useTableRowSelection = () => {
  const rowSelection = reactive<any>({
    selectedRowKeys: [],
    onChange: (selectedRowKeys, selectedRows) => {
      rowSelection.selectedRowKeys = selectedRowKeys
    }
  })

  function resetSelectedRowKeys() {
    rowSelection.selectedRowKeys = []
  }

  return {
    rowSelection,
    resetSelectedRowKeys
  }
}

export const useTableCustomSelection = ({ list }) => {
  const rowSelection = reactive({
    // 当前选中的
    selectTotal: false,
    indeterminate: false,
    currentSelectedRowKeys: [],
    onSelectAll: (selected) => {
      if (rowSelection.selectTotal) {
        rowSelection.currentSelectedRowKeys = list.value.map((item) => item.key)
      } else {
        rowSelection.currentSelectedRowKeys = []
      }
    }
  })

  watch(
    () => rowSelection.currentSelectedRowKeys,
    () => {
      rowSelection.indeterminate =
        !!rowSelection.currentSelectedRowKeys.length &&
        rowSelection.currentSelectedRowKeys.length < list.value.length
      rowSelection.selectTotal =
        !!rowSelection.currentSelectedRowKeys.length &&
        rowSelection.currentSelectedRowKeys.length === list.value.length
    }
  )

  function resetSelectedRowKeys() {
    rowSelection.selectTotal = false
    rowSelection.indeterminate = false
    rowSelection.currentSelectedRowKeys = []
  }

  return {
    rowSelection,
    resetSelectedRowKeys
  }
}
