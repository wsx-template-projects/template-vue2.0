<!--
   页面加载 loading
-->
<template>
    <div
        :class="['loading-global', isFullScreen && 'is-full-screen']"
        v-show="isShow"
    >
        <div :class="[isFullScreen ? 'full-content' : 'default-content']">
            <template v-if="isFullScreen">
                <van-loading
                    :type="vantLoadingConfig.type"
                    :color="vantLoadingConfig.color"
                    vertical
                >
                    {{ text }}
                </van-loading>
            </template>
            <template v-else>
                <van-loading
                    size="24px"
                    text-size="14px"
                    type="spinner"
                    color="#fff"
                    vertical
                >
                    {{ text }}
                </van-loading>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            vantLoadingConfig: {
                // type: 'spinner',
                type: 'circular',
                color: '#1989fa',
            },
        }
    },
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        isFullScreen: {
            type: Boolean,
            default: false,
        },
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
    components: {},
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.loading-transition-enter,
.loading-transition-leave-to {
    opacity: 1;
}

.loading-transition-leave,
.loading-transition-enter-to {
    opacity: 0;
}

.loading-transition-enter-active,
.loading-transition-leave-active {
    transition: all 0.3s;
}

.loading-global {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);

    .default-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 6px;

        /deep/ .van-loading__text {
            color: rgb(224, 222, 222);
        }
    }
}

.is-full-screen {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    transition: opacity 0.3s linear;

    .full-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .loading-text {
            color: orange;
            line-height: 64px;
            font-size: 32px;
            text-align: center;
        }

        .loading-icon {
            width: 80px;
            height: 80px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
