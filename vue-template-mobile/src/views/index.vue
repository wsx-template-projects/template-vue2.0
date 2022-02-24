<!-- 
   
-->
<template>
    <div class="index">
        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/plugins')">
                查看-插件
            </van-button>
        </div>

        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/base')">
                查看-基础组件
            </van-button>
        </div>

        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/map')">
                查看-地图组件
            </van-button>
        </div>

        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/operation')">
                查看-业务组件
            </van-button>
        </div>

        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/other')">
                查看-其它组件
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        jumpPage(path) {
            console.log('path:', path)
            this.$router.push(path)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
