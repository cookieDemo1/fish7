<template>
  <a-form-item class="m-form-item" validate-first validate-trigger="blur" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-form-item>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()
</script>

<style lang="less">
  .m-form-item {
    .ant-form-item-label > label {
      font-size: 18px;
      color: #99acbf;
    }
  }
  .m-form-item-extra {
    position: relative;

    .ant-form-item-label {
      margin-bottom: 20px;
    }
    .ant-form-item {
      &-extra {
        position: absolute;
        right: 0;
        top: -56px;
      }
    }
  }
</style>
