<template>
    <div class="index-title">
        <div class="title-group">
            <div v-if="ifBack" class="back" @click="goBack">返回</div>
            <div
                class="left-one box"
                :class="leftOne ? 'pointer' : ''"
                @click="leftOneClick()"
            >
                {{ leftOne }}
            </div>
            <div
                class="left-two box"
                :class="leftOne ? 'pointer' : ''"
                @click="leftTwoClick()"
            >
                {{ leftTwo }}
            </div>
            <div class="title-box">{{ title }}</div>
            <div class="right-one box">
                {{ rightOne }}<slot name="right-one"></slot>
            </div>
            <div class="right-two box">
                {{ rightTwo }}
                <slot name="right-two"></slot>
            </div>
            <div class="screenfull" @click="fullScreenClick()">
                <img
                    v-if="fullScreen"
                    src="../../../assets/images/integrates/not-screenfull.png"
                    alt=""
                />
                <img
                    v-else
                    src="../../../assets/images/integrates/screenfull.png"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IndexTitle',
    props: {
        timeFontSize: {
            type: [Number, String],
            default: 24,
        },
        // 左侧第一个盒子内容
        leftOne: {
            type: String,
            default: '',
        },
        // 左侧第二个盒子内容
        leftTwo: {
            type: String,
            default: '',
        },
        // 右侧第一个盒子内容
        rightOne: {
            type: String,
            default: '',
        },
        // 右侧第二个盒子内容
        rightTwo: {
            type: String,
            default: '',
        },
        // 中间内容
        title: {
            type: String,
            default: '',
        },
        ifBack: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            fullScreen: false,
            timer: null,
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        //由于 全屏状态下 ，按 "Esc" 键退出全屏，浏览器监听不到 "Esc" 键的事件，所以需要通过浏览器窗口大小改变的事件去触发退出全屏事件
        window.addEventListener('resize', () => {
            //增加 timer 定时器的原因是全屏和退出全屏的事件会触发两次窗口大小改变事件，做一次过滤
            if (this.timer) return
            this.timer = setTimeout(() => {
                //     /** 是否全屏 */
                if (this.checkFull()) {
                    this.fullScreen = true
                    this.windowFullScreen()
                } else {
                    this.fullScreen = false
                }
                clearTimeout(this.timer)
                this.timer = null
            }, 0)
        })
    },
    methods: {
        /** 左一 方法 */
        leftOneClick(e) {
            this.$emit('leftOneClick', 1)
        },
        /** 左二 方法 */
        leftTwoClick() {
            this.$emit('leftTwoClick')
        },
        // 返回
        goBack() {
            this.$emit('back')
        },
        /**
         * 全屏按钮\退出全屏按钮点击事件
         */
        fullScreenClick() {
            this.fullScreen = !this.fullScreen
            if (this.fullScreen) {
                //当前要启动全屏
                this.windowFullScreen()
            } else {
                //当前要退出全屏
                this.windowExitFullScreen()
            }
        },
        /**
         * 启动全屏
         */
        windowFullScreen() {
            let docElm = document.documentElement
            if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen()
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen()
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen()
            } else if (docElm.requestFullscreen) {
                docElm.requestFullscreen()
            }
        },
        /**
         * 退出全屏
         */
        windowExitFullScreen() {
            if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        },
        /**
         * 判断浏览器是否处于全屏状态 （需要考虑兼容问题）
         */
        checkFull() {
            var explorer = window.navigator.userAgent.toLowerCase()
            if (explorer.indexOf('chrome') > 0) {
                //webkit
                if (
                    document.body.scrollHeight === window.screen.height &&
                    document.body.scrollWidth === window.screen.width
                ) {
                    return true
                    // alert("全屏");
                } else {
                    return false
                    // alert("不全屏");
                }
            } else {
                //IE 9+  fireFox
                if (
                    window.outerHeight === window.screen.height &&
                    window.outerWidth === window.screen.width
                ) {
                    return true
                    // alert("全屏");
                } else {
                    return false
                    // alert("不全屏");
                }
            }
        },
    },
}
</script>

<style lang="less" scoped>
.pointer {
    cursor: pointer;
}
.index-title {
    background-image: url('../../../assets/images/integrates/index-title.png');
    height: 190px;
    position: relative;
    margin-top: -28px;
    z-index: 1;
    .title-group {
        display: flex;
        .box {
            width: 161px;
            height: 47px;
            text-align: center;
            line-height: 45px;
            font-weight: 600;
            color: #fff;
            font-size: 24px;
        }
        .back {
            width: 124px;
            position: absolute;
            top: 53px;
            left: 58px;
            display: flex;
            align-items: center;
            font-size: 32px;
            cursor: pointer;
            &::before {
                display: block;
                content: '';
                width: 30px;
                height: 24px;
                background: url('../../../assets/images/integrates/back.svg')
                    no-repeat;
                background-size: 100%;
                margin-right: 10px;
            }
        }
        .left-one {
            position: absolute;
            top: 53px;
            left: 206px;
        }
        .left-two {
            position: absolute;
            top: 53px;
            left: 404px;
        }
        .title-box {
            position: absolute;
            top: 36px;
            left: 730px;
            width: 1136px;
            height: 106px;
            text-align: center;
            line-height: 106px;
            font-weight: 600;
            font-size: 70px;
            color: #fff;
        }
        .right-one {
            position: absolute;
            top: 53px;
            right: 367px;
        }
        .right-two {
            position: absolute;
            top: 53px;
            right: 169px;
        }
    }
    .screenfull {
        position: absolute;
        top: 45px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        > img {
            width: 60%;
        }
    }
}
</style>
