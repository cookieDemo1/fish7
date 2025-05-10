import type { RouteRecordRaw } from 'vue-router'
import { h } from 'vue'

//首页
const MainLayout = () => import('@/layouts/MainLayout.vue')
//404
const NotFound = () => import('@/views/404.vue')
const Home = () => import('@/views/home/index.vue')
const Automatic = () => import('@/views/automatic/index.vue')

import homeNormal from '@/assets/button_home_nor@2x.png'
import homeActive from '@/assets/button_home_click@2x.png'
import autoNormal from '@/assets/button_auto_nor@2x.png'
import autoActive from '@/assets/button_auto_click@2x.png'

const RouteView = {
  name: 'route-view',
  render: () => h('router-view')
}

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/404',
    component: NotFound
  }
]

const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404'
}

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          normal: homeNormal,
          active: homeActive
        },
        component: Home
      },
      {
        path: '/automatic',
        name: 'automatic',
        meta: {
          title: '自动化',
          normal: autoNormal,
          active: autoActive
        },
        component: Automatic
      },
      {
        path: '/auto-add-overview',
        name: 'auto-add-overview',
        meta: {
          title: '新增自动化'
        },
        component: () => import('@/views/automatic/AutoAddOverview.vue')
      },
      {
        path: '/auto-add-scene',
        name: 'auto-add-scene',
        meta: {
          title: '场景任务-新增'
        },
        component: () => import('@/views/automatic/AutoAddScene.vue')
      },
      {
        path: '/auto-add-timing',
        name: 'auto-add-timing',
        meta: {
          title: '定时任务-新增'
        },
        component: () => import('@/views/automatic/AutoAddTiming.vue')
      },
      {
        path: '/auto-add-condition',
        name: 'auto-add-condition',
        meta: {
          title: '条件任务-新增'
        },
        component: () => import('@/views/automatic/AutoAddCondition.vue')
      },
      {
        path: '/auto-add-loop',
        name: 'auto-add-loop',
        meta: {
          title: '循环任务-新增'
        },
        component: () => import('@/views/automatic/AutoAddLoop.vue')
      }
    ]
  },
  notFoundRoute
]
