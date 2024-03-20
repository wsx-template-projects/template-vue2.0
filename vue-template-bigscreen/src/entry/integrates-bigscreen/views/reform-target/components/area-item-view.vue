<!--
   区域分布 - item
-->
<template>
    <div class="item-view">
        <div class="item-top">
            <div class="item-top__content" :class="itemCN">
                <span class="item-top--name">{{ item.areaName }}</span>
                <span class="item-top__rank" v-if="index < 3">
                    第{{ index + 1 }}名
                </span>
                <span class="item-top__rank" v-else>No.{{ index + 1 }}</span>
            </div>
            <img
                class="item-top__bg"
                src="../assets/img/icon-title-bg.png"
                alt=""
            />
        </div>
        <div class="item-btn" @click.stop="onCheckDetail(item)">查看详情 ></div>
        <div class="item-content">
            <div class="content-chart">
                <my-echarts
                    width="360px"
                    height="360px"
                    :option="radarOption"
                />
                <div class="chart-grade">
                    <span class="grade-txt" v-if="item.final_score">{{
                        item.final_score
                    }}</span>
                    <span
                        class="grade-sub-txt"
                        :class="scoreCN"
                        v-if="item.diff_score"
                        >{{ item.diff_score | scoreTxt }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import {
    useRadarChart,
    RadarData,
    RadarOption,
} from '@/entry/integrates-bigscreen/hooks/echarts/modules/radar'

@Component({
    name: '',
    components: {},
    filters: {
        scoreTxt(val: number) {
            return val > 0 ? '+' + val : val
        },
    },
})
export default class AreaItemView extends Vue {
    @Prop({ default: () => 0 }) index!: number
    @Prop({ default: () => ({}) }) item!: any
    public baseConfig: any = {
        color: ['#B363FF', '#87FFE1'],
        legend: {
            bottom: 0,
        },
        radar: {
            name: {
                textStyle: {
                    padding: [-10, -10],
                },
            },
        },
    }
    get radarOption() {
        const { option } = this.item
        return option ? useRadarChart(option, this.baseConfig) : {}
    }
    get itemCN() {
        return this.item?.rankNumber < 4 ? 'is-tag' : ''
    }
    get scoreCN() {
        return this.item?.diff_score > 0 ? 'is_score_up' : 'is_score_down'
    }
    created() {
        // const radio = 1920 / 2560
        // console.log('radio :>> ', radio)
    }
    mounted() {}
    public onCheckDetail(item: any) {
        console.log('item :>> ', item)
        const propsData: any = {
            title: '改革指数评估详情',
            // width: '1680px',
            width: '1380px',
            item: { ...item },
        }
        this.$modalDialog(
            () => import('./target-detail/index.vue'),
            propsData,
        ).then(
            (res: any) => {
                console.log('res :>> ', res)
            },
            (err: any) => {
                console.log('err :>> ', err)
            },
        )
    }
}
</script>

<style lang="less" scoped>
@imgUrl: '../assets/img/';

.item-view {
    position: relative;
    display: flex;
    flex-direction: column;
    background: rgba(3, 19, 79, 0.5);
    font-size: 24px;
    border: 3px solid #0087ff;
    border-image: linear-gradient(
            270deg,
            rgba(0, 135, 255, 0.7),
            rgba(17, 90, 175, 0.44),
            rgba(24, 117, 200, 0.68)
        )
        3 3;
    backdrop-filter: blur(2px);

    .item-top {
        position: relative;
        display: flex;
        align-items: center;
        min-width: 442px;
        height: 56px;

        .item-top__bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 56px;
        }

        .item-top__content {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 99;
            width: 100%;
            line-height: 56px;

            .item-top--name {
                font-size: 32px;
                padding: 0 14px 0 44px;
            }

            .item-top__rank {
                font-size: 18px;
                letter-spacing: 1px;
            }
        }

        .is-tag {
            display: flex;
            justify-items: center;
            color: #ffe700;

            .item-top__rank {
                width: 162px;
                background: url('@{imgUrl}icon-rank-bg.png') no-repeat center;
                color: #fff;
                padding-left: 60px;
            }
        }
    }

    .item-btn {
        position: absolute;
        top: 60px;
        right: 10px;
        z-index: 999;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 32px;
        color: #eee;
        letter-spacing: 1px;
        cursor: pointer;
    }

    .item-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        // min-width: 400px;
        // height: 400px;
        border: 1px solid red;

        .content-chart {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            // width: 400px;
            // height: 400px;

            .chart-grade {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 32px;
                letter-spacing: 2px;
                color: #ffc42b;

                .grade-sub-txt {
                    font-size: 18px;
                    line-height: 24px;
                    letter-spacing: 2px;

                    &.is_score_up {
                        color: #ff5555;
                    }

                    &.is_score_down {
                        color: #67ff71;
                    }
                }
            }
        }
    }
}
</style>
