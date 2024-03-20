<!--
    图表 - echarts
-->
<template>
    <div class="my-echarts">
        <div
            v-loading="loading"
            class="echarts-content"
            ref="echartsRef"
            :style="{ width, height }"
        ></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import echarts from 'echarts'

@Component({
    name: 'MyEcharts',
    components: {},
})
export default class MyEcharts extends Vue {
    /** 加载中... */
    @Prop({ default: () => false }) loading!: boolean
    /** 图表宽度，默认为 100% */
    @Prop({ default: () => '100%' }) width!: string
    /** 图表高度，默认为 400px */
    @Prop({ default: () => '400px' }) height!: string
    /** 图表配置项 */
    @Prop({ required: true, default: () => ({}) }) option!: any
    /** 图表实例 */
    public myChart: any = null
    // @Watch('option',{immediate: true,deep: true})
    @Watch('option', { deep: true })
    optionHandler(newVal: any, oldVal: any) {
        console.log('newVal :>> ', newVal)
        console.log('oldVal :>> ', oldVal)
        this.drawChart()
    }
    created() {}
    mounted() {
        this.init()
        window.addEventListener('resize', this.resizeEcharts)
    }
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeEcharts)
    }
    /** 初始化 */
    public init() {
        if (!this.myChart) {
            const chartEl = this.$refs.echartsRef
            this.myChart = echarts.init(chartEl)
        }
        this.drawChart()
    }
    /**
     * 画图
     * @param {*} options 图表配置项，默认不传
     */
    public drawChart(options?: any) {
        // 1、清除画布
        this.myChart.clear()
        // 2、设置 option
        let opt: any = options || this.option
        console.log('chart-options :>> ', opt)
        // 3、画图
        this.myChart.setOption(opt)
        this.resizeEcharts()
    }
    public resizeEcharts() {
        // console.log('this.myChart :>> ', this.myChart)
        this.myChart && this.myChart.resize()
    }
}
</script>

<style lang="less" scoped></style>
