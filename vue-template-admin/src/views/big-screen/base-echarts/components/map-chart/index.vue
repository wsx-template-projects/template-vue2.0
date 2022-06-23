<!--
   地图 - 组件
-->
<template>
    <div class="components-temp">
        <h1>map-chart</h1>
        <div :id="id" :style="{ width: width, height: height }"></div>
    </div>
</template>

<script>
export default {
    name: 'ComponentsTempMapChart',
    components: {},
    props: {
        id: {
            type: String,
            default: 'chart',
        },
        width: {
            type: String,
            default: '200px',
        },
        height: {
            type: String,
            default: '200px',
        },
    },
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
