<template>
  <div class="auto-index">
    <card class="task">
      <div class="container">
        <div class="title">
          <span>执行任务</span>
          <img class="add-icon" src="@/assets/auto/tianjia_icon@2x.png" alt="" @click="addTast" />
        </div>
        <div class="content">
          <template v-if="false">
            <empty>未设置执行任务</empty>
          </template>
          <template v-else>
            <div class="task-title">场景任务</div>
            <a-row :gutter="[12, 12]">
              <a-col v-for="i in 5" :key="i" :span="12">
                <task-card>一键过滤过滤过滤过滤过滤过滤过滤过滤</task-card>
              </a-col>
            </a-row>
            <div class="task-title" style="margin-top: 20px">定时任务</div>
            <a-row :gutter="[12, 12]">
              <a-col v-for="i in 5" :key="i" :span="12">
                <task-card :type="2">一键过滤过滤过滤过滤过滤过滤过滤过滤</task-card>
              </a-col>
            </a-row>

            <div class="task-title" style="margin-top: 20px">条件任务</div>
            <a-row :gutter="[12, 12]">
              <a-col v-for="i in 5" :key="i" :span="12">
                <task-card :type="3">一键过滤过滤过滤过滤过滤过滤过滤过滤</task-card>
              </a-col>
            </a-row>
            <div class="task-title" style="margin-top: 20px">循环任务</div>
            <a-row :gutter="[12, 12]">
              <a-col v-for="i in 5" :key="i" :span="12">
                <task-card :type="4">一键过滤过滤过滤过滤过滤过滤过滤过滤</task-card>
              </a-col>
            </a-row>
          </template>
        </div>
      </div>
    </card>
    <card class="warning">
      <div class="container">
        <div class="title">
          <span>数据告警</span>
          <img
            class="add-icon"
            src="@/assets/auto/tianjia_icon@2x.png"
            alt=""
            @click="addWarning"
          />
        </div>
        <div class="content">
          <template v-if="false">
            <empty>未设置数据告警</empty>
          </template>
          <template v-else>
            <warning-card
              v-for="i in 5"
              :key="i"
              class="warning-wrap-card"
              title="溶解氧+水温+PH传感器"
            ></warning-card>
          </template>
        </div>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
  const addTast = () => {
    router.push('/auto-add-overview')
  }

  const addWarning = () => {
    console.log('add warning')
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
