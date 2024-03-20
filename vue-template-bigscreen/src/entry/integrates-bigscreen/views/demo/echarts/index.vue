<template>
    <div class="g-page demo-echarts">
        <div class="bar-chart-view">
            <el-button type="primary" @click="onChangeBar"
                >change-bar-chart</el-button
            >
            <my-echarts
                ref="barEchartsRef"
                height="360px"
                :loading="barLoading"
                :option="finalBarOptions"
            />
        </div>
        <div class="line-chart-view">
            <el-button type="primary" @click="onChangeLine"
                >change-line-chart</el-button
            >
            <my-echarts
                ref="lineEchartsRef"
                height="360px"
                :loading="lineLoading"
                :option="finalLineOptions"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { useChart } from '@/entry/integrates-bigscreen/hooks/echarts/index'
@Component({
    components: {},
})
export default class DemoEcharts extends Vue {
    public barLoading: boolean = false
    public barOptions: any = {
        legend: ['A类', 'B类', 'C类', 'D类'],
        xAxis: [],
        series: [],
    }
    get finalBarOptions() {
        const chartTypes = ['bar', 'bar', 'bar', 'bar']
        return useChart(chartTypes, this.barOptions, {
            title: { text: '这是柱状图', left: 'center' },
            xAxis: {
                axisLabel: { interval: 0, rotate: 20 },
            },
        })
    }
    public lineLoading: boolean = false
    public lineOptions: any = {
        legend: ['A类', 'B类', 'C类', 'D类'],
        xAxis: [],
        series: [],
    }
    get finalLineOptions() {
        const chartTypes = ['line', 'line', 'line', 'line']
        return useChart(chartTypes, this.lineOptions, {
            title: { text: '这是折线图', left: 'center' },
            xAxis: {
                axisLabel: { interval: 0, rotate: 20 },
            },
        })
    }
    created() {
        this.getData_Bar()
        this.getData_Line()
    }
    mounted() {}
    onChangeBar() {
        // this.$refs.barEchartsRef.init()
        this.getData_Bar()
    }
    onChangeLine() {
        // this.$refs.lineEchartsRef.init()
        this.getData_Line()
    }
    async getData_Bar() {
        this.barLoading = true
        const testData: any = {
            xAxis: [],
            yAxis: [],
            series: [],
        }
        testData.xAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const res: any = await this.syncTestData(testData, 4)
        console.log('bar-res :>> ', res)
        this.barLoading = false
        const { xAxis, series }: any = res.data
        this.barOptions.xAxis = xAxis
        this.barOptions.series = series
    }
    async getData_Line() {
        this.lineLoading = true
        const testData: any = {
            xAxis: [],
            yAxis: [],
            series: [],
        }
        testData.xAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const res: any = await this.syncTestData(testData, 4)
        console.log('bar-res :>> ', res)
        this.lineLoading = false
        const { xAxis, series }: any = res.data
        this.lineOptions.xAxis = xAxis
        this.lineOptions.series = series
    }
    syncTestData(testData: any, outerLen: number = 2, max: number = 3000) {
        const res: any = { code: 200, data: {}, message: '请求成功' }
        return new Promise((resolve, reject) => {
            const { xAxis, yAxis, series }: any = testData
            const innerLen: number = xAxis?.length ?? yAxis?.length
            console.log('innerLen :>> ', innerLen)
            res.data.xAxis = xAxis
            res.data.yAxis = yAxis
            res.data.series = series
            if (innerLen) {
                for (let i = 0; i < outerLen; i++) {
                    const temp: any = []
                    for (let j = 0; j < innerLen; j++) {
                        temp.push(Math.floor(Math.random() * max))
                    }
                    res.data.series.push(temp)
                }
            }
            setTimeout(() => {
                resolve(res)
            }, 1000)
        })
    }
}
</script>

<style lang="less" scoped></style>
