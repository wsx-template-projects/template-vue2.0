<!-- 
   地图相关 - 案例
-->
<template>
    <div class="app-page">
        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/baidu-map')">
                百度地图
            </van-button>
            <van-button type="primary" size="large" @click="jumpPage('/gaode-map')">
                高德地图
            </van-button>
            <van-button type="primary" size="large" @click="jumpPage('/tengxun-map')">
                腾讯地图
            </van-button>
        </div>
        <div class="page-main">
            地图区
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageMap',
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
