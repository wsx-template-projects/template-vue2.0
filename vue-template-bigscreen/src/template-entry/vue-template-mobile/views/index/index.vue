<template>
    <div class="sg-page page-index">
        <div class="wrap">124</div>
        <h1 class="color1">hello world</h1>
        <h2>vue-template-mobile</h2>
        <svg-icon icon="example1" style="font-size:20px;color:red" />
        <my-copy-button></my-copy-button>
        <div>
            <van-button type="primary">主要按钮</van-button>
            <van-button type="info">信息按钮</van-button>
            <van-button type="default">默认按钮</van-button>
            <van-button type="warning">警告按钮</van-button>
            <van-button type="danger">危险按钮</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    components: {},
    props: {},
    data() {
        return {
            message: 'ok',
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        // this.$http.request({
        //     url: '/mock/list',
        //     exShowLoading: true,
        // })
    },
    methods: {},
}
</script>

<style lang="less" scoped>
.wrap {
    width: 375px;
    height: 200px;
    background-color: coral;
}
.color1 {
    color: @color-1;
}
</style>
