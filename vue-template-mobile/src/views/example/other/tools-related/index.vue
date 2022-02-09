<!-- 
   工具函数相关 - 案例
-->
<template>
    <div class="app-page">
        <div class="btn-wrap">
            <van-button type="primary" size="large" @click="onThrottle()">throttle</van-button>
            <van-button type="primary" size="large" @click="onDebounce()">debounce</van-button>
        </div>
        <div class="page-main">
            123456
        </div>
    </div>
</template>

<script>
import tools from '@/scripts/utils/tools'
export default {
    name: 'ToolsRelated',
    data() {
        return {}
    },
    computed: {
        throttleFunc() {
            return tools.throttle(this.handleLoading, 3000)
        },
        debounceFunc() {
            return tools.debounce(this.handleLoading, 3000)
        },
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        onThrottle() {
            console.log('click')
            this.throttleFunc()
        },
        onDebounce() {
            console.log('click')
            this.debounceFunc()
        },
        handleLoading() {
            console.log(`loading`)
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
