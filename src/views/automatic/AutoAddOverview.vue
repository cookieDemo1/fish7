<template>
  <card>
    <div class="add-overview">
      <div class="title">新增自动化</div>
      <div class="content">
        <div
          v-for="item in pathMap"
          :key="item.name"
          class="task"
          @click="() => router.push(item.path)"
        >
          <img :src="item.icon" class="icon" alt="" />
          <span>{{ item.name }}</span>
          <img src="@/assets/auto/xiayib_icon@2x.png" class="arrow" alt="" />
        </div>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
  import Scene from '@/assets/auto/changjrw_icon@2x.png'
  import Timing from '@/assets/auto/dingsrw_icon@2x.png'
  import Condition from '@/assets/auto/tiaojrw_icon@2x.png'
  import Loop from '@/assets/auto/xunh_icon@2x.png'

  const router = useRouter()
  const pathMap = [
    { name: '场景任务', icon: Scene, path: '/auto-add-scene' },
    { name: '定时任务', icon: Timing, path: '/auto-add-timing' },
    { name: '条件任务', icon: Condition, path: '/auto-add-condition' },
    { name: '循环任务', icon: Loop, path: '/auto-add-loop' }
  ]
</script>

<style lang="less" scoped>
  .add-overview {
    height: 100%;
    position: relative;

    .title {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 20px;
    }
    .content {
      height: 100%;
      display: flex;
      padding: 0 43px;
      align-items: center;
      justify-content: space-between;

      .task {
        width: 200px;
        height: 285px;
        display: flex;
        flex-direction: column;
        padding: 40px 0;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 24px;
        .icon {
          width: 68px;
          height: 68px;
        }
        span {
          font-size: 20px;
          margin-top: 18px;
        }

        .arrow {
          width: 26px;
          height: 20px;
          margin-top: 70px;
        }
      }
    }
  }
</style>
