<template>
  <div class="childtask-item">
    <div class="title elli">
      <svg-icon class="icon" name="zrenwu_icon"></svg-icon>
      {{ item.name }}
    </div>
    <template v-if="showCollapse">
      <collapse-actions>
        <div class="info-list">
          <div v-for="(opeItem, index) in item.ope" :key="index" class="info">
            <template v-if="opeItem.type == '1'">
              <div class="dot-wrapper">
                <div class="dot" :class="opeItem.action == 1 ? 'green' : 'red'"></div>
              </div>
              <div class="action">
                {{ opeItem.action == 1 ? $t('Start device') : $t('Close device') }}：
              </div>
              <div class="name">{{ $t(opeItem.name) }}</div>
            </template>
            <template v-else>
              <div class="dot-wrapper">
                <svg-icon class="icon" name="ddshij_h_icon"></svg-icon>
              </div>
              <div class="action">{{ $t('Waiting duration') }}：</div>
              <div class="name">{{ secondsTostring(opeItem.seconds) }}</div>
            </template>
          </div>
        </div>
      </collapse-actions>
    </template>
    <template v-else>
      <div class="info-list">
        <div v-for="(opeItem, index) in item.ope" :key="index" class="info">
          <template v-if="opeItem.type == '1'">
            <div class="dot-wrapper">
              <div class="dot" :class="opeItem.action == 1 ? 'green' : 'red'"></div>
            </div>
            <div class="action">
              {{ opeItem.action == 1 ? $t('Start device') : $t('Close device') }}：
            </div>
            <div class="name">{{ $t(opeItem.name) }}</div>
          </template>
          <template v-else>
            <div class="dot-wrapper">
              <svg-icon class="icon" name="ddshij_h_icon"></svg-icon>
            </div>
            <div class="action">{{ $t('Waiting duration') }}：</div>
            <div class="name">{{ secondsTostring(opeItem.seconds) }}</div>
          </template>
        </div>
      </div>
    </template>

    <more-actions
      v-if="showActions"
      :menu-items="[$t('Edit'), $t('Delete')]"
      @item-click="handleItemClick"
    ></more-actions>
    <div v-if="showExe" class="exe-button" @click="emit('exe')">
      <svg-icon class="icon" name="zhixing_icon" />
      {{ $t('Executed separately') }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    item: PropTypes.object.def({}),
    showActions: PropTypes.bool.def(true),
    showCollapse: PropTypes.bool.def(false),
    showExe: PropTypes.bool.def(false)
  })
  console.log('props.item: ', props.item)
  const emit = defineEmits(['edit', 'delete', 'exe'])

  const secondsTostring = utils.secondsTostring

  function handleItemClick(type) {
    if (type == '0') {
      emit('edit')
    } else if (type == '1') {
      emit('delete')
    }
  }
</script>

<style scoped lang="less">
  .childtask-item {
    position: relative;
    max-width: 754px;
    margin: 0 auto;
    position: relative;
    padding: 24px;
    background: #424b59;
    border-radius: 12px;
    margin-bottom: 20px;

    // & + .childtask-item {
    //   margin-top: 20px;
    // }

    .title {
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #dae4e5;
      .icon {
        width: 32px;
        height: 32px;
        margin-right: 16px;
      }
    }
    .info-list {
      padding-top: 20px;
    }
    .info {
      font-size: 16px;
      color: #9ea0a6;
      display: flex;
      align-items: center;

      & + .info {
        margin-top: 12px;
      }

      .dot-wrapper {
        width: 18px;
        height: 18px;
        margin-right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          &.green {
            background: #16ce67;
          }
          &.red {
            background: #ff5446;
          }
        }
        .icon {
          width: 100%;
          height: 100%;
        }
      }
      .action {
        font-size: 16px;
        color: #99acbf;
      }
      .name {
        font-size: 16px;
        color: #dae4e5;
      }
    }
  }

  .exe-button {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 24px;
    padding: 0 16px;
    height: 44px;
    background: fade(#16ce67, 20%);
    border-radius: 22px;
    font-weight: bold;
    font-size: 18px;
    color: #16ce67;

    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }
</style>
