<template>
  <div class="command-right">
    <ItemTitle itemTitle="执法任务管理">
      <section class="enforce-task">
        <!-- 检查计划统筹顶部 -->
        <section class="enforce-task__top">
          <IconLabel
            v-for="(item, index) in enforceTopData"
            :key="index"
            :iconData="item"
          ></IconLabel>
        </section>
        <!-- 专项整治制订层级 -->
        <section class="accomplish-formulate">
          <div class="small-title mt10 mb20">专项整治制订层级</div>
          <div class="formulate">
            <ProgressBar
              v-for="(item, index) in formulateData"
              :key="index"
              :progressData="item"
              class="formulate-bar"
            ></ProgressBar>
          </div>
        </section>
        <!-- 专项整治分布（TOP5） -->
        <section class="special-Top">
          <div class="small-title mt20 mb20">
            <div>专项整治分布(TOP5)</div>
            <div class="small-tabs">
              <div
                v-for="(item, index) in disputeOption"
                :key="index"
                :class="{ active: specialIndex == item.value }"
                @click="smallTabClick(item.value, 'special')"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <TableList :tableListData="specialTopData"></TableList>
        </section>
        <div class="enforce-task__top mt20 mb20">
          <IconLabel
            v-for="(item, index) in specialTopIconData"
            :key="index"
            :iconData="item"
          ></IconLabel>
        </div>
        <!-- 紧急任务调度 -->
        <section class="urgency-task">
          <div class="small-title mt10 mb20 pointer">
            <div @click="toUrgency()">
              紧急任务调度
              <img width="25" height="30" src="../../images/link.png" alt="" />
            </div>
            <div class="small-tabs">
              <div
                v-for="(item, index) in smallTabOption"
                :key="index"
                :class="{ active: urgencyTaskIndex == item.value }"
                @click="smallTabClick(item.value, 'urgency')"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <div class="urgency-task__content">
            <IconLabel
              v-for="(item, index) in urgencyTaskData"
              :key="index"
              :iconData="item"
            ></IconLabel>
          </div>
        </section>
      </section>
    </ItemTitle>
    <ItemTitle itemTitle="职责争议处理" class="mt40">
      <section class="responsibility">
        <!-- 检查计划统筹顶部 -->
        <section class="responsibility__top">
          <IconLabel
            v-for="(item, index) in responsibilityData"
            :key="index"
            :iconData="item"
          ></IconLabel>
        </section>
        <!-- 职责争议分布（TOP5） -->
        <section class="responsibility-Top5">
          <div class="small-title mt20 mb20">
            <div>职责争议分布(TOP5)</div>
            <div class="small-tabs">
              <div
                v-for="(item, index) in disputeOption"
                :key="index"
                :class="{ active: disputeIndex == item.value }"
                @click="smallTabClick(item.value, 'dispute')"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <TableList :tableListData="responTopData"></TableList>
        </section>
      </section>
    </ItemTitle>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
/** 容器统一样式 */
import ItemTitle from '../item-title/index.vue'
/** 进度条 */
import ProgressBar from '../progress-bar/index.vue'
/** 图标文本 */
import IconLabel from '../icon-label/index.vue'
/** 列表 */
import TableList from '../table-list/index.vue'
import { urgencyData } from '../data/center'
@Component({
  name: 'CommandRight',
  components: {
    ItemTitle,
    ProgressBar,
    IconLabel,
    TableList,
  },
})
export default class CommandRight extends Vue {
  /** 执法任务管理顶部数据 */
  public enforceTopData = [
    {
      icon: require('../../images/zxzzljzs.png'),
      label: '专项整治累计总数',
      labelClass: 'font24',
      value: '-',
      valueClass: 'font36',
      alignItems: 'center',
      imgWidth: 40,
    },
    {
      label: '其中本年',
      value: '-',
      unit: '',
      value_1: '-',
      unit_1: '% ',
    },
  ]
  /** 紧急任务累计总数 */
  public specialTopIconData = [
    {
      icon: require('../../images/jjrwljzs.png'),
      label: '紧急任务累计总数',
      labelClass: 'font24',
      value: 14,
      valueClass: 'font36',
      alignItems: 'center',
      imgWidth: 40,
    },
    {
      label: '其中本年',
      value: 14,
      unit: '',
      value_1: 100,
      unit_1: '% ',
    },
  ]
  /** 计划制订层级 */
  public formulateData = [
    {
      label: '省级制订',
      value: '-',
      progress: '-',
      progressColor: 'rgba(86, 181, 249, 1)',
      topLineColor: 'rgba(77, 92, 102, 1)',
    },
    {
      label: '市级制订',
      value: '-',
      progress: '-',
      progressColor: 'rgba(86, 181, 249, 1)',
      topLineColor: 'rgba(77, 92, 102, 1)',
    },
    {
      label: '区县制订',
      value: '-',
      progress: '-',
      progressColor: 'rgba(86, 181, 249, 1)',
      topLineColor: 'rgba(77, 92, 102, 1)',
    },
  ]
  /** 专项整治分布（TOP5） */
  public specialTopData = {
    header: ['地区', '部署总数'],
    porp: ['region', 'total'],
    content: [
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
    ],
  }
  /** 职责争议分布（TOP5） */
  public responTopData = {
    header: ['地区', '部署总数'],
    porp: ['region', 'total'],
    content: [
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
      //   {
      //     region: 'XX地区',
      //     total: 300,
      //   },
    ],
  }
  /** 职责争议处理 */
  public responsibilityData = [
    {
      icon: require('../../images/zzzyljzs.png'),
      label: '职责争议累计总数',
      labelClass: 'font24',
      value: '-',
      valueClass: 'font36',
      alignItems: 'center',
      imgWidth: 40,
    },
    {
      label: '制订部门',
      value: '-',
      unit: '',
      value_1: '-',
      unit_1: '% ',
    },
  ]
  /** 紧急任务调度 */
  public urgencyTaskData = [
    {
      label: '工作人员',
      value: 1242,
      unit: '人次',
    },
    {
      label: '车辆',
      value: 57,
      unit: '台次',
    },
    {
      label: '无人机',
      value: 132,
      unit: '架次',
    },
    {
      label: '设备',
      value: 222,
      unit: '件次',
    },
  ]
  public smallTabOption = [
    {
      label: '累计',
      value: '0',
    },
    {
      label: '本年',
      value: '1',
    },
  ]
  public disputeOption = [
    {
      label: '按地区',
      value: '0',
    },
    {
      label: '按部门',
      value: '1',
    },
  ]
  public specialIndex = '0'
  /** 紧急任务调度 */
  public urgencyTaskIndex = '0'
  /** 职责争议分布（TOP5） */
  public disputeIndex = '0'
  /**
   * 获取数据
   */
  private getData() {
    this.formulateData = [
      {
        label: '省级制订',
        value: '-',
        progress: '-',
        progressColor: 'rgba(86, 181, 249, 1)',
        topLineColor: 'rgba(77, 92, 102, 1)',
      },
      {
        label: '市级制订',
        value: '-',
        progress: '-',
        progressColor: 'rgba(86, 181, 249, 1)',
        topLineColor: 'rgba(77, 92, 102, 1)',
      },
      {
        label: '区县制订',
        value: '-',
        progress: '-',
        progressColor: 'rgba(86, 181, 249, 1)',
        topLineColor: 'rgba(77, 92, 102, 1)',
      },
    ]
  }
  /**
   * tab切换
   */
  public smallTabClick(e: any, key: any) {
    switch (key) {
      // 紧急任务
      case 'special':
        this.specialIndex = e
        break
      // 紧急任务
      case 'urgency':
        this.urgencyTaskIndex = e
        this.urgencyTaskData = urgencyData[e]
        break
      case 'dispute':
        this.disputeIndex = e
        break
    }
  }
  /**
   * 跳转紧急任务
   */
  public toUrgency() {
    const env_Url =
      process.env.VUE_APP_ENV == 'prod'
        ? 'http://10.249.41.248'
        : 'http://192.168.1.200'
    window.open(`${env_Url}/compound/integrate/todo-list-leader`)
  }
  created() {}
  mounted() {
    setTimeout(() => {
      this.getData()
      this.smallTabClick(0, 'urgency')
    }, 100)
  }
}
</script>

<style lang="less" scoped>
.command-right {
  width: 660px;
  .small-title {
    img {
      position: relative;
      top: 5px;
      margin-left: 14px;
    }
  }
  //   执法任务管理
  .enforce-task {
    padding: 20px 10px;
    &__top {
      display: flex;
      align-items: center;
      padding: 0px 10px;
      > :first-child {
        flex: 3;
      }
      > :last-child {
        flex: 2;
      }
    }
    .accomplish-formulate {
      .formulate {
        display: flex;
        justify-content: space-between;
      }
      .formulate-bar {
        width: 201px;
      }
    }
    .urgency-task {
      &__content {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  //   职责争议处理
  .responsibility {
    padding: 20px 10px;
    &__top {
      display: flex;
      padding: 0px 10px;
      align-items: center;
      > :first-child {
        flex: 3;
      }
      > :last-child {
        flex: 2;
      }
    }
  }
}
</style>
<style lang="less">
.command-left {
  .white {
    color: #fff;
  }
}
</style>