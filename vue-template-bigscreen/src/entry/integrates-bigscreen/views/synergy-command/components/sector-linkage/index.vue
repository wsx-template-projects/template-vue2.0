<template>
  <div class="sector-linkage">
    <div class="echarts" ref="echartsContainer"></div>
    <div class="echarts-circle"></div>
    <div class="echarts-label">
      <template v-for="(item, index) in labelData">
        <div class="echarts-label__item" :key="index" v-if="!item.isHide">
          <div class="item-circle"></div>
          <div class="item-name">{{ item.name || '-' }}</div>
          <MyCountTo
            :endVal="Number(item.value)"
            :decimals="0"
            countToClass="font28"
          ></MyCountTo>
          <MyCountTo
            :endVal="Number((item.proportion * 100).toFixed(2))"
            :decimals="2"
            countToClass="font28"
            suffix="%"
          ></MyCountTo>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
// import * as echarts from "echarts5";
// @ts-ignore
import echarts from 'echarts'
@Component({
  name: 'SectorLinkage',
  components: {},
})
export default class SectorLinkage extends Vue {
  public options: any = {}
  public myChart: any
  public timer: any
  public activeName: string | undefined = ''
  public dataIndex: number = 0
  public seriesData: any = [] // 外圈展示的数据
  public seriesData_1: any = [] // 外圈展示的数据
  public labelData: any = []
  public seriesDataSum = 0
  public seriesColor = ['#7033B0', '#9AEAE8', '#4B7CF1']
  public seriesColor_1 = ['#B975FF', '#8E4BD4', '#7033B0']
  @Watch('dataIndex') dataIndexChange(e: any) {
    this.labelData = this.seriesData_1[e]
  }
  /**
   * 获取内圈数据
   */
  private getSeriesData() {
    const seriesData = [
      { value: 9273, name: '双随机', selected: true },
      { value: 649, name: '专项' },
      //   { value: 1789, name: '联合' },
    ]
    let sum = 0
    let lastProportion = 1
    seriesData.forEach((res: any) => {
      sum += res.value
    })
    this.seriesDataSum = sum
    seriesData.forEach((res: any, index) => {
      index == seriesData.length - 1 && (res.proportion = lastProportion)
      if (index != seriesData.length - 1) {
        res.proportion = (res.value / sum).toFixed(4)
        lastProportion -= res.proportion
      }
    })
    this.seriesData = seriesData
    this.getSeriesData_1()
  }
  /**
   * 获取外圈数据
   */
  private getSeriesData_1() {
    const itemStyle = {
      color: 'rgba(0,0,0,0)',
    }
    const seriesData_1 = []
    seriesData_1.push([
      { value: 7540 + 1733, name: '双随机抽查计划' },
      {
        value: 7540,
        name: '单部门计划',
      },
      { value: 1733, name: '跨部门计划' },
    ])
    seriesData_1.push([
      { value: 593 + 56, name: '专项计划' },
      { value: 593, name: '单部门计划' },
      { value: 56, name: '跨部门计划' },
    ])
    let sum = 0

    seriesData_1.forEach((res: any, index: any) => {
      /** 当前下标总数据 */
      let sum = 0
      let lastProportion = 1
      res.forEach((v: any) => {
        sum += Number(v.value)
      })
      res.forEach((v: any, i: number) => {
        i == v.length - 1 && (v.proportion = lastProportion)
        if (i != v.length - 1) {
          v.proportion = (v.value / sum).toFixed(4)
          lastProportion -= v.proportion
        }
      })
      /** 当前下标目录占比 */
      const proportion = this.seriesData[index].proportion

      /** 当前下标之前的比例 */
      let beforeProportion = 0
      this.seriesData.forEach((v: any, i: any) => {
        i < index && (beforeProportion += Number(v.proportion))
      })

      /** 当前下标之后的比例 */
      let afterProportion = 1 - proportion - beforeProportion

      /** 计算占比后总数据 */
      const allSum = Math.floor(sum / proportion)
      res.unshift({
        value: (beforeProportion * allSum).toFixed(2),
        name: 'before',
        itemStyle,
        isHide: true,
      })
      res.push({
        value: (afterProportion * allSum).toFixed(2),
        name: 'after',
        itemStyle,
        isHide: true,
      })
    })
    this.seriesData_1 = seriesData_1
    this.labelData = seriesData_1[0]
  }
  /**
   *   初始化
   */
  private initData() {
    const dom = this.$refs.echartsContainer
    // @ts-ignore
    this.myChart = echarts.init(dom)
    this.options = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: ['60%', '75%'],
          label: {
            show: false,
            position: 'inner',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          itemStyle: {
            borderColor: 'rgba(13, 20, 64)',
            borderWidth: 2,
          },
          data: this.seriesData,
          selectedOffset: 3,
          hoverAnimation: false,
          color: this.seriesColor,
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['85%', '100%'],
          label: {
            show: false,
          },
          labelLine: {
            show: false,
            length: 30,
          },
          data: this.seriesData_1[0],
          hoverAnimation: false,
          color: this.seriesColor_1,
        },
      ],
    }
    this.drawChart()
    this.setTimeToDo()
    this.$nextTick(() => {
      this.setHighLight()
    })

    let debounce: any = null
    this.myChart.on('mouseover', (params: any) => {
      if (params.seriesIndex != 0) return
      clearInterval(this.timer)
      // 鼠标快速移动时，会导致mouseover里的代码来不及执行，引起事件延迟，出现多个扇形区域同时被选中的现象，所以有必要设置防抖函数
      debounce && clearTimeout(debounce)
      debounce = setTimeout(() => {
        const data = this.options.series[0].data
        data.forEach((e: any) => (e.selected = false))
        data[params.dataIndex].selected = true
        this.myChart.setOption(this.options)
        this.dataIndex = params.dataIndex
        this.activeName = params.name
        this.setOuterRing()
      }, 100)
    })
    this.myChart.on('mouseout', (params: any) => {
      if (params.seriesIndex != 0) return
      this.setTimeToDo()
      this.setHighLight()
    })
    // 当切屏时，定时器容易执行异常，所以如果用户切屏，就暂停定时器
    window.onblur = () => {
      clearInterval(this.timer)
    }
    window.onfocus = () => {
      this.setHighLight()
    }
  }
  /**
   * 处理外圈
   */
  private setOuterRing() {
    this.options.series[1].data = this.seriesData_1[this.dataIndex]
    this.myChart.setOption(this.options)
  }
  /**
   *
   */
  private setTimeToDo() {
    const data = this.options.series[0].data
    data.forEach((e: any) => (e.selected = false))
    data[this.dataIndex].selected = true
    this.activeName = data[this.dataIndex].name
    // 必须重新设置option，因为echart没有监听data的变化
    this.setOuterRing()
  }
  /**
   * 开启定时器轮播
   */
  private setHighLight() {
    clearInterval(this.timer)
    const data = this.options.series[0].data
    this.timer = setInterval(() => {
      if (this.dataIndex < data.length - 1) {
        this.dataIndex++
      } else {
        this.dataIndex = 0
      }
      this.setTimeToDo()
    }, 10000)
  }
  /**
   * 挂载Echarts
   */
  private drawChart() {
    this.myChart.setOption(this.options)
  }
  created() {}
  mounted() {
    this.getSeriesData()
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.sector-linkage {
  height: 124px;
  display: flex;
  position: relative;
  .echarts {
    width: 200px;
    height: 124px;
    color: transparent;
  }
  .echarts-circle {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 1px solid #418af7;
    opacity: 0.4;
    border-radius: 50%;
    position: absolute;
    top: 27px;
    left: 66px;
  }
  .echarts-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // justify-content: space-around;
    &__item {
      color: #fff;
      align-items: center;
      display: flex;
      > div {
        margin-right: 20px;
      }
      .item-circle {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #b975ff;
        margin-right: 10px;
      }
      .item-name {
        // min-width: 160px;
        color: rgba(254, 255, 255, 1);
        font-size: 20px;
      }
    }
  }
}
</style>
