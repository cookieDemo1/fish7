<template>
  <!-- 图表无滚动版本，未使用 -->
  <div v-if="showChar" class="line-char">
    <div v-if="char?.status === 2" class="offline">{{ $t('Offline') }}</div>

    <ul class="select">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="option"
        :class="{ active: index === activeIndex }"
        @click="activeIndex = index"
      >
        <div class="value">{{ option.value }} {{ $t(option.unit) }}</div>
        <div class="name">
          {{ $t(option.name) }}
          {{ index === activeIndex && char?.status === 2 ? `(${$t('Offline')})` : '' }}
        </div>
      </li>
    </ul>

    <div id="char" class="char"></div>

    <div v-if="loading" class="loading">
      <a-spin :spining="loading" :tip="$t('Loading')"></a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
  import * as echarts from 'echarts/core'
  // 引入柱状图图表，图表后缀都为 Chart
  import { BarChart } from 'echarts/charts'
  // 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
  } from 'echarts/components'
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features'
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers'

  // 注册必须的组件
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ])
  let myChart: any

  const { isZh } = use.useLang()
  const carouselRef = ref(null)
  const { actions } = use.useActions(['cursor'])

  const { char, getChar, loading } = use.useMainStateAction('char')
  const options = ref<any>([
    { name: 'Dissolved oxygen', unit: 'mg/L', key: 'oxygen', value: '--', show: false },
    { name: 'Dissolved oxygen1', unit: 'mg/L', key: 'oxygen1', value: '--', show: false },
    { name: 'Dissolved oxygen2', unit: 'mg/L', key: 'oxygen2', value: '--', show: false },

    { name: 'Water temperature', unit: '℃', key: 'temp', value: '--', show: false },

    { name: 'PH', unit: 'PH', key: 'ph', value: '--', show: false },
    { name: 'PH1', unit: 'PH', key: 'ph1', value: '--', show: false },
    { name: 'PH2', unit: 'PH', key: 'ph2', value: '--', show: false },

    { name: 'ORP1', unit: 'mV', key: 'orp1', value: '--', show: false },
    { name: 'ORP2', unit: 'mV', key: 'orp2', value: '--', show: false },

    { name: 'Liquid level', unit: 'm', key: 'level', value: '--', show: false },
    { name: 'Salinity', unit: 'PSU', key: 's', value: '--', show: false },
    { name: 'Nitrite', unit: 'mg/L', key: 'no2', value: '--', show: false },
    { name: 'Ammonia Nitrogen', unit: 'mg/L', key: 'andan', value: '--', show: false },
    { name: 'Ozone', unit: 'mg/L', key: 'ozone', value: '--', show: false }
  ])

  const activeIndex = ref(0)
  const showChar = ref(false)

  let type = ''
  let interval = null
  const startLoop = () => {
    type ? getChar({ type }) : getChar()
    interval = setInterval(() => {
      type ? getChar({ type }) : getChar()
    }, 10000)
  }

  const stopLoop = () => {
    interval && clearInterval(interval)
    interval = null
  }

  watch(activeIndex, (val) => {
    console.log('IndexChange')

    type = options.value[val].key

    myChart && myChart.clear()

    stopLoop()
    startLoop()
  })

  onBeforeUnmount(() => {
    stopLoop()
  })

  const handleChange = (current: number) => {
    activeIndex.value = current * 3
  }

  const handleActiveChange = (index: number) => {
    activeIndex.value = index
  }
  watch(char, (val) => {
    const { date, sensor_data = { s20b: {} }, status, x, y } = val
    const { s20b } = sensor_data

    if (Object.keys(s20b).length > 4) {
      actions.showCursor = true
    } else {
      actions.showCursor = false
    }

    options.value.forEach((item) => {
      item.value =
        s20b[item.key] !== null && s20b[item.key] !== undefined && s20b[item.key] !== ''
          ? s20b[item.key]
          : '--'

      item.show = s20b[item.key] !== null && s20b[item.key] !== undefined
    })

    const tempOptions = options.value.filter((item) => item.show)

    if (tempOptions.length > 0 && type === '') {
      type = tempOptions[0].key
    }
    options.value = tempOptions

    console.log(options.value)

    showChar.value = Object.keys(s20b).length > 0

    // 显示的时候才去画图，要在下一个nextTich否则#char元素还不存在
    if (showChar.value) {
      nextTick(() => {
        if (!myChart) {
          myChart = echarts.init(document.getElementById('char'))
        }
        draw()
      })
    }
  })

  onMounted(() => {
    stopLoop()
    startLoop()
  })

  // 接下来的使用就跟之前一样，初始化图表，设置配置项

  const draw = () => {
    let { date, x, y } = char.value
    const unit = options.value[activeIndex.value].unit
    // console.log('unit', unit)
    //  {0: '今天', 1: '昨天', 2: '8月16日', 3: '8月15日', 4: '8月14日', 5: '8月13日'}
    console.log('date', date)
    if (!isZh) {
      date[0] = 'Today'
      date[1] = 'Yesterday'
      date = date.map((item) => item.replace('月', '-').replace('日', ''))
    }

    // console.log('x', x)
    // console.log('y', y)

    const array1D = y.flat().filter((item) => item !== '')
    // 将字符串转换为数字
    const numericArray = array1D.map(Number)
    // 获取最大值和最小值
    let max = Math.ceil(Math.max(...numericArray))
    let min = Math.floor(Math.min(...numericArray))

    // let min = tempMin - Math.ceil((tempMax - tempMin) * 0.1)

    // 配置项
    let charOptions = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#49515e',
        padding: [20, 50, 20, 24],
        borderWidth: 0,
        textStyle: {
          color: '#dae4e5', // 文字颜色
          fontSize: 18, // 文字大小
          fontWeight: 'normal' // 文字粗细
        },
        formatter: function (params) {
          var result = ''
          params.forEach(function (item) {
            let name = item.seriesName
            // if (name.indexOf('/') > -1) {
            //   name = name.replace('/', '月')
            //   name += '日'
            // }
            result +=
              `<div class="tooltip-item">` +
              `<span class="square-marker" style="background:${item.color}"></span>` +
              `<span class="series-name">${name} ${item.axisValue}</span>` +
              `<span class="value">${item.value || '--'}${unit}</span>` +
              `</div>`
          })
          return result
        }
      },
      legend: {
        data: date,
        bottom: 10,
        textStyle: {
          color: '#fff'
        },
        icon: 'rect',
        itemWidth: 13,
        itemHeight: 4
      },
      grid: {
        left: '0',
        right: '16px',
        bottom: '40px',
        top: '22px',
        containLabel: true
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: x,

        axisLine: {
          lineStyle: {
            color: 'rgba(218, 228, 299, 0.2)'
          }
        },
        axisLabel: {
          color: '#9EA0A6',
          // 只显示特定时间点的标签
          interval: 0,
          formatter: function (value) {
            const showLabels = ['00:00', '06:00', '12:00', '18:00', '24:00']
            return showLabels.includes(value) ? value : ''
          }
        },
        // 隐藏刻度线
        axisTick: {
          show: false
        }
        // 关键设置：关闭X轴的网格线
        // splitLine: {
        // 	show: false,
        // },
      },
      yAxis: {
        type: 'value',
        min: min,
        max: max,
        // interval: 3,
        nameTextStyle: {
          color: '#9EA0A6'
        },

        axisLabel: {
          color: '#9EA0A6',
          formatter: `{value}${unit}`
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(218, 228, 299, 0.2)', // 辅助线颜色
            type: 'dashed', // 设置为虚线
            width: 1,
            dashLength: 4, // 虚线长度
            gapLength: 2 // 间隔长度
          }
        }
      },

      series: [
        {
          name: date[0],
          type: 'line',
          smooth: true,
          data: y[0],
          symbol: 'none',

          lineStyle: {
            width: 2,
            color: '#00E4FB' // 浅蓝色
          },
          itemStyle: {
            color: '#00E4FB'
          }
        },
        {
          name: date[1],
          type: 'line',
          smooth: true,
          data: y[1],
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#7060FD' // 紫色
          },
          itemStyle: {
            color: '#7060FD'
          }
        },
        {
          name: date[2],
          type: 'line',
          smooth: true,
          data: y[2],
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#16CE67' // 绿色
          },
          itemStyle: {
            color: '#16CE67'
          }
        },
        {
          name: date[3],
          type: 'line',
          smooth: true,
          data: y[3],
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#ECA303' // 橙色
          },
          itemStyle: {
            color: '#ECA303'
          }
        },
        {
          name: date[4],
          type: 'line',
          smooth: true,
          data: y[4],
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#FC52E3' // 粉色
          },
          itemStyle: {
            color: '#FC52E3'
          }
        }
      ]
    }

    myChart.setOption(charOptions)
  }
</script>

<style lang="less" scoped>
  .line-char {
    height: 100%;
    background-color: #1f2838;
    border-radius: 12px;
    position: relative;
    padding: 20px 24px 0 24px;
    display: flex;
    flex-direction: column;
    // overflow: hidden;
    // align-items: center;
    .select {
      height: 56px;
      border-radius: 32px;
      background: rgba(255, 255, 255, 0.15);
      width: 950px;
      // margin-bottom: 0;
      margin: 0 auto;
      display: flex !important;
      padding: 0;
      .option {
        flex: 1;
        padding: 6px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 32px;

        .value {
          font-size: 18px;
          font-weight: bold;
        }
        .name {
          font-size: 12px;
          color: #9ea0a6;
        }
        &.active {
          background-color: #00e4fb;
          color: #0c0c0c;
          .name {
            color: #0c0c0c;
          }
        }
      }
    }
    .char {
      flex: 1;
    }
    .offline {
      position: absolute;
      top: 0;
      left: 0;
      width: 48px;
      height: 24px;
      background: #f53d2d;
      border-radius: 12px 0px 12px 0px;
      line-height: 24px;
      text-align: center;
      color: #0c0c0c;
      font-size: 13px;
    }

    .loading {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      // background-color: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
    }
  }
</style>

<style lang="less">
  .tooltip-item {
    display: flex;
    align-items: center;
    .square-marker {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 17px;
    }
    .series-name {
      display: inline-block;
      width: 175px;
    }
  }

  .tooltip-item + .tooltip-item {
    margin-top: 6px;
  }
</style>
