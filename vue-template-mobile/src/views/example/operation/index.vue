<!-- 
   业务组件相关 - 案例
-->
<template>
    <div class="app-page">
        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/preview-file')">
                文件预览
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageOperation',
    data() {
        return {}
    },
    computed: {},
    components: {},
    created() {},
    mounted() {},
    methods: {
        jumpPage(path) {
            this.$router.push({
                path,
            })
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.van-button {
    margin-bottom: 16px;
}
</style>
