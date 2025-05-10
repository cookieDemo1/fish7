<template>
  <div class="warning-card">
    <div class="warning-title">
      <img src="@/assets/auto/shujgj_icon@2x.png" alt="" />
      <span>{{ title || '--' }}</span>
    </div>
    <div class="condition">触发条件：温度 &gt; 40</div>
    <div class="condition">恢复条件：温度 &lt; 3</div>

    <div class="edit">
      <img
        v-if="active"
        src="@/assets/auto/gengd_click@2x.png"
        alt=""
        @click.stop="active = !active"
      />
      <img v-else src="@/assets/auto/gengd_nor@2x.png" alt="" @click.stop="active = !active" />

      <div v-if="active" class="operation">
        <div class="edit-text" @click="onEdit">修改</div>
        <div class="del-text" @click="onDelete">删除</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: PropTypes.string
  })

  const active = ref(false)

  const onEdit = () => {
    console.log('onEdit')
  }
  const onDelete = () => {
    console.log('onDelete')
  }
</script>

<style lang="less" scoped>
  .warning-card {
    height: 114px;
    padding: 16px;

    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    position: relative;

    .warning-title {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .condition {
      margin-top: 11px;
      font-size: 12px;
      color: #9ea0a6;
    }

    .edit {
      width: 44px;
      height: 44px;
      position: absolute;
      top: 16px;
      right: 16px;

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
        .edit-text {
          height: 44px;
          line-height: 43px;
          border-bottom: 1px solid rgba(218, 228, 229, 0.15);
        }
        .del-text {
          height: 43px;
          line-height: 43px;
        }
      }
    }
  }
</style>
