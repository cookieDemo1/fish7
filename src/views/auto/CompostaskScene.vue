<template>
	<page-container>
		<div class="page-inner">
			<card-container class="card-container" :show-header="false">
				<div class="task">
					<div class="title">
						<svg-icon class="icon" name="changjrw_icon"></svg-icon>场景任务-{{ type === 'add' ? '新增' : '修改' }}
					</div>
					<div class="container">
						<div class="content">
							<m-form ref="formRef" class="form" :model="form" :rules="rules">
								<m-form-item label="" name="name">
									<m-input v-model="form.name" placeholder="请填写任务名称" :maxlength="20"></m-input>
								</m-form-item>

								<m-form-item class="m-form-item-extra" label="执行操作" name="sub_tasks">
									<template #extra>
										<div v-if="form.sub_tasks.length" class="edit-button" @click="handleEdit">
											<svg-icon name="bianji_icon" class="edit-icon"></svg-icon>
											编辑
										</div>
									</template>
									<template v-if="actions.showEdit">
										<Container class="drag-container" lock-axis="y" @drop="sortChange">
											<Draggable v-for="(item, index) in actions.item" :key="index" class="draggable-item">
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
											@change="newItem => form.sub_tasks.splice(index, 1, newItem)"
										>
										</compostask-action-item>
										<add-actions @callback="item => form.sub_tasks.push(item)"></add-actions>
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
									actions.showEdit = false;
									form.sub_tasks = [...actions.item];
								"
								>保存</m-button
							>
						</div>
					</template>
					<template v-else>
						<div class="buttons">
							<m-button class="button" shape="round" @click="handleBack">上一步</m-button>
							<m-button class="button" shape="round" type="primary" @click="onOk">保存</m-button>
						</div>
					</template>
				</div>
			</card-container>
		</div>
	</page-container>
</template>

<script setup lang="ts">
	import { Container, Draggable } from 'vue3-smooth-dnd';

	const props = defineProps({
		type: PropTypes.string.def('add')
	});
	const emit = defineEmits([]);

	const autoTaskStore = store.useAutoTask();
	const { tempComposTask } = toRefs(autoTaskStore);

	const rules = {
		name: [{ required: true, message: '请输入任务名称', trigger: ['change', 'blur'] }],
		sub_tasks: [{ type: 'array', required: true, message: '请选择执行操作', trigger: ['change', 'blur'] }]
	};
	const formData = {
		...tempComposTask.value
	};
	function onOk() {
		onTempOk();
	}

	function completeAction() {
		if (props.type === 'add') {
			router.go(-2);
		} else {
			router.back();
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
			actionName: props.type === 'add' ? 'postAutoTaskScene' : 'putAutoTaskScene'
		}
	);

	const router = useRouter();
	function handleBack() {
		router.back();
	}

	function handleEdit() {
		if (actions.showEdit) {
			actions.showEdit = false;
		} else {
			actions.showEdit = true;
			actions.item = [...form.sub_tasks];
		}
	}

	function sortChange(dropResult) {
		const { removedIndex, addedIndex } = dropResult;
		if (removedIndex == null && addedIndex == null) {
			return;
		}
		let itemToAdd = null;
		if (removedIndex !== null) {
			itemToAdd = actions.item.splice(removedIndex, 1)[0];
		}
		if (addedIndex !== null) {
			actions.item.splice(addedIndex, 0, itemToAdd);
		}
	}

	const { actions } = use.useActions(['edit']);
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
				margin: 0 auto;
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
</style>
