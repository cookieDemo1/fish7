<template>
  <a-tabs v-model:active-key="activeKey" class="m-tabs" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-tabs>
</template>

<script setup lang="ts">
  const slots = useSlots()
  const attrs = useAttrs()
  const props = defineProps({
    modelValue: PropTypes.string
  })
  const emit = defineEmits(['update:modelValue'])
  const activeKey = computed({
    get: () => {
      return props.modelValue
    },
    set: (value) => {
      emit('update:modelValue', value)
    }
  })
</script>

<style lang="less">
  .m-tabs {
    .ant-tabs-nav {
      margin-bottom: 0 !important;
      &::before {
        display: none;
      }
    }
    .ant-tabs-nav-list {
      height: 60px;
      background: fade(#1d2431, 70%);
      border-radius: 18px 18px 0px 0px;
    }

    .ant-tabs-tab {
      width: 190px;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      color: #dae4e5;
      background: fade(#1d2431, 70%);
      border-radius: 18px 18px 0px 0px;
      &.ant-tabs-tab-active {
        background: #1f2838;
      }

      & + .ant-tabs-tab {
        margin: 0;
      }
    }

    .ant-tabs-ink-bar {
      display: none;
    }
  }
</style>
