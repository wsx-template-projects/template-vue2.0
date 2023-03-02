<template>
    <div class="command-center">
        <ItemTitle
            class="mt30"
            :isPointer="true"
            backgroundType="long pointer"
            :titleClick="dashboardChange"
            :params="-1"
            itemTitle="执法协作支持"
        >
            <section class="enforce-support">
                <section class="enforce-support__top">
                    <div
                        class="dashboard-item"
                        v-for="(item, index) in dashboardData"
                        :key="index"
                        :class="{ dashboard__active: dashboardIndex == index }"
                        @click="dashboardChange(index)"
                    >
                        <Dashboard :data-source="item"></Dashboard>
                    </div>
                </section>
                <section class="enforce-Top">
                    <div class="small-title mb20">
                        {{ enforceTopName }}(TOP5)
                    </div>
                    <section class="enforce-Top__content">
                        <div>
                            <vueSeamlessScroll
                                :data="enforceTopCity"
                                :class-option="defaultOption"
                            >
                                <ProgressBar
                                    v-for="(item, index) in enforceTopCity"
                                    :key="index"
                                    :progressData="item"
                                    class="enforce-bar"
                                    :isSuffix="false"
                                ></ProgressBar>
                            </vueSeamlessScroll>
                        </div>
                        <div>
                            <vueSeamlessScroll
                                :data="enforceTopCity"
                                :class-option="defaultOption"
                            >
                                <ProgressBar
                                    v-for="(item, index) in enforceTopDept"
                                    :key="index"
                                    :progressData="item"
                                    class="enforce-bar"
                                    :isSuffix="false"
                                ></ProgressBar>
                            </vueSeamlessScroll>
                        </div>
                    </section>
                </section>
            </section>
        </ItemTitle>
        <div class="center-bottom mt40">
            <ItemTitle itemTitle="基层智治协同">
                <section class="basic-synergy">
                    <!-- 执法任务下发 -->
                    <div class="task-issue">
                        <section>
                            <div class="synergy-small__title">
                                <img src="../../images/zfrwxf.png" alt="" />
                                <span>执法任务下发</span>
                            </div>
                            <IconLabel
                                class="mt20 ml10"
                                v-for="(item, index) in taskIssueData"
                                :key="index"
                                :iconData="item"
                            ></IconLabel>
                        </section>
                        <section class="polo-container">
                            <PoloCharts :value="taskPolo" label="任务完成率" />
                        </section>
                    </div>
                    <!-- 网格事件上报 -->
                    <div class="event-appear mt30">
                        <section>
                            <div class="synergy-small__title">
                                <img src="../../images/wgsjsb.png" alt="" />
                                <span>网格事件上报</span>
                            </div>
                            <IconLabel
                                class="mt20 ml10"
                                v-for="(item, index) in eventAppearData"
                                :key="index"
                                :iconData="item"
                            ></IconLabel>
                        </section>
                        <section class="event-distribute-TOP ml20">
                            <div class="synergy-small__title">
                                <img src="../../images/item-icon.png" alt="" />
                                <span>时间类型分布(TOP5)</span>
                            </div>
                            <BaseEcharts
                                class="event-echarts"
                                :options="eventTopOption"
                            ></BaseEcharts>
                        </section>
                    </div>
                </section>
            </ItemTitle>
            <ItemTitle itemTitle="违法线索处置">
                <section class="thread-dispose">
                    <IconLabel :iconData="clueSum"></IconLabel>
                    <div class="flex">
                        <IconLabel
                            class="mt20 ml10 flex1"
                            v-for="(item, index) in distributeTask"
                            :key="index"
                            :iconData="item"
                        ></IconLabel>
                    </div>
                    <!-- 线索来源图表 -->
                    <ClueSource
                        class="mt60"
                        :clueSource="clueSource"
                    ></ClueSource>
                </section>
            </ItemTitle>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// @ts-ignore
import vueSeamlessScroll from 'vue-seamless-scroll' // vue2引入方式
/** 容器统一样式 */
import ItemTitle from '../item-title/index.vue'
/** 进度条 */
import ProgressBar from '../progress-bar/index.vue'
/** 图标文本 */
import IconLabel from '../icon-label/index.vue'
/** 线索来源图表 */
import ClueSource from '../clue-source/index.vue'
import {
    enforceTopCityData,
    enforceTopDeptData,
    progress,
} from '../data/center'
@Component({
    name: 'CommandCenter',
    components: {
        vueSeamlessScroll,
        ItemTitle,
        ProgressBar,
        IconLabel,
        ClueSource,
    },
    computed: {
        defaultOption() {
            return {
                step: 0.2, // 数值越大速度滚动越快
                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 1, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
            }
        },
    },
})
export default class CommandCenter extends Vue {
    public dashboardData = [
        {
            label: '联合执法',
            value: 140,
            total: 140,
            totalLabel: '近一年\n累计总数',
        },
        {
            label: '协查协办',
            value: 10,
            total: 10,
            totalLabel: '近一年\n累计总数',
        },
        {
            label: '抄告抄送',
            value: 24,
            total: 55,
            totalLabel: '近一年\n累计总数',
        },
        {
            label: '线索移交',
            value: 5,
            total: 5,
            totalLabel: '近一年\n累计总数',
        },
        {
            label: '联合会商',
            value: 27,
            total: 27,
            totalLabel: '近一年\n累计总数',
        },
    ] // 仪表盘数据
    public dashboardIndex = -1 // 仪表盘选中(-1  执法协作分布)
    /** 执法协作分布（TOP5）地区 */
    public enforceTopCity: any = []
    /** 执法协作分布（TOP5）部门 */
    public enforceTopDept: any = []
    public enforceTopName = '执法协作分布'
    /** 执法任务下发 */
    public taskIssueData = [
        {
            label: '累计下发任务',
            value: 2075,
        },
        {
            label: '累计检查户次',
            value: 2058,
        },
    ]
    /** 执法任务下发 */
    public eventAppearData = [
        {
            label: '累计上报事件',
            value: 7010,
        },
        {
            label: '事件核查处置',
            value: 6986,
        },
    ]
    /** 时间类型分布(TOP5) */
    public eventTopOption = {}
    public taskPolo = 2058 / 2075 // 年报率水球图
    public clueSum = {
        icon: require('../../images/jsxszs.png'),
        label: '重大活动累计总数',
        labelClass: 'font24',
        value: 54,
        valueClass: 'font36',
        alignItems: 'center',
        imgWidth: 41,
    }
    public distributeTask = [
        {
            label: '派发核查任务数',
            value: 80,
        },
        {
            label: '其中本年',
            value: 52,
            unit: '',
            value_1: progress((52 / 80) * 100),
            value_1Class: 'yellow',
            unit_1: '% ',
        },
    ]
    /**
     * 执法协作支持
     */
    public dashboardChange(e: any) {
        const cityKey = [
            'LHZF_City',
            'XCXB_City',
            'CGCS_City',
            'XSYJ_City',
            'LHHS_City',
        ]
        const diptKey = [
            'LHZF_Dept',
            'XCXB_Dept',
            'CGCS_Dept',
            'XSYJ_Dept',
            'LHHS_Dept',
        ]
        const nameData = [
            '联合执法',
            '协查协办',
            '抄告抄送',
            '线索移交',
            '联合会商',
        ]
        if (e == -1) {
            this.enforceTopCity = enforceTopCityData.All_City
            this.enforceTopDept = enforceTopDeptData.All_Dept
            this.enforceTopName = '执法协作分布'
        } else {
            this.enforceTopCity = enforceTopCityData[cityKey[e]]
            this.enforceTopDept = enforceTopDeptData[diptKey[e]]
            this.enforceTopName = nameData[e]
        }
        this.enforceTopCity = this.enforceTopCity.map((res: any) => {
            return {
                ...res,
                progressColor: 'rgba(86, 181, 249, 1)',
                topLineColor: 'rgba(11, 47, 97, 1)',
            }
        })
        this.enforceTopDept = this.enforceTopDept.map((res: any) => {
            return {
                ...res,
                progressColor: 'rgba(102, 211, 235, 1)',
                topLineColor: 'rgba(11, 47, 97, 1)',
            }
        })
        this.dashboardIndex = e
    }
    /** 时间类型分布(TOP5) */
    private getEventTopOption() {
        const colorArray = {
            top: 'rgba(54, 117, 246, 1)', //黄
            bottom: 'rgba(102, 212, 235, 1)',
        }
        const yAxisData = [
            '食药安全',
            '工商监管',
            '城市管理',
            '卫生健康',
            '安全生产',
        ]
        const seriesData = [5509, 1261, 31, 900, 30]
        this.eventTopOption = {
            tooltip: {
                show: true,
                formatter: '{b}:{c}',
            },
            grid: {
                left: '5%',
                top: 0,
                right: '30%',
                bottom: '8%',
                containLabel: true,
            },

            xAxis: {
                type: 'value',
                show: false,
                position: 'top',
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff',
                    },
                },
                splitLine: {
                    show: false,
                },
            },
            yAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false,
                        alignWithLabel: false,
                        length: 5,
                    },
                    splitLine: {
                        //网格线
                        show: false,
                    },
                    inverse: 'true', //排序
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#fff',
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        fontSize: 20,
                        color: '#FFFFFF',
                    },
                    data: yAxisData,
                },
            ],
            series: [
                {
                    name: '分布值',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}',
                            textStyle: {
                                color: 'rgba(0, 252, 255, 1)', //color of value
                                fontSize: 24,
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            show: true,
                            color: (params: any) => {
                                return {
                                    type: 'linear',
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: colorArray.bottom,
                                        },
                                        {
                                            offset: 1,
                                            color: colorArray.top,
                                        },
                                    ],
                                    //globalCoord: false
                                }
                            },
                            barBorderRadius: 70,
                            borderWidth: 0,
                            borderColor: '#333',
                        },
                    },
                    barGap: '0%',
                    barCategoryGap: '50%',
                    data: seriesData,
                },
            ],
        }
    }
    public clueSource = [
        {
            name: '来电来信来访',
            value: '28',
            color: '#A24AFF',
        },
        {
            name: '视频巡查',
            value: '31',
            color: '#E29D4D',
        },
        {
            name: '掌上执法自主上报',
            value: '0',
            color: '#9AEAE8',
        },
        {
            name: '其他',
            value: '8',
            color: '#4AB4FF',
        },
        {
            name: '线索快照',
            value: '13',
            color: '#e99aea',
        },
    ]
    /**
     * 获取数据
     */
    private getData() {}
    created() {}
    mounted() {
        this.dashboardChange(-1)
        setTimeout(() => {
            this.dashboardChange(-1)
        }, 300)
        this.getEventTopOption()
    }
}
</script>

<style lang="less" scoped>
.command-center {
    width: 1040px;
    .flex1 {
        flex: 1;
    }
    //   执法协作支持
    .enforce-support {
        padding: 22px 10px;
        &__top {
            height: 200px;
            display: flex;
            justify-content: space-around;
        }
        .dashboard-item {
            width: 190px;
            height: 200px;
            background: url('../../images/dashboard.png') no-repeat;
            background-size: 100% 100%;
            opacity: 0.8;
            cursor: pointer;
            &.dashboard__active {
                background: url('../../images/dashboard_active.png') no-repeat;
                background-size: 100% 100%;
                opacity: 1;
            }
        }
        //   执法协作分布（TOP5）
        .enforce-Top {
            margin-top: 25px;
            .small-title {
                background: url('../../images/enforce-small-title.png')
                    no-repeat;
                background-size: 100% 100%;
            }
            &__content {
                display: flex;
                justify-content: space-between;
                > div {
                    height: 180px;
                    overflow: hidden;
                }
                .enforce-bar {
                    width: 468px;
                    padding: 12px 0;
                }
            }
        }
    }

    .center-bottom {
        display: flex;
        justify-content: space-between;
        > * {
            width: 502px;
        }
        .basic-synergy,
        .thread-dispose {
            height: 503px;
            padding: 20px 10px;
        }
        .synergy-small__title {
            min-width: 200px;
            display: flex;
            align-items: center;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            margin-bottom: 20px;
            > img {
                width: 41px;
                height: 40px;
                margin-right: 8px;
            }
        }
        // 基层智治协同
        .basic-synergy {
            > div {
                display: flex;
            }
            .polo-container {
                width: 170px;
                height: 170px;
                margin-left: 80px;
                margin-top: 10px;
            }
        }
        .event-distribute-TOP {
            .synergy-small__title {
                > img {
                    width: 30px;
                    height: 30px;
                }
            }
            .event-echarts {
                width: 250px;
                height: 230px;
                margin-top: -20px;
            }
        }
    }
    /deep/.yellow {
        background: linear-gradient(180deg, #ffffff 0%, #ffa200 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>
