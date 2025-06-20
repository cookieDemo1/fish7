<template>
	<m-popover v-model:visible="visible" placement="bottomRight">
		<div class="more-icon" :class="{ active: visible }" v-bind="attrs">
			<svg-icon class="icon" name="gengd_nor"></svg-icon>
		</div>
		<template #content>
			<div class="menu-content">
				<div
					v-for="(item, index) in menuItems"
					:key="index"
					class="menu-item"
					@click="
						visible = false;
						emit('itemClick', index);
					"
				>
					{{ item }}
				</div>
			</div>
		</template>
	</m-popover>
</template>

<script setup lang="ts">
	const attrs = useAttrs();
	const props = defineProps({
		item: PropTypes.object,
		menuItems: PropTypes.array.def(['修改', '删除'])
	});

	const emit = defineEmits(['itemClick']);

	const visible = ref(false);
</script>

<style scoped lang="less">
	.more-icon {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 44px;
		height: 44px;
		background: fade(#fff, 15%);
		border-radius: 12px;

		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;

		.icon {
			width: 24px;
			height: 24px;
			color: #b6b8bf;
		}

		&.active {
			background: fade(#00e5e5, 15%);
			.icon {
				color: #00e5e5;
			}
		}
	}

	.menu-content {
		width: 80px;
		background: #49515e;
		box-shadow: 0px 5px 16px 1px rgba(0, 0, 0, 0.12);
		border-radius: 8px;

		.menu-item {
			height: 44px;
			line-height: 44px;
			text-align: center;
			font-size: 16px;
			color: #dae4e5;
			cursor: pointer;

			& + .menu-item {
				border-top: 1px solid @lineColor;
			}
		}
	}
</style>
