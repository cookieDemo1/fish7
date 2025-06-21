<template>
  <m-modal v-model="visible" :width="1100">
    <div class="modal-content">
      <div class="card-header">
        <div class="title">
          <div class="status" :class="item.status == '1' ? 'green' : 'red'">
            {{ item.status == '1' ? '在线' : '离线' }}
          </div>
          {{ item.title }}
        </div>
        <div class="tip">{{ item.tip }}</div>
      </div>
      <div class="card-body">
        <div class="info">
          <div class="left">
            <div class="top">
              <div class="value">{{ item.val || '--' }}</div>
              <div class="unit">{{ item.unit }}</div>
            </div>
            <div
              class="bottom"
              :class="{ yellow: item.color == 2, red: item.color == 3, blue: item.color == 4 }"
            >
              <div v-if="item.status != '2'" class="state">{{ item.level || '--' }}</div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
          <div class="right">
            <SvgIcon
              class="icon"
              :name="item.status == '2' ? item.icons[0] : item.icons[item.color]"
            ></SvgIcon>
          </div>
        </div>

        <div class="chart-container">
          <div class="title">最近5天数据对比</div>
          <v-chart class="chart" :option="option" autoresize />
        </div>
      </div>

      <div class="close-icon">
        <SvgIcon class="icon" name="guanbib_button" @click="visible = false"></SvgIcon>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs'
  import { graphic } from 'echarts/core'
  const props = defineProps({
    modelValue: PropTypes.bool,
    item: PropTypes.object
  })
  const emit = defineEmits(['update:modelValue', 'callback'])
  const times = utils.times

  const chartData = ref(props.item)
  watch(
    () => props.item?.y,
    () => {
      chartData.value = props.item
    }
  )

  const option = computed(() => {
    const { y = [], unit } = chartData.value || {}

    const colors = ['#00E4F8', '#7060FD', '#16CE67', '#ECA303', '#FC52E3']
    const colorStops = [
      { start: 'rgba(0, 228, 248,0.5)', stop: 'rgba(0, 228, 248,0)' },
      { start: 'rgba(112, 96, 253, 0.50)', stop: 'rgba(112, 96, 253, 0)' },
      { start: 'rgba(22, 206, 103, 0.50)', stop: 'rgba(22, 206, 103, 0)' },
      { start: 'rgba(236, 163, 3,  0.50)', stop: 'rgba(236, 163, 3, 0)' },
      { start: 'rgba(252, 82, 227,0.5)', stop: 'rgba(252, 82, 227, 0)' }
    ]
    const today = dayjs()
    const series = Array.from(Array(5)).map((i, index) => {
      const { start = '', stop = '' } = colorStops[index] || {}
      const item = {
        name: '',
        data: [],
        type: 'line',
        smooth: 'true',
        symbol: 'none',
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: start },
            { offset: 1, color: stop }
          ]),
          opacity: 0.5
        }
      }
      if (index === 0) {
        item.name = '今天'
      } else if (index === 1) {
        item.name = '昨天'
      } else {
        item.name = today.subtract(index, 'day').format('MM/DD')
      }
      item.data = y[index] || []

      return { ...item }
    })

    return {
      color: colors,
      grid: {
        left: '0%',
        right: '2%',
        bottom: '15%',
        top: '8%',
        containLabel: true
      },
      legend: {
        icon: 'roundRect',
        itemGap: 20,
        itemWidth: 13,
        itemHeight: 4,
        bottom: 0,
        textStyle: {
          color: '#DAE4E5'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#00E5E5',
            type: 'line'
          }
        },
        className: 'chart-tooltip-container',
        formatter: function (params) {
          return `
						<div class="chart-tooltip">
						${params
              .map((item) => {
                const { color, seriesName, name, value } = item || {}
                return `
					  <div class="tooltip-item">
              <div class="left">
                <div class="marker" style="background-color:${color}"></div>
                <div class="seriesName">${seriesName}</div>
                <div class="name">${name}</div>
              </div>
              <div class="right">${value}</div>
					  </div>
					`
              })
              .join('')}
						</div>
					`
        }
      },
      xAxis: {
        type: 'category',
        data: times,
        axisLabel: {
          interval: function (index: number, value: string) {
            if (['00:00', '06:00', '12:00', '18:00', '24:00'].indexOf(value) !== -1) {
              return true
            }
            return false
          },
          alignMinLabel: 'left',
          alignMaxLabel: 'right',
          margin: 10,
          color: '#99ACBF',
          fontSize: '12px'
        },
        boundaryGap: false,
        axisTick: {
          show: false
        }
      },
      yAxis: {
        splitNumber: 5,
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(218,228,229,0.2)',
            width: '1'
          }
        },
        axisLabel: {
          // y轴刻度值距离y轴的距离
          formatter: '{value}' + unit,
          margin: 10,
          color: '#99ACBF',
          fontSize: '12px'
        },
        // min: function (value) {
        // 	return (value.min * 0.8).toFixed(2);
        // },
        max: function (value) {
          return (value.max * 1.2).toFixed(0)
        }
      },
      series: series
    }
  })

  const { visible } = use.useVisible({ props, emit })
</script>

<style lang="less" scoped>
  .modal-content {
    position: relative;
    padding: 30px;
    .card-header {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 18px;
        color: #dae4e5;
        .status {
          padding: 2px 10px;
          font-size: 12px;
          font-weight: normal;
          color: #000916;
          margin-right: 12px;
          border-radius: 18px;
          &.green {
            background: #16ce67;
          }
          &.red {
            background: #ff5446;
          }
        }
      }

      .tip {
        font-size: 15px;
        color: #99acbf;
      }
    }

    .card-body {
      .info {
        height: 110px;
        background: fade(#fff, 10%);
        border-radius: 12px;
        padding: 0 30px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          .top {
            display: flex;
            align-items: baseline;
            .value {
              font-weight: bold;
              font-size: 24px;
              color: #dae4e5;
            }
            .unit {
              margin-left: 8px;
              font-size: 16px;
              color: #dae4e5;
            }
          }
          .bottom {
            display: flex;
            align-items: center;
            .state {
              padding: 2px 10px;
              background: fade(#16ce67, 20%);
              border-radius: 6px;
              font-weight: bold;
              font-size: 16px;
              color: #16ce67;
            }
            .name {
              margin-left: 12px;
              font-size: 16px;
              color: #99acbf;
            }
            &.yellow {
              .state {
                background: fade(#eca303, 20%);
                color: #eca303;
              }
            }
            &.red {
              .state {
                background: fade(#ff5446, 20%);
                color: #ff5446;
              }
            }
            &.blue {
              .state {
                background: fade(#73a9e0, 20%);
                color: #73a9e0;
              }
            }
          }
        }

        .right {
          .icon {
            width: 60px;
            height: 60px;
          }
        }
      }
    }

    .chart-container {
      position: relative;
      .title {
        font-size: 17px;
        color: #dae4e5;
        margin-bottom: 12px;
      }
      .icon {
        position: absolute;
        top: -8px;
        right: 0;
        width: 44px;
        height: 44px;
      }
      .chart {
        height: 390px;
      }
    }

    .close-icon {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -120px;
      text-align: center;

      .icon {
        cursor: pointer;
        width: 70px;
        height: 70px;
      }
    }
  }
</style>
