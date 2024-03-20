<template>
    <my-big-screen
        :is-scale="true"
        class="sg-page reform-course"
        :width="width"
        :height="height"
    >
        <div>
            <!-- 背景底图 -->
            <video class="fullscreenvideo" autoplay muted loop>
                <source
                    src="../../assets/images/integrates/integrates.mp4"
                    type="video/mp4"
                />
            </video>

            <div class="sg-page page-reform">
                <header class="page-reform__header">
                    <index-title
                        @back="back"
                        :if-back="true"
                        :title="'改革历程'"
                    >
                        <div slot="right-one" style="font-size: 18px">
                            <i
                                class="el-icon-time"
                                style="margin-right: 10px; font-size: 20px"
                            ></i
                            >{{ currentTime }}
                        </div>
                    </index-title>
                </header>

                <div class="page-reform__content">
                    <section class="reform-center" v-if="dataSource.length">
                        <Banner
                            :data-source="dataSource"
                            :banner-interval="bannerInterval"
                            :current-events="currentEvents"
                            :all-events="allEvents"
                            :play-end="playEnd"
                            ref="bannerRef"
                            @getActiveEvent="getActiveEvent"
                        />

                        <TimeLine
                            :data-source="dataSource"
                            :all-events="allEvents"
                            :current-events="currentEvents"
                            :banner-interval="bannerInterval"
                            :active-index="activeIndex"
                            :active-event="activeEvent"
                            ref="timeLineRef"
                            :play-end="playEnd"
                            @getActiveEvent="getActiveEvent"
                            @onArrowClick="onArrowClick"
                        />
                    </section>
                </div>
            </div>
        </div>
    </my-big-screen>
</template>

<script>
import IndexTitle from '../index/components/index-title.vue'
import Banner from './components/banner.vue'
import TimeLine from './components/time-line.vue'
import { dataSource } from './data'

export default {
    name: 'ReformCourse',
    components: { IndexTitle, Banner, TimeLine },
    props: {},
    data() {
        return {
            width: 2560,
            height: 1440,
            currentTime: '', // 当前时间
            dataSource: [], // 总数据
            allEvents: [], // 所有事件
            currentEvents: [], // 当前简缩事件
            // bannerEvents: [], // 当前banner事件
            playIndex: 0, // 播放下标
            activeEvent: {},
            activeIndex: 0, // 选中事件下标
            bannerInterval: 2000, // 播放间隔
            playEnd: false,
        }
    },
    computed: {},
    watch: {},
    created() {
        this.currentTime = new Date()
            .toLocaleDateString()
            .split('/')
            .join('-')
    },
    mounted() {
        Promise.resolve().then(() => {
            this.dataSource = dataSource

            let all = []
            dataSource.forEach(item => {
                all = [...all, ...item?.events]
            })
            this.allEvents = all

            this.currentEvents = this.allEvents.slice(
                this.allEvents.length - 6,
                this.allEvents.length,
            )
            this.startPlay()
        })
    },
    methods: {
        back() {
            window.open('about:blank', '_top').close()
        },

        startPlay() {
            this.activeEvent = this.currentEvents[0]

            let timer = setInterval(() => {
                // 选中下标
                // if (this.activeIndex < 4) {
                this.activeIndex += 1
                // }

                this.playIndex += 1

                // 播放进度下标
                // if (
                //     this.playIndex > 4 &&
                //     this.playIndex < this.allEvents.length - 1
                // ) {
                //     let arr = this.allEvents.slice(
                //         this.playIndex - 4,
                //         this.playIndex + 2,
                //     )
                //     this.currentEvents = arr
                // }

                this.$refs.bannerRef.$refs.carouselRef.next()
                this.$refs.timeLineRef.startPlay(this.activeIndex)

                this.activeEvent = this.currentEvents[this.activeIndex]

                // 播放完清除
                if (this.playIndex === 5) {
                    this.activeIndex += 1
                    clearInterval(timer)
                    this.playEnd = true
                    setTimeout(() => {
                        this.bannerEvents = this.allEvents.slice(
                            this.allEvents.length - 6,
                            this.allEvents.length,
                        )
                        this.$nextTick(() => {
                            this.$refs.bannerRef.$refs.carouselRef.setActiveItem(
                                5,
                            )

                            this.activeEvent = this.allEvents[
                                this.allEvents.length - 1
                            ]
                        })
                    }, this.bannerInterval)
                }
            }, this.bannerInterval)
        },

        getActiveEvent(event, index, type) {
            this.activeEvent = event
            this.activeIndex = index
            if (type === 'brief') {
                this.$refs.bannerRef.$refs.carouselRef.setActiveItem(index)
            }

            if (type === 'line') {
                const idx = this.allEvents.findIndex(
                    ele => ele.title === event.title,
                )
                if (idx >= this.allEvents.length - 6) {
                    this.currentEvents = this.allEvents.slice(
                        this.allEvents.length - 6,
                        this.allEvents.length,
                    )
                } else {
                    this.currentEvents = this.allEvents.slice(idx, idx + 6)
                }
            }
        },

        onArrowClick(type) {
            if (type === 'prev') {
                let idx = this.allEvents.findIndex(ele => {
                    return ele.title === this.currentEvents[0].title
                })
                this.currentEvents = this.allEvents.slice(idx - 1, idx + 5)
                this.$refs.timeLineRef.onEventClick(
                    this.allEvents[idx - 1],
                    this.activeIndex,
                    'brief',
                )
            } else if (type === 'next') {
                let idx = this.allEvents.findIndex(ele => {
                    return (
                        ele.title ===
                        this.currentEvents[this.currentEvents.length - 1].title
                    )
                })

                this.currentEvents = this.allEvents.slice(idx - 4, idx + 2)
                this.$refs.timeLineRef.onEventClick(
                    this.allEvents[idx + 1],
                    this.activeIndex,
                    'brief',
                )
            }
        },
    },
}
</script>

<style lang="less" scoped>
.fullscreenvideo {
    width: 2560px;
    height: 1440px;
    //   opacity: 0.7;
}
.page-reform {
    overflow: hidden;
    width: 2560px;
    height: 1440px;
    background: url('../../assets/images/integrates/bg.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;

    &__header {
        width: 100%;
        height: 160px;
    }

    &__content {
        padding: 0 100px;
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 10;

        .reform-center {
            flex: 1;
            margin-top: 80px;
        }
    }
}
</style>
