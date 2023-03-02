<template>
    <div class="sg-page page-demo-api">
        DemoApi

        <el-button
            v-stat="{ name: '获取nodes' }"
            :params="JSON.stringify({ value: value })"
            >获取nodes</el-button
        >
    </div>
</template>

<script>
//import * as LogApi from '@/services/vue-template-homesite/sys/log'

export default {
    name: 'DemoApi',
    components: {},
    props: {},
    data() {
        return {
            value: '123',
        }
    },
    computed: {},
    watch: {},
    created() {},

    mounted() {
        // LogApi.page(
        //     { page: 1 },
        //     { exShowLoading: true, exApiHooks: ['/demo/list'] },
        // ).then(console.log)
        // LogApi.list({ name: 1 }).then(console.log)
    },
    methods: {},
}
</script>

<style lang="less" scoped></style>
