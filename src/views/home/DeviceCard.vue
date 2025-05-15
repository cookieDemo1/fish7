<template>
  <div class="device-card">
    <div class="info">
      <img :src="imgMap[item.id].icon" class="icon" alt="" />

      <div class="name">
        <!-- 设备没有离线状态 -->
        <span v-if="item.status == 0" class="offline">离线</span>
        <span class="name-text">{{ imgMap[item.id].name }}</span>
      </div>
    </div>
    <template v-if="!loading">
      <img :src="imgMap[item.id][item.status]" class="status-icon" alt="" @click="handleClick" />
    </template>
    <template v-else>
      <div :class="{ 'loading-icon': true, 'loading-on': item.status == 1 }">
        <img :src="item.status == 1 ? loadingWhiteIcon : loadingIcon" alt="" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'

  import loadingWhiteIcon from '@/assets/status/loading_white.png'
  import loadingIcon from '@/assets/status/loading.png'

  const imgMap = constant.imgMap

  const props = defineProps({
    item: PropTypes.object
  })

  const emits = defineEmits(['callback'])

  const loading = ref(false)
  const { postControlSwitch } = use.useMainActions(['postControlSwitch'])

  const handleClick = () => {
    const status = props.item.status
    if (status === 0) {
      return message.warning('该设备当前离线')
    }
    const action = status === 1 ? 2 : 1
    loading.value = true
    postControlSwitch({ DO: parseInt(props.item.id), action: action })
      .then((res) => {
        if (res.code !== 200) {
          loading.value = false
          message.error('操作失败')
        } else {
          setTimeout(() => {
            message.success('操作成功')

            emits('callback')
            loading.value = false
          }, 2000)
        }
      })
      .catch((err) => {
        message.error('操作失败')
        loading.value = false
      })
  }
</script>

<style lang="less" scoped>
  @keyframes rotate360 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .device-card {
    width: 100%;
    height: 98px;
    border-radius: 11px;
    background-image: url('../../assets/kapbj_img@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 13px 19px;
    position: relative;
    // display: flex;
    .info {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      // align-items: space-between;
      justify-content: space-between;
      .icon {
        width: 46px;
        height: 46px;
      }
      .offline {
        margin-right: 8px;
        color: #0c0c0c;
        display: inline-block;
        width: 48px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 18px;
        background-color: #f53d2d;
        font-size: 13px;
      }
      .name-text {
        font-size: 16px;
      }
    }
    .status-icon {
      position: absolute;
      top: 14px;
      right: 20px;
      width: 53px;
      height: 53px;
    }

    .loading-icon {
      position: absolute;
      top: 14px;
      right: 20px;
      width: 53px;
      height: 53px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #646464;
      &.loading-on {
        background-color: @primaryColor;
      }
      img {
        width: 32px;
        height: 32px;
        animation: rotate360 1.6s infinite linear;
      }
    }
  }
</style>
