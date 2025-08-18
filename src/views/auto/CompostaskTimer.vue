<template>
  <page-container>
    <div class="page-inner">
      <card-container class="card-container" :show-header="false">
        <div class="task">
          <div class="title">
            <svg-icon class="icon" name="dingsrw_icon"></svg-icon>{{ $t('Scheduled tasks') }}
            -
            {{ type === 'add' ? $t('Add') : $t('Edit') }}
          </div>
          <div class="container">
            <div class="content">
              <m-form ref="formRef" class="form" :model="form" :rules="rules">
                <m-form-item label="" name="name">
                  <m-input
                    v-model="form.name"
                    :placeholder="$t('Please fill in the task name')"
                    :maxlength="20"
                  ></m-input>
                </m-form-item>

                <m-form-item :label="$t('Execution time')" name="time">
                  <div class="timer-card">
                    <div
                      v-for="(item, index) in form.time"
                      :key="index"
                      class="timer-item"
                      @click="actions.handleWeek({ type: 'edit', index })"
                    >
                      <div class="info">
                        <svg-icon class="icon" name="ddshij_icon"></svg-icon>
                        <div>
                          <div class="name">{{ item.time }} {{ formatWeek(item) }}</div>
                        </div>
                      </div>
                      <svg-icon class="arrow" name="jiantou_icon"></svg-icon>
                    </div>
                  </div>
                  <div class="action-add">
                    <div class="add-item" @click="actions.handleWeek({ type: 'add' })">
                      <svg-icon class="icon" name="shij_an_icon"></svg-icon>
                      <div class="name">{{ $t('Add execution time') }}</div>
                    </div>
                  </div>
                </m-form-item>

                <m-form-item
                  class="m-form-item-extra"
                  :label="$t('Perform an operation')"
                  name="sub_tasks"
                >
                  <template #extra>
                    <div v-if="form.sub_tasks.length" class="edit-button" @click="handleEdit">
                      <svg-icon name="bianji_icon" class="edit-icon"></svg-icon>
                      {{ $t('Edit1') }}
                    </div>
                  </template>
                  <template v-if="actions.showEdit">
                    <Container class="drag-container" lock-axis="y" @drop="sortChange">
                      <Draggable
                        v-for="(item, index) in actions.item"
                        :key="index"
                        class="draggable-item"
                      >
                        <compostask-action-item
                          show-edit
                          :item="item"
                          class="action-item"
                          @delete="actions.item.splice(index, 1)"
                        >
                        </compostask-action-item>
                      </Draggable>
                    </Container>
                  </template>
                  <template v-else>
                    <compostask-action-item
                      v-for="(item, index) in form.sub_tasks"
                      :key="index"
                      :item="item"
                      class="action-item"
                      @change="(newItem) => form.sub_tasks.splice(index, 1, newItem)"
                    >
                    </compostask-action-item>
                    <add-actions @callback="(item) => form.sub_tasks.push(item)"></add-actions>
                  </template>
                </m-form-item>
              </m-form>
            </div>
          </div>

          <template v-if="actions.showEdit">
            <div class="buttons">
              <m-button
                class="button"
                shape="round"
                type="primary"
                @click="
                  () => {
                    actions.showEdit = false
                    form.sub_tasks = [...actions.item]
                  }
                "
                >{{ $t('Save') }}</m-button
              >
            </div>
          </template>
          <template v-else>
            <div class="buttons">
              <m-button class="button" shape="round" @click="handleBack">{{
                $t('Previous step')
              }}</m-button>
              <m-button class="button" shape="round" type="primary" @click="onOk">{{
                $t('Save')
              }}</m-button>
            </div>
          </template>
        </div>
      </card-container>
    </div>

    <modal-time-week
      v-model="actions.showWeek"
      :item="actions.item"
      @callback="form.time = tempComposTask.time"
    ></modal-time-week>
    <!-- <modal-time-week
			v-model="actions.showEditWeek"
			type="edit"
			:index="actions.item"
			title="修改执行时间"
			@callback="form.time = tempComposTask.time"
		></modal-time-week> -->
  </page-container>
</template>

<script setup lang="ts">
  import { Container, Draggable } from 'vue3-smooth-dnd'
  const { t } = useI18n()
  const props = defineProps({
    type: PropTypes.string.def('add')
  })
  const emit = defineEmits([])

  const formatWeek = utils.formatWeek
  const autoTaskStore = store.useAutoTask()
  const { tempComposTask } = toRefs(autoTaskStore)

  const rules = {
    name: [
      { required: true, message: t('Please enter the task name'), trigger: ['change', 'blur'] }
    ],
    time: [
      {
        type: 'array',
        required: true,
        message: t('Please select execution time'),
        trigger: ['change', 'blur']
      }
    ],
    sub_tasks: [
      {
        type: 'array',
        required: true,
        message: t('Please select to perform the operation'),
        trigger: ['change', 'blur']
      }
    ]
  }
  const formData = {
    ...tempComposTask.value
  }
  function onOk() {
    onTempOk()
  }

  function completeAction() {
    if (props.type === 'add') {
      router.go(-2)
    } else {
      router.back()
    }
  }
  const {
    okButton,
    form,
    changeForm,
    formRef,
    onOk: onTempOk
  } = use.useForm(
    { props, emit },
    {
      formData,
      completeAction,
      actionName: props.type === 'add' ? 'postAutoTaskTimer' : 'putAutoTaskTimer'
    }
  )

  const router = useRouter()
  function handleBack() {
    router.back()
  }

  function handleEdit() {
    if (actions.showEdit) {
      actions.showEdit = false
    } else {
      actions.showEdit = true
      actions.item = [...form.sub_tasks]
    }
  }

  function sortChange(dropResult) {
    const { removedIndex, addedIndex } = dropResult
    if (removedIndex == null && addedIndex == null) {
      return
    }
    let itemToAdd = null
    if (removedIndex !== null) {
      itemToAdd = actions.item.splice(removedIndex, 1)[0]
    }
    if (addedIndex !== null) {
      actions.item.splice(addedIndex, 0, itemToAdd)
    }
  }

  const { actions } = use.useActions(['edit', 'week'])
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
      display: flex;
      align-items: center;

      font-size: 20px;
      color: #dae4e5;
      .icon {
        width: 26px;
        height: 26px;
        margin-right: 8px;
      }
    }

    .container {
      flex: 1;
      overflow: auto;
      .content {
        width: 666px;
        margin: 20px auto 0;
      }
    }
    .buttons {
      margin: 0 -20px -20px;
      border-top: 1px solid fade(#dae4e5, 15%);
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .button {
        width: 200px;
        height: 40px;
        & + .button {
          margin-left: 20px;
        }
      }
    }
  }

  .edit-button {
    cursor: pointer;
    padding: 10px 16px;
    background: fade(#fff, 20%);
    border-radius: 32px;
    font-size: 14px;
    color: #dae4e5;
    display: flex;
    justify-content: center;
    align-items: center;
    .edit-icon {
      width: 16px;
      height: 14px;
      margin-right: 8px;
    }
  }
  .drag-container {
    .draggable-item {
      & + .draggable-item {
        margin-top: 20px;
      }
    }
  }

  .action-add {
    height: 90px;
    background: #414a58;
    border-radius: 8px;
    margin-top: 14px;

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

  .timer-card {
    padding: 0 28px;
    background: #414a58;
    border-radius: 8px;
    overflow: hidden;

    .timer-item {
      cursor: pointer;
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
