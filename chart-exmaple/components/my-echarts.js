let template = `
<div
    class="echarts-container"
    ref="echartsContainer"
    style="width: 100%; height: 100%"
></div>
`

Vue.component('my-echarts', {
    template,
    data() {
        return {
            myChart: null,
        }
    },
    props: {
        options: {
            type: Object,
            default() {
                return {}
            },
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
            console.log('this.options :>> ', this.options)
            this.myChart.setOption(this.options)
        },
    },
})
