<template>
  <div class="add-actions">
    <div v-if="type === 'addDevice'" class="add-item" @click="actions.showAddDevice = true">
      <svg-icon class="icon" name="zirenw_an_icon"></svg-icon>
      <div class="name">{{ $t('Add device') }}</div>
    </div>
    <div v-if="type === 'addTask'" class="add-item" @click="actions.showAddTask = true">
      <svg-icon class="icon" name="zirenw_an_icon"></svg-icon>
      <div class="name">{{ $t('Add sub-tasks') }}</div>
    </div>
    <div class="line"></div>
    <div class="add-item" @click="actions.showAddTime = true">
      <svg-icon class="icon" name="shij_an_icon"></svg-icon>
      <div class="name">{{ $t('Add the waiting duration') }}</div>
    </div>
  </div>

  <modal-device-add
    v-model="actions.showAddDevice"
    :title="$t('Add device')"
    @callback="handleAddDevice"
  >
  </modal-device-add>
  <modal-childtask-add
    v-model="actions.showAddTask"
    :title="$t('Add sub-tasks')"
    @callback="handleAddTask"
  >
  </modal-childtask-add>
  <modal-time-picker
    v-model="actions.showAddTime"
    :title="$t('Add the waiting duration')"
    @callback="handleAddTime"
  ></modal-time-picker>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: PropTypes.oneOf(['addDevice', 'addTask']).def('addTask')
  })
  const emit = defineEmits([])

  const toSeconds = utils.toSeconds

  function handleAddDevice(item) {
    emit('callback', { ...item, type: '1' })
  }
  function handleAddTask(item) {
    emit('callback', { ...item, type: '1' })
  }

  function handleAddTime(time) {
    const seconds = toSeconds(time)
    emit('callback', {
      type: '2',
      seconds
    })
  }
  const { actions } = use.useActions(['addDevice', 'addTask', 'addTime'])
</script>

<style scoped lang="less">
  .add-actions {
    height: 90px;
    background: #414a58;
    border-radius: 8px;
    margin-top: 20px;
    // margin-top: 24px;

    display: flex;
    align-items: center;

    .add-item {
      height: 100%;
      position: relative;
      cursor: pointer;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 48px;
        height: 48px;
      }
      .name {
        margin-left: 20px;
        font-size: 20px;
        color: #dae4e5;
      }
    }
    .line {
      width: 1px;
      height: 90px;
      background: fade(#dae4e5, 15%);
    }
  }
</style>
