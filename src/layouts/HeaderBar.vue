<template>
  <header class="header-bar">
    <div class="logo">
      <img src="@/assets/top_img@2x.png" class="bg-img" alt="logo" />
      <img src="@/assets/logowenz_img@2x.png" class="logo-img" alt="logo" />
    </div>
    <div class="header">
      <!-- 首页和自动化显示路由 -->
      <template v-if="activeRoute === '/home' || activeRoute === '/automation'">
        <ul class="nav">
          <li
            v-for="item in routes"
            :key="item.path"
            class="nav-item"
            :class="{ active: item.path === activeRoute }"
            @click="router.push(item.path)"
          >
            <img
              class="route-icon"
              :src="item.path === activeRoute ? (item.meta.active as string) : (item.meta.normal as string)"
            />

            <span>{{ item.meta.title }}</span>
          </li>

          <!-- 小程序码，不在路由中 -->
          <li class="nav-item" :class="{ active: actions.showCode }" @click="actions.handleCode">
            <img class="route-icon" :src="actions.showCode ? activeMiniIcon : normalMiniIcon" />
            <span>小程序</span>
          </li>
        </ul>
      </template>
      <!-- 其他页面显示返回 -->
      <template v-else>
        <div class="back" @click="handleBack()">
          <img src="@/assets/return_button@2x.png" class="back-icon" alt="" />
          <span class="back-text">{{ text }}</span>
        </div>
      </template>
      <div class="info">
        <div ref="timeRef" class="time"></div>
        <img
          :src="fullscreen ? fullscreenIcon : nomralscreenIcon"
          alt=""
          class="icon full-screen"
          @click="onFullScreen"
        />

        <img src="@/assets/refe_button@2x.png" alt="" class="icon refresh" @click="onRefresh" />
      </div>
    </div>
  </header>

  <modal-code v-model="actions.showCode"></modal-code>
</template>

<script setup lang="ts">
  import fullscreenIcon from '@/assets/exfuscreen_button@2x.png'
  import nomralscreenIcon from '@/assets/fuscreen_button@2x.png'

  import normalMiniIcon from '@/assets/button_xiaocx_nor@2x.png'
  import activeMiniIcon from '@/assets/button_xiaocx_click@2x.png'

  import { asyncRoutes } from '@/config/router.config'
  const { radom, setRadom } = store.useRefreshStore()
  const routes = [...asyncRoutes[0].children].filter((item) => item.meta.menu)

  const { actions } = use.useActions(['code'])

  const activeRoute = ref('')
  const route = useRoute()
  const router = useRouter()
  const text = ref('')

  const fullscreen = ref(!!document.fullscreenElement)
  watch(
    route,
    () => {
      console.log(route)
      activeRoute.value = route.path
      text.value = (route.meta.text as string) || ''
    },
    {
      immediate: true
    }
  )

  const handleBack = () => {
    router.go(-1)
  }

  const timeRef = ref()
  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      const now = new Date()
      const year = now.getFullYear()
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      const date = now.getDate().toString().padStart(2, '0')
      const hour = now.getHours().toString().padStart(2, '0')
      const minute = now.getMinutes().toString().padStart(2, '0')
      const second = now.getSeconds().toString().padStart(2, '0')
      const timeStr = `${year}-${month}-${date} ${hour}:${minute}:${second}`
      timeRef.value.innerHTML = timeStr
    }, 1000)
  })

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

  const onFullScreen = () => {
    if (!document.fullscreenElement) {
      // 如果不在全屏状态，则进入全屏
      const element = document.documentElement // 整个页面
      if (element.requestFullscreen) {
        element.requestFullscreen()
        fullscreen.value = true
      }
    } else {
      // 如果已经在全屏状态，则退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen()
        fullscreen.value = false
      }
    }
  }

  const onRefresh = () => {
    setRadom()
  }
</script>

<style lang="less" scoped>
  .header-bar {
    height: 62px;
    padding: 0 24px;
    position: relative;

    .logo {
      width: 510px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      .bg-img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .logo-img {
        width: 147px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .header {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .info {
        display: flex;
        align-items: center;
        .icon {
          width: 48px;
          height: 42px;
          margin-left: 16px;
        }
        .time {
          font-size: 16px;
          color: #9ea0a6;
        }
      }

      .nav {
        position: relative;
        z-index: 999;
        display: flex;
        margin: 0;
        padding: 0;
        .nav-item {
          &.active {
            font-weight: bold;
            color: @primaryColor;
          }
          display: flex;
          align-items: center;
          font-size: 17px;
          .route-icon {
            width: 40px;
            height: 40px;
            margin-right: 8px;
          }
        }
        .nav-item + .nav-item {
          // margin-left: 45px;
          margin-left: 20px;
        }
      }

      .back {
        display: flex;
        align-items: center;
        .back-icon {
          width: 42px;
          height: 42px;
        }
        .back-text {
          font-size: 17px;
          margin-left: 8px;
        }
      }
    }
  }
</style>
