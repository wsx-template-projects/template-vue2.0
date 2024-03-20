<template>
  <div class="punish-left">
    <section class="clue-inspect">
      <HeadLine text="线索核查"> </HeadLine>
      <div class="clues-content">
        <div class="clues-text">
          <span class="clue-num mb10">线索总数</span>
          <span class="clue-desc">
            <count-to
              v-if="!isNaN(clueSum)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(clueSum)"
              :duration="2000"
              ref="countRef"
            ></count-to>
            <div v-else>{{ clueSum }}</div>
          </span>
        </div>
        <div class="clues-chart">
          <div class="chart">
            <count-to
              v-if="!isNaN(annularData)"
              class="number-color font18"
              :startVal="0"
              :endVal="Number(annularData)"
              :duration="2000"
              :decimals="2"
              suffix="%"
              ref="countRef"
            ></count-to>
            <BaseEcharts :options="pieOption1" />
          </div>
          <div class="verification">
            <div
              class="check1"
              v-for="(item, index) in verificationData"
              :key="index"
            >
              <div class="text">{{ item.label }}</div>
              <div class="num">
                <count-to
                  v-if="!isNaN(item.value)"
                  class="number-color font32"
                  :startVal="0"
                  :endVal="Number(item.value)"
                  :duration="2000"
                  :decimals="item.decimals || 0"
                  ref="countRef"
                ></count-to>
                <div v-else>{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="clues-info paddingLeft20">
          <span class="text">监管部门向综合执法移交线索</span>
          <span class="num">
            <count-to
              v-if="!isNaN(clueInfo)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(clueInfo)"
              :duration="2000"
              ref="countRef"
            ></count-to>
            <div v-else>{{ clueInfo }}</div>
          </span>
        </div>
      </div>
    </section>
    <section class="case-situation">
      <HeadLine text="立案情况"></HeadLine>
      <div class="record-container">
        <div class="record-top">
          <div
            class="record-head"
            v-for="(item, index) in recordData"
            :key="index"
          >
            <div>{{ item.label }}</div>
            <count-to
              v-if="!isNaN(item.value)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(item.value)"
              :duration="2000"
              ref="countRef"
            ></count-to>
            <div v-else>{{ item.value }}</div>
            <div v-if="!isNaN(item.value)">
              {{ item.unit }}
            </div>
          </div>
        </div>
        <div class="record-bottom">
          <div class="record-body">
            <BaseEcharts :options="pieOption" />
          </div>
          <div class="record-body">
            <BaseEcharts :options="barOption1" />
          </div>
        </div>
      </div>
    </section>
    <section class="penalty-decision">
      <HeadLine text="处罚决定"></HeadLine>
      <div class="penalty-container">
        <div class="penalty-left">
          <div class="penalty-head">
            <div>行政处罚</div>
            <count-to
              v-if="!isNaN(decisionSum)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(decisionSum)"
              :duration="2000"
              ref="countRef"
            ></count-to>
            <div v-else>{{ decisionSum }}</div>
            <div>件</div>
          </div>
          <div class="test">
            <!-- <dv-capsule-chart
              :config="transverseBarOption"
              style="width: 300px; height: 160px; color: #6d7e9f"
            /> -->
            <BaseEcharts :options="transverseBarOption" />
          </div>
        </div>
        <span class="middle"></span>
        <div class="penalty-right">
          <div class="penalty-head"></div>
          <div class="penalty-body">
            <div class="title-text">行刑衔接</div>
            <div class="text-content">
              <div
                class="text-item"
                v-for="(item, index) in executeJoinData"
                :key="index"
              >
                <div class="desc">{{ item.label }}</div>
                <div class="num">
                  <count-to
                    v-if="!isNaN(item.value)"
                    class="number-color font32"
                    :start-val="0"
                    :end-val="Number(item.value)"
                    :duration="2000"
                    :decimals="item.decimals || 0"
                    ref="countRef"
                  ></count-to>
                  <div v-else>{{ item.value }}</div>
                  <span v-if="!isNaN(item.value)" class="font20">{{
                    item.unit
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="penalty-execution">
      <HeadLine text="处罚执行"></HeadLine>
      <div class="penalty-title">
        <div
          class="title-desc"
          v-for="(item, index) in punishExecuteList"
          :key="index"
        >
          <div class="desc-left" :class="item.class"></div>
          <div class="desc-right">
            <div class="">{{ item.label }}</div>
            <div class="num">
              <count-to
                v-if="!isNaN(item.value)"
                class="number-color font32"
                :start-val="0"
                :end-val="Number(item.value)"
                :duration="2000"
                :decimals="item.decimals || 0"
                ref="countRef"
              ></count-to>
              <div v-else>{{ item.value }}</div>
              <span v-if="!isNaN(item.value)" class="font20">{{
                item.unit
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="execution-container">
        <div class="execution-left">
          <div class="execution-title">
            <div>涉案对象数</div>
            <count-to
              v-if="!isNaN(involveObject)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(involveObject)"
              :duration="2000"
              ref="countRef"
            ></count-to>
            <div v-else>{{ involveObject }}</div>
            <div>个</div>
          </div>
          <div class="execution-body">
            <BaseEcharts :options="barOption2" />
          </div>
        </div>
        <div class="execution-middle"></div>
        <div class="execution-right">
          <div class="execution-title">
            <div>涉案金额</div>
            <count-to
              v-if="!isNaN(involveMoney)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(involveMoney)"
              :duration="2000"
              :decimals="2"
              ref="countRef"
            ></count-to>
            <div v-else>{{ involveMoney }}</div>
            <div>亿</div>
          </div>
          <div class="execution-body">
            <dv-active-ring-chart
              :config="dynamicRingOption"
              style="width: 285px; height: 160px"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="reconsideration">
      <HeadLine text="复议诉讼"></HeadLine>
      <div class="reconsideration-container">
        <div
          class="reconsideration-item"
          v-for="(item, index) in reconsiderationData"
          :key="index"
        >
          <div class="left-icon" :class="item.iconClass"></div>
          <div class="right-desc">
            <div class="desc-top">{{ item.label }}</div>
            <div class="desc-bottom">
              <count-to
                v-if="!isNaN(item.value)"
                class="number-color font32"
                :start-val="0"
                :end-val="Number(item.value)"
                :duration="2000"
                :decimals="item.decimals || 0"
                ref="countRef"
              ></count-to>
              <div v-else>{{ item.value }}</div>
              <span v-if="!isNaN(item.value)" class="font20">{{
                item.unit
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/** 数字翻牌器 */
import countTo from 'vue-count-to'
import HeadLine from './head-line.vue'
import BaseEcharts from '../../../components/global/base-echarts'
import SvgIcon from '@/components/ComponentExamples/SvgIcon.vue'
function formatter(number) {
  const numbers = number.toString().split('').reverse()
  const segs = []

  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

  return segs.join(',').split('').reverse().join('')
}
export default {
  name: 'PunishLeft',
  components: { countTo, HeadLine, BaseEcharts, SvgIcon },
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      allData: [], // 全部数据
      /** 线索核查 */
      clueSum: 0, // 线索总数
      clueInfo: 0, // 监管部门向综合执法移交线索
      verificationData: [], // 核查
      pieOption1: {}, // 线索核查图表
      annularData: 0, // 线索核查环形图内展示数据
      /** 立案情况 */
      recordData: [], // 立案信息
      pieOption: {}, // 立案情况饼图
      barOption1: {}, // 立案情况柱状图
      /** 处罚决定 */
      decisionSum: 0, // 处罚决定-行政处罚数
      transverseBarOption: {}, // 处罚决定图表
      executeJoinData: [], // 行刑衔接
      /** 处罚执行 */
      punishExecuteList: [], // 处罚执行
      involveObject: 0, // 涉案对象
      involveMoney: 0, // 涉案金额
      barOption2: {}, // 涉案对象柱状图
      dynamicRingOption: {}, // 涉案金额饼图
      /** 复议诉讼 */
      reconsiderationData: [],
      interval: null,
    }
  },
  computed: {},
  watch: {
    param(e) {
      console.log('punish-left', e)
      this.getData()
    },
  },
  created() {},
  mounted() {
    this.getData()
    this.interval = setInterval(() => {
      const countRef = this.$refs.countRef
      countRef.forEach((e) => {
        e.start()
      })
    }, 1000 * 10)
  },
  methods: {
    /**
     * 获取数据
     */
    async getData() {
      let params = {
        placeCode: 'DZH-CF',
        placeAreaCode: 'DZH-CF',
        param: {
          areacode: '33',
          dutycode: ' ',
          ...this.param,
        },
      }
      const { 'dzh-zbj-cf': data } = await this.$http
        .post('/api/v2/bi/place/dataRuleGroup/doGetPlaceData', params)
        .then((res) => {
          const obj = {}
          const { processResult } = res[0]
          processResult.forEach((elem) => {
            obj[elem.key] = obj[elem.key]
              ? [...obj[elem.key], ...elem.value]
              : elem.value
          })
          return obj
        })

      this.allData = data
      this.setXSHCData()
      this.setLAQKData()
      this.setCFJData()
      this.setCFZXData()
      this.setFYSSData()
    },
    /**
     * 处理(线索核查)数据
     */
    setXSHCData() {
      const data = this.allData
      this.clueSum = this.filterData(data, '线索总数')
      this.clueInfo = this.filterData(data, '监管部门向综合执法移交线索')
      this.verificationData = [
        {
          label: '待核查',
          value: this.filterData(data, '待核查案件数'),
        },
        {
          label: '已核查',
          value: this.filterData(data, '已核查案件数'),
        },
      ]
      const annularData = this.filterData(data, '已核查百分比')
      this.annularData = annularData
      this.pieOption1 = {
        polar: {
          radius: ['80%', '68%'],
          center: ['50%', '50%'],
        },
        angleAxis: {
          max: 100,
          show: false,
          startAngle: 90, // 开始角度
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            barWidth: 60,
            showBackground: true,
            data: [annularData],
            coordinateSystem: 'polar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgb(10, 115, 255)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(121, 218, 255)',
                  },
                ]),
              },
            },
          },
        ],
      }
    },
    /**
     * 处理(立案情况)数据
     */
    setLAQKData() {
      const data = this.allData
      this.recordData = [
        {
          label: '已立案',
          value: this.filterData(data, '已立案案件数'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '不予立案',
          value: this.filterData(data, '不予立案案件数'),
          decimals: 0,
          unit: '件',
        },
      ]
      /** 饼图 */
      const pieSeriesData = [
        { value: 0, name: '巡查中发现' },
        { value: 0, name: '下级行政机构报请' },
        { value: 0, name: '在行政检查中发现' },
        { value: 0, name: '机构监测报告' },
        { value: 0, name: '社会举报' },
        { value: 0, name: '非现场执法' },
        { value: 0, name: '上级行政机关交办' },
      ]
      pieSeriesData.forEach((elem) => {
        elem.value = this.filterData(data, elem.name)
      })
      this.pieOption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true,
          icon: 'circle', //  字段控制形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          itemGap: 10, // 设置间距
          right: 'right',
          top: '12%',
          padding: [0, 10, 0, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },

        color: [
          '#88d8fd',
          '#b66cc5',
          '#58a9fd',
          '#f55654',
          '#3b70fc',
          '#c6252a',
          '#88d8fd',
          '#a76a14',
        ],
        series: [
          {
            name: '立案情况',
            type: 'pie',
            radius: ['45%', '65%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 2,
              borderColor: '#294b70',
              borderWidth: 1,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
                // fontSize: '13',
                fontWeight: 'bold',
                borderWidth: '4',
              },
            },
            labelLine: {
              show: false,
            },
            hoverAnimation: false,
            data: pieSeriesData,
          },
        ],
      }
      /** 柱状图 */
      const barxAxis = ['综合执法案件', '专业执法案件', '乡镇执法案件']
      const barSeriesData = []
      barxAxis.forEach((elem) => {
        barSeriesData.push(this.filterData(data, elem))
      })
      this.barOption1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: barxAxis,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
            axisLable: {
              show: true,
              textStyle: {
                color: '#6d7e9f',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#6d7e9f',
              },
            },
            axisTick: {
              show: false,
              //   alignWithLabel: true,
            },
          },
        ],
        color: ['#3b5ddc', '#83d0f6', '#60fdfe'],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
            axisLable: {
              show: true,
              textStyle: {
                color: '#6d7e9f',
              },
            },
            axisTick: {
              show: false,
              //   alignWithLabel: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#6d7e9f',
              },
            },
          },
        ],
        series: [
          {
            name: '案件数',
            type: 'bar',
            barWidth: '30%',
            data: barSeriesData,
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#3b5ddc', '#489ae4', '#5ef2ee']
                  return colorList[params.dataIndex]
                },
              },
            },
          },
        ],
      }
    },
    /**
     * 处理(处罚决定)数据
     */
    setCFJData() {
      const data = this.allData
      this.decisionSum = this.filterData(data, '行政处罚')
      const yAxisData = [
        '罚款或没收',
        '行政拘留',
        '警告',
        '责令停产停业',
        '暂扣或吊销执照',
      ]
      const seriesData = []
      yAxisData.forEach((elem) => {
        seriesData.push(this.filterData(data, elem))
      })
      const dataV = []
      yAxisData.forEach((elem) => {
        dataV.push({
          name: elem,
          value: this.filterData(data, elem),
        })
      })
      this.transverseBarOption = {
        tooltip: {
          //item和line搭配，将实现鼠标放置柱条上即可显示提示框，无阴影或者线条
          trigger: 'item',
          axisPointer: {
            type: 'line',
          },
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '0%',
          top: '0%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
            splitLine: {
              //坐标轴在grid区域的分割线
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: '#6d7e9f',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'category',
            data: yAxisData,
            inverse: true, //数组翻转显示
            axisTick: {
              alignWithLabel: true,
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: '#6d7e9f',
              },
            },
          },
          {
            type: 'category',
            data: [1000, 1000, 1000, 1000, 1000],
            inverse: true, //数组翻转显示
            axisTick: {
              alignWithLabel: true,
              show: false,
            },
            axisLine: {
              show: false, //不显示y轴的线
            },
            axisLabel: {
              show: false,
              textStyle: {
                fontSize: 12,
                color: '#6d7e9f',
              },
            },
          },
        ],
        series: [
          {
            name: '处罚决定',
            type: 'bar',
            yAxisIndex: 0,
            data: seriesData,
            barWidth: '40%', //柱条的宽度
            itemStyle: {
              borderRadius: [10, 10, 10, 10], //圆角
              color: function (params) {
                let lineColor = [
                  '#3b70fc',
                  '#3b70fc',
                  '#3b70fc',
                  '#3b70fc',
                  '#3b70fc',
                ]
                return lineColor[params.dataIndex]
              },
            },
            showBackground: true,
            backgroundStyle: {
              color: 'none',
              borderColor: '#333b57',
              borderWidth: 1,
              borderRadius: [30, 30],
            },
          },
        ],
      }
      this.executeJoinData = [
        {
          label: '案件移送',
          value: this.filterData(data, '移送案件数'),
          decimals: 0,
          unit: '',
        },
        {
          label: '公安立案率',
          value: this.filterData(data, '公安立案率'),
          decimals: 0,
          unit: '%',
        },
      ]
      //   this.transverseBarOption = {
      //     data: dataV,
      //     colors: ['#3b70fc', '#3b70fc', '#3b70fc', '#3b70fc', '#3b70fc'],
      //   }
    },
    /**
     * 处理(处罚执行)数据
     */
    setCFZXData() {
      const data = this.allData
      this.punishExecuteList = [
        {
          label: '主动履行',
          value: this.filterData(data, '主动履行'),
          decimals: 0,
          class: 'penalty-icon1',
          unit: '',
        },
        {
          label: '强制执行',
          value: this.filterData(data, '强制执行'),
          decimals: 0,
          class: 'penalty-icon1',
          unit: '',
        },
        {
          label: '非诉执行',
          value: this.filterData(data, '非诉执行'),
          decimals: 0,
          class: 'penalty-icon1',
          unit: '',
        },
      ]
      this.involveObject = this.filterData(data, '涉案对象数')
      this.involveMoney = this.filterData(data, '涉案金额') / 100000000
      /** 涉案对象柱状图 */
      const barxAxis = ['公民', '企业', '个体户', '其他组织']
      const barSeriesData = []
      barxAxis.forEach((elem) => {
        barSeriesData.push(this.filterData(data, elem))
      })
      this.barOption2 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          top: '5%',
          left: '0%',
          right: '0%',
          bottom: '8%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: barxAxis,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
            axisLable: {
              show: true,
              textStyle: {
                color: '#6d7e9f',
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#6d7e9f',
              },
            },
            axisTick: {
              show: false,
              //   alignWithLabel: true,
            },
          },
        ],
        color: ['#3b5ddc', '#83d0f6', '#60fdfe'],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
            axisLable: {
              show: true,
              textStyle: {
                color: '#6d7e9f',
              },
            },
            axisTick: {
              show: false,
              //   alignWithLabel: true,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#6d7e9f',
              },
            },
          },
        ],
        series: [
          {
            name: '涉案对象',
            type: 'bar',
            barWidth: '40%',
            data: barSeriesData,
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#3b5ddc', '#489ae4', '#5ef2ee', '#5ef2ee']
                  return colorList[params.dataIndex]
                },
              },
            },
          },
        ],
      }
      /** 涉案金额饼图 */
      const dydata = [
        {
          name: '0-500',
          value: 55,
        },
        {
          name: '500-1000',
          value: 120,
        },
        {
          name: '1000-5000',
          value: 78,
        },
        {
          name: '5000-10000',
          value: 66,
        },
        {
          name: '10000-50000',
          value: 80,
        },
        {
          name: '50000以上',
          value: 80,
        },
      ]
      dydata.forEach((elem) => {
        elem.value = Number(this.filterData(data, elem.name))
      })
      this.dynamicRingOption = {
        radius: '80%',
        activeRadius: '85%',
        data: dydata,
        digitalFlopStyle: {
          fontSize: 20,
        },
        lineWidth: 8,
        digitalFlopStyle: {
          color: '#fff',
          fontSize: '14',
        },
        color: ['#3b70fc', '#58a9fd', '#4581fc', '#adf5fe', '#6ecbfd'],
      }
    },
    /**
     * 处理(复议诉讼)数据
     */
    setFYSSData() {
      const data = this.allData
      this.reconsiderationData = [
        {
          label: '复议纠错率',
          iconClass: 'icon1',
          value: this.filterData(data, '行政复议'),
          decimals: 2,
          unit: '%',
        },
        {
          label: '行政诉讼',
          iconClass: 'icon2',
          value: this.filterData(data, '行政诉讼'),
          decimals: 2,
          unit: '%',
        },
      ]
    },
    /**
     * 数据过滤
     */
    filterData(data, itemcode) {
      const filterData =
        Array.isArray(data) &&
        data.filter((item) => {
          return item.itemcode == itemcode
        })
      return filterData.length > 0 ? filterData[0].value : 0
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style lang="less" scoped>
.punish-left {
  width: 730px;
  height: 100%;
  max-height: 1280px;
  > section {
    width: 100%;
    background: url('../../../assets/images/integrates/section_bg.png')
      no-repeat;
    background-size: 100% 100%;
  }
  .number-color font32 {
    font-size: 25px;
    background-image: -webkit-linear-gradient(
      bottom,
      #5ffdfe,
      #98fdfe,
      #d4feff
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .clue-inspect {
    height: 156px;
    .clues-content {
      height: 100px;
      display: flex;
      align-items: center;
      height: 105;
      .clues-text {
        width: 170px;
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .clue-num {
          color: #fff;
          font-size: 23px;
        }
        .clue-desc {
          margin-left: -30px;
        }
      }
      .clues-chart {
        height: 100px;
        // background: green;
        flex: 5;
        display: flex;
        .chart {
          flex: 4;
          height: 100px;
          position: relative;
          > :first-child {
            position: absolute;
            width: 100%;
            height: 100px;
            text-align: center;
            line-height: 100px;
          }
        }
        .verification {
          flex: 5;
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          .check1 {
            display: flex;
            align-items: center;
            .text {
              margin-right: 10px;
            }
          }
        }
      }
      .clues-info {
        width: 280px;
        height: 80px;
        margin-right: 10px;
        background: rgba(0, 57, 138, 0.5);
        border: 1px solid #2c5fbc;
        box-sizing: border-box;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        margin-left: 20px;
      }
    }
  }
  .case-situation {
    margin-top: 10px;
    width: 100%;
    height: 315px;
    background: url('../../../assets/images/integrates/section_bg.png')
      no-repeat !important;
    background-size: 100% 100% !important;
    .record-container {
      padding: 0 20px;
      box-sizing: border-box;
      .record-top {
        display: flex;
        .record-head {
          flex: 1;
          margin: 0 5px;
          height: 50px;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 24px;
          font-weight: 500;
          > :first-child {
            margin-right: 5px;
          }
          > :last-child {
            margin-left: 5px;
          }
        }
      }
      .record-bottom {
        display: flex;
        justify-content: space-between;
        .record-body {
          width: 49.5%;
          height: 200px;
          background: rgba(0, 57, 138, 0.5);
          border: 1px solid #2c5fbc;
          border-radius: 5px;
        }
      }
    }
  }
  .penalty-decision {
    margin-top: 10px;
    width: 100%;
    height: 256px;
    background: url('../../../assets/images/integrates/section_bg.png')
      no-repeat !important;
    background-size: 100% 100% !important;
    .penalty-container {
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      .penalty-left {
        flex: 1;
        .penalty-head {
          height: 40px;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          > :first-child {
            margin-right: 5px;
          }
          > :last-child {
            margin-left: 5px;
          }
        }
        .test {
          height: 150px;
          width: 100%;
        }
        .penalty-test {
          width: 100%;
          //   background: rgba(0, 57, 138, 0.5);
          //   border: 1px solid #2c5fbc;
          height: 150px !important;
        }
      }
      .middle {
        width: 20px;
      }
      .penalty-right {
        flex: 1;
        .penalty-head {
          height: 40px;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 18px;
          font-weight: 500;
        }
        .penalty-body {
          height: 150px;
          background: rgba(0, 57, 138, 0.5);
          border: 1px solid #2c5fbc;
          border-radius: 5px;
          padding: 20px;
          box-sizing: border-box;
          .title-text {
            color: #fff;
            font-size: 23px;
            margin-bottom: 15px;
          }
          .text-content {
            margin-left: 10px;
            color: #fff;
            font-size: 18px;
            display: flex;
            .text-item {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              //   align-items: center;
              .desc {
                margin-bottom: 6px;
              }
            }
          }
        }
      }
    }
  }
  .penalty-execution {
    margin-top: 10px;
    width: 100%;
    height: 345px;
    background: url('../../../assets/images/integrates/section_bg.png')
      no-repeat !important;
    background-size: 100% 100% !important;
    .penalty-title {
      margin: 10px;
      display: flex;
      height: 60px;
      padding: 0 15px;
      color: #fff;
      align-items: center;
      .title-desc {
        flex: 1;
        display: flex;
        align-items: center;
        .desc-left {
          width: 40px;
          height: 40px;
          margin-right: 20px;
        }
        .penalty-icon1 {
          background: url('../../../assets/images/innovation/复议纠错率.svg')
            no-repeat;
          background-size: 100% auto;
        }
        .penalty-icon2 {
          background: url('../../../assets/images/innovation/强制执行.svg')
            no-repeat;
          background-size: 100% auto;
        }
        .penalty-icon3 {
          background: url('../../../assets/images/innovation/非诉执行备份.svg')
            no-repeat;
          background-size: 100% auto;
        }
        .desc-right {
          display: flex;
          flex-direction: column;
          //   align-items: center;
          font-size: 24px;
          font-weight: 500;
        }
      }
    }
    .execution-container {
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      .execution-left,
      .execution-right {
        flex: 1;
        height: 200px;
        background: rgba(0, 57, 138, 0.5);
        border: 1px solid #2c5fbc;
        border-radius: 5px;
        padding: 5px 20px;
        box-sizing: border-box;
        .execution-title {
          display: flex;
          align-items: center;
          color: #fff;
          padding: 0px;
          box-sizing: border-box;
          font-size: 20px;
          > :first-child {
            margin-right: 5px;
          }
          > :last-child {
            margin-left: 5px;
          }
          //   height: 40;
          //   line-height: 40px;
        }
        .execution-body {
          height: 160px;
        }
      }
      .execution-middle {
        width: 20px;
      }
      //   .execution-right {
      //     flex: 1;
      //     height: 200px;
      //     background: rgba(0, 57, 138, 0.5);
      //     border: 1px solid #2c5fbc;
      //     border-radius: 5px;
      //     padding: 20px;
      //     box-sizing: border-box;
      //   }
    }
  }
  .reconsideration {
    margin-top: 10px;
    width: 100%;
    height: 158px;
    background: url('../../../assets/images/integrates/section_bg.png')
      no-repeat !important;
    background-size: 100% 100% !important;
    .reconsideration-container {
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      //   justify-content: space-around;
      align-items: center;
      height: 110px;
      .reconsideration-item {
        flex: 1;
        display: flex;
        height: 110px;
        align-items: center;
        .left-icon {
          width: 40px;
          height: 40px;
        }
        .icon1 {
          background: url('../../../assets/images/innovation/复议纠错率.svg')
            no-repeat;
          background-size: 100%;
        }
        .icon2 {
          background: url('../../../assets/images/innovation/行政诉讼.svg')
            no-repeat;
          background-size: 100%;
        }
        .right-desc {
          margin-left: 20px;
          font-size: 24px;
          .desc-top {
            margin-bottom: 6px;
          }
        }
      }
    }
  }
}
</style>
