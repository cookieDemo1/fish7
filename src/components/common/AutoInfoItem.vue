<template>
  <div class="auto-info-item">
    <div class="info">
      <img class="icon" :src="imgMap[type].icon" alt="" />
      <div class="name">{{ name }}</div>
    </div>
    <div v-if="status !== undefined" class="status">
      <span v-if="status === 1" class="status-item on">开启</span>
      <span v-if="status === 2" class="status-item off">关闭</span>
      <span v-if="status === 3" class="status-item failed">失败</span>
      <span v-if="status === 0" class="status-item loading">
        <indicator />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { LoadingOutlined } from '@ant-design/icons-vue'
  import { h } from 'vue'

  const indicator = h(LoadingOutlined, {
    style: {
      fontSize: '25px',
      color: '#00E5E5',
      fontWight: 'bold'
    },
    spin: true
  })
  const imgMap = constant.imgMap
  const props = defineProps({
    type: PropTypes.number.isRequired,
    name: PropTypes.string.def(''),
    status: PropTypes.number.def(undefined)
  })
</script>

<style lang="less" scoped>
  .auto-info-item {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info {
      display: flex;
      align-items: center;

      .icon {
        width: 46px;
        height: 46px;
        margin-right: 12px;
      }
      .name {
        font-size: 18px;
        font-weight: 600;
      }
    }

    .status {
      .status-item {
        font-size: 18px;
        font-weight: 600;

        &.on {
          color: #16ce67;
        }
        &.off {
          color: #dae4e5;
        }
        &.failed {
          color: #f53d2d;
        }
      }
    }
  }
</style>
