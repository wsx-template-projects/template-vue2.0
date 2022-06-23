<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from './mixins/resize'

export default {
    // mixins: [resize],
    props: {
        className: {
            type: String,
            default: 'chart',
        },
        width: {
            type: String,
            default: '100%',
        },
        height: {
            type: String,
            default: '480px',
        },
        autoResize: {
            type: Boolean,
            default: true,
        },
        chartData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            chart: null,
        }
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                this.setOptions(val)
            },
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions(this.chartData)
        },
        setOptions({ xAxis, series } = {}) {
            this.chart.setOption({
                xAxis: {
                    data: xAxis || [],
                    boundaryGap: false,
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#979797', //字体颜色
                            fontSize: 16, //字体大小
                        },
                    },
                },
                grid: {
                    left: 10,
                    right: 20,
                    bottom: 50,
                    top: 30,
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                    padding: [5, 10],
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#979797', //字体颜色
                                fontSize: 16, //字体大小
                            },
                        },
                    },
                ],
                legend: {
                    data: ['入库', '出库'],
                    icon: 'rect',
                    itemWidth: 16, // 设置宽度
                    itemHeight: 16, // 设置高度
                    itemGap: 30, // 设置间距
                    x: 'center', //可设定图例在左、右、居中
                    y: 'bottom', //可设定图例在上、下、居中
                    padding: [0, 0, 15, 0],
                },
                series: [
                    {
                        name: '入库',
                        itemStyle: {
                            normal: {
                                color: '#0875FF',
                                lineStyle: {
                                    color: '#0875FF',
                                    width: 5,
                                },
                            },
                        },
                        smooth: true,
                        type: 'line',
                        data: series?.[0] || [],
                        animationDuration: 2800,
                        animationEasing: 'cubicInOut',
                    },
                    {
                        name: '出库',
                        smooth: true,
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#FE9D25',
                                lineStyle: {
                                    color: '#FE9D25',
                                    width: 5,
                                },
                                areaStyle: {
                                    color: '#f3f8ff',
                                },
                            },
                        },
                        data: series?.[1] || [],
                        animationDuration: 2800,
                        animationEasing: 'quadraticOut',
                    },
                ],
            })
        },
    },
}
</script>
