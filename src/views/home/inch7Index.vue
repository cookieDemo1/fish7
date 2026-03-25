<template>
  <div class="home">
    <!-- 第一版带图标的 -->
    <!-- <div class="wrapper" style="padding: 0 24px">
        <a-row :gutter="[14, 14]">
          <a-col v-for="(item, index) in switchList" :key="index" :span="6">
            <DeviceCardMode :item="item" @callback="() => getSwitch()" />
          </a-col>
        </a-row>
      </div> -->

    <!-- 可左右滚动 -->

    <div v-if="showChar" class="wrapper-slider">
      <div class="slider">
        <div class="row">
          <div
            v-for="(item, index) in switchList.slice(0, slicePosition)"
            :key="'col1' + index"
            class="col"
          >
            <DeviceCardMode2 :item="item" @callback="() => getSwitch()"></DeviceCardMode2>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(item, index) in switchList.slice(slicePosition)"
            :key="'col2' + index"
            class="col"
          >
            <DeviceCardMode2 :item="item" @callback="() => getSwitch()"></DeviceCardMode2>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="wrapper" style="padding: 0 24px">
      <a-row :gutter="[14, 14]">
        <a-col v-for="(item, index) in switchList" :key="index" :span="item.freq == '-1' ? 8 : 8">
          <DeviceCardMode3 :item="item" @callback="() => getSwitch()" />
        </a-col>
      </a-row>
    </div>
    <div class="char">
      <LineChar />
    </div>

    <div class="sn">{{ sn?.sn }}</div>
  </div>
</template>

<script setup lang="ts">
  import DeviceCardMode from './DeviceCardMode.vue'
  import DeviceCardMode2 from './DeviceCardMode2.vue'
  import DeviceCardMode3 from './DeviceCardMode3.vue'
  import LineChar from './LineChar.vue'

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

  watch(switchState, (val) => {
    switchList.value = val.map((item) => {
      return { ...item, do: item.do.replace('di_', ''), is_di: item.do.includes('di') }
    })

    slicePosition.value = Math.ceil(val.length / 2)

    sliderWidth.value = 306 * slicePosition.value + 12 * (slicePosition.value - 1) + 48 + 'px'
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
      width: 1024px;
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
