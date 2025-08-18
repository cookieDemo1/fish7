<template>
  <page-container>
    <div class="page-inner">
      <card-container class="card-container" :title="$t('Automated tasks')">
        <template #action>
          <m-button-link>
            <template #icon>
              <svg-icon class="action-icon" name="tianjia_icon" @click="handleAddTask"></svg-icon>
            </template>
          </m-button-link>
        </template>
        <div class="task-block">
          <div class="childtask-item" @click="handleChildtask">
            <svg-icon class="icon" name="zirenw_icon"></svg-icon>
            <div class="name">{{ $t('Sub-task management') }}</div>
            <svg-icon class="arrow" name="jiantou_icon"></svg-icon>
          </div>
        </div>
        <template v-if="tasksList.length">
          <div v-for="(taskItem, index) in tasksList" :key="index" class="task-block">
            <div class="task-title">{{ taskItem.name }}</div>
            <a-row class="task-list" :gutter="[12, 12]">
              <a-col v-for="(item, index) in taskItem.list" :key="index" :span="12">
                <div class="task-item" @click="handleDetail(item)">
                  <div class="name">{{ item.name }}</div>
                  <div class="row">
                    <div class="tags">
                      <svg-icon class="task-icon" :name="item.icon"></svg-icon>
                      <view v-if="item.disable == '1'" class="task-status"
                        >{{ $t('Disabled') }}
                      </view>
                    </div>
                    <svg-icon class="arrow" name="jiantou_icon"></svg-icon>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </template>
        <template v-else>
          <m-empty style="position: absolute; left: 0; top: 0; pointer-events: none"></m-empty>
        </template>
      </card-container>
    </div>
  </page-container>
</template>

<script setup lang="ts">
  const { t } = useI18n()

  const { autoTask, getAutoTask } = use.useMainStateAction('autoTask')
  const globalStore = store.useGlobalStore()
  globalStore.registerFunction(getData)
  getData()
  function getData() {
    getAutoTask()
  }

  const tasksList = computed(() => {
    // 场景，定时，条件，循环
    let res = []
    if (autoTask.value) {
      const { scene = [], timer = [], condition = [], cycle = [] } = autoTask.value || {}
      if (scene.length) {
        res.push({
          name: t('Scene tasks'),
          list: scene.map((item) => {
            return { ...item, icon: 'changjrw_icon', routeName: 'compostaskSceneDetail' }
          })
        })
      }
      if (timer.length) {
        res.push({
          name: t('Scheduled tasks'),
          list: timer.map((item) => {
            return { ...item, icon: 'dingsrw_icon', routeName: 'compostaskTimerDetail' }
          })
        })
      }
      if (condition.length) {
        res.push({
          name: t('Conditional tasks'),
          list: condition.map((item) => {
            return { ...item, icon: 'tiaojrw_icon', routeName: 'compostaskConditionDetail' }
          })
        })
      }
      if (cycle.length) {
        res.push({
          name: t('Cyclic task'),
          list: cycle.map((item) => {
            return { ...item, icon: 'xunh_icon', routeName: 'compostaskLoopDetail' }
          })
        })
      }
    }
    console.log(res)
    return res
  })

  const router = useRouter()
  function handleChildtask() {
    router.push({ name: 'childtaskManage' })
  }

  function handleAddTask() {
    router.push({ name: 'compostaskAdd' })
  }
  function handleDetail(item) {
    router.push({ name: item.routeName, query: { id: item.id } })
  }
</script>

<style scoped lang="less">
  .page-inner {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .card-container {
    width: 750px;
    // & + .card-container {
    // 	margin-left: 32px;
    // }
    .action-icon {
      width: 28px;
      height: 28px;
    }
  }

  .task-block {
    max-width: 754px;
    margin: 0 auto;
    & + .task-block {
      margin-top: 38px;
    }
    .childtask-item {
      cursor: pointer;
      padding: 0px 20px;
      height: 60px;
      background: #414a58;
      border-radius: 12px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background: fade(#414a58, 90%);
      }

      .icon {
        width: 28px;
        height: 28px;
        margin-right: 20px;
      }
      .name {
        flex: 1;
      }
      .arrow {
        width: 9px;
        height: 16px;
      }
    }

    .task-title {
      margin-bottom: 12px;
      font-size: 18px;
      color: #b6b8bf;
    }

    .task-list {
      .task-item {
        cursor: pointer;
        padding: 20px 16px;
        height: 160px;
        background: #414a58;
        border-radius: 12px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &:hover {
          background: fade(#414a58, 90%);
        }

        .name {
          width: 100%;
          font-size: 20px;
          color: #dae4e5;

          display: box;
          line-clamp: 2;
          box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .tags {
            flex: 1;
            display: flex;
            align-items: center;
          }
          .task-icon {
            width: 44px;
            height: 44px;
          }
          .task-status {
            margin-left: 20px;
            padding: 10px 14px;
            background: #ff5446;
            border-radius: 28px;
            font-weight: 500;
            font-size: 16px;
            color: #1f2839;
          }
          .arrow {
            width: 9px;
            height: 16px;
          }
        }
      }
    }
  }
</style>

<!-- 
			<card-container class="card-container" title="数据告警">
				<template #action>
					<m-button-link>
						<template #icon>
							<svg-icon class="action-icon" name="tianjia_icon" @click="handleAddWarning"></svg-icon>
						</template>
					</m-button-link>
				</template>
			
				<div class="warning-block">
					<div class="warning-list">
						<div class="warning-item">
							<div class="title">
								<svg-icon class="icon" name="shujgj_icon"></svg-icon>
								123123213
							</div>
							<div class="info-list">
								<div class="info">
									<div class="dot-wrapper">
										<div class="dot red"></div>
									</div>
									<div class="action">触发条件：</div>
									<div class="name">温度 ＞ 40</div>
								</div>
								<div class="info">
									<div class="dot-wrapper">
										<div class="dot green"></div>
									</div>
									<div class="action">恢复条件：</div>
									<div class="name">温度 ＞ 40</div>
								</div>
								<div class="info">
									<div class="dot-wrapper">
										<svg-icon class="icon" name="ddshij_h_icon"></svg-icon>
									</div>
									<div class="action">触发时长：</div>
									<div class="name">温度 ＞ 40</div>
								</div>
								<div class="info">
									<div class="dot-wrapper">
										<svg-icon class="icon" name="daunx_h_icon"></svg-icon>
									</div>
									<div class="action">短信通知：</div>
									<div class="name">温度 ＞ 40</div>
								</div>
								<div class="info">
									<div class="dot-wrapper">
										<svg-icon class="icon" name="tongzlianx_h_icon"></svg-icon>
									</div>
									<div class="action">通知联系人：</div>
									<div class="name">温度 ＞ 40</div>
								</div>
							</div>

							<more-actions ></more-actions>
						</div>
					</div>
				</div> 
				
					<template v-if="warningList.length">
					<div class="warning-block">
						<div class="warning-list">
							<div v-for="(item, index) in warningList" :key="index" class="warning-item">
								<div class="title">
									<svg-icon class="icon" name="shujgj_icon"></svg-icon>
									{{ item.name }}
								</div>
								<div class="info-list">
									<div class="info">
										触发条件：{{ `${item.triggering.arg}${item.triggering.compare}${item.triggering.value}` }}
									</div>
									<div class="info">
										恢复条件：{{ `${item.recovery.arg}${item.recovery.compare}${item.recovery.value}` }}
									</div>
								</div>

								<more-actions ></more-actions>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<m-empty></m-empty>
				</template>
			</card-container>
					<modal-delete
		v-model="actions.showDelete"
		title="数据告警"
		message="确定删除数据告警吗？"
		ok-text="删除"
		:item="actions.item"
		action-name="deleteWarn"
	>
	</modal-delete>


	
	// function handleAddWarning() {
	// 	router.push({ name: 'dataWarning' });
	// }
	// function handleEditWarning(item) {
	// 	router.push({ name: 'dataWarning', query: { type: 'edit', warn_id: item.id } });
	// }

	const { actions } = use.useActions(['delete']);


	// const warningList = computed(() => {
	// 	let res = [];
	// 	if (warn.value) {
	// 		res = warn.value.map(item => {
	// 			return { ...item, warn_id: item.id };
	// 		});
	// 	}
	// 	return res;
	// });
	
	// .warning-block {
	// 	.warning-list {
	// 		.warning-item {
	// 			position: relative;
	// 			padding: 20px;
	// 			background: #424b59;
	// 			border-radius: 12px;

	// 			& + .warning-item {
	// 				margin-top: 20px;
	// 			}

	// 			.title {
	// 				display: flex;
	// 				align-items: center;
	// 				font-size: 20px;
	// 				color: #dae4e5;
	// 				margin-bottom: 16px;
	// 				.icon {
	// 					width: 26px;
	// 					height: 26px;
	// 					margin-right: 4px;
	// 				}
	// 			}
	// 			.info {
	// 				font-size: 16px;
	// 				color: #9ea0a6;
	// 				display: flex;
	// 				align-items: center;

	// 				& + .info {
	// 					margin-top: 12px;
	// 				}

	// 				.dot-wrapper {
	// 					width: 18px;
	// 					height: 18px;
	// 					margin-right: 12px;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					.dot {
	// 						width: 8px;
	// 						height: 8px;
	// 						border-radius: 50%;
	// 						&.green {
	// 							background: #16ce67;
	// 						}
	// 						&.red {
	// 							background: #ff5446;
	// 						}
	// 					}
	// 					.icon {
	// 						width: 100%;
	// 						height: 100%;
	// 					}
	// 				}
	// 				.action {
	// 					font-size: 16px;
	// 					color: #99acbf;
	// 				}
	// 				.name {
	// 					font-size: 16px;
	// 					color: #dae4e5;
	// 				}
	// 			}
	// 		}
	// 	}
	// }
				-->
