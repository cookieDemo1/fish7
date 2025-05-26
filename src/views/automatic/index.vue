<template>
  <div class="auto-index">
    <card class="task">
      <div class="container">
        <m-loading :loading="taskLoading" tip="加载中..." :full="false"></m-loading>
        <div class="title">
          <span>执行任务</span>
          <!-- 添加先隐藏 -->
          <img class="add-icon" src="@/assets/auto/tianjia_icon@2x.png" alt="" @click="addTast" />
        </div>
        <div class="content">
          <template
            v-if="
              !taskLoading &&
              (taskList?.sense?.length ||
                taskList?.timer?.length ||
                taskList?.condition?.length ||
                taskList?.circulation?.length)
            "
          >
            <template v-if="taskList?.sense?.length">
              <div class="task-title">场景任务</div>
              <a-row :gutter="[12, 12]">
                <a-col v-for="(item, index) in taskList.sense" :key="index" :span="12">
                  <task-card :item="item" :type="1">{{ item.name }}</task-card>
                </a-col>
              </a-row>
            </template>
            <template v-if="taskList?.timer?.length">
              <div class="task-title" style="margin-top: 20px">定时任务</div>
              <a-row :gutter="[12, 12]">
                <a-col v-for="(item, index) in taskList.timer" :key="index" :span="12">
                  <task-card :item="item" :type="2">{{ item.name }}</task-card>
                </a-col>
              </a-row>
            </template>

            <template v-if="taskList?.condition?.length">
              <div class="task-title" style="margin-top: 20px">条件任务</div>
              <a-row :gutter="[12, 12]">
                <a-col v-for="(item, index) in taskList.condition" :key="index" :span="12">
                  <task-card :item="item" :type="3">{{ item.name }}</task-card>
                </a-col>
              </a-row>
            </template>

            <template v-if="taskList?.circulation?.length">
              <div class="task-title" style="margin-top: 20px">循环任务</div>
              <a-row :gutter="[12, 12]">
                <a-col v-for="(item, index) in taskList.circulation" :key="index" :span="12">
                  <task-card :item="item" :type="4">{{ item.name }}</task-card>
                </a-col>
              </a-row>
            </template>
          </template>
          <template
            v-if="
              !taskLoading &&
              !(
                taskList?.sense?.length ||
                taskList?.timer?.length ||
                taskList?.condition?.length ||
                taskList?.circulation?.length
              )
            "
          >
            <empty>未设置执行任务</empty>
          </template>
        </div>
      </div>
    </card>
    <card class="warning">
      <div class="container">
        <m-loading :loading="warningLoading" tip="加载中..." :full="false"></m-loading>

        <div class="title">
          <span>数据告警</span>
          <!-- 添加先隐藏 -->
          <img
            class="add-icon"
            src="@/assets/auto/tianjia_icon@2x.png"
            alt=""
            @click="addWarning"
          />
        </div>
        <div class="content">
          <template v-if="warningList?.list?.length && !warningLoading">
            <warning-card
              v-for="(item, index) in warningList.list"
              :key="index"
              :item="item"
              class="warning-wrap-card"
              title="溶解氧+温度+PH 三合一传感器"
            ></warning-card>
          </template>
          <template v-if="!warningList?.list?.length && !warningLoading">
            <empty>未设置数据告警</empty>
          </template>
        </div>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()

  const {
    warningList,
    getWarningList,
    loading: warningLoading
  } = use.useMainStateAction('warningList')

  const { taskList, getTaskList, loading: taskLoading } = use.useMainStateAction('taskList')
  getWarningList()
  getTaskList()

  watch(warningList, () => {
    console.log('warningList', warningList.value)
  })

  watch(taskList, () => {
    console.log('taskList', taskList.value)
  })
  const addTast = () => {
    router.push('/auto-add-overview')
  }

  const addWarning = () => {
    router.push('/warning-add')
  }

  const warningOption = {
    oxygen: '溶解氧',
    temp: '温度',
    ph: 'PH'
  }
</script>

<style lang="less" scoped>
  .auto-index {
    width: 100%;
    height: 100%;
    display: flex;
    .task {
      flex: 1;
      margin-right: 12px;

      .task-title {
        font-size: 16px;
        color: #b6b8bf;
        margin-bottom: 12px;
      }
    }
    .warning {
      flex: 1;

      .warning-wrap-card + .warning-wrap-card {
        margin-top: 12px;
      }
    }
    .container {
      // display: flex;
      // flex-direction: column;
      position: relative;

      height: 100%;
      .title {
        height: 69px;
        border-bottom: 1px solid rgba(218, 228, 229, 0.15);
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 17px;
        font-weight: bold;
        .add-icon {
          width: 28px;
          height: 28px;
        }
      }
      .content {
        height: calc(100% - 69px);
        // height: 0;
        // flex: 1;
        padding: 20px;
        overflow-y: scroll;
      }
    }
  }
</style>
