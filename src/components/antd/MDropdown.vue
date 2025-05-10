<template>
  <a-dropdown overlay-class-name="m-dropdown" v-bind="$attrs">
    <!-- 穿透所有插槽 -->
    <slot></slot>

    <template #overlay>
      <slot name="overlay"></slot>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
  const slots = useSlots()
  console.log(slots)
</script>

<style lang="less">
  .m-dropdown {
    .operation {
      width: 80px;
      background-color: #49515e;
      border-radius: 8px;
      box-shadow: 0px 5px 16px 1px rgba(0, 0, 0, 0.12);
      position: absolute;
      top: 52px;
      right: 0;
      text-align: center;
      height: 89px;
      z-index: 999;
      .edit-text {
        height: 44px;
        line-height: 43px;
        border-bottom: 1px solid rgba(218, 228, 229, 0.15);
      }
      .del-text {
        height: 43px;
        line-height: 43px;
      }
    }
  }
</style>
