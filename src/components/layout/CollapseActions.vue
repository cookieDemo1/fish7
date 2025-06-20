<template>
	<div class="collapse" :style="{ height: expand ? height + 'px' : 0 }">
		<div class="collapse-icon" :class="{ rotate: expand }" v-bind="attrs" @click.stop="expand = !expand">
			<svg-icon class="icon" name="jiantj_icon"></svg-icon>
		</div>
		<div ref="collapseEl" class="collapse-content">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const slots = useSlots();
	const attrs = useAttrs();

	const props = defineProps({
		modelValue: PropTypes.bool.def(false)
	});
	const emit = defineEmits(['update:modelValue']);

	const expand = ref(false);
	const height = ref(0);
	const collapseEl = ref<HTMLElement>();

	onMounted(() => {
		height.value = collapseEl.value.getBoundingClientRect().height;
	});
	watch(expand, () => {
		if (expand.value) {
			height.value = collapseEl.value.getBoundingClientRect().height;
		}
	});
</script>

<style scoped lang="less">
	.collapse-icon {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 52px;
		height: 40px;
		background: fade(#fff, 15%);
		border-radius: 32px;

		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;

		.icon {
			width: 19px;
			height: 12px;
			color: #b6b8bf;
		}
		&.rotate {
			.icon {
				transform: rotate(180deg);
			}
		}
	}

	.collapse {
		height: 0;
		overflow: hidden;
		transition: 400ms ease-in-out 0ms;
		transition-property: height, transform;
		transform-origin: 50% 50% 0;

		.collapse-content {
		}
	}
</style>
