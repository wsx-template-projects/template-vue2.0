<template>
  <div class="left-bottom">
    <div class="title">应用热度</div>
    <div class="left-bottom-box">
      <div class="top5-box">
        <div class="top5-title">应用量top5</div>
        <div v-for="item in top5" :key="item.id" class="top5-progress">
          <div class="index">{{ item.id }}</div>
          <div class="progress">
            <el-progress
              :text-inside="false"
              :stroke-width="25"
              :percentage="item.percentage"
            ></el-progress>
            <span class="progress_label">{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="chart">
        <div class="chart-title">应用量top5</div>

        <BaseEcharts :options="lineOption" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseEcharts from '../../../components/global/base-echarts'

export default {
  name: 'LeftBottom',
  components: { BaseEcharts },
  props: {},
  data() {
    return {
      top5: [
        {
          id: 1,
          label: '智数卫监',
          percentage: 100,
        },
        {
          id: 2,
          label: '摊省心',
          percentage: 80,
        },
        {
          id: 3,
          label: '证据共享',
          percentage: 60,
        },
        {
          id: 4,
          label: '浙运安',
          percentage: 50,
        },
        {
          id: 5,
          label: '安薪在线',
          percentage: 30,
        },
      ],
      lineOption: {},
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initDoubleLineEchart()
  },
  methods: {
    initDoubleLineEchart() {
      this.lineOption = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            const name = params[0].name.replace('月', '')
            const name1 = params[1].name.replace('月', '')
            const tYear = new Date().getFullYear()
            const value = params[0].value
            const value1 = params[1].value
            let square = `<span style="display:inline-block;margin-right:5px;width:10px;height:10px;left:5px;background-color:`
            let data0 = `${square}rgb(10, 115, 255)"></span> ${tYear}/${name}/01  00:00:00  ${value}`
            let data1 = `${square}rgba(0, 186, 255, 1)"></span> ${tYear}/${name1}/01  00:00:00  ${value1}`
            return `${data0}<br />${data1}`
          },
        },
        grid: {
          right: '0',
        },
        color: ['rgb(10, 115, 255)', '#00baff'],
        xAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          data: ['01月', '02月', '03月', '04月', '05月', '06月'],
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16',
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'left',
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16',
            },
            margin: -14,
          },
        },
        series: [
          {
            data: [3100, 3200, 2300, 930, 780, 2600],
            type: 'line',
            symbolSize: 4,
            lineStyle: {
              color: 'rgb(10, 115, 255)', //改变折线颜色
            },
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(10, 115, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(10, 115, 255)',
                },
              ]),
            },
          },
          {
            data: [500, 590, 490, 200, 200, 500],
            type: 'line',
            symbolSize: 4,
            lineStyle: {
              color: '#00baff', //改变折线颜色
            },
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#00baff',
                },
                {
                  offset: 1,
                  color: '#00baff',
                },
              ]),
            },
          },
        ],
      }
    },
  },
}
</script>

<style lang="less" scoped>
.left-bottom {
  margin-top: 20px;
  .title {
    line-height: 60px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    font-weight: 600;
    width: 660px;
    height: 60px;
    background: url('../../../assets/images/innovation/smallTitle.png')
      no-repeat;
    background-size: 100% auto;
  }
  .left-bottom-box {
    box-sizing: border-box;
    margin-top: 10px;
    width: 660px;
    height: 656px;
    background: url('../../../assets/images/innovation/left-top.png') no-repeat;
    background-size: 660px 656px;
    .top5-box {
      box-sizing: border-box;
      width: 660px;
      padding: 40px 0 40px 40px;
      overflow: hidden;
      .top5-title {
        font-size: 32px;
        color: #f3ecec;
      }
      .top5-progress {
        display: flex;
        margin-top: 20px;
        .index {
          width: 25px;
          height: 25px;
          background-color: #0a73ff;
          text-align: center;
          line-height: 25px;
          color: #fff;
          margin-right: 20px;
        }
        ::v-deep .progress {
          flex: 1;
          height: 25px;
          position: relative;
          .el-progress-bar__inner {
            background-image: linear-gradient(90deg, #0a73ff 50%, #79daff 100%);
            border-radius: 0;
          }
          .el-progress-bar__outer {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 0;
          }
          .progress_label {
            position: absolute;
            top: 2px;
            left: 20px;
            color: #fff;
            font-size: 17px;
          }
          .el-progress__text {
            position: absolute;
            top: 4px;
            color: #fff;
            font-size: 18px !important;
            right: 70px;
          }
        }
      }
    }
    .chart {
      width: 660px;
      height: 306px;
      .chart-title {
        font-size: 32px;
        color: #f3ecec;
        padding-left: 40px;
        margin-bottom: -20px;
      }
    }
  }
}
</style>
