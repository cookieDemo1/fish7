<template>
  <div class="m-carousel-wrapper">
    <div class="circle" @click="handlePrev">
      <img src="@/assets/jiantou_z_icon@2x.png" class="icon" alt="" />
    </div>
    <van-swipe
      ref="carouselRef"
      class="m-carousel"
      v-bind="attrs"
      :show-indicators="false"
      @change="handleBeforeChange"
    >
      <slot name="default"></slot>
    </van-swipe>

    <div class="circle" @click="handleNext">
      <img src="@/assets/jiantou_y_icon@2x.png" class="icon" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
  interface CarouselMethods {
    prev: Function
    next: Function
    goTo: Function
  }

  const attrs = useAttrs()

  const emits = defineEmits(['change'])

  const carouselRef = ref<CarouselMethods | null>(null)

  const handlePrev = () => {
    carouselRef.value!.prev()
  }

  const handleNext = () => {
    carouselRef.value!.next()
  }

  const handleBeforeChange = (to) => {
    emits('change', to)
  }

  defineExpose({
    next: () => carouselRef.value!.next()
  })
</script>

<style lang="less">
  .m-carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    .circle {
      width: 56px;
      height: 56px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;

      padding: 4px;

      .icon {
        width: 100%;
        height: 100%;
      }
    }

    // justify-content: space-between;
    .m-carousel {
      width: 900px;
      border-radius: 32px;
      overflow: hidden;
      // margin: 0 auto !important;
      &.ant-carousel {
        .slick-dots {
          top: -32px;
          right: 0;
          margin: 0;
          justify-content: flex-end;
        }
        .slick-dots li {
          width: 20px;
          height: 12px;
        }
        .slick-dots li button {
          width: 100%;
          height: 100%;
          background: #d7dbe6;
          border-radius: 7px;
        }
        .slick-dots li.slick-active button {
          background: #00a4ff;
        }
      }
    }
  }
</style>
