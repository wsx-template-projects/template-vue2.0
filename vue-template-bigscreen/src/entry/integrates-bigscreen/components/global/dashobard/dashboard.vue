<template>
  <div class="container" v-if="dataSource.label">
    <MyEcahrts5
      key="gauge"
      class="dashboard"
      :options="optionsParam"
      ref="echartsRef"
      @getEchartsIns="getEchartsIns"
    />
  </div>
</template>

<script>
let timer
export default {
  name: 'DashboardContainer',
  props: {
    dataSource: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  data() {
    return {
      echartsIns: null,
      optionsParam: {
        tooltip: {
          formatter: (params) => {
            let str = `<div>
                <div>占比: ${params.value}%</div>
                <div>累计: ${this.dataSource.total}</div>
            </div>`
            return str
          },
          backgroundColor: 'rgba(11, 47, 97, 0.8)',
          borderColor: 'transparent',
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            type: 'gauge',
            splitNumber: 10,
            center: ['50%', '43%'],
            itemStyle: {
              color: '#71F7FF',
            },
            // 进度
            progress: {
              show: true,
              roundCap: false,
              width: 10,
            },
            // 进度底色
            axisLine: {
              roundCap: false,
              lineStyle: {
                width: 10,
                // color: '#5B8ED5',
                color: [[1, '#4790DB']],
              },
            },
            // 指针
            pointer: {
              icon: 'image://' + require('./pointer.png'),
              length: '75%',
              width: 7,
              offsetCenter: [0, '5%'],
            },
            // 小刻度
            axisTick: {
              splitNumber: 5,
              distance: 0,
              length: 6,
              lineStyle: {
                width: 1,
                color: '#7AE1F8',
              },
            },
            // 大刻度
            splitLine: {
              length: 12,
              lineStyle: {
                width: 3,
                color: 'transparent',
              },
            },
            axisLabel: {
              distance: 0,
              color: '#7AE1F8',
              fontSize: 12,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: this.value,
              },
            ],
          },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    timer = setInterval(() => {
      this.echartsIns.clear()
      this.echartsIns.setOption(this.optionsParam)
    }, 10000)
  },
  updated() {
    clearInterval(timer)
    this.echartsIns.clear()
    this.echartsIns.setOption(this.optionsParam)
    timer = setInterval(() => {
      this.echartsIns.clear()
      this.echartsIns.setOption(this.optionsParam)
    }, 10000)
  },
  destroyed() {
    clearInterval(timer)
  },
  methods: {
    getEchartsIns(ins) {
      this.echartsIns = ins
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 190px;
  height: 194px;
  //   border-image: linear-gradient(134deg, #00deff, #006dca) 10 10;
  //   background: linear-gradient(114deg, #1cbfe2 0%, #133450 100%);
  //   box-shadow: 0px 2px 4px 0px rgba(6, 40, 64, 0.7);
  //   border-radius: 4px;

  //   background-color: #005ecb;
}
</style>
