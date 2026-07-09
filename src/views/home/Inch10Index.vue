<template>
  <div class="home">
    <div id="wrapper" class="wrapper" style="padding: 0 24px">
      <div id="A">
        <div class="card">
          <p class="title">A系统</p>
          <a-row :gutter="[14, 14]">
            <a-col
              v-for="(item, index) in system.A"
              :key="index"
              :span="item.freq == '-1' ? spanSwitch : spanFreq"
            >
              <DeviceCardMode3 :item="item" @callback="() => getSwitch()" />
            </a-col>
          </a-row>
        </div>
      </div>
      <div id="B">
        <div class="card">
          <p class="title">B系统</p>
          <a-row :gutter="[14, 14]">
            <a-col
              v-for="(item, index) in system.B"
              :key="index"
              :span="item.freq == '-1' ? spanSwitch : spanFreq"
            >
              <DeviceCardMode3 :item="item" @callback="() => getSwitch()" />
            </a-col>
          </a-row>
        </div>
      </div>

      <div id="C">
        <div class="card">
          <p class="title">水头公共系统</p>
          <a-row :gutter="[14, 14]">
            <a-col
              v-for="(item, index) in system.C"
              :key="index"
              :span="item.freq == '-1' ? spanSwitch : spanFreq"
            >
              <DeviceCardMode3 :item="item" @callback="() => getSwitch()" />
            </a-col>
          </a-row>
        </div>
      </div>

      <div :style="{ height: blankHeight }"></div>
    </div>

    <div class="menu">
      <MAnchor></MAnchor>
    </div>
  </div>
  <div class="sn">{{ sn?.sn }}</div>
</template>

<script setup lang="ts">
  import DeviceCardMode3 from './DeviceCardMode3.vue'
  let interval: any
  const mode = import.meta.env.VITE_APP_MODE as string

  const blankHeight = ref(mode === 'inch10' ? '520px' : '800px')

  const spanSwitch = mode === 'inch10' ? 6 : 4
  const spanFreq = mode === 'inch10' ? 12 : 8

  // switch是关键字需要重命名一下
  const { getSwitch, switch: switchState } = use.useMainStateAction('switch')
  getSwitch()

  interval = setInterval(getSwitch, 3000)

  onUnmounted(() => {
    interval && clearInterval(interval)
  })

  const { getSn, sn } = use.useMainStateAction('sn')
  getSn()

  const systemMaps = {
    A: ['1', '2', '5', '6', '7', '8', '9', '10', '11', '12', 'di_26'],
    B: ['3', '4', '13', '14', '15', '16', '17', '18', '19', '20', 'di_27'],
    C: ['21', '22', '23', '24', '25', '26']
  }

  const system = ref({
    A: [],
    B: [],
    C: []
  })

  const switchList = ref([])

  watch(switchState, (val) => {
    let tempList = val.map((item) => {
      return {
        ...item,
        do: item.do.replace('di_', ''),
        is_di: item.do.includes('di'),
        origin_do: item.do
      }
    })

    tempList = tempList.filter((item) => {
      return item.name !== '绿灯' && item.name !== '黄灯' && item.name !== '红灯'
    })

    const sytemTemp = { A: [], B: [], C: [] }

    tempList.forEach((item) => {
      Object.keys(systemMaps).forEach((key) => {
        const map = systemMaps[key]

        if (map.includes(item.origin_do)) {
          sytemTemp[key].push(item)
        }
      })
    })

    system.value = sytemTemp
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
  .home {
    height: 100%;
    display: flex;

    .wrapper {
      scroll-behavior: smooth;
      flex: 1;
      overflow: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
      }

      .card {
        background-color: #1f2838;
        padding: 20px 24px;
        border-radius: 18px;
      }

      #B,
      #C,
      #D,
      #E {
        margin-top: 16px;
      }
      .title {
        margin: 0;
        padding: 0;

        font-size: 20px;
        font-weight: bold;
        color: #dae4e5;
        margin-bottom: 12px;
      }
    }

    .menu {
      width: 174px;
      display: flex;
      align-items: center;
      // justify-content: center;
    }
  }
</style>
