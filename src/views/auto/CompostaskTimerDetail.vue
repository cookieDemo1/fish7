<template>
  <page-container>
    <div class="page-inner">
      <card-container class="card-container" :show-header="false">
        <div class="task">
          <div class="task-info">
            <div class="title">{{ autoTaskInfo.name || '--' }}</div>
            <div class="tags">
              <div class="task-type">
                <svg-icon class="icon" name="dingsrw_icon"></svg-icon>
                智能定时任务
              </div>
              <div v-if="autoTaskInfo.disable == '1'" class="task-status">已禁用</div>
            </div>

            <div class="container">
              <div class="content">
                <m-spin :spinning="loading">
                  <div class="task-item">
                    <div class="title">执行时间</div>
                    <div class="timer-card">
                      <div
                        v-for="(item, index) in autoTaskInfo.time"
                        :key="index"
                        class="timer-item"
                      >
                        <div class="info">
                          <svg-icon class="icon" name="ddshij_icon"></svg-icon>
                          <div>
                            <div class="name">{{ item.time }} {{ formatWeek(item) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="task-item">
                    <div class="title">执行任务</div>
                    <div class="childtask-list">
                      <div
                        v-for="(item, index) in autoTaskInfo.sub_tasks"
                        :key="index"
                        class="item"
                      >
                        <childtask-item
                          v-if="item.type == '1'"
                          :item="item"
                          :show-actions="false"
                        ></childtask-item>
                        <time-item v-else :item="item"> </time-item>
                      </div>
                    </div>
                  </div>
                </m-spin>
              </div>
            </div>
          </div>
        </div>

        <more-actions
          :menu-items="[autoTaskInfo.disable == '1' ? '启用' : '禁用', '修改', '删除']"
          @item-click="handleItemClick"
        ></more-actions>
      </card-container>
    </div>

    <modal-delete
      v-model="actions.showDelete"
      title="删除任务"
      message="确定删除该任务吗？"
      ok-text="删除"
      :item="actions.item"
      action-name="deleteAutoTaskTimer"
      @callback="handleBack"
    ></modal-delete>
  </page-container>
</template>

<script setup lang="ts">
  const props = defineProps({
    id: PropTypes.string.def('')
  })
  const emit = defineEmits([])
  const formatWeek = utils.formatWeek
  const autoTaskStore = store.useAutoTask()
  const { taskType, tempComposTask } = toRefs(autoTaskStore)

  const { autoTaskDetail, getAutoTaskDetail } = use.useMainStateAction('autoTaskDetail')

  getData()
  function getData() {
    const params = {
      id: props.id
    }
    getAutoTaskDetail(params)
  }

  const autoTaskInfo = computed<any>(() => {
    let res = {
      sub_tasks: []
    }
    if (autoTaskDetail.value) {
      const { sub_tasks = [] } = autoTaskDetail.value || {}
      res = {
        ...autoTaskDetail.value,
        sub_tasks: sub_tasks.map((item) => {
          if (item.type == '1' && item.sub_task) {
            return { ...item, ...item.sub_task }
          }
          return { ...item }
        })
      }
    }
    return res
  })

  function handleItemClick(type) {
    if (type == '0') {
      handleEnable()
    } else if (type == '1') {
      handleEdit()
    } else if (type == '2') {
      handleDelete()
    }
  }

  const loading = ref(false)
  const { postAutoTaskDisable } = use.useMainAction('postAutoTaskDisable')
  function handleEnable() {
    loading.value = true
    const params = {
      id: autoTaskInfo.value.id,
      disable: autoTaskInfo.value.disable == '1' ? '0' : '1'
    }
    postAutoTaskDisable(params)
      .then((res) => {
        loading.value = false
        if (res.code === 200) {
          getData()
        }
      })
      .catch((err) => {
        loading.value = false
      })
  }

  const router = useRouter()
  function handleBack() {
    router.back()
  }
  function handleEdit() {
    tempComposTask.value = {
      ...autoTaskInfo.value
    }
    router.push({ name: 'compostaskTimer', query: { type: 'edit' } })
  }
  function handleDelete() {
    actions.handleDelete(autoTaskInfo.value)
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
    width: 1300px;
  }

  .task {
    height: 100%;
    display: flex;
    flex-direction: column;
    .task-info {
      padding-left: 32px;
      .title {
        font-size: 28px;
        color: #dae4e5;
        margin-bottom: 16px;
      }
      .tags {
        display: flex;
        align-items: center;
        .task-type {
          height: 44px;
          padding: 0 20px;
          margin-right: 30px;
          background: fade(#fff, 15%);
          border-radius: 22px;
          font-size: 16px;
          color: #dae4e5;
          display: flex;
          align-items: center;

          .icon {
            width: 26px;
            height: 26px;
            margin-right: 8px;
          }
        }
        .task-status {
          padding: 0 20px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          background: #ff5446;
          border-radius: 28px;
          font-weight: 500;
          font-size: 16px;
          color: #1f2839;
        }
      }
    }

    .container {
      margin-top: 30px;
      flex: 1;
      overflow: auto;
      .content {
        width: 666px;
        margin: 0 auto;
      }
    }
  }

  .task-item {
    .title {
      font-size: 18px;
      color: #dae4e5;
      margin-bottom: 12px;
    }
    .childtask-list {
      .item + .item {
        margin-top: 20px;
      }
    }
    & + .task-item {
      .title {
        margin-top: 50px;
      }
    }
  }

  .timer-card {
    padding: 0 28px;
    background: #414a58;
    border-radius: 8px;
    overflow: hidden;

    .timer-item {
      height: 90px;
      display: flex;
      align-items: center;

      & + .timer-item {
        border-top: 1px solid fade(#dae4e5, 15%);
      }
    }

    .info {
      flex: 1;
      overflow: hidden;
      display: flex;
      align-items: center;
      .icon {
        width: 46px;
        height: 46px;
        margin-right: 24px;
      }
      .name {
        font-size: 20px;
        color: #dae4e5;
      }
    }

    .arrow {
      width: 9px;
      height: 16px;
    }
  }
</style>
