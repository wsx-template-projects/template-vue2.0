<template>
    <div class="container" :style="playEnd ? {} : { pointerEvents: 'none' }">
        <div class="brief-events">
            <div
                v-if="playEnd && currentEvents[0].title !== allEvents[0].title"
                class="prev arrow-button"
                @click="onClickArrow('prev')"
            >
                <i class="el-icon-arrow-left"></i>
            </div>
            <div
                v-if="
                    playEnd &&
                        currentEvents[currentEvents.length - 1].title !==
                            allEvents[allEvents.length - 1].title
                "
                class="next arrow-button"
                @click="onClickArrow('next')"
            >
                <i class="el-icon-arrow-right"></i>
            </div>
            <div
                v-for="(ele, i) in currentEvents"
                :key="i"
                class="brief-item"
                :class="ele.imgs.length ? 'brief-item-img' : 'brief-item-text'"
                :style="activeIndex === i ? { background: '#013197' } : {}"
                @click="onEventClick(ele, i, 'brief')"
            >
                <div class="text">{{ ele.title }}</div>
                <div class="img" v-if="ele.imgs.length">
                    <img
                        v-for="(img, j) in ele.imgs.slice(0, 2)"
                        :key="j"
                        :src="img"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <div class="line">
            <i class="el-icon-arrow-right"></i>
            <div class="over-line">
                <div
                    class="year-item"
                    v-for="(elem, i) in dataSource"
                    :key="i"
                    ref="yearItemRef"
                >
                    <div
                        class="label-box"
                        :style="
                            !(i === 0 || i === 1)
                                ? { left: `${eleWidth - 22}px` }
                                : {}
                        "
                    >
                        <div class="label-round"></div>
                        <div class="label-idx"></div>
                        <div
                            class="year"
                            :style="
                                activeEvent.date &&
                                activeEvent.date.slice(0, 4) == elem.label
                                    ? { fontWeight: 700, fontSize: '24px' }
                                    : {}
                            "
                        >
                            {{ elem.label }}
                        </div>
                    </div>

                    <div class="month-box">
                        <div
                            class="month-label"
                            v-for="(ele, j) in elem.month"
                            ref="monthLabelRef"
                            :key="j"
                        ></div>
                    </div>
                    <div class="event-box" ref="eventBoxRef">
                        <div
                            v-for="(item, k) in elem.events"
                            :key="k"
                            v-if="
                                k > 0
                                    ? new Date(
                                          elem.events[k - 1].date,
                                      ).getMonth() +
                                          1 !==
                                      new Date(item.date).getMonth() + 1
                                    : true
                            "
                            @click="onEventClick(item, activeIndex, 'line')"
                            ref="eventItem"
                            :class="
                                item.important
                                    ? 'important-event-item'
                                    : 'event-item'
                            "
                            :style="{
                                left: `${new Date(item.date).getMonth() *
                                    eleWidth -
                                    1}px`,
                                bottom: `0`,
                                width: `${eleWidth}px`,
                            }"
                        >
                            <template v-if="item.important">
                                <img
                                    class="important-icon"
                                    src="../imgs/icon/important-icon.png"
                                />
                                <div v-for="e in 6" :key="e"></div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="current-item" ref="currentIcon">
                    <img src="../imgs/icon/current-icon.png" alt="" />
                    <div class="month-mark">
                        {{
                            `${activeEvent.date &&
                                +activeEvent.date.split('-')[1]}月`
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
function getGapMonth(start, end) {
    let endTime = start
    let startTime = end
    endTime = endTime.split('-')
    endTime = parseInt(endTime[0]) * 12 + parseInt(endTime[1])
    startTime = startTime.split('-')
    startTime = parseInt(startTime[0]) * 12 + parseInt(startTime[1])

    return Math.abs(endTime - startTime)
}
export default {
    name: 'TimeLine',
    props: [
        'dataSource',
        'currentEvents',
        'allEvents',
        'activeIndex',
        'bannerInterval',
        'playEnd',
        'activeEvent',
    ],
    components: {},
    data() {
        return {
            totalMonth: 0,
            eleWidth: 0,
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.totalMonth =
            (new Date().getFullYear() - 2015) * 12 + new Date().getMonth() + 1

        this.eleWidth = (2560 - 200 - 50) / this.totalMonth

        this.$refs.monthLabelRef.forEach(ele => {
            ele.style.marginLeft = `calc(${this.eleWidth}px - 3px)`
        })

        this.$refs.eventBoxRef.forEach(ele => {
            ele.style.left = this.eleWidth + 'px'
        })

        this.$refs.currentIcon.style.left =
            getGapMonth(
                '2015-01-01',
                this.allEvents[this.allEvents.length - 6].date,
            ) *
                this.eleWidth +
            1.5 * this.eleWidth +
            'px'
    },
    methods: {
        onEventClick(event, index, type) {
            this.$refs.currentIcon.style.left =
                (+event.date.split('-')[0] - 2015) * this.eleWidth * 12 +
                +event.date.split('-')[1] * this.eleWidth +
                (this.eleWidth / 2 - 2) +
                'px'

            this.$listeners.getActiveEvent(event, index, type)
        },
        startPlay(index) {
            let activeEvent = this.currentEvents[index]

            this.$refs.currentIcon.style.left =
                (+activeEvent.date.split('-')[0] - 2015) * this.eleWidth * 12 +
                +activeEvent.date.split('-')[1] * this.eleWidth +
                (this.eleWidth / 2 - 2) +
                'px'
        },

        onClickArrow(type) {
            this.$listeners.onArrowClick(type)
        },
    },
}
</script>

<style lang="less" scoped>
.container {
    margin-top: 30px;

    .brief-events {
        padding: 16px;
        background: rgba(1, 19, 67, 0.6);
        border-radius: 10px;
        backdrop-filter: blur(4px);
        margin-bottom: 120px;
        display: flex;
        justify-content: space-between;
        position: relative;

        .arrow-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(31, 45, 61, 0.51);
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .prev {
            left: -50px;
        }
        .next {
            right: -50px;
        }

        .brief-item {
            width: 360px;
            height: 208px;
            padding: 12px 16px;
            background: rgba(4, 42, 123, 0.6);
            backdrop-filter: blur(10px);
            cursor: pointer;

            .text {
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;

                text-indent: 36px;
                font-size: 18px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #eeeeee;
                line-height: 28px;
                letter-spacing: 2px;
            }
        }
        .brief-item-img {
            .text {
                -webkit-line-clamp: 3;
                height: 84px;
            }
            > .img {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;

                > img {
                    height: 90px;
                    // width: 140px;
                    flex: 1;

                    &:first-child {
                        margin-right: 16px;
                    }
                }
            }
        }
        .brief-item-text {
            .text {
                -webkit-line-clamp: 6;
            }
        }
    }
    .line {
        height: 7px;
        background-color: #096dd9;
        position: relative;

        .el-icon-arrow-right {
            position: absolute;
            right: -16px;
            top: -18px;
            font-weight: 700;
            font-size: 44px;
            color: #096dd9;
        }

        .over-line {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            justify-content: space-between;
            // margin-right: 50px;
            // width: calc(100% - 50px);

            .current-item {
                position: absolute;
                display: block;
                width: 30px;
                height: 30px;
                // left: 323px;
                top: 8px;
                margin-left: -16px;
                // transition: left 0.1s;
                .month-mark {
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    text-align: center;
                }
            }

            .year-item {
                position: relative;
                .label-box {
                    position: absolute;
                    left: 0x;
                    top: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 42px;

                    .label-round {
                        margin-top: -5px;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: #1890ff;
                    }

                    .label-idx {
                        width: 1px;
                        height: 30px;
                        background: #1890ff;
                        margin-bottom: 10px;
                    }
                    .year {
                        font-size: 18px;
                    }
                }
                .month-box {
                    margin-top: -7px;
                    display: flex;
                    justify-content: space-between;
                    .month-label {
                        width: 3px;
                        height: 14px;
                        background-color: #1890ff;
                        // margin-left: 19px;
                    }
                }
                .event-box {
                    position: absolute;
                    width: 100%;
                    // left: 22px;

                    .event-item {
                        position: absolute;
                        // width: 21px;
                        height: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        cursor: pointer;
                        &::before {
                            content: '';
                            display: block;
                            width: 3px;
                            height: 7px;
                            margin-bottom: 6px;
                            background-color: #df280f;
                        }
                        &::after {
                            content: '';
                            display: block;
                            width: 3px;
                            height: 7px;
                            background-color: #df280f;
                        }
                    }

                    .important-event-item {
                        position: absolute;
                        // width: 21px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        cursor: pointer;

                        > div {
                            width: 3px;
                            height: 7px;
                            margin-bottom: 6px;
                            background-color: #df280f;
                            &:last-child {
                                margin-bottom: 0px;
                            }
                        }
                        .important-icon {
                            // width: 22px;
                            // height: 24px;
                            margin-bottom: 5px;
                        }
                    }
                }
            }
            .ml100 {
                margin-left: 100px;
            }
            .ml150 {
                margin-left: 180px;
            }
        }
    }
}
</style>
