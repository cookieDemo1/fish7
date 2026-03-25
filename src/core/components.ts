import 'ant-design-vue/dist/antd.less'

import { LoadingOutlined } from '@ant-design/icons-vue'
import Antd, { message, notification, Spin } from 'ant-design-vue'
import { BarChart, GaugeChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { App } from 'vue'
import { h } from 'vue'
import VChart, { THEME_KEY } from 'vue-echarts'
use([
  TitleComponent,
  CanvasRenderer,
  RadarChart,
  GaugeChart,
  LineChart,
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

message.config({
  top: `70px`,
  duration: 3,
  maxCount: 2
})

notification.config({
  top: '100px',
  duration: 3
} as any)

Spin.setDefaultIndicator({
  indicator: h(LoadingOutlined, { style: 'font-size: 24px', spin: true })
})

const antdComponent = import.meta.glob('../components/antd/*.vue', {
  eager: true,
  import: 'default'
})
const commonComponent = import.meta.glob('../components/common/*.vue', {
  eager: true,
  import: 'default'
})
const layoutComponent = import.meta.glob('../components/layout/*.vue', {
  eager: true,
  import: 'default'
})
const modalComponent = import.meta.glob('../components/modal/*.vue', {
  eager: true,
  import: 'default'
})

const files = Object.assign({}, antdComponent, commonComponent, layoutComponent, modalComponent)

export const setupComponents = (app: App) => {
  // 全局注册了
  app.use(Antd)
  Object.keys(files).forEach((path) => {
    const name = path.replace(/.*\/|\.vue/g, '')
    const component = files[path] || {}
    app.component(name, component)
  })
  app.component('VChart', VChart)
}
