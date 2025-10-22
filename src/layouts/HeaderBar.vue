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
            v-for="item in firstRoutes"
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

          <template v-if="secondRoutes.length > 0">
            <li class="nav-item more" :class="{ active: moreActive }" @click="handleMore">
              <img class="route-icon" :src="moreActive ? activeMoreIcon : normalMoreIcon" />
              <span>{{ $t('More') }}</span>
            </li>
          </template>
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
        <div ref="timeRef" class="time"></div>
        <img
          v-if="LANG !== 'zh'"
          :src="lang == 'zh' ? zhIcon : enIcon"
          alt=""
          class="icon lang"
          @click="onLang"
        />
        <img
          :src="fullscreen ? fullscreenIcon : nomralscreenIcon"
          alt=""
          class="icon full-screen"
          @click="onFullScreen"
        />

        <img src="@/assets/refe_button@2x.png" alt="" class="icon refresh" @click="onRefresh" />
      </div>
    </div>

    <!-- 这个弹出框路由的高亮还没做，暂时不做 -->
    <teleport to="body">
      <ul v-if="actions.showMore" class="sub-nav">
        <li class="sub-nav-item" :class="{ active: actions.showCode }" @click="handleInnerCode()">
          <img class="route-icon" :src="actions.showCode ? activeMiniIcon : normalMiniIcon" />
          <span>{{ $t('Mini Program') }}</span>
          <img
            v-if="actions.showCode"
            src="@/assets/xuanzh_icon@2x.png"
            class="active-icon"
            alt=""
          />
        </li>
        <li
          v-for="item in secondRoutes"
          :key="item.path"
          class="sub-nav-item"
          :class="{ active: item.path === activeRoute }"
          @click="handleSceondRoute(item.path)"
        >
          <img
            class="route-icon"
            :src="item.path === activeRoute ? (item.meta.active as string) : (item.meta.normal as string)"
          />
          <span class="sub-nav-title">{{ $t(item.meta.title as string) }}</span>

          <img
            v-if="item.path === activeRoute"
            src="@/assets/xuanzh_icon@2x.png"
            class="active-icon"
            alt=""
          />
        </li>
      </ul>
    </teleport>
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

  const moreActive = ref(false)

  const { lang, setLang, isZh } = use.useLang()

  const onLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh')
  }

  const { radom, setRadom } = store.useRefreshStore()
  const routes = [...asyncRoutes[0].children].filter((item) => item.meta.menu)

  const firstRoutes = routes.slice(0, 2)
  const secondRoutes = routes.slice(2)

  console.log('firstRoutes', firstRoutes)
  console.log('secondRoutes', secondRoutes)

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
      moreActive.value = secondRoutes.findIndex((item) => item.path === route.path) > -1
    },
    {
      immediate: true
    }
  )

  const handleBack = () => {
    router.go(-1)
  }

  const handleSceondRoute = (path) => {
    router.push(path)
    actions.showMore = false
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

  const handleMore = (e) => {
    e.stopPropagation()
    e.stopImmediatePropagation()
    actions.showMore = true
  }

  const globalClick = (event) => {
    if (actions.showMore === true) {
      actions.showMore = false
    }
  }

  // 路由弹出框点击其他的时候，关闭路由弹出框
  onMounted(() => {
    document.getElementById('app').addEventListener('click', globalClick)
  })

  onUnmounted(() => {
    document.getElementById('app').removeEventListener('click', globalClick)
  })
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
          &.active > span {
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

  .sub-nav {
    position: absolute;
    top: 63px;
    left: 303px;
    width: 346px;
    max-height: 360px;
    background-color: #353e51;
    border-radius: 8px;
    overflow: auto;

    .sub-nav-item {
      height: 80px;
      padding: 19px 24px;
      position: relative;

      display: flex;
      align-items: center;
      font-size: 17px;
      .route-icon {
        width: 40px;
        height: 40px;
        margin-right: 8px;
      }

      .sub-nav-title {
        padding-right: 48px;
        word-wrap: break-word;
        word-break: break-all; /* 任意字符处换行，包括单词中间 */
        white-space: normal; /* 默认值，按单词换行 */
      }

      &.active {
        color: #00e4f8;
      }

      .active-icon {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
      }
    }
  }
</style>
