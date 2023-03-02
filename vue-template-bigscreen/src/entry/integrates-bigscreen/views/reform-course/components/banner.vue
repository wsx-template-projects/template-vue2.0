<template>
    <div class="container" :style="playEnd ? {} : { pointerEvents: 'none' }">
        <el-carousel
            :interval="bannerInterval"
            type="card"
            height="620px"
            :autoplay="false"
            indicator-position="none"
            ref="carouselRef"
            @change="bannerChange"
        >
            <el-carousel-item v-for="(item, i) in currentEvents" :key="i">
                <div class="banner-item" @click="onBannerItemClick(item)">
                    <div class="item-container">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="date">{{ getDate(item.date) }}</div>
                        <div class="content">
                            {{ item.content }}
                        </div>
                    </div>
                    <div v-if="item.imgs.length" class="pic">
                        <el-carousel trigger="click">
                            <el-carousel-item
                                v-for="(ele, j) in item.imgs"
                                :key="j"
                            >
                                <img :src="ele" alt="" />
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: '',
    props: ['bannerInterval', 'currentEvents', 'allEvents', 'playEnd'],
    components: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    updated() {},
    methods: {
        bannerChange(index) {
            if (this.playEnd) {
                this.$parent.$parent.$refs.timeLineRef.onEventClick(
                    this.currentEvents[index],
                    index,
                    'brief',
                )
            }
        },
        getDate(date) {
            const arr = date.split('-')
            return `${arr[0]}年${arr[1]}月${arr[2]}日`
        },

        onBannerItemClick(item) {
            if (item?.link) {
                window.open(item.link)
            }
        },
    },
}
</script>

<style lang="less" scoped>
.container {
    padding: 20px 220px 0;

    .banner-item {
        width: 1500px;
        height: 620px;
        background: #042a7b;
        box-shadow: 0px 0px 30px 0px #011343;
        border-radius: 20px;
        overflow: hidden;

        display: flex;
        justify-content: space-between;
        padding: 50px 40px;

        .item-container {
            flex: 1;

            .title {
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
                line-height: 36px;
            }
            .date {
                font-size: 22px;
                font-weight: 400;
                color: #cccccc;
                line-height: 26px;
                margin: 20px 0 24px;
                text-align: right;
            }
            .content {
                font-size: 24px;
                font-weight: 400;
                color: #ffffff;
                line-height: 28px;
            }
        }
        .pic {
            margin-left: 40px;
            // width: 560px;
            // width: 46%;
            flex-basis: 700px;
            height: 520px;
            user-select: none;
        }
    }

    .el-carousel {
        /deep/ .el-carousel__item--card {
            width: auto !important;
            margin-left: -250px;
        }
        /deep/ .el-carousel__item--card.is-active {
            border-radius: 20px;
        }
        /deep/ .el-carousel__mask {
            background-color: #000;
            opacity: 0.54;
            z-index: 999;
        }

        /deep/ .el-carousel__item--card.is-in-stage:hover .el-carousel__mask {
            opacity: 0.54;
        }
    }
}

/deep/ .el-carousel__item--card.is-active {
    //   transform: translateX(510px) scale(1.4) !important;
    //   width: 1200px;
    //   height: 600px;
}
.banner-item {
    .el-carousel {
        width: 100%;
        height: 100%;
    }
    /deep/ .el-carousel__container {
        width: 100%;
        height: 100%;
        .el-carousel__item {
            width: 100%;
            height: 100%;
            img {
                width: 700px;
                height: 520px;
            }
        }
    }
}
</style>
