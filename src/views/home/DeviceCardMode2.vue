<template>
  <div class="device-card" @click="handleClick">
    <div class="circle" :class="{ red: item.on_off == 2, green: item.on_off == 3 }"></div>
    <div class="icon">
      <template v-if="!loading">
        <img :src="imgMap[item.icon_type][item.status]" class="status-icon" alt="" />
      </template>
      <template v-else>
        <div :class="{ 'loading-icon': true, 'loading-on': item.status == 1 }">
          <img :src="item.status == 1 ? loadingWhiteIcon : loadingIcon" alt="" />
        </div>
      </template>
    </div>
    <div :class="{ info: true, center: item.freq == '-1' }">
      <div class="name">
        <!-- 设备没有离线状态 -->
        <!-- <span v-if="item.status == 0" class="offline">离线</span> -->
        <span class="name-text">{{ $t(item.name) }}</span>
      </div>
      <div v-if="item.freq != '-1'" class="wrapper-icon">
        <div v-if="item.freq != '-1'" class="edit" @click.stop="handleEdit">
          <span class="edit-text"> {{ $t('frequency') }}：{{ item.freq }}%</span>
          <img class="edit-icon" src="@/assets/bianji_icon@2x.png" alt="" />
        </div>
      </div>
    </div>
  </div>

  <ModalFrequencyEdit v-model="showEdit" :item="item"></ModalFrequencyEdit>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue'

  import loadingWhiteIcon from '@/assets/status/loading_white.png'
  import loadingIcon from '@/assets/status/loading.png'

  const { t } = useI18n()

  const imgMap = constant.imgMap

  const showEdit = ref(false)

  const props = defineProps({
    item: PropTypes.object
  })

  const emits = defineEmits(['callback'])

  const loading = ref(false)
  const { postControlSwitch } = use.useMainAction('postControlSwitch')

  const handleClick = () => {
    const status = props.item.status

    if (props.item.is_di || props.item.do.includes('di')) {
      return message.warning(t('The DI status cannot be controlled'))
    }
    if (status === 0) {
      return message.warning(t('This device is currently offline'))
    }

    const action = status === 1 ? 2 : 1
    loading.value = true
    console.log(props.item)
    postControlSwitch({ DO: props.item.do, action: action })
      .then((res) => {
        if (res.code !== 200) {
          loading.value = false
          message.error(t('Operation failed'))
        } else {
          setTimeout(() => {
            message.success(t('Operation successful'))

            emits('callback')
            loading.value = false
          }, 2000)
        }
      })
      .catch((err) => {
        message.error(t('Operation failed'))

        loading.value = false
      })
  }

  const handleEdit = (event) => {
    event.stopPropagation()
    showEdit.value = true
  }
</script>

<style lang="less" scoped>
  @keyframes rotate360 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .device-card {
    width: 100%;
    height: 98px;
    border-radius: 11px;
    background-image: url('../../assets/kapbj_img@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 10px 23px 12px;
    position: relative;
    display: flex;
    align-items: center;

    .circle {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      top: 9px;
      left: 9px;
      &.red {
        background-color: #ff5446;
      }

      &.green {
        background-color: #16ce67;
      }
    }

    .icon {
      margin-right: 24px;
      .status-icon {
        width: 53px;
        height: 53px;
      }

      .loading-icon {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #646464;
        &.loading-on {
          background-color: @primaryColor;
        }
        img {
          width: 46px;
          height: 46px;
          animation: rotate360 1.6s infinite linear;
        }
      }
    }

    .info {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      // align-items: space-between;
      justify-content: space-between;
      &.center {
        justify-content: center;
      }
      .wrapper-icon {
        display: flex;
        align-items: center;

        .edit {
          width: 174px;
          height: 42px;
          background: #181d26;
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 6px 0 10px;
          justify-content: space-between;

          .edit-text {
            font-size: 15px;
          }
          .edit-icon {
            width: 28px;
            height: 28px;
          }
        }
      }
      .offline {
        margin-right: 8px;
        color: #0c0c0c;
        display: inline-block;
        width: 48px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 18px;
        background-color: #f53d2d;
        font-size: 13px;
      }
      .name-text {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
</style>
