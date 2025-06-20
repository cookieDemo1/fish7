<template>
	<a-modal
		class="m-modal"
		:width="450"
		:visible="visible"
		:mask-closable="false"
		:keyboard="false"
		:closable="false"
		centered
		v-bind="attrs"
	>
		<template v-for="name in Object.keys(slots)" #[name]>
			<slot :name="name"></slot>
		</template>
	</a-modal>
</template>

<script setup lang="ts">
	const slots = useSlots();
	const attrs = useAttrs();

	const props = defineProps({
		modelValue: PropTypes.bool,
		title: PropTypes.string.def(''),
		cancelText: PropTypes.string.def(''),
		okText: PropTypes.string.def('')
	});

	const emit = defineEmits(['update:modelValue']);

	const { visible } = use.useVisible({ props, emit });
</script>
<style lang="less">
	.m-modal {
		.ant-modal {
			&-header {
				display: none;
			}
			&-body {
				padding: 0;
			}
			&-footer {
				display: none;
			}
			// &-footer .ant-btn {
			// 	width: 90px;
			// 	line-height: 14px;
			// 	justify-items: center;
			// }
		}

		.modal-content {
			.modal-title {
				// min-height: 78px;
				padding-top: 20px;
				padding-bottom: 20px;
				position: relative;
				// height: 100px;
				font-weight: bold;
				font-size: 24px;
				color: #dae4e5;
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;

				.left-icon {
					position: absolute;
					// top: 14px;
					// left: 14px;
					top: 2px;
					left: 0;
					width: 70px;
					height: 70px;
					cursor: pointer;
				}
				.right-icon {
					position: absolute;
					// top: 14px;
					// right: 14px;
					top: 2px;
					right: 0;
					width: 70px;
					height: 70px;
					cursor: pointer;
				}
			}
			.modal-body {
				overflow: hidden;
				min-height: 110px;
				font-size: 20px;
				color: #99acbf;
				// color: #353e51;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.modal-footer {
				border-top: 1px solid fade(#ffffff, 15%);
				display: flex;
				.button {
					flex: 1;
					height: 80px;
					font-size: 20px;
					& + .button {
						border-left: 1px solid fade(#ffffff, 15%);
					}
				}
			}
		}
	}

	// .ant-btn > .ant-btn-loading-icon {
	// 	height: 14px;
	// }
</style>
