import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/config/router.config'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes.concat(asyncRoutes)
})

export default router
