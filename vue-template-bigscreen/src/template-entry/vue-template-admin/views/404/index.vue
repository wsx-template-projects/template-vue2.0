<template>
    <div class="sg-page app-404-page">
        <div class="sg-error">
            <div class="sg-error__content">
                <div class="sg-error__title">HTTP: 404</div>
                <div class="sg-error__meta">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App404',
    components: {},
    props: {
        // 错误信息
        message: {
            type: String,
            default: '页面不存在',
        },
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less" module></style>
