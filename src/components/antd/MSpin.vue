<template>
  <a-spin class="m-spin" :spinning="false" :tip="$t('Loading...')" v-bind="attrs">
    <template #indicator>
      <LoadingOutlined />
    </template>
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-spin>
</template>

<script setup lang="ts">
  import { LoadingOutlined } from '@ant-design/icons-vue'
  const slots = useSlots()
  const attrs = useAttrs()
</script>

<style lang="less">
  // .m-spin {
  // 	.ant-spin {
  // 		&-dot {
  // 			position: relative;
  // 			z-index: 0;
  // 			font-size: 70px;
  // 			&::after {
  // 				z-index: -1;
  // 				display: block;
  // 				content: '';
  // 				border: 5px solid var(--body-background);
  // 				border-radius: 50%;
  // 				.absolute-layout();
  // 			}
  // 		}
  // 		&-text {
  // 			margin-top: 10px;
  // 			font-size: 12px;
  // 			color: var(--text-secondary-color);
  // 		}
  // 	}
  // }

  // .ant-spin-nested-loading > div > .ant-spin.m-spin-nested {
  // 	height: 200px;

  // 	.ant-spin {
  // 		&-dot {
  // 			margin: 0;
  // 			font-size: 50px;
  // 			transform: translateX(-50%) translateY(-50%);
  // 		}
  // 	}
  // }
</style>
