<!--
   echarts - 折线图
-->
<template>
    <div class="sg-page">
        charts-line
        <div class="">
            <el-button type="primary" @click="onClick('本周')">本周</el-button>
            <el-button type="primary" @click="onClick('近一个月')"
                >近一个月</el-button
            >
        </div>
        <line-chart :chart-data="lineData" />
    </div>
</template>

<script>
import LineChart from './components/line-charts.vue'
export default {
    name: 'ChartsLine',
    components: { LineChart },
    data() {
        return {
            lineData: {
                xAxis: [],
                series: [],
            },
        }
    },
    computed: {},
    created() {
        this.getData()
    },
    mounted() {},
    methods: {
        onClick(type) {
            this.getData(type)
        },
        getData(type = '本周') {
            this.setData(type).then((res) => {
                console.log('res :>>', res)
                const { data } = res
                this.lineData.xAxis = data.xAxis
                this.lineData.series = data.series
            })
        },
        setData(type) {
            console.log('date:', new Date().getDay())
            const res = {
                data: {
                    xAxis: [],
                    series: [],
                },
            }
            let xAxis = []
            if (type === '本周') {
                xAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            } else {
                xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            }
            const result = []
            for (let i = 0; i < 2; i++) {
                const temp = []
                for (let j = 0; j < xAxis.length; j++) {
                    const val = Math.ceil(Math.random() * 600)
                    temp.push(val)
                }
                result.push(temp)
            }
            res.data.xAxis = xAxis
            res.data.series = result
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(res)
                }, 500)
            })
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
