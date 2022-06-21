<!--
    图表
-->
<template>
    <div class="components-echarts">
        <div class="echarts-content" ref="echartsRef"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: '',
    data() {
        return {
            /** 图表实例 */
            myChart: null,
        }
    },
    props: {
        isHasGradients: {
            type: Boolean,
            default: false,
        },
        // TODO: 渐变色配置项：
        // 例如：图表展示的为一个折线图和一个柱状图, ['line','bar'] 折线图没有渐变，柱状图有渐变，
        // 如下对象的 key 值 为渐变目标的图表类型标识，在图表type数组中的下标，
        // 因此该案例的渐变配置对象中只有一个key值为 1 的属性，属性值即为渐变目标的配置信息，
        // 属性一： positions ———— 为一个有且只有四个元素(右、下、左、上)的数组，且元素值在0-1之间
        // 属性二：colors ———— 渐变颜色配置项，offset值在0-1之间，color为渐变颜色
        // 示例：gradientsOption: {
        //     1: {
        //         positions: [0, 0, 0, 1],
        //         colors: [
        //             { offset: 0, color: '#30D8A6' },
        //             { offset: 1, color: '#0797F3' },
        //         ],
        //     },
        // }
        gradientsOption: {
            type: Object,
            default() {
                return {}
            },
        },
        /** 图表配置项 */
        option: {
            type: Object,
            default() {
                return {}
            },
            required: true,
        },
    },
    computed: {},
    components: {},
    watch: {
        option: {
            handler(newVal, oldVal) {
                console.log('WATCH_CHART_OPTION :>> ', newVal, oldVal)
                this.init()
            },
            deep: true,
        },
    },
    created() {},
    mounted() {
        this.init()
    },
    methods: {
        init() {
            if (!this.myChart) {
                const chartEl = this.$refs.echartsRef
                this.myChart = echarts.init(chartEl)
            }
            this.handleDrawChart()
        },
        /**
         * 画图
         * @param {*} options 图表配置项，默认不传
         */
        handleDrawChart(options) {
            // 1、清除画布
            this.myChart.clear()
            // 2、设置 option
            let opt = options || this.option
            console.log('chart-options :>> ', opt)
            if (this.isHasGradients) {
                opt = this.setGradientsOption(opt, this.gradientsOption)
            }
            // 3、画图
            this.myChart.setOption(opt)
        },
        /**
         * 设置渐变配置
         * @param {*} option
         * @param {*} gradientsOption
         * */
        setGradientsOption(option, gradientsOption) {
            console.log('option :>> ', option)
            console.log('gradientsOption :>> ', gradientsOption)
            const gradientsKeys = Object.keys(gradientsOption)
            console.log('gradientsKeys :>> ', gradientsKeys)
            const resetOption = { ...option }
            resetOption.series = resetOption.series.map((val, index) => {
                if (gradientsKeys.includes(index + '')) {
                    const temp = { ...val, itemStyle: { color: '' } }
                    temp.itemStyle.color = new echarts.graphic.LinearGradient(
                        ...this.gradientsOption[index].positions,
                        this.gradientsOption[index].colors,
                    )
                    return temp
                }
                return val
            })
            return resetOption
        },
    },
}
</script>
<style lang="scss" scoped>
.components-echarts {
    width: 100%;
    height: 100%;

    .echarts-content {
        width: 100%;
        height: 100%;
    }
}
</style>
