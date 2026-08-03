<template>
  <!-- 独立的锚点导航组件 -->
  <div class="anchor-nav">
    <div
      v-for="item in navItems"
      :key="item.id"
      class="nav-item"
      :class="{ active: currentSection === item.id }"
      @click="scrollToSection(item.id)"
    >
      <span class="nav-text">{{ item.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  // 当前高亮的锚点
  const currentSection = ref<string>('#A')

  // 导航项配置
  const navItems = ref([
    { id: '#A', title: 'C组(9-12号池)系统' },
    { id: '#B', title: 'D组(13-16)号池系统' },
    { id: '#C', title: 'CD组头水系统' }
  ])

  // 滚动到指定区块
  const scrollToSection = (sectionId: string) => {
    isScrollingByClick = true
    setTimeout(() => {
      isScrollingByClick = false
    }, 200)
    const element = document.querySelector(sectionId)
    if (!element) {
      console.warn(`未找到元素: ${sectionId}`)
      return
    }

    // 更新当前高亮
    currentSection.value = sectionId

    // 平滑滚动
    const wrapper = document.getElementById('wrapper')
    if (!wrapper) {
      console.warn('未找到滚动容器 #wrapper')
      return
    }

    const elementRect = element.getBoundingClientRect()
    const wrapperRect = wrapper.getBoundingClientRect()

    // 计算相对位置
    const relativeTop = elementRect.top - wrapperRect.top + wrapper.scrollTop

    wrapper.scrollTo({
      top: relativeTop, // 减去头部偏移
      behavior: 'smooth'
    })
  }

  // 监听滚动，更新高亮
  let scrollTimeout: number | null = null
  let isScrollingByClick = false
  let scrollClickTimeout: number | null = null

  const handleScroll = () => {
    console.log('handleScroll', isScrollingByClick)
    // 如果是点击触发的滚动，暂时不更新高亮
    if (isScrollingByClick) return

    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    // 防抖处理
    scrollTimeout = setTimeout(() => {
      updateActiveSection()
    }, 100) as unknown as number
  }

  // 更新当前活跃的区块
  const updateActiveSection = () => {
    const wrapper = document.getElementById('wrapper')
    if (!wrapper) {
      console.warn('未找到滚动容器 #wrapper')
      return
    }

    const scrollTop = wrapper.scrollTop
    const viewportHeight = wrapper.clientHeight
    const offset = 100 // 触发高亮的偏移量

    let activeId = '#A'
    let minDistance = Infinity

    // console.log('scrollTop', scrollTop)
    // console.log('viewportHeight', viewportHeight)

    // 检查每个区块
    navItems.value.forEach((item) => {
      const element: HTMLDivElement = document.querySelector(item.id)
      if (element) {
        const elementRect = element.getBoundingClientRect()
        const wrapperRect = wrapper.getBoundingClientRect()

        // console.log(item.id, elementRect, wrapperRect)

        // 计算元素相对于 wrapper 的位置
        const elementTop = elementRect.top - wrapperRect.top + scrollTop
        const elementBottom = elementTop + element.offsetHeight

        // 计算距离顶部的距离
        const distance = Math.abs(elementTop - scrollTop - offset)

        // 如果元素在视口中
        if (scrollTop + offset >= elementTop && scrollTop <= elementBottom) {
          if (distance < minDistance) {
            minDistance = distance
            activeId = item.id
          }
        }

        // 如果滚动到顶部
        if (scrollTop === 0 && elementTop === 0) {
          activeId = item.id
        }

        // 如果滚动到底部
        if (scrollTop + viewportHeight >= wrapper.scrollHeight - 10) {
          activeId = navItems.value[navItems.value.length - 1].id
        }
      }
    })

    // 更新高亮
    if (currentSection.value !== activeId) {
      currentSection.value = activeId
    }
  }

  // 监听 wrapper 的滚动事件
  const setupScrollListener = () => {
    const wrapper = document.getElementById('wrapper')
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll, { passive: true })
    } else {
      setTimeout(setupScrollListener, 100)
    }
  }

  // 点击滚动时的处理
  // const handleClickScroll = (sectionId: string) => {
  //   isScrollingByClick = true
  //   console.log('handleClickScroll', isScrollingByClick)
  //   scrollToSection(sectionId)

  //   if (scrollClickTimeout) {
  //     clearTimeout(scrollClickTimeout)
  //   }

  //   // 500ms 后重置点击滚动标志
  //   scrollClickTimeout = setTimeout(() => {
  //     isScrollingByClick = false
  //   }, 600) as unknown as number
  // }

  // 修改点击事件处理
  // const handleNavClick = (sectionId: string) => {
  //   handleClickScroll(sectionId)
  // }

  // 初始化
  onMounted(() => {
    setupScrollListener()

    // 延迟初始化，确保 DOM 完全加载
    setTimeout(() => {
      updateActiveSection()
    }, 200)
  })

  onUnmounted(() => {
    const wrapper = document.getElementById('wrapper')
    if (wrapper) {
      wrapper.removeEventListener('scroll', handleScroll)
    }

    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    if (scrollClickTimeout) {
      clearTimeout(scrollClickTimeout)
    }
  })

  // 提供外部调用的方法
  defineExpose({
    scrollToSection,
    updateActiveSection,
    getCurrentSection: () => currentSection.value
  })
</script>

<style scoped lang="less">
  .anchor-nav {
    background: #1f2838;
    border-radius: 16px;
    padding: 20px 0;
    width: 200px;
    z-index: 1000;
  }

  .nav-item {
    width: 100%;
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dae4e5;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    font-size: 20px;
    border-radius: 8px;
  }

  .nav-item.active {
    background-color: #00e4f8;
    color: #000916;
    font-weight: bold;
  }

  .nav-text {
    z-index: 1;
  }
</style>
