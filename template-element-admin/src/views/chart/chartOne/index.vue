<template>
    <div class="sg-page page-single-analysis">
        <div class="app-container app-box-bg">
            <div class="container">
                <my-chart
                    class="bar-chart-container"
                    :title="title"
                    :btnItems="btnItems"
                    :options="barChartOptions"
                ></my-chart>
            </div>
        </div>
    </div>
</template>

<script>
import myChart from '../components/echarts'
export default {
  name: 'SingleAnalysis',
  components: { myChart },
  data() {
    return {
      title: '本行用信客户分析',
      btnItems: [
        { text: '用信客户' },
        { text: '新增客户' }
      ],
      barChartData: {
        title: '',
        legends: ['本市', '临海市'],
        xAxisData: [],
        seriesData: []
      }
    }
  },
  computed: {
    baseOptions() {
      const options = {
        color: ['#31D9A4', '#0796F4'],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        }
      }
      return options
    },
    barChartOptions() {
      const { title, legends, xAxisData, seriesData } = this.barChartData
      let options = {
        title: { text: title },
        legend: {
          data: legends
        },
        xAxis: {
          data: xAxisData
        },
        yAxis: [
          {
            type: 'value',
            name: '数量',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: seriesData
      }
      console.log('-options-', { ...options, ...this.baseOptions })
      return { ...options, ...this.baseOptions }
    }
  },
  watch: {},
  created() {
    this.getChartData()
  },
  mounted() {},
  methods: {
    getChartData() {
      let res = {
        xAxis: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
        series: [
          {
            name: '本市',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 30]
          },
          {
            name: '临海市',
            type: 'bar',
            data: [10, 15, 30, 6, 18, 9, 12]
          }
        ]
      }
      setTimeout(() => {
        this.barChartData.xAxisData = res.xAxis
        this.barChartData.seriesData = res.series
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
