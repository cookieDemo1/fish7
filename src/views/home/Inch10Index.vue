<template>
  <div class="home">
    <!-- <div style="margin: 0 0 16px 24px">
      <Light :list="lightStatus"></Light>
    </div> -->
    <div class="wrapper" style="padding: 0 24px">
      <a-row :gutter="[14, 14]">
        <a-col v-for="(item, index) in switchList" :key="index" :span="item.freq == '-1' ? 6 : 12">
          <DeviceCardMode3 :item="item" @callback="() => getSwitch()" />
        </a-col>
      </a-row>
    </div>

    <div class="sn">{{ sn?.sn }}</div>
  </div>
</template>

<script setup lang="ts">
  import DeviceCardMode3 from './DeviceCardMode3.vue'
  import Light from './Light.vue'
  let interval: any
  const slicePosition = ref(0)
  const sliderWidth = ref('0px')
  // switch是关键字需要重命名一下
  const { getSwitch, switch: switchState } = use.useMainStateAction('switch')
  getSwitch()

  interval = setInterval(getSwitch, 3000)

  onUnmounted(() => {
    interval && clearInterval(interval)
  })

  const { getSn, sn } = use.useMainStateAction('sn')
  getSn()

  const switchList = ref([])

  const lightStatus = ref([
    { name: 'green', key: '绿灯', status: 1 },
    { name: 'yellow', key: '黄灯', status: 1 },
    { name: 'red', key: '红灯', status: 1 }
  ])

  watch(switchState, (val) => {
    const tempList = val.map((item) => {
      return { ...item, do: item.do.replace('di_', ''), is_di: item.do.includes('di') }
    })

    switchList.value = tempList.filter((item) => {
      return item.name !== '绿灯' && item.name !== '黄灯' && item.name !== '红灯'
    })

    let tempLight = {}
    for (let i = 0; i < tempList.length; i++) {
      tempLight[tempList[i].name] = tempList[i].status
    }

    lightStatus.value = [
      { name: 'green', key: '绿灯', status: tempLight['绿灯'] },
      { name: 'yellow', key: '黄灯', status: tempLight['黄灯'] },
      { name: 'red', key: '红灯', status: tempLight['红灯'] }
    ]

    console.log(lightStatus.value)
  })

  const showChar = ref(false)

  const { char, getChar } = use.useMainStateAction('char')
  // getChar()
  watch(char, (val) => {
    const { sensor_data = {} } = char.value
    const { s20b } = sensor_data
    showChar.value = Object.keys(s20b).length > 0
  })
</script>

<style lang="less" scoped>
  .home {
    .sn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 12px;
      color: #656a78;
    }
    // margin-bottom: 12px;
    .char {
      margin-top: 12px;
      padding: 0 24px;
    }

    .wrapper-slider {
      // width: 1024px;
      overflow-x: scroll;
      /* 隐藏滚动条 */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 和 Edge */

      .slider {
        padding: 0 24px;
        // 一行5个
        // width: 1626px;
        // 一行四个
        width: v-bind(sliderWidth);
        overflow: visible;
      }
    }
    .wrapper-slider::-webkit-scrollbar {
      display: none; /* Chrome, Safari 和 Opera */
    }

    .row {
      display: flex;
      flex-wrap: nowrap;

      .col {
        width: 306px;
        flex-shrink: 0;
      }
      .col + .col {
        margin-left: 12px;
      }
    }

    .row + .row {
      margin-top: 12px;
    }
  }
</style>
