<template>
  <div
    class="echarts-container"
    ref="echartsContainer"
  ></div>
</template>

<script>
import * as echarts from 'echarts5'
export default {
  name: 'MyEcahrts5',
  components: {},
  props: {
    // echarts 的配置项
    options: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data() {
    return {
      myChart: null,
    }
  },
  computed: {},
  watch: {
    options() {
      this.drawChart()
    },
  },
  created() {},
  mounted() {
    this.init()
    this.drawChart()
    this.resizeEcharts()
  },
  methods: {
    init() {
      const dom = this.$refs.echartsContainer
      this.myChart = echarts.init(dom)
    },
    drawChart() {
      this.myChart.setOption(this.options, true)

      this.$listeners?.getEchartsIns &&
        this.$listeners.getEchartsIns(this.myChart)
    },
    // 页面尺寸改变重新渲染echarts
    resizeEcharts() {
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
  },
}
</script>

<style style="less">
.echarts-container {
  height: inherit;
  /* background: #000; */
}
.test {
  color: red;
}
</style>
