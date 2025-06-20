<template>
  <div v-if="loading" class="loading-wrapper">
    <a-spin :tip="$props.tip" :indicator="indicator"></a-spin>
  </div>
</template>

<script setup lang="ts">
  import { LoadingOutlined } from '@ant-design/icons-vue'

  const props = defineProps({
    loading: PropTypes.bool.isRequired,
    full: PropTypes.bool.def(true),
    tip: PropTypes.string.def('操作中...')
  })

  const position = ref(props.full ? 'fixed' : 'absolute')

  const indicator = defineComponent({
    render() {
      return h(LoadingOutlined, {
        style: {
          fontSize: '25px',
          color: '#00E4FB',
          fontWeight: 'bold' // 修正拼写错误：fontWight → fontWeight
        },
        spin: true
      })
    }
  })
</script>

<style lang="less" scoped>
  .loading-wrapper {
    position: v-bind(position);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
