<template>
    <div class="sg-page app-500-page">
        <div class="sg-error">
            <div class="sg-error__content">
                <div class="sg-error__title">HTTP: 500</div>
                <div class="sg-error__meta">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App500',
    components: {},
    props: {
        // 错误信息
        message: {
            type: String,
            default: '服务器奔溃了QAQ',
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
