<template>
  <m-modal v-model="visible" :width="492">
    <div class="modal-content" style="overflow: auto">
      <div class="modal-title">
        三相电表
        <svg-icon class="right-icon" name="guanbib_button" @click="visible = false"></svg-icon>
      </div>
      <div class="modal-body">
        <a-row :gutter="[12, 12]" style="width: 100%; margin: 0 -6px">
          <a-col :span="24">
            <div class="meter-item">
              <div class="left">
                <span class="value"
                  >{{
                    data.w !== null && data.w !== undefined && data.w !== '' ? data.w : '--'
                  }}W</span
                >
                <span class="name">合相有功功率</span>
              </div>
              <img class="right" src="@/assets/data/gonglv_icon@2x.png" alt="" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="meter-item">
              <div class="left">
                <span class="value">{{
                  data.all_w !== null && data.all_w !== undefined && data.all_w !== ''
                    ? data.all_w
                    : '--'
                }}</span>
                <span class="name">合相功率因素</span>
              </div>
              <img class="right" src="@/assets/data/gonglv_icon@2x.png" alt="" /></div
          ></a-col>
          <a-col :span="12">
            <div class="meter-item">
              <div class="left">
                <span class="value"
                  >{{
                    data.com_energy !== null &&
                    data.com_energy !== undefined &&
                    data.com_energy !== ''
                      ? data.com_energy
                      : '--'
                  }}kw·h</span
                >
                <span class="name">组合有功电能</span>
              </div>
              <img class="right" src="@/assets/data/gonglv_icon@2x.png" alt="" /></div
          ></a-col>
          <a-col :span="12">
            <div class="meter-item">
              <div class="left">
                <span class="value"
                  >{{
                    data.pos_energy !== null &&
                    data.pos_energy !== undefined &&
                    data.pos_energy !== ''
                      ? data.pos_energy
                      : '--'
                  }}kw·h</span
                >
                <span class="name">正相有功电能</span>
              </div>
              <img class="right" src="@/assets/data/gonglv_icon@2x.png" alt="" /></div
          ></a-col>
          <a-col :span="12">
            <div class="meter-item">
              <div class="left">
                <span class="value"
                  >{{
                    data.rev_energy !== null &&
                    data.rev_energy !== undefined &&
                    data.rev_energy !== ''
                      ? data.rev_energy
                      : '--'
                  }}kw·h</span
                >
                <span class="name">反向有功电能</span>
              </div>
              <img class="right" src="@/assets/data/gonglv_icon@2x.png" alt="" /></div
          ></a-col>
        </a-row>

        <ul class="list">
          <li class="head">
            <div>参数</div>
            <div>A相</div>
            <div>B相</div>
            <div>C相</div>
          </li>
          <template v-for="(item, index) in list" :key="index">
            <li class="item">
              <div>{{ item.name }}</div>
              <div v-for="key in item.keys" :key="key">
                {{
                  data[key] !== null && data[key] !== undefined && data[key] !== ''
                    ? data[key]
                    : '--'
                }}{{ item.unit }}
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </m-modal>
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: PropTypes.bool.def(false),
    data: PropTypes.object.def({})
  })
  const emit = defineEmits(['update:modelValue', 'callback'])

  const list = [
    {
      name: '电压',
      unit: 'V',
      keys: ['v_a', 'v_b', 'v_c']
    },
    {
      name: '电流',
      unit: 'A',
      keys: ['a_a', 'a_b', 'a_c']
    },

    {
      name: '有功功率',
      unit: 'W',
      keys: ['w_a', 'w_b', 'w_c']
    },
    {
      name: '功率因素',
      unit: '',
      keys: ['p_a', 'p_b', 'p_c']
    }
  ]

  const { visible, watchVisible } = use.useVisible({ props, emit })

  const resetAction = () => {
    console.log('Reset action')
  }

  watchVisible(resetAction)
</script>

<style lang="less" scoped>
  .modal-body {
    padding: 0 14px 20px 14px;

    .meter-item {
      height: 90px;
      background-color: #414a58;
      border-radius: 18px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .value {
          font-size: 20px;
          color: #dae4e5;
          font-weight: bold;
        }
        .name {
          font-size: 15px;
          color: #99acbf;
        }
      }

      .right {
        width: 36px;
        height: 36px;
      }
    }

    .list {
      width: 100%;
      background-color: #414a58;
      border-radius: 18px;
      padding: 20px;
      margin-top: 20px;
      margin-bottom: 0;
      .head,
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        div {
          flex: 1;
          text-align: center;
        }
      }
      .head {
        font-size: 15px;
        color: #b6bbbf;
      }
      .item {
        font-size: 16px;
        color: #dae4e5;
        height: 52px;
        font-weight: bold;
        border-radius: 18px;
        background-color: #343b4b;
      }
    }
  }
</style>
