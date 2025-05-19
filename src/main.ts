import { createApp } from 'vue'
import App from './App.vue'
import '@/style/reset.less'
import { setupComponents } from '@/core/components'
import setupVant from '@/core/vant'

import router from '@/router'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import './permission'

const pinia = createPinia()
const app = createApp(App)
setupComponents(app)
setupVant(app)

app.use(pinia).use(router).mount('#app')
