<template>
  <div class="time-picker-container">
    <!-- 遮罩层 -->
    <div v-if="show" class="time-picker-mask" @click="close"></div>

    <!-- 主选择器 -->
    <div class="time-picker" :class="{ show: show }">
      <div class="time-picker-header">
        <button class="cancel-btn" @click="close">取消</button>
        <div class="title">选择时间</div>
        <button class="confirm-btn" @click="confirm">确定</button>
      </div>

      <div class="time-picker-content">
        <!-- 小时列 -->
        <div ref="hourColumn" class="time-column">
          <ul
            class="time-list"
            :style="{ transform: `translateY(${hourPosition}px)` }"
            @touchstart="startHourScroll"
            @touchmove="moveHourScroll"
            @touchend="endHourScroll"
          >
            <li v-for="h in hours" :key="h" :class="{ active: h === selectedHour }">
              {{ h.toString().padStart(2, '0') }}
            </li>
          </ul>
        </div>

        <!-- 分钟列 -->
        <div ref="minuteColumn" class="time-column">
          <ul
            class="time-list"
            :style="{ transform: `translateY(${minutePosition}px)` }"
            @touchstart="startMinuteScroll"
            @touchmove="moveMinuteScroll"
            @touchend="endMinuteScroll"
          >
            <li v-for="m in minutes" :key="m" :class="{ active: m === selectedMinute }">
              {{ m.toString().padStart(2, '0') }}
            </li>
          </ul>
        </div>

        <!-- 秒数列 -->
        <div ref="secondColumn" class="time-column">
          <ul
            class="time-list"
            :style="{ transform: `translateY(${secondPosition}px)` }"
            @touchstart="startSecondScroll"
            @touchmove="moveSecondScroll"
            @touchend="endSecondScroll"
          >
            <li v-for="s in seconds" :key="s" :class="{ active: s === selectedSecond }">
              {{ s.toString().padStart(2, '0') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'

  const props = defineProps({
    modelValue: String, // 格式: "HH:mm:ss"
    show: Boolean
  })

  const emit = defineEmits(['update:modelValue', 'update:show', 'confirm'])

  // 时间数据
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const seconds = Array.from({ length: 60 }, (_, i) => i)

  // 解析初始值
  const initialTime = computed(() => {
    if (props.modelValue) {
      const [h, m, s] = props.modelValue.split(':')
      return {
        hour: parseInt(h),
        minute: parseInt(m),
        second: parseInt(s)
      }
    }
    const now = new Date()
    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    }
  })

  // 选中时间
  const selectedHour = ref(initialTime.value.hour)
  const selectedMinute = ref(initialTime.value.minute)
  const selectedSecond = ref(initialTime.value.second)

  // 滚动位置
  const hourPosition = ref(0)
  const minutePosition = ref(0)
  const secondPosition = ref(0)
  const itemHeight = 40 // 每个选项的高度

  // 计算初始位置
  onMounted(() => {
    hourPosition.value = -selectedHour.value * itemHeight + 2 * itemHeight
    minutePosition.value = -selectedMinute.value * itemHeight + 2 * itemHeight
    secondPosition.value = -selectedSecond.value * itemHeight + 2 * itemHeight
  })

  // 触摸交互逻辑
  let startY = 0
  let startHourY = 0
  let startMinuteY = 0
  let startSecondY = 0
  let isHourScrolling = false
  let isMinuteScrolling = false
  let isSecondScrolling = false

  const startHourScroll = (e) => {
    isHourScrolling = true
    startY = e.touches[0].clientY
    startHourY = hourPosition.value
  }

  const moveHourScroll = (e) => {
    if (!isHourScrolling) return
    const deltaY = e.touches[0].clientY - startY
    let position = startHourY + deltaY
    if (position > 62) {
      hourPosition.value = 90
    } else if (position < -844) {
      hourPosition.value = -854
    } else {
      hourPosition.value = position
    }

    e.preventDefault()
  }

  const endHourScroll = () => {
    isHourScrolling = false
    // 计算最近的整数位置
    const currentIndex = Math.round(-hourPosition.value / itemHeight)
    hourPosition.value = -currentIndex * itemHeight
    selectedHour.value = Math.max(0, Math.min(23, currentIndex + 2))
  }

  const startMinuteScroll = (e) => {
    isMinuteScrolling = true
    startY = e.touches[0].clientY
    startMinuteY = minutePosition.value
  }

  const moveMinuteScroll = (e) => {
    if (!isMinuteScrolling) return
    const deltaY = e.touches[0].clientY - startY
    // minutePosition.value = startMinuteY + deltaY
    let position = startMinuteY + deltaY

    if (position > 88) {
      minutePosition.value = 98
    } else if (position < -2278) {
      minutePosition.value = -2288
    } else {
      minutePosition.value = position
    }

    e.preventDefault()
  }

  const endMinuteScroll = () => {
    isMinuteScrolling = false
    // 计算最近的整数位置
    const currentIndex = Math.round(-minutePosition.value / itemHeight)
    minutePosition.value = -currentIndex * itemHeight
    selectedMinute.value = Math.max(0, Math.min(59, currentIndex + 2))
  }

  const startSecondScroll = (e) => {
    isSecondScrolling = true
    startY = e.touches[0].clientY
    startSecondY = secondPosition.value
  }

  const moveSecondScroll = (e) => {
    if (!isSecondScrolling) return
    const deltaY = e.touches[0].clientY - startY
    // secondPosition.value = startSecondY + deltaY
    let position = startSecondY + deltaY

    if (position > 88) {
      secondPosition.value = 98
    } else if (position < -2278) {
      secondPosition.value = -2288
    } else {
      secondPosition.value = position
    }

    e.preventDefault()
  }

  const endSecondScroll = () => {
    isSecondScrolling = false
    // 计算最近的整数位置
    const currentIndex = Math.round(-secondPosition.value / itemHeight)
    secondPosition.value = -currentIndex * itemHeight
    selectedSecond.value = Math.max(0, Math.min(59, currentIndex + 2))
  }

  // 关闭选择器
  const close = () => {
    emit('update:show', false)
  }

  // 确认选择
  const confirm = () => {
    const timeStr = `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value
      .toString()
      .padStart(2, '0')}:${selectedSecond.value.toString().padStart(2, '0')}`
    emit('update:modelValue', timeStr)
    emit('confirm', timeStr)
    close()
  }
</script>

<style lang="less" scoped>
  .time-picker-container {
    position: relative;
  }

  .time-picker-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
  }

  .time-picker {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #1a2035; // 深色背景
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);

    &.show {
      transform: translateY(0);
    }
  }

  .time-picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #2d3447;

    .cancel-btn,
    .confirm-btn {
      border: none;
      background: none;
      font-size: 16px;
      padding: 8px 16px;
      color: #1989fa;
    }

    .cancel-btn {
      color: #969799;
    }

    .title {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .time-picker-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 80px;
      pointer-events: none;
      z-index: 2;
    }

    &::before {
      top: 0;
      background: linear-gradient(to bottom, #1a2035, rgba(26, 32, 53, 0.7));
    }

    &::after {
      bottom: 0;
      background: linear-gradient(to top, #1a2035, rgba(26, 32, 53, 0.7));
    }
  }

  .time-column {
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .separator {
    color: #ffffff;
    font-size: 20px;
    margin: 0 8px;
  }

  .time-list {
    list-style: none;
    padding: 0;
    margin: 0;
    transition: transform 0.2s ease-out;
    will-change: transform;

    li {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.6);
      transition: all 0.2s;

      &.active {
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  // 选中线指示器
  .time-column::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 40px;
    transform: translateY(-50%);
    border-top: 1px solid rgba(218, 228, 229, 0.25);
    border-bottom: 1px solid rgba(218, 228, 229, 0.25);
    pointer-events: none;
    z-index: 1;
  }
</style>
