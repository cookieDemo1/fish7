<template>
  <header class="header-bar">
    <div class="logo">
      <!-- <img src="@/assets/top_img@2x.png" class="bg-img" alt="logo" /> -->
      <img src="@/assets/logo_img@2x.png" class="logo-img" alt="logo" />
      <span class="nav-text">{{ $t('Smart Fish Farming') }}</span>
    </div>
    <div class="header">
      <!-- 首页和自动化显示路由 -->
      <template v-if="route.meta.menu">
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

            <span>{{ $t(item.meta.title as string) }}</span>
          </li>

          <!-- <template v-if="secondRoutes.length > 0">
            <li class="nav-item more" :class="{ active: moreActive }" @click="handleMore">
              <img class="route-icon" :src="moreActive ? activeMoreIcon : normalMoreIcon" />
              <span>{{ $t('More') }}</span>
            </li>
          </template> -->
        </ul>
      </template>
      <!-- 其他页面显示返回 -->
      <template v-else>
        <div class="back" @click="handleBack()">
          <img src="@/assets/return_button@2x.png" class="back-icon" alt="" />
          <span class="back-text">{{ text }}</span>
        </div>
      </template>
      <!-- 右侧的全屏和中英文切换按钮 -->
      <div class="info">
        <ul class="nav" style="margin-right: 30px">
          <li class="nav-item" :class="{ active: actions.showCode }" @click="handleInnerCode()">
            <img class="route-icon" :src="actions.showCode ? activeMiniIcon : normalMiniIcon" />
            <span>{{ $t('Mini Program') }}</span>
          </li>
        </ul>
        <div ref="timeRef" class="time"></div>
        <span class="icon-wrap" @click="onLang">
          <img
            v-if="LANG !== 'zh'"
            :src="lang == 'zh' ? zhIcon : enIcon"
            alt=""
            class="icon lang"            
          />
        </span>
        <span class="icon-wrap" @click="onFullScreen">
          <img
            :src="fullscreen ? fullscreenIcon : nomralscreenIcon"
            alt=""
            class="icon full-screen" 
          />
        </span>
        <span class="icon-wrap" @click="onRefresh">
          <img src="@/assets/refe_button@2x.png" alt="" class="icon refresh" />
        </span>
      </div>
    </div>
  </header>

  <modal-code v-model="actions.showCode" @callback="actions.showCode = false"></modal-code>
</template>

<script setup lang="ts">
  import fullscreenIcon from '@/assets/exfuscreen_button@2x.png'
  import nomralscreenIcon from '@/assets/fuscreen_button@2x.png'

  import normalMiniIcon from '@/assets/button_xiaocx_nor@2x.png'
  import activeMiniIcon from '@/assets/button_xiaocx_click@2x.png'

  import normalMoreIcon from '@/assets/button_more_nor@2x.png'
  import activeMoreIcon from '@/assets/button_more_click@2x.png'

  import zhIcon from '@/assets/zh@2x.png'
  import enIcon from '@/assets/en@2x.png'
  import { asyncRoutes } from '@/config/router.config'

  const LANG = import.meta.env.VITE_APP_LANG as string

  const { lang, setLang, isZh } = use.useLang()

  const onLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh')
  }

  const { radom, setRadom } = store.useRefreshStore()
  const routes = [...asyncRoutes[0].children].filter((item) => item.meta.menu)

  const { actions } = use.useActions(['code', 'more'])

  const activeRoute = ref('')
  const route = useRoute()
  const router = useRouter()
  const text = ref('')

  const fullscreen = ref(!!document.fullscreenElement)
  watch(
    route,
    () => {
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

  const handleInnerCode = () => {
    actions.showMore = false
    actions.handleCode()
  }
</script>

<style lang="less" scoped>
  .header-bar {
    height: 72px;
    padding: 0 24px;
    position: relative;

    .logo {
      width: 510px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      background-image: url('../assets/top_img@2x.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;

      .logo-img {
        width: 31px;
        height: 32px;
      }

      .nav-text {
        font-size: 22px;
        color: #dae4e5;
        font-weight: 500;
        margin-left: 10px;
      }
    }
    .header {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .info {
        height: 100%;
        display: flex;
        align-items: center;
        .icon-wrap{
          margin-left: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .icon {
          width: 56px;
          height: 50px;
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
        height: 100%;
        .nav-item {
          height: 100%;
          &.active > span {
            font-weight: bold;
            color: @primaryColor;
          }
          display: flex;
          align-items: center;
          font-size: 19px;
          .route-icon {
            width: 50px;
            height: 50px;
            margin-right: 8px;
          }
        }
        .nav-item + .nav-item {
          margin-left: 16px;
        }

        .nav-item.more {
          position: relative;
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
