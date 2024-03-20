<template>
  <!-- 多外圈仪表盘 -->
  <div
    class="gauge-echarts"
    ref="GaugeEcharts"
  ></div>
</template>

<script>
import * as echarts from 'echarts5'
export default {
  name: 'GaugeEcharts',
  components: {},
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    option(e) {
      this.serEcharts(e)
    },
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 绘制echarts
     */
    serEcharts(option) {
      echarts.use([GaugeChart, CanvasRenderer])
      const chartDom = this.$refs.GaugeEcharts
      const myChart = echarts.init(chartDom)
      option && myChart.setOption(option)
    },
  },
}
</script>

<style lang="less" scoped></style>
