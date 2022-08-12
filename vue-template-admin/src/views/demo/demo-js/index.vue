<!--
    js基础 - 案例
-->
<template>
    <div class="sg-page">
        demo-js
        <div :class="dynamicCn">123456</div>
        <div :class="isShow ? 'active' : ''">123456</div>
        <!-- <div :class="item.isShow ? 'active' : ''">123456</div> -->
        <div
            :class="[
                'group-view',
                isShow && 'active',
                hasData ? 'className1' : 'className2',
            ]"
        >
            123456
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            isShow: true,
        }
    },
    computed: {
        dynamicCn() {
            return 'className_1, className_2'
        },
    },
    created() {},
    mounted() {},
    methods: {},
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
