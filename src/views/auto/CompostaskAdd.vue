<template>
  <page-container>
    <div class="page-inner">
      <card-container class="card-container" :show-header="false">
        <div class="task">
          <div class="title">{{ $t('New automation') }}</div>
          <div class="items">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="item"
              @click="handleAddTask(item.task_type, item.routeName)"
            >
              <svg-icon class="icon" :name="item.icon"></svg-icon>
              <div class="name">{{ item.name }}</div>
              <svg-icon class="arrow" name="xiayib_icon"></svg-icon>
            </div>
          </div>
        </div>
      </card-container>
    </div>
  </page-container>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const props = defineProps({})
  const autoTaskStore = store.useAutoTask()
  const { taskType, tempComposTask } = toRefs(autoTaskStore)
  const list = ref([
    {
      name: t('Scene tasks'),
      icon: 'changjrw_icon',
      task_type: 'scene',
      routeName: 'compostaskScene'
    },
    {
      name: t('Scheduled tasks'),
      icon: 'dingsrw_icon',
      task_type: 'timer',
      routeName: 'compostaskTimer'
    },
    {
      name: t('Conditional tasks'),
      icon: 'tiaojrw_icon',
      task_type: 'condition',
      routeName: 'compostaskCondition'
    },
    { name: t('Cyclic task'), icon: 'xunh_icon', task_type: 'loop', routeName: 'compostaskLoop' }
  ])

  const router = useRouter()
  function handleAddTask(task_type, routeName) {
    taskType.value = task_type
    tempComposTask.value = JSON.parse(JSON.stringify(autoTaskStore.composTaskObj[task_type]))
    router.push({ name: routeName })
  }
</script>

<style scoped lang="less">
  .page-inner {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .card-container {
    width: 1800px;
  }
  .task {
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 24px;
      color: #dae4e5;
      margin-bottom: 20px;
    }
    .items {
      padding: 0 23px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        cursor: pointer;
        width: 400px;
        height: 300px;
        padding: 50px 0;
        background: #414a58;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 84px;
          height: 84px;
        }
        .name {
          margin-top: 20px;
          font-size: 23px;
          color: #dae4e5;
        }
        .arrow {
          margin-top: 50px;
          width: 32px;
          height: 25px;
        }
        & + .item {
          margin-left: 50px;
        }
      }
    }
  }
</style>
