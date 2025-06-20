<template>
	<flex-center class="empty-content">
		<m-empty image-width="120px" text-margin="12px" :description="description"> </m-empty>
	</flex-center>
</template>

<script setup lang="ts">
	defineProps({
		description: PropTypes.string.def('暂无大棚，请添加大棚')
	});
</script>

<style scoped></style>
