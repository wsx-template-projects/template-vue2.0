<!--

-->
<template>
    <div class="">
        <BaseCharts ref="chartRef" :option="option" :config="config" />
    </div>
</template>

<script>
import option from './option'
import BaseCharts from '../BaseCharts.vue'
export default {
    name: '',
    components: { BaseCharts },
    data() {
        return {
            option,
        }
    },
    props: {
        config: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {},
    watch: {
        config: {
            handler(newV, oldV) {
                console.log('newV :>> ', newV)
                this.$nextTick(() => {
                    this.$refs.chartRef.drawChart()
                })
            },
            deep: true,
        },
    },
    created() {},
    mounted() {},
    methods: {},
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
