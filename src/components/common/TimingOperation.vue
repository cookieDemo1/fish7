<template>
  <div :class="{ 'timing-operation': true, active: checkbox }">
    <div class="checkbox">
      <a-checkbox v-model:checked="checkbox"> </a-checkbox>
      <span style="font-size: 18px; padding-left: 10px" @click.stop="checkbox = !checkbox">{{
        item.text
      }}</span>
    </div>

    <div class="item">
      <div class="label">{{ $t('Start time') }}</div>
      <div class="value">
        <time-select
          v-model="form.start_time"
          :placeholder="$t('Please select the start time')"
        ></time-select>
      </div>
    </div>
    <Line></Line>
    <div class="item">
      <div class="label">{{ $t('Closing time') }}</div>
      <div class="value">
        <time-select
          v-model="form.end_time"
          :placeholder="$t('Please select the closing time')"
        ></time-select>
      </div>
    </div>
    <Line></Line>
  </div>
</template>

<script setup lang="ts">
  const checkbox = ref(false)

  const props = defineProps({
    item: PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  })

  const form = ref({
    start_time: '',
    end_time: ''
  })
</script>

<style lang="less" scoped>
  .timing-operation {
    // height: 62px;
    padding: 18px 20px 20px 20px;
    background-color: #414a58;
    border-radius: 8px;

    &.active {
      background-color: rgba(0, 229, 229, 0.1);
    }

    .checkbox {
      display: flex;
      align-items: center;
      height: 25px;
      margin-bottom: 11px;
    }

    .item {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .label {
        font-size: 18px;
      }
      .value {
        width: 250px;
      }
    }
  }
</style>
