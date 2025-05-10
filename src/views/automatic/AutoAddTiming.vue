<template>
  <!-- <div class="auto-add-condition">条件任务</div> -->
  <card>
    <div class="content">
      <title-auto :icon="icon">条件任务-新增</title-auto>
      <div class="wrapper">
        <div class="form">
          <a-form>
            <a-input></a-input>
          </a-form>
        </div>
      </div>
    </div>
    <template #footer>
      <a-button style="margin-right: 20px; width: 90px" @click="router.go(-1)">上一步</a-button>
      <a-button type="primary" style="width: 90px" @click="onSave">保存</a-button>
    </template>
  </card>
</template>

<script setup lang="ts">
  import icon from '@/assets/auto/tiaojrw_icon@2x.png'
  const router = useRouter()

  const onSave = () => {
    console.log('onSave')
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100%;
    padding: 22px 20px;
    display: flex;
    flex-direction: column;

    .wrapper {
      flex: 1;
      overflow-y: auto;
    }
    .form {
      width: 466px;
      margin: 0 auto;
    }
  }
</style>
