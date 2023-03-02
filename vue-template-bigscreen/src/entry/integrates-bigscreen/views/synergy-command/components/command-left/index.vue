<template>
  <div class="command-left">
    <ItemTitle itemTitle="检查计划统筹">
      <section class="examine-schedule">
        <!-- 检查计划统筹顶部 -->
        <section class="examine-schedule__top">
          <IconLabel
            v-for="(item, index) in examineTopData"
            :key="index"
            :iconData="item"
          ></IconLabel>
        </section>
        <!-- 计划完成进度 -->
        <section class="accomplish-schedule">
          <div class="small-title mt10 mb20">计划完成进度</div>
          <AccomplishSchedule :scheduleData="scheduleData"></AccomplishSchedule>
        </section>
        <!-- 计划制订层级 -->
        <section class="accomplish-formulate">
          <div class="small-title mt10 mb20">计划制订层级</div>
          <div class="formulate">
            <ProgressBar
              v-for="(item, index) in formulateData"
              :key="index"
              :progressData="item"
              class="formulate-bar"
            ></ProgressBar>
          </div>
        </section>
        <!-- 检查计划类型 -->
        <section class="accomplish-type">
          <div class="small-title mt10 mb10">检查计划类型</div>
          <SectorLinkage></SectorLinkage>
        </section>
      </section>
    </ItemTitle>
    <ItemTitle itemTitle="重大活动保障" class="mt40">
      <section class="great-activity">
        <!-- 检查计划统筹顶部 -->
        <section class="great-activity__top">
          <IconLabel
            v-for="(item, index) in activityData"
            :key="index"
            :iconData="item"
          ></IconLabel>
        </section>
        <!-- 重大活动分布 -->
        <section class="activity-distribute">
          <div class="small-title mt10 mb20">
            <div>重大活动分布</div>
            <div class="small-tabs">
              <div
                v-for="(item, index) in smallTabOption"
                :key="index"
                :class="{ active: distributeIndex == item.value }"
                @click="smallTabClick(item.value, 'dist')"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <BaseEcharts
            class="distribute-ech"
            :options="distributeOption"
          ></BaseEcharts>
        </section>
        <!-- 执法资源调配 -->
        <section class="enforce-resource">
          <div class="small-title mt10 mb20">
            <div>执法资源调配</div>
            <div class="small-tabs">
              <div
                v-for="(item, index) in smallTabOption"
                :key="index"
                :class="{ active: enforceResIndex == item.value }"
                @click="smallTabClick(item.value, 'enforce')"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <div class="enforce-content">
            <IconLabel
              v-for="(item, index) in enforceData"
              :key="index"
              :iconData="item"
            ></IconLabel>
          </div>
        </section>
      </section>
    </ItemTitle>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
/** 容器统一样式 */
import ItemTitle from '../item-title/index.vue'
/** 计划完成进度 */
import AccomplishSchedule from '../accomplish-schedule/index.vue'
/** 进度条 */
import ProgressBar from '../progress-bar/index.vue'
/** 图标文本 */
import IconLabel from '../icon-label/index.vue'
/** 检查计划类型 */
import SectorLinkage from '../sector-linkage/index.vue'
import { progress } from '../data/center'
@Component({
  name: 'CommandLeft',
  components: {
    ItemTitle,
    AccomplishSchedule,
    ProgressBar,
    IconLabel,
    SectorLinkage,
  },
})
export default class CommandLeft extends Vue {
  /** 检查计划统筹顶部数据 */
  public examineTopData = [
    {
      icon: require('../../images/ndjhzs.png'),
      label: '年度计划总数',
      labelClass: 'font24',
      value: 9922,
      valueClass: 'font36',
      alignItems: 'center',
      imgWidth: 40,
    },
    {
      label: '制定部门',
      value: 2672,
      unit: '',
      value_1: progress((2672 / 4859) * 100, 4),
      unit_1: '% ',
    },
  ]
  /** 重大活动保障顶部数据 */
  public activityData = [
    {
      icon: require('../../images/zdhdbz.png'),
      label: '重大活动累计总数',
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
  /** 计划完成进度 */
  public scheduleData = [
    {
      label: '已完成检查计划',
      value: 0,
    },
    {
      label: '正在实施计划',
      value: 0,
    },
    {
      label: '待实施计划',
      value: 0,
    },
  ]
  /** 计划制订层级 */
  public formulateData = [
    {
      label: '省级制订',
      value: 0,
      progress: 0,
      progressColor: 'rgba(86, 181, 249, 1)',
      topLineColor: 'rgba(77, 92, 102, 1)',
    },
    {
      label: '市级制订',
      value: 0,
      progress: 0,
      progressColor: 'rgba(86, 181, 249, 1)',
      topLineColor: 'rgba(77, 92, 102, 1)',
    },
    {
      label: '区县制订',
      value: 0,
      progress: 0,
      progressColor: 'rgba(86, 181, 249, 1)',
      topLineColor: 'rgba(77, 92, 102, 1)',
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
  /** 重大活动选中 */
  public distributeIndex = '0'
  public distributeOption = {}
  /** 执法资源调配选中 */
  public enforceResIndex = '0'
  public enforceData = [
    {
      label: '执法部门',
      value: '-',
      unit: '个',
    },
    {
      label: '组织会议',
      value: '-',
      unit: '次',
    },
    {
      label: '出动人员',
      value: '-',
      unit: '人次',
    },
    {
      label: '调用设备',
      value: '-',
      unit: '件次',
    },
    {
      label: '调度车辆',
      value: '-',
      unit: '台次',
    },
  ]
  /**
   * 获取数据
   */
  private getData() {
    const sum = 4632 + 4045 + 1245
    this.scheduleData = [
      {
        label: '已完成检查计划',
        value: progress(4632 / sum, 4),
      },
      {
        label: '正在实施计划',
        value: progress(4045 / sum, 4),
      },
      {
        label: '待实施计划',
        value: progress(1245 / sum, 4),
      },
    ]
    this.formulateData = [
      {
        label: '省级制订',
        value: 145,
        progress: progress(1245 / 9922, 4),
        progressColor: 'rgba(86, 181, 249, 1)',
        topLineColor: 'rgba(77, 92, 102, 1)',
      },
      {
        label: '市级制订',
        value: 1088,
        progress: progress(1088 / 9922, 4),
        progressColor: 'rgba(86, 181, 249, 1)',
        topLineColor: 'rgba(77, 92, 102, 1)',
      },
      {
        label: '区县制订',
        value: 8689,
        progress: 1 - progress(1245 / 9922, 4) - progress(1088 / 9922, 4),
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
      case 'dist':
        this.distributeIndex = e
        break
      case 'enforce':
        this.enforceResIndex = e
        break
    }
  }
  /**
   * 获取重大活动分布 Echarts
   */
  private getDistributeOption() {
    const seriesData = [0, 0, 0]
    const Max = Math.floor(Math.max(...seriesData) / 0.8)
    this.distributeOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      color: ['#2E62F6'],
      grid: {
        left: 60,
        top: 10, // 设置条形图的边距
        right: 0,
        bottom: 24,
      },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        // 坐标轴刻度标签的相关设置
        axisLabel: {
          interval: 0,
          fontSize: 18,
          color: '#FFFFFF',
        },
        data: ['省级部门', '市级部门', '区县部门'],
        // 坐标轴线数据
        axisLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        // 坐标轴指示器配置项
        axisPointer: {
          show: true,
          label: {
            show: true,
            color: '#fff',
            backgroundColor: 'rgba(50,50,50,0.9)',
            padding: [4, 4, 4, 4],
          },
        },
      },
      yAxis: {
        type: 'value',
        max: Max,
        // 坐标轴刻度标签的相关设置
        axisLabel: {
          interval: 0,
          fontSize: 18,
          color: '#B4B4B4',
        },
        /** */
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
            type: 'dashed',
          },
        },
        // 坐标轴刻度相关设置
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(46, 98, 246, 0.2)',
          },
          barWidth: 65,
          label: {
            show: true,
          },
        },
      ],
    }
  }
  created() {}
  mounted() {
    setTimeout(() => {
      this.getData()
    }, 100)
    this.getDistributeOption()
  }
}
</script>

<style lang="less" scoped>
.command-left {
  width: 660px;
  .examine-schedule {
    padding: 20px 10px 10px;
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
  }

  .great-activity {
    padding: 20px 10px 10px;
    &__top {
      display: flex;
      padding: 0px 10px;
      > :first-child {
        flex: 3;
      }
      > :last-child {
        flex: 2;
      }
    }
    .small-title {
      display: flex;
    }
    // 重大活动分布
    .activity-distribute {
      .distribute-ech {
        width: 100%;
        height: 130px;
      }
    }
    // 执法资源调配
    .enforce-resource {
      .enforce-content {
        display: flex;
        flex-wrap: wrap;
        > * {
          width: 33%;
          margin-bottom: 5px;
        }
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