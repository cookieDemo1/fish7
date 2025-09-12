<template>
  <div class="switch-item">
    <template v-if="item.on_off == '2' || item.on_off == '3'">
      <div class="status" :class="{ green: item.on_off == '2', red: item.on_off == '3' }"></div>
    </template>

    <div class="left">
      <img class="icon" :src="item.icon" alt="" />
      <div class="name">{{ item.name }}</div>
    </div>
    <div class="right" @click="actions.handleEdit">
      <span class="state" :class="{ green: item.on_off == '2', red: item.on_off == '3' }">{{
        item.on_off == '2' ? '保持开启' : item.on_off == '3' ? '保持关闭' : '禁用'
      }}</span>
      <template v-if="item.on_off == '2' || item.on_off == '3'">
        <span class="line"></span>
        <span class="time">{{ timeFormat }}</span>
      </template>

      <img src="@/assets/img/jiantou_icon@2x.png" class="arrow" alt="" />
    </div>

    <ModalAlways v-model="actions.showEdit" :item="item" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    item: PropTypes.object
  })

  const timeFormat = computed(() => {
    return utils.secondsTostring(props.item.seconds)
  })

  const { actions } = use.useActions(['edit'])
</script>

<style lang="less" scoped>
  .switch-item {
    width: 628px;
    height: 90px;
    background-color: #424b59;
    border-radius: 12px;
    position: relative;
    padding: 15px 30px;

    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 60px;
        height: 60px;
        margin-right: 16px;
      }

      .name {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .state {
        font-size: 16px;
        font-weight: bold;
        color: #dae4e5;
        &.green {
          color: #16ce67;
        }
        &.red {
          color: #ff5446;
        }
      }

      .line {
        width: 2px;
        height: 12px;
        background-color: #6f7387;
        margin: 0 12px;
      }

      .arrow {
        width: 9px;
        height: 16px;
        margin-left: 16px;
      }
    }

    .status {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: absolute;
      top: 10px;
      left: 10px;

      &.green {
        background-color: #16ce67;
      }

      &.red {
        background-color: #ff5446;
      }
    }
  }
</style>
