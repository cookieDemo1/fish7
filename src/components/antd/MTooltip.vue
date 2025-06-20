<template>
  <a-tooltip
    overlay-class-name="m-tooltip"
    placement="bottomRight"
    :mouse-enter-delay="0.5"
    :mouse-leave-delay="0"
    v-bind="attrs"
  >
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-tooltip>
</template>

<script setup lang="ts">
  const attrs = useAttrs()
  const slots = useSlots()
</script>

<style lang="less">
  .m-tooltip {
    &.ant-tooltip {
      max-width: initial;

      &-placement-bottom,
      &-placement-bottomLeft,
      &-placement-bottomRight {
        padding-top: 0;
      }
    }

    .ant-tooltip {
      &-arrow-content {
        display: none;
      }

      &-inner {
        padding: 6px 8px;
        background: @innerComponentBackground;
        border: 1px solid @lineColor;
        font-size: 12px;
      }
    }
  }
</style>
