<template>
	<div class="action-item">
		<div class="action-item-inner">
			<div class="info">
				<svg-icon class="icon" name="ddshij_icon"></svg-icon>
				<div>
					<div class="name">等待{{ secondsTostring(item.seconds) }}</div>
				</div>
			</div>
			<svg-icon v-if="showArrow" class="arrow" name="jiantou_icon"></svg-icon>
		</div>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps({
		showArrow: PropTypes.bool.def(false),
		item: PropTypes.object.def({})
	});

	const secondsTostring = utils.secondsTostring;
	const toSeconds = utils.toSeconds;
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

		.arrow {
			width: 9px;
			height: 16px;
		}
	}
</style>
