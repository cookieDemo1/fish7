<template>
  <div ref="operationWrapper" class="operation-wrapper" :class="{ top: top }">
    <img :src="active ? activeIcon : inactiveIcon" @click="handleClick" />

    <div v-if="active" ref="operation" class="operation">
      <div class="text" @click="onEdit">修改</div>
      <div class="text" @click="onDelete">删除</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import activeIcon from '@/assets/auto/gengd_click@2x.png'
  import inactiveIcon from '@/assets/auto/gengd_nor@2x.png'
  import { message } from 'ant-design-vue'
  const router = useRouter()
  const active = ref(false)
  const props = defineProps({
    id: PropTypes.number.def(-1),
    to: PropTypes.string.def('/')
  })
  const onEdit = () => {
    const path = props.to + '/' + props.id
    router.push(path)
  }

  const onDelete = () => {
    message.success('删除成功')
    console.log('delete: ', props.id)
  }

  const top = ref(false)
  const operation = ref(null)
  const operationWrapper = ref(null)

  let flag = false
  const handleClick = () => {
    console.log(operationWrapper.value)
    const rect = operationWrapper.value.getBoundingClientRect() // 获取元素的位置信息
    const distanceFromBottom = window.innerHeight - rect.bottom // 计算距离底部距离

    top.value = distanceFromBottom < 120 ? true : false

    console.log(rect)
    console.log(distanceFromBottom)

    flag = true
    active.value = !active.value
  }

  const handleClickOutside = (event) => {
    if (flag) return (flag = false)
    if (operation.value && !operation.value.contains(event.target)) {
      active.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style lang="less" scoped>
  .operation-wrapper {
    width: 44px;
    height: 44px;
    position: absolute;
    top: 16px;
    right: 16px;

    img {
      width: 100%;
      height: 100%;
    }

    &.top {
      .operation {
        top: -101px;
      }
    }

    .operation {
      width: 80px;
      background-color: #49515e;
      border-radius: 8px;
      box-shadow: 0px 5px 16px 1px rgba(0, 0, 0, 0.12);
      position: absolute;
      top: 52px;
      right: 0;
      text-align: center;
      height: 89px;
      z-index: 999;
      .text {
        height: 44px;
        line-height: 43px;
      }

      .text + .text {
        border-top: 1px solid rgba(218, 228, 229, 0.15);
      }
    }
  }
</style>
