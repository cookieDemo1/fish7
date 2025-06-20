<template>
  <a-config-provider>
    <template #renderEmpty>
      <m-empty image-width="188px"></m-empty>
    </template>
    <a-list class="m-list" :split="false" :pagination="customPagination" v-bind="attrs">
      <template v-for="name in Object.keys(slots)" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </a-list>
  </a-config-provider>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
  })

  const customPagination = computed(() => {
    if (typeof props.pagination === 'boolean') {
      return false
    }

    return {
      hideOnSinglePage: true,
      size: 'small',
      pageSize: 10,
      showSizeChanger: false,
      showQuickJumper: true,
      ...props.pagination
    }
  })
</script>

<style lang="less">
  .m-list {
    .ant-list-item {
      padding: 0;
    }

    .ant-list-pagination {
      text-align: center;
    }
  }
  .left-list {
    flex: 1;
    overflow: auto;
    min-width: 280px;
  }
</style>
