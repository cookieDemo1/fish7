<template>
  <div class="card" :style="{ padding: paddingComputed }">
    <main>
      <slot></slot>
    </main>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    padding: PropTypes.array.def([0])
  })

  const paddingComputed = computed(() => {
    return props.padding.map((value) => `${value}px`).join(' ')
  })
</script>

<style lang="less" scoped>
  .card {
    background-color: #1f2838;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    main {
      flex: 1;
      height: 0;
      // height: calc(100% - 57px);
    }

    footer {
      border-top: 1px solid rgba(218, 228, 229, 0.15);
      height: 57px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
