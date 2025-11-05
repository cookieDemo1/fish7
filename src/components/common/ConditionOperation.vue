<template>
  <div :class="{ 'condition-operation': true, active: checkbox }" @click="handleWrapperClick">
    <div class="checkbox">
      <a-checkbox v-model:checked="checkbox"> </a-checkbox>
      <span style="font-size: 18px; padding-left: 10px">{{ item.text }}</span>
    </div>
    <div
      class="button"
      @click="
        (event) => {
          event.stopPropagation()
        }
      "
    >
      <span :class="{ btn: true, on: true, active: status === 1 }" @click="handleClick(1)">{{
        $t('ON')
      }}</span>
      <span :class="{ btn: true, off: true, active: status === 2 }" @click="handleClick(2)">{{
        $t('OFF')
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const checkbox = ref<boolean>(false)
  const status = ref<number>(0)
  const handleWrapperClick = () => {
    checkbox.value = !checkbox.value
  }

  const props = defineProps({
    item: PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  })

  let flag = false
  const handleClick = (type: number) => {
    flag = true
    if (type === status.value) {
      status.value = 0
      checkbox.value = false
    } else {
      status.value = type
      checkbox.value = true
    }
  }

  watch(checkbox, (newVal) => {
    if (flag === true) return (flag = false)
    if (newVal === true) {
      status.value = 2
    } else {
      status.value = 0
    }
  })

  // const handleChange = (e: any) => {
  //   const flag = e.target.checked
  //   if (flag === true) {
  //     status.value = 2
  //   } else {
  //     status.value = 0
  //   }
  // }
</script>

<style lang="less" scoped>
  .condition-operation {
    height: 62px;
    padding: 11px 20px;
    background-color: #414a58;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.active {
      background-color: rgba(0, 229, 229, 0.1);
    }

    .checkbox {
      display: flex;
      align-items: center;
    }
    .btn {
      width: 56px;
      height: 40px;
      line-height: 40px;
      border-radius: 32px;
      text-align: center;
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.2);
      &.on.active {
        background-color: #16ce67;
        color: #0c0c0c;
      }

      &.off.active {
        background-color: #f53d2d;
        color: #0c0c0c;
      }
    }
    .btn + .btn {
      margin-left: 16px;
    }
  }
</style>
