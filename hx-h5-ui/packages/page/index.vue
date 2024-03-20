<!--
    页面组件
-->
<template>
    <div class="hx-base-page">
        <!-- 导航栏 -->
        <van-nav-bar
            safe-area-inset-top
            :title="navTitle"
            v-bind="navBind"
            @click-left="clickLeft"
            v-on="$listeners"
            v-if="hasNav"
        />
        <!-- 主内容 -->
        <div class="base-page__main">
            <slot></slot>
        </div>
        <!-- 页脚 -->
        <div class="sg-ios-bottom-adapt base-page__footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface NavBar {
    'left-text'?: string
    'right-text'?: string
    [propName: string]: any
}

/**
 * 导航栏默认配置项
 */
const DEFAULT_NAV_CONFIG: NavBar = {
    'left-text': '',
    'right-text': '',
    'left-arrow': true,
}

@Component({
    name: 'HxBasePage',
    components: {},
})
export default class HxBasePage extends Vue {
    /** 是否app内嵌 - h5 */
    @Prop({ type: Boolean, default: false }) isWebview!: boolean
    /** 是否有导航栏 */
    @Prop({ type: Boolean, default: false }) hasNav!: boolean
    /** 是否默认点击返回箭头返回上一页 */
    @Prop({ type: Boolean, default: true }) isDefaultPrevPage!: boolean
    /** 导航栏配置，只在hasNav = true情况下生效 */
    @Prop({ type: Object, default: () => ({}) }) navConfig!: NavBar
    created() {}
    mounted() {}
    get navBind() {
        return { ...DEFAULT_NAV_CONFIG, ...this.navConfig }
    }
    /** 导航栏标题 */
    get navTitle() {
        return this.navBind.title || this.$route.meta?.title
    }
    clickLeft() {
        if (this.isDefaultPrevPage) {
            this.$router.go(-1)
            return
        }
        this.$emit('go-back')
    }
}
</script>

<style lang="less" scoped>
.hx-base-page {
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-size: 14px;
    color: #333;

    /deep/ .van-nav-bar__title {
        font-size: 16px;
        color: #030303;
    }

    /deep/ .van-nav-bar__left .van-icon {
        color: #444;
        font-size: 20px;
    }

    .base-page__main {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto;
        // ios 滚动条滑动流畅
        -webkit-overflow-scrolling: touch;
    }

    .base-page__footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        > div {
            width: 100%;
            padding: 16px;
        }
    }
}
</style>
