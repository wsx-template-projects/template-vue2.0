<template>
  <div class="my-echarts" ref="MyEcharts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'MyEcharts',
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
      const chartDom = this.$refs.MyEcharts
      const myChart = echarts.init(chartDom)
      option && myChart.setOption(option)
    },
  },
}
</script>

<style lang="less" scoped>
</style>