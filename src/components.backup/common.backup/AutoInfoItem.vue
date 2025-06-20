<template>
  <div class="auto-info-item">
    <div class="info">
      <img class="icon" :src="imgMap[type].icon" alt="" />
      <div class="name">{{ name }}</div>
    </div>
    <div v-if="result[index] !== undefined" class="status">
      <span v-if="result[index] === true && successValue === true" class="status-item on"
        >开启</span
      >
      <span v-if="result[index] === true && successValue === false" class="status-item off"
        >关闭</span
      >
      <span v-if="result[index] === false" class="status-item off">关闭</span>
      <!-- <span v-if="status === 3" class="status-item failed">失败</span>
      <span v-if="status === 0" class="status-item loading">
        <indicator></indicator>
      </span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { h, defineComponent } from 'vue'

  import { LoadingOutlined } from '@ant-design/icons-vue'

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
  const imgMap = constant.imgMap
  const props = defineProps({
    type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.def(''),
    index: PropTypes.number.def(0),
    result: PropTypes.array.def([]),
    successValue: PropTypes.bool.def(true)
    // status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).def(undefined)
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
