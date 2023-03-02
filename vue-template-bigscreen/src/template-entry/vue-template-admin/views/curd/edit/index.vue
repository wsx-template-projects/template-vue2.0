<template>
    <div class="sg-page page-curd-edit">CurdEdit {{ $route.query }}</div>
</template>

<script>
export default {
    name: 'CurdEdit',
    components: {},
    props: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    async created() {
        await this.$http.get('/mock/list')
    },
    mounted() {},
    methods: {},
}
</script>

<style lang="less" scoped></style>
