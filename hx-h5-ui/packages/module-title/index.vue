<!--
   模块标题
-->
<template>
    <div class="hx-module-title">
        <div class="left">
            <span class="big-title hx-title--line">{{ bigTitle }}</span>
            <span class="sub-title" v-if="subTitle">{{ subTitle }}</span>
        </div>
        <div class="right" v-if="hasMore" @click="onRight">
            <span class="right-txt">{{ rightText }}</span>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'HxModuleTitle',
    components: {},
})
export default class HxModuleTitle extends Vue {
    @Prop({ default: false }) hasMore!: boolean
    @Prop({ default: '更多 >' }) rightText!: string
    @Prop({ default: '大标题' }) bigTitle!: string
    @Prop({ default: '' }) subTitle!: string
    created() {}
    mounted() {}
    onRight() {
        this.$emit('more-click')
    }
}
</script>

<style lang="less" scoped>
.hx-module-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .left {
        display: flex;
        align-items: center;
    }

    .big-title {
        display: flex;
        align-items: center;
        font-size: 18px;
        line-height: 18px;
        font-weight: 600;
        color: #333;
        margin-right: 10px;
    }

    .sub-title {
        display: flex;
        align-items: center;
        color: #808080;

        &::before {
            display: inline-block;
            content: '';
            width: 1px;
            height: 14px;
            background: #808080;
            border-radius: 1px;
            margin-right: 8px;
        }
    }

    .right-txt {
        color: #3192e4;
    }
}
</style>
