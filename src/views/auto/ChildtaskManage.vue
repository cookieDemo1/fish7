<template>
  <page-container>
    <div class="page-inner">
      <card-container class="card-container" :title="$t('Sub-task management')">
        <template #action>
          <m-button-link>
            <template #icon>
              <svg-icon class="action-icon" name="tianjia_icon" @click="handleAdd"></svg-icon>
            </template>
          </m-button-link>
        </template>
        <div v-if="list.length" class="list">
          <childtask-item
            v-for="(item, index) in list"
            :key="index"
            :item="item"
            @edit="handleEdit(item)"
            @delete="actions.handleDelete(item)"
          ></childtask-item>
        </div>
        <m-empty v-else></m-empty>
      </card-container>

      <modal-delete
        v-model="actions.showDelete"
        :title="$t('Delete the sub-task')"
        :message="$t('Are you sure to delete this sub-task?')"
        :ok-text="$t('Delete')"
        :item="actions.item"
        action-name="deleteSubTask"
        @callback="getData"
      ></modal-delete>
    </div>
  </page-container>
</template>

<script setup lang="ts">
  const autoTaskStore = store.useAutoTask()
  const { tempChildTask } = toRefs(autoTaskStore)

  const { subTask, getSubTask } = use.useMainStateAction('subTask')

  getData()
  function getData() {
    getSubTask()
  }
  const list = computed(() => {
    let res = []
    if (subTask.value) {
      const { list = [] } = subTask.value || {}
      res = list
    }
    return res
  })

  const router = useRouter()
  function handleAdd() {
    tempChildTask.value = {
      name: '',
      ope: []
    }
    router.push({ name: 'childtaskAdd' })
  }

  function handleEdit(item) {
    tempChildTask.value = {
      ...item
    }
    router.push({ name: 'childtaskAdd', query: { type: 'edit' } })
  }

  const { actions } = use.useActions(['delete'])
</script>

<style scoped lang="less">
  .page-inner {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .card-container {
    width: 750px;
    .action-icon {
      width: 28px;
      height: 28px;
    }
  }
</style>
