<!-- 
   其它相关 - 案例
-->
<template>
    <div class="ap-main">
        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/tools-related')">
                工具函数-案例
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageOther',
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
