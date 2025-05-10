import { App } from 'vue'
import { h } from 'vue'
import Antd, { message, notification, Spin } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.variable.less'
import { LoadingOutlined } from '@ant-design/icons-vue'
import JsonViewer from 'vue3-json-viewer'
// if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
import 'vue3-json-viewer/dist/index.css'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
use([
  CanvasRenderer,
  LineChart,
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])
// provide(THEME_KEY, 'dark')

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

const files = Object.assign({}, antdComponent, commonComponent, layoutComponent)

export const setupComponents = (app: App) => {
  app.use(Antd)
  app.use(JsonViewer)
  Object.keys(files).forEach((path) => {
    const name = path.replace(/.*\/|\.vue/g, '')
    const component = files[path] || {}
    app.component(name, component)
  })
  app.component('VChart', VChart)
}
