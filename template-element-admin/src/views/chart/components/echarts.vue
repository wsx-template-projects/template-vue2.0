<!--

-->
<template>
    <div class="echarts">
        <div class="echarts__head fx-between-align-center">
            <p class="echarts__head-title">{{ title }}</p>
            <div class="echarts__head-content">
                <el-button
                    type="primary"
                    size="mini"
                    v-for="(item, index) in btnItems"
                    :key="index"
                    >{{ item.text }}</el-button
                >
            </div>
        </div>
        <div class="echarts__container">
          <div class="echarts__container-content" ref="barChartRef" :style="{height:height}"></div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      myChart: null
    }
  },
  props: {
    height: {
      type: String,
      default: '260px'
    },
    title: {
      type: String,
      default: ''
    },
    btnItems: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      },
      required: true
    }
  },
  computed: {},
  components: {},
  watch: {
    options: {
      handler(newVal, oldVal) {
        console.log('-watch-', newVal, oldVal)
        this.drawChart()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let chartEl = this.$refs.barChartRef
      this.myChart = echarts.init(chartEl)
      this.drawChart()
    },
    drawChart() {
      this.myChart.setOption(this.options)
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.echarts {
    width: 1150px;
    // height: 300px;
    background: #ffffff;
    border: 1px solid #e0e4e7;
    border-radius: 2px;

    &__head {
      line-height: 40px;
      padding: 0 23px 0 15px;

      &-title {
        font-size: 14px;
        font-weight: bold;
        color: #4D4D4E;
      }
    }
}
</style>
