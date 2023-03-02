function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(arr) {
    return Array.isArray(arr)
}

// 递归合并对象
function merge(target, ...arg) {
    return arg.reduce((acc, cur) => {
        return Object.keys(cur).reduce((subAcc, key) => {
            const srcVal = cur[key]
            if (isObject(srcVal)) {
                subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
            } else if (isArray(srcVal)) {
                // series: []，下层数组直接赋值
                subAcc[key] = srcVal.map((item, idx) => {
                    if (isObject(item)) {
                        const curAccVal = subAcc[key] ? subAcc[key] : []
                        return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
                    }
                    return item
                })
            } else {
                subAcc[key] = srcVal
            }
            return subAcc
        }, acc)
    }, target)
}

let gaugeTemplate = `
<div class="chart-wrap" style="width:100%;height:100%;">
    <div
        class="echarts-container"
        ref="echartsContainer"
        style="width: 100%; height: 100%"
    ></div>
</div>
`

/** 角度配置 */
const ANGLE_CONFIG = {
    startAngle: 240, // 起始
    endAngle: -60, // 结束
}

/** 刻度条颜色 */
const AXISLINE_COLORS = [
    [0.4, 'red'],
    [0.8, 'yellow'],
    [1, 'green'],
]

Vue.component('gauge-chart', {
    template: gaugeTemplate,
    data() {
        return {
            myChart: null,
        }
    },
    props: {
        number: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            default: 100,
        },
        /** 是否自定义颜色 */
        hasCustomColor: {
            type: Boolean,
            default: false,
        },
        /** 自定义颜色集合 */
        customColor: {
            type: Array,
            default() {
                return [...AXISLINE_COLORS]
            },
        },
        /** 角度配置 */
        angleConfig: {
            type: Object,
            default() {
                return { ...ANGLE_CONFIG }
            },
        },
        /** options - 配置项 */
        options: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {
        echartOptions() {
            const value = this.number || 0
            const { startAngle, endAngle } = this.angleConfig
            const asixLineColors = !this.hasCustomColor
                ? '#fff'
                : this.customColor
            console.log('asixLineColors :>> ', asixLineColors)

            const baseOption = {
                backgroundColor: '#fff',
                grid: {
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 10,
                },
                title: {
                    text: '分',
                    top: '48%',
                    left: '45%',
                    // padding: [0, 0],
                    padding: [60, 0],
                    textStyle: {
                        color: 'rgb(37, 139, 207)',
                        fontSize: 18,
                        align: 'center',
                    },
                },
                series: [
                    {
                        type: 'gauge',
                        startAngle,
                        endAngle,
                        // radius: 130,
                        radius: '90%', // 设置仪表图大小，number/string
                        center: ['50%', '50%'], //边距
                        min: 0, // 最小值
                        max: this.total, // 最大值
                        // 当前进度
                        progress: {
                            show: false,
                            width: 10,
                        },
                        // 仪表盘轴线相关配置。
                        axisLine: {
                            // show: false,
                            show: true,
                            lineStyle: {
                                width: 10,
                                color: asixLineColors,
                            },
                        },
                        axisTick: {
                            // show: false,
                            distance: -10,
                            splitNumber: 10, // 分隔间隙
                            length: 10, // 分割线的长度
                            lineStyle: {
                                width: 2,
                                color: '#fff',
                                // color: 'red',
                                // color: 'auto', // 渐变色必须设置color为auto
                                cap: 'round',
                                // color: asixLineColors,
                            },
                        },
                        // 分隔线样式
                        splitLine: {
                            // show: false,
                            show: true,
                            distance: 0, // 距离仪表盘的距离
                            length: 12, // 刻度长度
                            lineStyle: {
                                width: 2, // 刻度宽度
                                color: '#ccc', // 刻度颜色
                                // color: '#fff',
                                // color: 'auto',
                            },
                        },
                        // 仪表文本配置
                        axisLabel: {
                            // show: false,
                            distance: 20, // 文本和仪表刻度的距离
                            color: 'red',
                            // color: 'rgba(255,255,255,0.5)',
                            fontSize: 14,
                        },
                        // 仪表盘指针
                        pointer: {
                            // show: false,
                            show: true,
                            // icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '76%', // 指针长度
                            width: 8, // 指针大小
                            offsetCenter: [0, '0%'], // 指针位置
                            itemStyle: {
                                color: 'red',
                            },
                        },
                        /** 指针圆点 */
                        anchor: {
                            show: false,
                            // show: true,
                            showAbove: true,
                            size: 25,
                            itemStyle: {
                                borderWidth: 10,
                            },
                        },
                        /** 显示在仪表盘内部的文字 */
                        title: {
                            show: true,
                            offsetCenter: [0, '-30%'], // x, y偏移量 - 单位px
                            textStyle: {
                                color: '#0dcbfc',
                                // color: '#fff',
                                fontSize: '18px',
                            },
                        },
                        detail: {
                            show: true,
                            valueAnimation: true,
                            fontSize: 48,
                            offsetCenter: [0, '10%'],
                            color: '#fff',
                        },
                        data: [
                            {
                                value: value,
                                name: '公共信用评价',
                                color: '#fff',
                            },
                        ],
                    },
                ],
            }
            const options = merge({}, baseOption, this.options)
            console.log('options :>> ', options)
            return options
        },
    },
    watch: {
        options: {
            handler(val) {
                console.log('draw-chart', val)
                this.drawChart()
            },
        },
    },
    created() {},
    mounted() {
        this.init()
        this.drawChart()
    },
    methods: {
        init() {
            console.log('echarts :>> ', echarts)
            const dom = this.$refs.echartsContainer
            this.myChart = echarts.init(dom)
        },
        drawChart() {
            console.log('this.options :>> ', this.echartOptions)
            this.myChart.setOption(this.echartOptions)
        },
    },
})
