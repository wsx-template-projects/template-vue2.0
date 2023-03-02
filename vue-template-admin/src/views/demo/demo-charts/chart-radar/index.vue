<template>
    <div class="rightOneCharts" ref="rightOneCharts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'RightOneCharts',
    data() {
        return {
            datas: [
                { value: [88, 95, 74, 76, 85, 92] },
                { value: [98, 65, 64, 56, 65, 32] },
                { value: [58, 55, 54, 46, 85, 52] },
                { value: [78, 75, 84, 76, 75, 72] },
            ],
            index: 0,
            options: {
                color: ['#FFCE48'],

                // backgroundColor: "url('../assets/img/six.png')",
                // backgroundColor: {
                //     type: 'pattern',
                //     repeat: 'repeat',
                //     image: require('../assets/img/six.png'), // 赋值
                // },
                radar: [
                    {
                        indicator: [
                            { text: '成长能力', max: 100, color: 'white' },
                            { text: '盈利能力', max: 100, color: 'white' },
                            {
                                text: '惠企政策兑付指数',
                                max: 100,
                                color: 'white',
                            },
                            { text: '偿还能力', max: 100, color: 'white' },
                            { text: '监管指数', max: 100, color: 'white' },
                            { text: '行业影响力', max: 100, color: 'white' },
                        ],

                        startAngle: 60,
                        label: {
                            show: true,
                            formatter(params) {
                                return params.value
                            },
                        },

                        center: ['50%', '50%'],
                        radius: 200,
                        splitArea: {
                            areaStyle: {
                                color: [
                                    'rgba(0,0,0,0.1)',
                                    'rgba(0,0,0,0.1)',
                                    'rgba(0,0,0,0.1)',
                                    'rgba(0,0,0,0.1)',
                                ],
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowBlur: 10,
                            },
                        },
                        // 设计稿没有等边距  造成雷达图无法对接上  雷达图为等高
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#59afff',
                                type: 'dashed',
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#3D7DFF',
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: 'Budget vs spending',
                        type: 'radar',
                        symbolSize: 10,
                        symbol: 'circle',
                        data: [
                            {
                                value: [88, 95, 74, 76, 85, 92],
                                name: 'Allocated Budget',
                                itemStyle: {},
                                //在拐点处显示数值
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: (params) => {
                                            return params.value
                                        },
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        }
    },
    mounted() {
        this.initCharts()
        this.changeCharts()
    },
    methods: {
        initCharts() {
            const myCharts = echarts.init(this.$refs.rightOneCharts)
            const option = this.options
            option.series[0].data[0].value = this.datas[this.index].value
            // 绘制图表
            myCharts.clear()
            myCharts.setOption(option)
            myCharts.resize()
            window.addEventListener('resize', function () {
                myCharts.resize()
            })
        },
        changeCharts() {
            setInterval(() => {
                if (this.index >= this.datas.length) {
                    this.index = 0
                }
                this.index += 1
                this.initCharts()
            }, 2000)
        },
    },
}
</script>

<style scoped lang="less">
.rightOneCharts {
    width: 100%;
    height: 100%;
}
</style>
