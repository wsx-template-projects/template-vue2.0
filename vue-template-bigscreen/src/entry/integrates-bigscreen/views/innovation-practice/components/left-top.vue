<template>
  <div class="left-top">
    <div class="title">应用概览</div>
    <div class="left-top-box">
      <div>
        <div class="one-box">
          <p>应用数</p>
          <p>—</p>
        </div>
        <div class="one-box-text">应用使用总量</div>
        <div style="margin-top: 10px" class="one-box-text">—</div>
      </div>
      <div class="two-box">
        <div class="chart">
          <BaseEcharts :options="ringOptions" />
        </div>
        <div class="one-box-text">应用使用人数</div>
        <div style="margin-top: 10px" class="one-box-text">—</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftTop',
  components: {},
  props: {},
  data() {
    return {
      ringOptions: {},
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      var pass_rate = 70,
        average = 60,
        total = 100
      this.ringOptions = {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#34FFF5',
            },
            {
              offset: 0.5,
              color: '#2DC0EE',
            },
            {
              offset: 1,
              color: '#2782E7',
            },
          ],
          global: false, // 缺省为 false
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '55%'],
            hoverAnimation: false,
            //环的位置
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              normal: {
                show: true,
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            data: [
              {
                value: 100,
                itemStyle: {},
              },
              {
                value: total - 100,
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            ],
          },
          {
            type: 'pie',
            radius: ['40%', '45%'],
            hoverAnimation: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              normal: {
                show: true,
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            data: [
              {
                value: 70,
                itemStyle: {
                  normal: {},
                },
              },
              {
                value: total - 70,
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            ],
          },
          {
            type: 'pie',
            radius: ['30%', '35%'],
            hoverAnimation: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              normal: {
                show: true,
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            data: [
              {
                value: 55,
                itemStyle: {
                  normal: {},
                },
              },
              {
                value: total - 55,
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            ],
          },
          {
            type: 'pie',
            radius: ['20%', '25%'],
            hoverAnimation: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            data: [
              {
                value: 50,
                itemStyle: {
                  normal: {},
                },
              },
              {
                value: total - 50,
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            ],
          },
          {
            type: 'pie',
            radius: ['10%', '15%'],
            hoverAnimation: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            data: [
              {
                value: 30,
                itemStyle: {
                  normal: {
                    color: 'rgb(50,197,233)',
                  },
                },
              },
              {
                value: total - 30,
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            ],
          },
        ],
      }
    },
  },
}
</script>

<style lang="less" scoped>
.left-top {
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
  .left-top-box {
    width: 660px;
    height: 420px;
    background: url('../../../assets/images/innovation/left-top.png');
    background-repeat: no-repeat;
    background-size: 660px 420px;
    margin-top: 10px;
    display: flex;
    .one-box {
      width: 324px;
      height: 324px;
      line-height: 300px;
      text-align: center;
      background: url('../../../assets/images/innovation/guanghuan1.png');
      background-repeat: no-repeat;
      background-size: 324px auto;
      font-size: 24px;
      color: #f3ecec;
      p {
        height: 33px;
      }
    }
    .one-box-text {
      width: 324px;
      text-align: center;
      font-size: 24px;
      color: #f3ecec;
    }
    .chart {
      width: 324px;
      height: 324px;
    }
  }
}
</style>
