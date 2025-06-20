<template>
	<div class="state-tag" :class="status.className">
		<slot>{{ status.title }}</slot>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps({
		type: PropTypes.oneOf([0, 1, 2]),
		classNames: PropTypes.array.def(() => ['danger', 'success', 'danger']),
		titles: PropTypes.array.def(() => ['离线', '在线', '未激活'])
	});
	const status = computed(() => ({
		className: props.classNames[props.type] ?? 'disabled',
		title: props.titles[props.type] ?? '离线'
	}));
</script>

<style lang="less" scoped>
	.state-tag {
		display: inline-block;
		font-size: 12px;
		padding: 0 4px;
		border-radius: 2px;

		.state-bg-color();
	}
</style>
