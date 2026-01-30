import type { RouteRecordRaw } from 'vue-router'
import { h } from 'vue'
const mode = import.meta.env.VITE_APP_MODE as string
//首页
const MainLayout = () => import('@/layouts/MainLayout.vue')
//404
const NotFound = () => import('@/views/404.vue')
const Inch7Home = () => import('@/views/home/inch7Index.vue')

const Inch10Home = () => import('@/views/home/Inch10Index.vue')

const Data = () => import('@/views/data/index.vue')

// const Automatic = () => import('@/views/automatic/index.vue')

const AutoPage = () => import('@/views/auto/index.vue')
const AlwaysPage = () => import('@/views/always/index.vue')
const CompostaskAdd = () => import('@/views/auto/CompostaskAdd.vue')
const CompostaskScene = () => import('@/views/auto/CompostaskScene.vue')
const CompostaskSceneDetail = () => import('@/views/auto/CompostaskSceneDetail.vue')
const CompostaskTimer = () => import('@/views/auto/CompostaskTimer.vue')
const CompostaskTimerDetail = () => import('@/views/auto/CompostaskTimerDetail.vue')
const CompostaskCondition = () => import('@/views/auto/CompostaskCondition.vue')
const CompostaskConditionDetail = () => import('@/views/auto/CompostaskConditionDetail.vue')
const CompostaskLoop = () => import('@/views/auto/CompostaskLoop.vue')
const CompostaskLoopDetail = () => import('@/views/auto/CompostaskLoopDetail.vue')
// const DataWarning = () => import('@/views/auto/DataWarning.vue');

const ChildtaskManage = () => import('@/views/auto/ChildtaskManage.vue')
const ChildtaskAdd = () => import('@/views/auto/ChildtaskAdd.vue')

import homeNormal from '@/assets/button_home_nor@2x.png'
import homeActive from '@/assets/button_home_click@2x.png'
import dataNormal from '@/assets/button_shuj_nor@2x.png'
import dataActive from '@/assets/button_shuj_click@2x.png'
import autoNormal from '@/assets/button_auto_nor@2x.png'
import autoActive from '@/assets/button_auto_click@2x.png'
import alwaysNormal from '@/assets/button_changkaicb_nor@2x.png'
import alwaysActive from '@/assets/button_changkaicb_click@2x.png'

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

const fish10Router: Array<RouteRecordRaw> = [
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
          title: 'Home',
          normal: homeNormal,
          active: homeActive,
          menu: true
        },
        component: Inch10Home
      },
      {
        path: '/data',
        name: 'data',
        meta: {
          title: 'Data',
          normal: dataNormal,
          active: dataActive,
          menu: true
        },
        component: Data
      },
      {
        path: '/automation',
        name: 'automation',
        meta: { title: 'Automation', normal: autoNormal, active: autoActive, menu: true },
        component: AutoPage,
        props: (route) => route.query
      },

      {
        path: '/always',
        name: 'always',
        meta: {
          title: 'Always Open And Always Closed',
          normal: alwaysNormal,
          active: alwaysActive,
          menu: true
        },
        component: AlwaysPage,
        props: (route) => route.query
      },

      {
        path: '/childtask/manage',
        name: 'childtaskManage',
        meta: { title: '子任务管理', menu: false },
        component: ChildtaskManage,
        props: (route) => route.query
      },
      {
        path: '/childtask/add',
        name: 'childtaskAdd',
        meta: { title: '增加子任务', menu: false },
        component: ChildtaskAdd,
        props: (route) => route.query
      },
      {
        path: '/automation/add',
        name: 'compostaskAdd',
        meta: { title: '新增任务', menu: false },
        component: CompostaskAdd,
        props: (route) => route.query
      },
      {
        path: '/automation/task/scene',
        name: 'compostaskScene',
        meta: { title: '场景任务', menu: false },
        component: CompostaskScene,
        props: (route) => route.query
      },
      {
        path: '/automation/task/scene/detail',
        name: 'compostaskSceneDetail',
        meta: { title: '场景任务详情', menu: false },
        component: CompostaskSceneDetail,
        props: (route) => route.query
      },
      {
        path: '/automation/task/timer',
        name: 'compostaskTimer',
        meta: { title: '定时任务', menu: false },
        component: CompostaskTimer,
        props: (route) => route.query
      },
      {
        path: '/automation/task/timer/detail',
        name: 'compostaskTimerDetail',
        meta: { title: '定时任务详情', menu: false },
        component: CompostaskTimerDetail,
        props: (route) => route.query
      },
      {
        path: '/automation/task/condition',
        name: 'compostaskCondition',
        meta: { title: '条件任务', menu: false },
        component: CompostaskCondition,
        props: (route) => route.query
      },
      {
        path: '/automation/task/condition/detail',
        name: 'compostaskConditionDetail',
        meta: { title: '条件任务详情', menu: false },
        component: CompostaskConditionDetail,
        props: (route) => route.query
      },
      {
        path: '/automation/task/loop',
        name: 'compostaskLoop',
        meta: { title: '循环任务', menu: false },
        component: CompostaskLoop,
        props: (route) => route.query
      },
      {
        path: '/automation/task/loop/detail',
        name: 'compostaskLoopDetail',
        meta: { title: '循环任务详情', menu: false },
        component: CompostaskLoopDetail,
        props: (route) => route.query
      }
    ]
  },
  notFoundRoute
]

const fish7Router: Array<RouteRecordRaw> = [
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
          title: 'Home',
          normal: homeNormal,
          active: homeActive,
          menu: true
        },
        component: Inch7Home
      },
      {
        path: '/automation',
        name: 'automation',
        meta: { title: 'Automation', normal: autoNormal, active: autoActive, menu: true },
        component: AutoPage,
        props: (route) => route.query
      },

      {
        path: '/always',
        name: 'always',
        meta: {
          title: 'Always Open And Always Closed',
          normal: alwaysNormal,
          active: alwaysActive,
          menu: true
        },
        component: AlwaysPage,
        props: (route) => route.query
      },

      {
        path: '/childtask/manage',
        name: 'childtaskManage',
        meta: { title: '子任务管理', menu: false },
        component: ChildtaskManage,
        props: (route) => route.query
      },
      {
        path: '/childtask/add',
        name: 'childtaskAdd',
        meta: { title: '增加子任务', menu: false },
        component: ChildtaskAdd,
        props: (route) => route.query
      },
      {
        path: '/automation/add',
        name: 'compostaskAdd',
        meta: { title: '新增任务', menu: false },
        component: CompostaskAdd,
        props: (route) => route.query
      },
      {
        path: '/automation/task/scene',
        name: 'compostaskScene',
        meta: { title: '场景任务', menu: false },
        component: CompostaskScene,
        props: (route) => route.query
      },
      {
        path: '/automation/task/scene/detail',
        name: 'compostaskSceneDetail',
        meta: { title: '场景任务详情', menu: false },
        component: CompostaskSceneDetail,
        props: (route) => route.query
      },
      {
        path: '/automation/task/timer',
        name: 'compostaskTimer',
        meta: { title: '定时任务', menu: false },
        component: CompostaskTimer,
        props: (route) => route.query
      },
      {
        path: '/automation/task/timer/detail',
        name: 'compostaskTimerDetail',
        meta: { title: '定时任务详情', menu: false },
        component: CompostaskTimerDetail,
        props: (route) => route.query
      },
      {
        path: '/automation/task/condition',
        name: 'compostaskCondition',
        meta: { title: '条件任务', menu: false },
        component: CompostaskCondition,
        props: (route) => route.query
      },
      {
        path: '/automation/task/condition/detail',
        name: 'compostaskConditionDetail',
        meta: { title: '条件任务详情', menu: false },
        component: CompostaskConditionDetail,
        props: (route) => route.query
      },
      {
        path: '/automation/task/loop',
        name: 'compostaskLoop',
        meta: { title: '循环任务', menu: false },
        component: CompostaskLoop,
        props: (route) => route.query
      },
      {
        path: '/automation/task/loop/detail',
        name: 'compostaskLoopDetail',
        meta: { title: '循环任务详情', menu: false },
        component: CompostaskLoopDetail,
        props: (route) => route.query
      }
    ]
  },
  notFoundRoute
]

console.log(mode)

export const asyncRoutes: Array<RouteRecordRaw> =
  mode === 'inch10' || mode === 'inch21' ? fish10Router : fish7Router
