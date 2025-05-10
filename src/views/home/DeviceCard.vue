<template>
  <div class="device-card">
    <div class="info">
      <img :src="imgMap[item.type].icon" class="icon" alt="" />

      <div class="name">
        <span v-if="item.status === 0" class="offline">离线</span>
        <span class="name-text">{{ item.name }}</span>
      </div>
    </div>

    <img :src="imgMap[item.type]['on']" class="status-icon" alt="" />
  </div>
</template>

<script setup lang="ts">
  import fjIcon from '@/assets/gufengji_img@2x.png'
  import fjOffline from '@/assets/status/jiansujlx_icon@2x.png'
  import fjOn from '@/assets/status/luocifjkai_icon@2x.png'
  import fjOff from '@/assets/status/jiansujgb_icon@2x.png'

  import xhsbIcon from '@/assets/xunhuanb_img@2x.png'
  import xhsbOffline from '@/assets/status/xunhsblx_icon@2x.png'
  import xhsbOn from '@/assets/status/xunhsbkai_icon@2x.png'
  import xhsbOff from '@/assets/status/xunhsbgb_icon@2x.png'

  import sjdIcon from '@/assets/shajund_img@2x.png'
  import sjdOffline from '@/assets/status/dengglx_icon@2x.png'
  import sjdOn from '@/assets/status/kaiguankai_icon@2x.png'
  import sjdOff from '@/assets/status/kaiguangb_icon@2x.png'

  import gljIcon from '@/assets/danfej_img@2x.png'
  import gljOffline from '@/assets/status/kaiguanlx_icon@2x.png'
  import gljOn from '@/assets/status/kaiguankai_icon@2x.png'
  import gljOff from '@/assets/status/kaiguangb_icon@2x.png'

  import psbIcon from '@/assets/liushuib_img@2x.png'
  import psbOffline from '@/assets/status/penshuiblx_icon@2x.png'
  import psbOn from '@/assets/status/penshuibkai_icon@2x.png'
  import psbOff from '@/assets/status/penshuibgb_icon@2x.png'

  import dcfIcon from '@/assets/kaiguan_img@2x.png'
  import dcfOffline from '@/assets/status/kaiguanlx_icon@2x.png'
  import dcfOn from '@/assets/status/kaiguankai_icon@2x.png'
  import dcfOff from '@/assets/status/kaiguangb_icon@2x.png'

  const imgMap = {
    1: {
      icon: fjIcon,
      offline: fjOffline,
      on: fjOn,
      off: fjOff
    },
    2: {
      icon: xhsbIcon,
      offline: xhsbOffline,
      on: xhsbOn,
      off: xhsbOff
    },
    3: {
      icon: sjdIcon,
      offline: sjdOffline,
      on: sjdOn,
      off: sjdOff
    },
    4: {
      icon: gljIcon,
      offline: gljOffline,
      on: gljOn,
      off: gljOff
    },
    5: {
      icon: psbIcon,
      offline: psbOffline,
      on: psbOn,
      off: psbOff
    },
    6: {
      icon: dcfIcon,
      offline: dcfOffline,
      on: dcfOn,
      off: dcfOff
    }
  }

  const props = defineProps({
    item: PropTypes.object
  })
</script>

<style lang="less" scoped>
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
  }
</style>
