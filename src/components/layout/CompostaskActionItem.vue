<template>
	<div class="action-item">
		<template v-if="showEdit">
			<div v-if="item.type == '1'" class="action-item-inner">
				<svg-icon class="del-icon" name="quchu_icon" @click="emit('delete')"></svg-icon>
				<div class="info">
					<svg-icon class="icon" name="zrenwu_icon"></svg-icon>
					<div>
						<div class="name">{{ item.name }}</div>
					</div>
				</div>
				<svg-icon class="drag-icon" name="yidong_icon"></svg-icon>
			</div>
			<div v-else class="action-item-inner">
				<svg-icon class="del-icon" name="quchu_icon" @click="emit('delete')"></svg-icon>
				<div class="info">
					<svg-icon class="icon" name="ddshij_icon"></svg-icon>
					<div>
						<div class="name">等待{{ secondsTostring(item.seconds) }}</div>
					</div>
				</div>
				<svg-icon class="drag-icon" name="yidong_icon"></svg-icon>
			</div>
		</template>
		<template v-else>
			<div v-if="item.type == '1'" class="action-item-inner" @click="actions.handleTaskDetail(item)">
				<div class="info">
					<svg-icon class="icon" name="zrenwu_icon"></svg-icon>
					<div>
						<div class="name">{{ item.name }}</div>
					</div>
				</div>
				<svg-icon class="arrow" name="jiantou_icon"></svg-icon>
			</div>

			<div v-else class="action-item-inner" @click="actions.handleChangeTime(item)">
				<div class="info">
					<svg-icon class="icon" name="ddshij_icon"></svg-icon>
					<div>
						<div class="name">等待{{ secondsTostring(item.seconds) }}</div>
					</div>
				</div>
				<svg-icon class="arrow" name="jiantou_icon"></svg-icon>
			</div>
		</template>

		<modal-childtask-detail v-model="actions.showTaskDetail" title="" :item="actions.item"></modal-childtask-detail>
		<modal-time-picker
			v-model="actions.showChangeTime"
			title="修改等待时长"
			@callback="
				time =>
					emit('change', {
						...actions.item,
						seconds: toSeconds(time)
					})
			"
		></modal-time-picker>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps({
		showEdit: PropTypes.bool.def(false),
		item: PropTypes.object.def({})
	});
	const emit = defineEmits(['delete', 'change']);

	const secondsTostring = utils.secondsTostring;
	const toSeconds = utils.toSeconds;

	const { actions } = use.useActions(['taskDetail', 'changeTime']);
</script>

<style scoped lang="less">
	.action-item {
		height: 110px;
		background: #414a58;
		border-radius: 8px;
		padding: 0 28px;

		&.active {
			box-shadow: 0 0 40px #dddddd;
		}
		& + .action-item {
			margin-top: 20px;
		}

		display: flex;
		align-items: center;

		.action-item-inner {
			flex: 1;
			display: flex;
			align-items: center;
		}
		.del-icon {
			width: 30px;
			height: 30px;
			margin-right: 24px;
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
			.status {
				font-size: 16px;
				color: #b6b8bf;
			}
		}

		.drag-icon {
			width: 30px;
			height: 17px;
		}

		.arrow {
			width: 9px;
			height: 16px;
		}
	}
</style>
