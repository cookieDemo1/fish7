<template>
  <a-empty class="m-empty" :image="kong" v-bind="attrs">
    <template v-for="name in Object.keys(slots)" #[name]>
      <slot :name="name"></slot>
    </template>
  </a-empty>
</template>

<script setup lang="ts">
  import kong from '@/assets/img/wurw_img@2x.png'
  const slots = useSlots()
  const attrs = useAttrs()

  const props = defineProps({
    imageWidth: PropTypes.string.def('80px'),
    textMargin: PropTypes.string.def('16px')
  })
</script>

<style lang="less">
  .m-empty {
    &.ant-empty {
      width: 100%;
      height: 100%;
      min-height: 130px;
      margin: 0;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .ant-empty {
      &-image {
        margin-bottom: v-bind(textMargin);
        height: auto;

        & img {
          margin: auto;
          width: v-bind(imageWidth);
        }
      }

      &-description {
        color: @textSecondaryColor;
      }
    }
  }
</style>
