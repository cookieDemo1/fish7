<template>
  <m-modal v-model="visible" :width="780">
    <div class="modal-content">
      <div class="modal-title">
        {{ title }}
        <svg-icon class="right-icon" name="guanbib_button" @click="visible = false"></svg-icon>
      </div>
      <div class="modal-body">
        <div class="childtask-list">
          <childtask-item
            v-for="(item, index) in subList"
            :key="index"
            :item="item"
            :show-actions="false"
            :show-collapse="true"
            @click="onOk(item)"
          ></childtask-item>
        </div>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: PropTypes.bool.def(false),
    title: PropTypes.string.def('')
  })
  const emit = defineEmits(['update:modelValue', 'callback'])

  const { subTask, getSubTask } = use.useMainStateAction('subTask')
  const subList = computed(() => {
    const { list = [] } = subTask.value || []
    return list
  })

  function resetAction() {
    getSubTask()
  }

  function onOk(item) {
    visible.value = false
    emit('callback', item)
  }

  const { visible, watchVisible } = use.useVisible({ props, emit })
  watchVisible(resetAction)
</script>

<style lang="less" scoped>
  .modal-body {
    height: 450px;
  }

  .childtask-list {
    height: 100%;
    width: 100%;
  }
</style>
