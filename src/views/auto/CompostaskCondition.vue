<template>
  <page-container>
    <div class="page-inner">
      <card-container class="card-container" :show-header="false">
        <div class="task">
          <div class="title">
            <svg-icon class="icon" name="tiaojrw_icon"></svg-icon>{{ $t('Conditional tasks') }}
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
                <m-form-item :label="$t('Execution conditions')" name="sensor">
                  <div class="condition-card">
                    <div class="select-item">
                      <div class="label">{{ $t('Data source') }}</div>

                      <normal-select
                        v-model="form.sensor_id"
                        class="select m-select-right"
                        :placeholder="$t('Please select data source')"
                        :options="level_1"
                      >
                      </normal-select>
                    </div>
                    <div class="condition-item">
                      <div class="label">{{ $t('Condition') }}</div>
                      <a-row :gutter="[22, 22]">
                        <a-col :span="8">
                          <normal-select
                            v-model="form.arg"
                            class="m-select-compact"
                            :placeholder="$t('Please select')"
                            :options="level_2"
                          >
                          </normal-select>
                          <div class="line"></div>
                          <div class="val">{{ $t('Data') }}</div>
                        </a-col>
                        <a-col :span="8">
                          <normal-select
                            v-model="form.compare"
                            class="m-select-compact"
                            :placeholder="$t('Please select')"
                            :options="
                              form.arg && form.arg.includes('DI')
                                ? diCompareOptions
                                : compareOptions
                            "
                          >
                          </normal-select>
                          <div class="line"></div>
                          <div class="val">{{ $t('Relationship') }}</div>
                        </a-col>
                        <a-col :span="8">
                          <template v-if="form.arg && form.arg.includes('DI')">
                            <normal-select
                              v-model="form.value"
                              class="m-select-compact"
                              :placeholder="$t('Please select')"
                              :options="diValueOptions"
                            ></normal-select>
                          </template>
                          <template v-else>
                            <m-input-inner
                              v-model="form.value"
                              class="m-input-number-compact"
                              :placeholder="$t('Please input')"
                              :bordered="false"
                              :controls="false"
                              type="number"
                            ></m-input-inner>
                          </template>

                          <div class="line"></div>
                          <div class="val">{{ $t('Value') }}</div>
                        </a-col>
                      </a-row>
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
  </page-container>
</template>

<script setup lang="ts">
  import { Container, Draggable } from 'vue3-smooth-dnd'

  const { t } = useI18n()

  const props = defineProps({
    type: PropTypes.string.def('add')
  })
  const emit = defineEmits([])

  const autoTaskStore = store.useAutoTask()
  const { tempComposTask } = toRefs(autoTaskStore)

  const { autoTaskConditionOption, getAutoTaskConditionOption } =
    use.useMainStateAction('autoTaskConditionOption')

  getData()
  function getData() {
    getAutoTaskConditionOption()
  }

  const level_1 = computed(() => {
    const { list = [] } = autoTaskConditionOption.value || {}
    const { level_1 = [] } = list[0] || {}
    return level_1.map((item) => ({ ...item, text: t(item.name), value: item.id }))
  })
  const level_2_obj = computed(() => {
    const { list = [] } = autoTaskConditionOption.value || {}
    const { level_2 = {} } = list[0] || {}

    return level_2
  })
  const level_2 = computed(() => {
    if (level_1.value.length && form.sensor_id) {
      const index = level_1.value.findIndex((item) => {
        return item.id === form.sensor_id
      })
      const type = (level_1.value[index] || {})['type']
      return (level_2_obj.value[type] || []).map((item) => ({
        ...item,
        text: t(item.v),
        value: item.k
      }))
    }
    return []
  })

  const compareOptions = [
    { text: '>', value: '>' },
    { text: '=', value: '=' },
    { text: '<', value: '<' }
  ]

  const diCompareOptions = [{ text: '=', value: '=' }]

  const diValueOptions = [
    { text: t('ON'), value: 1 },
    { text: t('OFF'), value: 0 }
  ]

  const rules = {
    name: [
      { required: true, message: t('Please enter the task name'), trigger: ['change', 'blur'] }
    ],
    sensor: [
      {
        required: true,
        message: t('Please select condition'),
        validator: (rule, value, callback) => {
          return new Promise<void>((resolve, reject) => {
            let flag = ['sensor_id', 'arg', 'compare', 'value'].every((key) => {
              if (key === 'value') {
                return form['value'] != null
              }
              return form[key]
            })
            flag ? resolve() : reject()
          })
        }
        // trigger: ['blur']
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
    const index = level_1.value.findIndex((item) => {
      return item.id === form.sensor_id
    })
    const sensor_type = (level_1.value[index] || {})['type']
    form.sensor_type = sensor_type
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
      actionName: props.type === 'add' ? 'postAutoTaskCondition' : 'putAutoTaskCondition'
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

  const { actions } = use.useActions(['edit'])
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

  .condition-card {
    padding: 20px 28px;
    background: #414a58;
    border-radius: 8px;

    .select-item {
      margin-top: -10px;
      height: 50px;
      border-bottom: 1px solid fade(#dae4e5, 15%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .select {
        width: 350px;
      }
      .label {
        font-size: 20px;
        color: #dae4e5;
      }
    }
    .condition-item {
      .label {
        margin: 12px 0;
        font-size: 18px;
        color: #dae4e5;
      }
      .line {
        height: 1px;
        background-color: fade(#dae4e5, 15%);
      }
      .val {
        margin-top: 8px;
        font-size: 12px;
        color: #9ea0a6;
      }
    }
  }
</style>
