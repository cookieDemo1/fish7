<template>
  <div class="line-char">
    <div v-if="true" class="offline">离线</div>

    <ul class="select">
      <li
        v-for="(item, index) in options"
        :key="index"
        class="option"
        :class="{ active: index === activeIndex }"
        @click="activeIndex = index"
      >
        <div class="value">{{ item.value }} {{ item.unit }}</div>
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>

    <div id="char" class="char"></div>
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

  const options = ref([
    { name: '溶解氧', value: '--', key: '', unit: 'mg/L' },
    { name: '水温值', value: '--', key: '', unit: '℃' },
    { name: 'PH值', value: '--', key: '', unit: 'PH' }
  ])
  const activeIndex = ref(0)

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

  // 接下来的使用就跟之前一样，初始化图表，设置配置项

  onMounted(() => {
    var myChart = echarts.init(document.getElementById('char'))

    var hours = ['00:00', '06:00', '12:00', '18:00', '24:00']

    // 模拟浓度数据（根据您的描述调整）
    var dataToday = [2.1, 3.5, 4.2, 3.8, 2.5] // 浅蓝色 - 今天
    var dataYesterday = [2.5, 4.0, 5.0, 4.5, 3.0] // 紫色 - 昨天
    var data0413 = [3.0, 5.0, 6.0, 5.5, 4.0] // 绿色 - 04/13
    var data0412 = [4.0, 6.5, 8.0, 7.0, 5.0] // 橙色 - 04/12
    var data0411 = [2.8, 4.5, 5.5, 5.0, 3.5] // 粉色 - 04/11

    // 配置项
    var options = {
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
            if (name.indexOf('/') > -1) {
              name = name.replace('/', '月')
              name += '日'
            }
            result +=
              `<div class="tooltip-item">` +
              `<span class="square-marker" style="background:${item.color}"></span>` +
              `<span class="series-name">${name} ${item.axisValue}</span>` +
              `<span class="value">${item.value}${'mg/L'}</span>` +
              `</div>`
          })
          return result
        }
      },
      legend: {
        data: ['今天', '昨天', '04/13', '04/12', '04/11'],
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
        data: hours,

        axisLine: {
          lineStyle: {
            color: 'rgba(218, 228, 299, 0.2)'
          }
        },
        axisLabel: {
          color: '#9EA0A6'
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
        min: 0,
        max: 12,
        interval: 3,
        nameTextStyle: {
          color: '#9EA0A6'
        },

        axisLabel: {
          color: '#9EA0A6',
          formatter: '{value}mg/L'
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
          name: '今天',
          type: 'line',
          smooth: true,
          data: dataToday,
          symbol: 'none',

          lineStyle: {
            width: 2,
            color: '#00E5E5' // 浅蓝色
          },
          itemStyle: {
            color: '#00E5E5'
          }
        },
        {
          name: '昨天',
          type: 'line',
          smooth: true,
          data: dataYesterday,
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
          name: '04/13',
          type: 'line',
          smooth: true,
          data: data0413,
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
          name: '04/12',
          type: 'line',
          smooth: true,
          data: data0412,
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
          name: '04/11',
          type: 'line',
          smooth: true,
          data: data0411,
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

    myChart.setOption(options)
  })
</script>

<style lang="less" scoped>
  .line-char {
    height: 290px;
    background-color: #1f2838;
    border-radius: 12px;
    position: relative;
    padding: 20px 24px 0 24px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    .select {
      height: 56px;
      border-radius: 32px;
      background: rgba(255, 255, 255, 0.15);
      width: 570px;
      // margin-bottom: 0;
      margin: 0 auto;
      display: flex;
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
          background-color: #00e5e5;
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
