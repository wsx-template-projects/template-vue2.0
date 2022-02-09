<!-- 
   基础组件相关 - 案例
-->
<template>
    <div class="app-page">
        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="jumpPage('/my-list')">
                my-list
            </van-button>
            <van-button type="primary" size="large" @click="jumpPage('/my-tab-list')">
                my-tab-list
            </van-button>
            <van-button type="primary" size="large" @click="jumpPage('/my-form')">
                my-form
            </van-button>
            <van-button type="primary" size="large" @click="jumpPage('/my-upload-file')">
                my-upload-file
            </van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageBase',
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
