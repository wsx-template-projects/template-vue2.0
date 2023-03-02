<template>
  <div class="punish-right">
    <div class="matters-covered">
      <HeadLine text="事件覆盖"></HeadLine>
      <div class="matters-container">
        <div class="matters-left">
          <div
            class="matters-left-item"
            v-for="(item, index) in mattersData"
            :key="index"
          >
            <div class="icon" :class="item.iconClass"></div>
            <div class="desc-container">
              <div class="desc-title">{{ item.label }}</div>
              <div class="desc-num">
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
                <span class="font20">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="matters-right">
          <div class="head"><span class="back mr10"></span> 处罚事项TOP10</div>
          <dv-scroll-board
            :config="punishTaskTop"
            style="width: 100%; height: 180px"
          />
        </div>
      </div>
    </div>
    <div class="department-distribution">
      <HeadLine text="部门分布"></HeadLine>
      <div class="department-container">
        <div class="department-item1">
          <div
            class="desc-item"
            v-for="(item, index) in departmentData"
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
              <span class="font20">{{ item.unit }}</span>
            </div>
          </div>
        </div>
        <div class="department-item2">
          <div class="title">1+8部门分布</div>
          <div class="chart-container">
            <BaseEcharts :options="pieOption" />
          </div>
        </div>
        <div class="department-item3">
          <div class="head">
            <span class="back mr10"></span>
            处罚领域TOP10
          </div>
          <div class="chart-container">
            <dv-scroll-board
              :config="punishDomainTop"
              style="width: 100%; height: 180px"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="regional-distribution">
      <HeadLine text="地域分布"></HeadLine>
      <div class="regional-container">
        <BaseEcharts :options="option" />
      </div>
    </div>
    <div class="trend-analysis">
      <HeadLine text="趋势分析"></HeadLine>
      <div class="trend-container">
        <div class="trend-left">
          <div class="title">案件同期对比</div>
          <BaseEcharts :options="contrastOption" />
        </div>
        <div class="trend-right">
          <div class="title">当年度行政处罚情况</div>
          <BaseEcharts
            style="width: 95%; height: 190px"
            :options="lineOption"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** 数字翻牌器 */
import countTo from 'vue-count-to'
import HeadLine from './head-line.vue'
export default {
  name: 'PunishRight',
  components: { countTo, HeadLine },
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      allData: [], // 全部数据
      /** 事项覆盖 */
      mattersData: [],
      punishTaskTop: {},
      /** 部门分布 */
      departmentData: [],
      pieOption: {}, // 1+8 部门分布
      punishDomainTop: {},
      /** 地域分布 */
      option: {},
      /** 趋势分析 */
      contrastOption: {}, // 案件同期对比
      lineOption: {}, // 当年度行政处罚情况
      interval: null,
    }
  },
  computed: {},
  watch: {
    param(e) {
      console.log('punish-right', e)
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
      this.setSJFGData()
      this.setBMFBData()
      this.setDYFBData()
      this.setQSFBData()
    },
    /**
     * 处理(事件覆盖)数据
     */
    setSJFGData() {
      const data = this.allData
      this.mattersData = [
        {
          label: '事项覆盖率',
          iconClass: 'icon1',
          value: this.getPercentage(
            this.filterData(data, '覆盖处罚事项数'),
            this.filterData(data, '认领处罚事项数'),
          ),
          decimals: 2,
          unit: '%',
        },
        {
          label: '案件数',
          iconClass: 'icon2',
          value: this.filterData(data, '事项覆盖案件数'),
          decimals: 2,
          unit: '',
        },
      ]
      this.getPunishTaskTop()
    },
    /**
     * 获取处罚事项top
     */
    async getPunishTaskTop() {
      let params = {
        placeCode: 'DZH-CF',
        placeAreaCode: 'DZH-CF',
        param: {
          item_position: '处罚事项TOP',
          areacode: '33',
          dutycode: ' ',
          ...this.param,
        },
      }
      const { 'dzh-zbj-cf-top10': data } = await this.$http
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
      const TOPData = []
      data.forEach((elem) => {
        TOPData.push([
          `<span title="${elem.dim6}">${elem.dim6}</span>`,
          elem.value,
        ])
      })
      this.punishTaskTop = {
        header: ['事项名称', '案件数'],
        data: TOPData,
        oddRowBGC: '#002766',
        evenRowBGC: 'rgba(64, 90, 124, 0.47)',
        // headerBGC: '#002766',
        index: true,
        indexHeader: '',
        columnWidth: [50, 230],
        align: ['center', 'left'],
      }
    },
    /**
     * 处理(部门分布)数据
     */
    async setBMFBData() {
      const data = this.allData
      this.departmentData = [
        {
          label: '综合执法部门',
          value: this.filterData(data, '综合执法部门案件'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '专业执法部门',
          value: this.filterData(data, '专业执法部门案件'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '乡镇执法部门',
          value: this.filterData(data, '乡镇执法部门案件'),
          decimals: 0,
          unit: '件',
        },
      ]
      const newData = data.filter(
        (elem) => elem.item_position == '部门分布-饼图',
      )
      const pieSeriesData = []
      newData.forEach((elem) => {
        pieSeriesData.push({
          name: elem.itemcode == '8大部门数' ? elem.dim6 : elem.itemcode,
          value: elem.value,
        })
      })
      this.pieOption = {
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center',
        // },
        // tooltip: {
        //   trigger: 'item',
        // },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        // },
        tooltip: { type: 'item' },
        color: [
          '#5ef3ee',
          '#3a56db',
          '#3a56db',
          '#4aa5e5',
          '#4cace6',
          '#4fb9e7',
          '#50bfe8',
          '#52c5e9',
          '#52c5e9',
        ],
        series: [
          {
            name: '1+8部门分布',
            type: 'pie',
            radius: '80%',
            center: ['50%', '40%'],
            data: pieSeriesData,
            hoverAnimation: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: ' {d}%',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#add5e0',
                },
              },
            },
          },
        ],
      }
      this.getPunishDomainTop()
    },
    /**
     * 获取处罚领域top
     */
    async getPunishDomainTop() {
      let params = {
        placeCode: 'DZH-CF',
        placeAreaCode: 'DZH-CF',
        param: {
          item_position: '处罚领域TOP',
          areacode: '33',
          dutycode: ' ',
          ...this.param,
        },
      }
      const { 'dzh-zbj-cf-top10': data } = await this.$http
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
      const TOPData = []
      data.forEach((elem) => {
        TOPData.push([
          `<span title="${elem.dim6}">${elem.dim6}</span>`,
          elem.value,
        ])
      })
      this.punishDomainTop = {
        header: ['领域名称', '案件数'],
        data: TOPData,
        oddRowBGC: '#002766',
        evenRowBGC: 'rgba(64, 90, 124, 0.47)',
        // headerBGC: '#002766',
        index: true,
        indexHeader: '',
        columnWidth: [50, 120],
        align: ['center', 'left'],
      }
    },
    /**
     * 处理(地域分布)数据
     */
    setDYFBData() {
      const data = this.allData
      //  过滤 案件数
      const asjAllData = data.filter(
        (elem) =>
          elem.item_position == '地域分布-柱状图' && elem.itemcode == '案件数',
      )
      //  过滤 结案率
      const jalAllData = data.filter(
        (elem) =>
          elem.item_position == '地域分布-柱状图' && elem.itemcode == '结案率',
      )
      const xAxisData = []
      const ajsData = []
      const jalData = []
      asjAllData.forEach((elem) => {
        xAxisData.push(elem.dim6)
        ajsData.push(elem.value)
      })
      xAxisData.forEach((elem) => {
        const data = jalAllData.filter((item) => item.dim6 == elem)
        jalData.push(data[0].value)
      })
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },

        // legend: {
        //   data: ['Evaporation', 'Precipitation', 'Temperature']
        // },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow',
            },
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
            },
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            // name: 'Precipitation',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#6d7e9f',
              },
              formatter: '{value}',
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: 'value',
            // name: 'Temperature',
            min: 0,
            max: 100,
            interval: 20,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },

            axisLabel: {
              show: true,
              textStyle: {
                color: '#6d7e9f',
              },
              formatter: '{value}%',
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '案件数',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml'
              },
            },
            barWidth: '40%',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#81dbfd',
              },
              {
                offset: 1,
                color: '#3d76fc',
              },
            ]),
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(47,70,135, 0.2)',
            },
            data: ajsData,
          },

          {
            name: '结案率',
            hoverAnimation: false,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            smooth: true,
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C'
              },
            },
            color: '#f9c748',
            itemStyle: {
              normal: {
                color: '#f9c748',
              },
            },

            data: jalData,
          },
        ],
      }
    },
    /**
     * 处理(趋势分析)数据
     */
    setQSFBData() {
      const data = this.allData
      const qnData = [this.filterData(data, '上年度同期案件数')]
      const bnData = [this.filterData(data, '本年度案件数')]
      this.contrastOption = {
        // color:colors,
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            return (
              '<span style="font-size: 20px;font-weight: bold;font-family: SourceHanSansCN;">' +
              params[0].seriesName +
              '</span>' +
              '<br/>' +
              params[0].marker +
              '<span style="color:' +
              params[0].color +
              ';font-size: 20px;font-weight: bold;font-family: SourceHanSansCN;">' +
              '\n' +
              params[0].value +
              '</span>'
            )
          },
        },
        legend: {
          left: '10%', //图例距离左边的距离
          top: '16%',
          right: '10%',
          textStyle: {
            color: '#6d7e9f',
          },
          selectedMode: false,
          itemWidth: 10,
          itemHeight: 10, //图例宽高
          itemGap: 90, //图例的间隔
          data: [
            {
              name: '上年度同期案件数',
            },
            {
              name: '本年度案件数',
            },
          ],
        },
        color: ['#61fcf4', '#417ce0'],
        grid: [
          // 左
          {
            top: '32%',
            bottom: '52%',
            left: '8%',
            width: '25%',
            height: '40%',
            containLabel: true,
          },
          // 中
          {
            top: '22%',
            bottom: '2%',
            left: '68%',
            // left: 'center',
            width: '20%',
            height: '40%',
          },
          // 右
          {
            top: '32%',
            bottom: '52%',
            right: '5%',
            width: '25%',
            height: '40%',
            containLabel: true,
          },
        ],
        xAxis: [
          {
            interval: qnData[0],
            type: 'value',
            inverse: true,
            show: true,
            axisLabel: {
              color: '#7e8daa',
              fontSize: '12',
              fontWeight: 'bold',
              textStyle: {
                fontFamily: 'BoldCondensed',
              },
            },
            axisLine: {
              show: true,
              color: '#6d7e9f',
            },
            splitLine: {
              // 网格线
              show: false,
              lineStyle: {
                color: '#6d7e9f',
                width: 1,
                type: 'dotted',
              },
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
          },
          {
            gridIndex: 1,
            show: true,
            axisLabel: {
              color: '#7e8daa',
              fontSize: '26',
              fontWeight: 'bold',
              textStyle: {
                fontFamily: 'BoldCondensed',
              },
            },
            splitLine: {
              // 网格线
              show: false,
              lineStyle: {
                color: '#6d7e9f',
                width: 1,
                type: 'dotted',
              },
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLine: {
              //轴线
              show: false,
            },
          },
          {
            interval: bnData[0],
            gridIndex: 2,
            type: 'value',
            show: true,
            axisLabel: {
              color: '#7e8daa',
              fontSize: '12',
              fontWeight: 'bold',
              textStyle: {
                fontFamily: 'BoldCondensed',
              },
            },
            axisLine: {
              show: true,
              color: '#6d7e9f',
            },
            splitLine: {
              // 网格线
              show: false,
              lineStyle: {
                color: '#6d7e9f',
                width: 1,
                type: 'dotted',
              },
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              show: false,
              fontSize: '14',
            },
            align: 'center',
            type: 'category',
            axisTick: {
              //y轴刻度线
              show: false,
            },
            data: ['50'],
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
          },
          {
            axisLabel: {
              color: '#7e8daa',
              fontSize: '14',
              fontWeight: 'bold',
              textStyle: {
                fontFamily: 'BoldCondensed',
              },
            },
            gridIndex: 1,
            position: 'center',
            axisLine: {
              show: false,
            },
            type: 'category',
            inverse: false,
            axisTick: {
              //y轴刻度线
              show: false,
            },
            data: ['  案件同期对比  '], //使用空格使文字居中
          },
          {
            gridIndex: 2,
            position: 'left',
            axisLabel: {
              show: false,
              fontSize: '14',
            },
            type: 'category',
            inverse: false,
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLine: {
              //轴线
              show: true,
              lineStyle: {
                color: '#6d7e9f',
              },
            },
            data: ['50'],
          },
        ],
        series: [
          {
            type: 'bar',
            barWidth: 15,
            name: '上年度同期案件数',
            itemStyle: {
              color: '#4f9efd',
            },
            data: qnData,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#61fcf4']
                  return colorList[params.dataIndex]
                },
              },
            },
          },
          {
            type: 'bar',
            barWidth: 15,
            xAxisIndex: 2,
            yAxisIndex: 2,
            name: '本年度案件数',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#417ce0']
                  return colorList[params.dataIndex]
                },
              },
              //   color: '#fc5a5a',
            },
            data: bnData,
            // colors: ['#417cdf'],
          },
        ],
      }
      this.getAdminPenalty()
    },
    /**
     * 获取当年度行政处罚情况
     */
    async getAdminPenalty() {
      let params = {
        placeCode: 'DZH-CF',
        placeAreaCode: 'DZH-CF',
        param: {
          item_position: '当年度行政处罚-折线图',
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
      //   当年度行政处罚情况
      const aysAllData = data.filter(
        (elem) =>
          elem.item_position == '当年度行政处罚-折线图' &&
          elem.itemcode == '案源数',
      )
      //   当年度行政处罚情况
      const cfsAllData = data.filter(
        (elem) =>
          elem.item_position == '当年度行政处罚-折线图' &&
          elem.itemcode == '处罚数',
      )
      const lasAllData = data.filter(
        (elem) =>
          elem.item_position == '当年度行政处罚-折线图' &&
          elem.itemcode == '立案数',
      )
      const linexAxis = []
      const aysData = []
      const lasData = []
      const cfsData = []
      aysAllData.forEach((elem, index) => {
        linexAxis.push(elem.dim6)
        aysData.push(elem.value)
        lasData.push(lasAllData[index].value)
        cfsData.push(cfsAllData[index].value)
      })
      this.lineOption = {
        // title: {
        //   text: '当年度行政处罚情况',
        // },
        tooltip: {
          trigger: 'axis',
        },
        color: ['#339299', '#d8b37f', 'rgb(91, 133, 221)'],
        grid: {
          //   top: '0%',
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: linexAxis,
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
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#6d7e9f',
            },
          },
        },
        legend: {
          show: true,
          //   itemStyle: {
          //     color: '#339299',
          //   },
          //   data: [
          //     { name: '立案数', itemStyle: { color: '#339299' } },
          //     { name: '处罚数', itemStyle: { color: '#d8b37f' } },
          //   ],
          textStyle: {
            fontSize: 18,
            color: '#6d7e9f',
          },
        },
        yAxis: {
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
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#6d7e9f',
            },
          },
        },
        series: [
          {
            name: '案源数',
            type: 'line',
            stack: 'Total',
            data: aysData,
            hoverAnimation: false,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            smooth: true,
            label: {
              show: false,
              color: '#fff',
              formatter: function () {
                return '案源数'
              },
            },
          },
          {
            name: '立案数',
            type: 'line',
            stack: 'Total',
            data: lasData,
            hoverAnimation: false,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            smooth: true,
            label: {
              show: false,
              color: '#fff',
              formatter: function () {
                return '立案数'
              },
            },
          },
          {
            name: '处罚数',
            type: 'line',
            stack: 'Total',
            data: cfsData,
            hoverAnimation: false,
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            smooth: true,
            label: {
              show: false,
              color: '#fff',
              formatter: function () {
                return '处罚数'
              },
            },
          },
        ],
      }
    },
    /**
     * 求 百分率
     * @param {Number|String} molecule:分子
     * @param {Number|String} denominator:分母
     */
    getPercentage(molecule, denominator) {
      const data = molecule / denominator
      if (isNaN(data) || data == -Infinity || data == Infinity) {
        return 0
      } else {
        return (data * 100).toFixed(2)
      }
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
.punish-right {
  width: 730px;
  .matters-covered,
  .department-distribution,
  .regional-distribution,
  .trend-analysis {
    width: 730px;
    height: 311px;
    margin-bottom: 10px;
    background: url('../../../assets/images/integrates/section_bg.png')
      no-repeat !important;
    background-size: 100% 100% !important;
  }
  .matters-container,
  .department-container,
  .regional-container,
  .trend-container {
    height: 240px;
    margin: 0 10px;
  }
  .regional-container,
  .trend-container,
  .matters-container {
    background: rgba(0, 57, 138, 0.5);
    border: 1px solid #2c5fbc;
    border-radius: 5px;
  }
  .matters-container {
    display: flex;
    .matters-left {
      flex: 4;
      .matters-left-item {
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 50px;
          height: 50px;
          flex: 1;
        }
        .icon1 {
          background: url('../../../assets/images/innovation/事项覆盖率.svg')
            no-repeat;
          background-size: 100% 100%;
        }
        .icon2 {
          background: url('../../../assets/images/innovation/案件数.svg')
            no-repeat;
          background-size: 100% 100%;
        }
        .desc-container {
          flex: 2;
          color: #fff;
          font-size: 24px;
          .desc-title {
            margin-bottom: 10px;
          }
          .desc-num {
          }
        }
      }
    }
    .matters-right {
      color: #fff;
      font-size: 26px;
      flex: 5;
      padding: 0 6px;
      .head {
        height: 50px;
        display: flex;
        align-items: center;
        .back {
          display: inline-block;
          height: 50px;
          width: 50px;
          background: url('../../../assets/images/innovation/trophy.png')
            no-repeat;
          background-size: 100% 100%;
        }
      }
      /deep/.dv-scroll-board .header {
        background-color: #002766 !important;
        border: 1px solid rgba(64, 90, 124, 0.47);
      }
    }
  }
  .department-container {
    display: flex;
    justify-content: space-around;
    .department-item1 {
      background: rgba(0, 57, 138, 0.5);
      border: 1px solid #2c5fbc;
      border-radius: 5px;
      flex: 4;
      display: flex;
      flex-direction: column;
      color: #fff;
      .desc-item {
        flex: 1;
        padding: 10px 10px 10px 20px;
        box-sizing: border-box;
        .desc {
          font-size: 20px;
        }
      }
    }
    .department-item2 {
      margin-left: 10px;
      background: rgba(0, 57, 138, 0.5);
      border: 1px solid #2c5fbc;
      border-radius: 5px;
      flex: 4;
      color: #fff;
      .title {
        display: flex;
        // height: 30px;
        // line-height: 30px;
        // text-align: center;
        height: 50px;
        align-items: center;
        justify-content: center;
        font-size: 26px;
      }
      .chart-container {
        height: 200px;
      }
    }
    .department-item3 {
      margin-left: 10px;
      background: rgba(0, 57, 138, 0.5);
      border: 1px solid #2c5fbc;
      border-radius: 5px;
      flex: 5;
      color: #fff;
      padding: 0 6px;
      .head {
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 26px;
        .back {
          width: 50px;
          height: 50px;
          background: url('../../../assets/images/innovation/trophy.png')
            no-repeat;
          background-size: 100% 100%;
        }
      }
      .chart-container {
        /deep/.dv-scroll-board .header {
          background-color: #002766 !important;
          border: 1px solid rgba(64, 90, 124, 0.47);
        }
      }
    }
  }
  .trend-container {
    // height: 180px;
    display: flex;
    .trend-left {
      height: 200px;
      flex: 1;
      color: #fff;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        font-size: 23px;
        // text-align: center;
        // line-height: 30px;
        // height: 30px;
      }
    }
    .trend-right {
      flex: 1;
      color: #fff;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        font-size: 23px;
      }
    }
  }
}
</style>
