import router from './router'
import NProgress from 'nprogress'
import '@/style/nprogress.less'

// const loginRoutePath = '/login'

NProgress.configure({ showSpinner: false }) // 配置进度

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = String(to.meta.title)
  }

  NProgress.done() // 完成进度条
})
