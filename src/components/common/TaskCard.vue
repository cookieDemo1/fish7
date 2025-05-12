<template>
  <div class="task-card" @click="gotoPage">
    <img :src="iconMap[type].icon" alt="" class="task-icon" />
    <div class="task-name">
      <slot></slot>
    </div>
    <img src="@/assets/auto/jiantou_icon@2x.png" alt="" class="back-icon" />
  </div>
</template>

<script setup lang="ts">
  import Scene from '@/assets/auto/changjrw_icon@2x.png'
  import Timing from '@/assets/auto/dingsrw_icon@2x.png'
  import Condition from '@/assets/auto/tiaojrw_icon@2x.png'
  import Loop from '@/assets/auto/xunh_icon@2x.png'

  const props = defineProps({
    type: PropTypes.number.def(1)
  })

  const router = useRouter()

  const iconMap = {
    1: { icon: Scene, path: '/auto-info-scene' },
    2: { icon: Timing, path: '/auto-info-timing' },
    3: { icon: Condition, path: '/auto-info-condition' },
    4: { icon: Loop, path: '/auto-info-loop' }
  }

  const gotoPage = () => {
    const path = iconMap[props.type].path
    router.push(path)
  }
</script>

<style lang="less" scoped>
  .task-card {
    height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 12px;

    .task-icon {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
    .task-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .back-icon {
      width: 9px;
      height: 16px;
    }
  }
</style>
