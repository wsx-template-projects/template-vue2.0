<!-- 
   插件
-->
<template>
    <div class="plugins-page">
        <van-button type="primary" size="large" @click="onFullLoading">full-loading</van-button>
        <van-button type="primary" size="large" @click="onLoading">loading</van-button>
        <van-button type="primary" size="large" @click="onDialog">dialog</van-button>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    },
    computed: {},
    components: {},
    created() {},
    mounted() {},
    methods: {
        onFullLoading() {
            this.$fullLoading.show('加载中...')
            setTimeout(() => {
                this.$fullLoading.hide()
            }, 2000)
        },
        onLoading() {
            this.$loading.show('加载中...')
            setTimeout(() => {
                this.$loading.hide()
            }, 2000)
        },
        onDialog() {
            console.log(`dialog`)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.plugins-page {
    padding: 20px;

    /deep/ .van-button {
        margin-bottom: 20px;
    }
}
</style>
