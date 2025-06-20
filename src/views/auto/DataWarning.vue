<template>
  <page-container>
    <div class="page-inner">
      <card-container class="card-container" :show-header="false">
        <div class="task">
          <div class="title">
            <svg-icon class="icon" name="shujgj_icon"></svg-icon>数据告警-新增
          </div>

          <div class="container">
            <div class="content">
              <m-form ref="formRef" class="form" :model="form" :rules="rules">
                <m-form-item label="" name="">
                  <div class="action-condition">
                    <div class="select-item">
                      <div class="label">传感器</div>
                      <m-select
                        class="select m-select-right"
                        placeholder="请选择数据源"
                        :bordered="false"
                      >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                      </m-select>
                    </div>
                    <div class="condition-item">
                      <div class="label">触发条件</div>
                      <a-row :gutter="[22, 22]">
                        <a-col :span="8">
                          <m-select class="m-select-compact" placeholder="请选择" :bordered="false">
                            <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                          </m-select>
                          <div class="line"></div>
                          <div class="val">数据</div>
                        </a-col>
                        <a-col :span="8">
                          <m-select class="m-select-compact" placeholder="请选择" :bordered="false">
                            <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                          </m-select>
                          <div class="line"></div>
                          <div class="val">关系</div>
                        </a-col>
                        <a-col :span="8">
                          <m-input-number
                            v-model="form.name"
                            class="m-input-number-compact"
                            placeholder="请输入"
                            :bordered="false"
                            :controls="false"
                          ></m-input-number>
                          <div class="line"></div>
                          <div class="val">值</div>
                        </a-col>
                      </a-row>
                    </div>
                    <div class="condition-item">
                      <div class="label">恢复条件</div>
                      <a-row :gutter="[22, 22]">
                        <a-col :span="8">
                          <m-select class="m-select-compact" placeholder="请选择" :bordered="false">
                            <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                          </m-select>
                          <div class="line"></div>
                          <div class="val">数据</div>
                        </a-col>
                        <a-col :span="8">
                          <m-select class="m-select-compact" placeholder="请选择" :bordered="false">
                            <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                          </m-select>
                          <div class="line"></div>
                          <div class="val">关系</div>
                        </a-col>
                        <a-col :span="8">
                          <m-input-number
                            v-model="form.name"
                            class="m-input-number-compact"
                            placeholder="请输入"
                            :bordered="false"
                            :controls="false"
                          ></m-input-number>
                          <div class="line"></div>
                          <div class="val">值</div>
                        </a-col>
                      </a-row>
                    </div>
                  </div>
                </m-form-item>

                <div class="buttons">
                  <m-button class="button" shape="round" type="primary">保存</m-button>
                </div>
              </m-form>
            </div>
          </div>
        </div>
      </card-container>
    </div>
  </page-container>
</template>

<script setup lang="ts">
  const props = defineProps({
    type: PropTypes.string.def('add'),
    task_id: PropTypes.string.def('')
  })
  const emit = defineEmits([])

  const switchList = ref([])
  const switchObj = ref({})

  switchList.value = [{ id: 'abc', name: '12321' }]
  switchObj.value = Object.fromEntries(switchList.value.map((item) => [item.id, -1]))
  // watch(
  // 	autoSwitch,
  // 	() => {
  // 		// const { list = [] } = autoSwitch.value || {};
  // 		// switchList.value = list;
  // 		// if (props.type === 'add') {
  // 		// 	switchObj.value = Object.fromEntries(list.map(item => [item.id, -1]));
  // 		// } else {
  // 		// 	const { task_name = '', open = [], close = [] } = autoScene.value || {};
  // 		// 	const tempSwitchObj = Object.fromEntries(open.concat(close).map(item => [item.id, item.action]));
  // 		// 	switchObj.value = Object.fromEntries(
  // 		// 		list.map(item => [item.id, tempSwitchObj[item.id] ? tempSwitchObj[item.id] : -1])
  // 		// 	);
  // 		// 	form.name = task_name;
  // 		// 	form.switch = Object.keys(tempSwitchObj).map(item => parseInt(item));
  // 		// }
  // 	},
  // 	{
  // 		immediate: true
  // 	}
  // );

  const rules = {
    name: [{ required: true, message: '请输入任务名称', trigger: ['change', 'blur'] }],
    switch: [
      { type: 'array', required: true, message: '请选择开关设备', trigger: ['change', 'blur'] }
    ]
  }
  const formData = {
    name: '',
    switch: []
  }
  function onOk() {
    // changeForm.project_id = projectID.value;
    // changeForm.switch = form.switch.map(id => {
    // 	return {
    // 		id,
    // 		action: switchObj.value[id]
    // 	};
    // });
    // if (props.type === 'edit') {
    // 	changeForm.task_id = parseInt(props.task_id);
    // }
    // onTempOk();
  }

  function completeAction() {
    // if (props.type === 'add') {
    // 	uni.switchTab({
    // 		url: '/pages/automatic/index'
    // 	});
    // } else {
    // 	uni.$u.route({ type: 'navigateBack' });
    // }
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
      actionName: props.type === 'add' ? 'postAutoTaskScene' : 'putAutoTaskScene'
    }
  )

  function handleCheck(id) {
    const index = form.switch.indexOf(id)
    if (index === -1) {
      form.switch.push(id)
      switchObj.value[id] = 2
    } else {
      form.switch.splice(index, 1)
      switchObj.value[id] = -1
    }
  }

  function handleSwitch(id, value) {
    if (switchObj.value[id] !== value) {
      switchObj.value[id] = value
      const index = form.switch.indexOf(id)
      if (index === -1) {
        form.switch.push(id)
      }
    } else {
      switchObj.value[id] = -1
      const index = form.switch.indexOf(id)
      if (index !== -1) {
        form.switch.splice(index, 1)
      }
    }
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

  .action-condition {
    padding: 20px;
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
        width: 150px;
      }
    }
    .condition-item {
      .label {
        margin: 12px 0;
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

  .action-item {
    cursor: pointer;
    height: 62px;
    padding: 0 20px;
    background: #414a58;
    border-radius: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: background 0.3s;

    &.checked {
      background: fade(#00e5e5, 10%);
    }
    & + .action-item {
      margin-top: 12px;
    }

    .action-name {
      flex: 1;
      .text-ellipsis();
    }

    .action-value {
      display: flex;
      align-items: center;
      .switch-item {
        width: 56px;
        height: 40px;
        border-radius: 32px;
        margin-left: 16px;
        background: fade(#ffffff, 20%);
        color: #dae4e5;
        transition: background 0.3s, color 0.3s;

        display: flex;
        justify-content: center;
        align-items: center;

        &.switch-on {
          background: #16ce67;
          color: #0c0c0c;
        }
        &.switch-off {
          background: #ff5446;
          color: #0c0c0c;
        }
      }
    }
  }
</style>
