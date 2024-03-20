<!--
   改革指数评估详情
-->
<template>
    <div class="target-detail">
        <el-dialog
            :title="title"
            :width="width"
            :visible="true"
            :before-close="handleClose"
        >
            <div class="dialog-content">
                <div class="content-header">
                    省平均指数：{{ detailData.meanNumber || '-' }}
                </div>
                <div class="content-body">
                    <div class="content-body__top">
                        <div class="group-view left">
                            <span class="sg-m-b-30"
                                >区域划分：{{ item.areaname }}</span
                            >
                            <span>区划编码：{{ item.areacode }}</span>
                        </div>
                        <div class="group-view center">
                            <div class="sg-m-b-30 view-two">
                                <span> 改革指数：{{ item.final_score }} </span>
                                <!-- <span class="radio-txt">{{
                                    detailData.upNumber
                                }}</span> -->
                            </div>
                            <span>评估日期：{{ item.ds }}</span>
                        </div>
                        <div class="group-chart">
                            <my-echarts
                                height="180px"
                                :loading="lineLoading"
                                :option="finalLineOption"
                            />
                        </div>
                    </div>

                    <div class="content-body__center">
                        <span class="group-title">改革扣分项</span>
                        <section class="list-wrap">
                            <div
                                class="item"
                                v-for="(item, index) in reformMarkList"
                                :key="index"
                            >
                                <span class="item-label sg-ellipsis-1"
                                    >{{ item.label }}：</span
                                >
                                <div class="item-right">
                                    <span class="item-right--score">{{
                                        item.curr
                                    }}</span>
                                    <span>满分：</span>
                                    <span>{{ item.total }}</span>
                                </div>
                            </div>
                        </section>
                        <div class="more-btn" @click="onMore" v-if="isShowMore">
                            {{ moreBtnTxt }}
                        </div>
                    </div>

                    <div class="content-body__bottom">
                        <span class="group-title">详细报告</span>
                        <table-view :list="tableList" />
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TableView from './table-view.vue'
import {
    useLineChart,
    LineData,
    LineOption,
} from '@/entry/integrates-bigscreen/hooks/echarts/modules/line'
import { arrayTransObj } from '@/entry/integrates-bigscreen/scripts/utils/index'

@Component({
    name: '',
    components: { TableView },
})
export default class TargetDetail extends Vue {
    @Prop({ default: () => '' }) title!: string
    @Prop({ default: () => '800px' }) width!: string
    /** 地区数据 */
    @Prop({ default: () => ({}) }) item!: Record<string, any>
    spanArr1: any[] = []
    spanArr2: any[] = []
    arrPosition1: any = 0
    arrPosition2: any = 0
    /** 折线图配置项 */
    public lineConfig: Record<string, any> = {
        title: { text: '', left: 'center' },
        grid: {
            top: '10%',
        },
        xAxis: {
            axisLabel: {
                interval: 0,
                // rotate: 20,
                textStyle: {
                    color: '#fff',
                },
            },
        },
    }
    public lineLoading: boolean = false
    public lineOption: LineData = {
        legend: [],
        xAxis: [],
        series: [],
    }
    /** 是否可以查看更多 */
    public hasMore: boolean = true
    public detailData: any = {}
    /** 改革扣分项数据 */
    public markList: any[] = []
    /** 详细报告 */
    public tableList: any = []
    /** 折线图 - option */
    get finalLineOption() {
        return useLineChart(this.lineOption, this.lineConfig)
    }
    /** 改革扣分项 - 数据展示 */
    get reformMarkList() {
        return this.hasMore ? this.markList.slice(0, 8) : this.markList
    }
    /** 展开/收起按钮 */
    get moreBtnTxt() {
        return this.hasMore ? '展开' : '收起'
    }
    /** 是否显示 - 展开/收起 按钮 */
    get isShowMore() {
        return this.markList.length > 8
    }
    created() {}
    mounted() {
        this.getData()
        this.getMonthRangeData()
        // this.getDetailData()
        // this.getData_Line()
    }
    public handleClose() {
        const _options: any = this.$options
        _options.cancel('cancel')
    }
    /** 展开/收起 */
    public onMore() {
        console.log('展开/收起')
        this.hasMore = !this.hasMore
    }
    public async getData() {
        console.log('item :>> ', this.item)
        const params = {
            param: {
                areacode: '33',
                ds: this.item.ds,
            },
        }
        console.log('params :>> ', params)
        const res: any = await this.syncData(params)
        console.log('res :>> ', res)
        const { processResult = [] }: any = res[0]
        console.log('processResult :>> ', processResult)
        const [
            ggzsZb = {},
            ggzsZb1 = {}, // 1级指标详情
            ggzsZb3 = {}, // 1、2、3级指标详情
            ggzsZbKf = {}, // 扣分项
        ] = processResult
        console.log('ggzsZb3 :>> ', ggzsZb3)
        console.log('ggzsZbKf :>> ', ggzsZbKf)
        this.getMarkData(ggzsZbKf.value)
        this.getTableData(ggzsZb3.value)
    }
    /**
     * 获取各个月度的数据 - 月度折线图
     */
    public async getMonthRangeData() {
        const params = {
            placeAreaCode: 'GGZS-GY',
            param: {
                areacode: '33',
            },
        }
        const res = await this.syncData(params)
        console.log('month-range-res :>> ', res)
        const { processResult = [] }: any = res[0]
        const [ggzsZb = {}] = processResult
        const list = ggzsZb.value
        // todo 超过了12个月，取最近的12个月
        const monthList: any =
            list.length < 12 ? list : list.slice(list.length - 12)
        console.log('monthList :>> ', monthList)
        const currYear = new Date().getFullYear()
        const xAxisData: any[] = [],
            seriesData: any[] = []
        monthList.forEach((v: any) => {
            const ds =
                v.ds.indexOf(currYear) === -1
                    ? `${currYear - 1}年${v.ds.slice(4)}月`
                    : `${v.ds.slice(4)}月`
            xAxisData.push(ds)
            seriesData.push(v.final_score)
        })
        console.log('xAxisData :>> ', xAxisData)
        console.log('seriesData :>> ', seriesData)
        this.lineOption.xAxis = xAxisData
        this.lineOption.series = [seriesData]
    }
    /** 获取扣分项 - data */
    public getMarkData(list: any[]) {
        this.markList = list.map((v: any) => {
            // console.log('v :>> ', v)
            return {
                ...v,
                label: v.zb_3,
                curr: v.final_score,
                total: v.zb_score,
            }
        })
        console.log('this.markList :>> ', this.markList)
    }
    /** 获取详细报告 - data */
    public getTableData(list: any[]) {
        // const zb_1: any[] = []
        // const zb_2: any[] = []
        // const stack: any = [...list]
        // const result: any[] = []
        // while (stack.length) {
        //     const pop: any = stack.pop()
        //     console.log('pop :>> ', pop)
        //     if (pop.id_1 && pop.id_2) {
        //         result.push(pop)
        //     }
        //     if (zb_1.includes(pop.zb_1) && pop.id_1) {
        //         // todo 说明已经添加过了字段： id_1
        //     } else {
        //         zb_1.push(pop.zb_1)
        //         pop.id_1 = `zb_1_${pop.zb_1}`
        //         stack.push(pop)
        //     }
        //     if (zb_2.includes(pop.zb_2) && pop.id_2) {
        //         // todo 说明已经添加过了字段： id_2
        //     } else {
        //         zb_2.push(pop.zb_2)
        //         pop.id_2 = `zb_2_${pop.zb_2}`
        //         stack.push(pop)
        //     }
        // }
        // console.log('zb_1 :>> ', zb_1)
        // console.log('zb_2 :>> ', zb_2)
        // console.log('result :>> ', result)

        // const data_1: Record<string, any> = arrayTransObj(list, 'zb_1', 'array')
        // const list_1: any[] = Object.entries(data_1).map(
        //     (v: any, index: number) => {
        //         // console.log('v :>> ', v)
        //         const result: any = v[1].map((c: any) => {
        //             return {
        //                 ...c,
        //                 id_1: `zb_1_${index}`,
        //             }
        //         })
        //         return result
        //     },
        // )
        // console.log('data_1 :>> ', data_1)
        // console.log('list_1 :>> ', list_1)
        this.tableList = list.map((item: any, index) => {
            // console.log('item :>> ', item)
            return {
                ...item,
                // id_1: `zb_1_${item.zb_1}`,
                // id_2: `zb_2_${item.zb_2}`,
            }
        })
        console.log('tableList :>> ', this.tableList)
        this.rowspan(this.spanArr1, this.arrPosition1, 'zb_1')
        this.rowspan(this.spanArr2, this.arrPosition2, 'zb_2')
        console.log('this.spanArr1 :>> ', this.spanArr1)
        console.log('this.arrPosition1 :>> ', this.arrPosition1)
        console.log('this.spanArr2 :>> ', this.spanArr2)
        console.log('this.arrPosition2 :>> ', this.arrPosition2)
        this.tableList = this.tableList.map((item: any, index: number) => {
            return {
                ...item,
                type_zb_1: this.spanArr1[index],
                type_zb_2: this.spanArr2[index],
            }
        })
    }
    /** 做标记 */
    rowspan(spanArr: any, position: any, spanName: any) {
        this.tableList.forEach((item: any, index: number) => {
            if (index === 0) {
                spanArr.push(1)
                position = 0
            } else {
                if (
                    this.tableList[index][spanName] ===
                    this.tableList[index - 1][spanName]
                ) {
                    spanArr[position] += 1
                    spanArr.push(0)
                } else {
                    spanArr.push(1)
                    position = index
                }
            }
        })
    }
    /** 获取数据 */
    public async syncData(params: any) {
        params = {
            placeCode: 'GGZS',
            placeAreaCode: 'GGZS',
            ...params,
        }
        console.log('params :>> ', params)
        const res: any = await this.$http.post(
            '/api/v2/bi/place/dataRuleGroup/doGetPlaceData',
            params,
        )
        return res
    }
    public getDetailData() {
        const res: any = {
            meanNumber: 86.12,
            areaName: '杭州市',
            reformNumber: '92.10',
            upNumber: '3.2',
            areaCode: '330000',
            evaluateTime: '2022年8月',
            chartData: {
                xAxis: [10, 11, 12, 1, 2, 3, 4],
                series: [100, 126, 26, 312, 400, 520, 606],
            },
            markData: this.setMarkData(),
            tableData: this.setTestTableData(),
        }
        console.log('res :>> ', res)
        const { markData, tableData }: any = res
        console.log('markData :>> ', markData)
        setTimeout(() => {
            this.detailData = res
            this.markList = this.markList.map((v: any) => {
                // console.log('v :>> ', v)
                return {
                    ...v,
                    curr: markData[v['field1']],
                    total: markData[v['field2']],
                }
            })
            console.log('this.markList :>> ', this.markList)
            this.tableList = tableData.map((v: any, index: any) => {
                const temp: any = { ...v }
                console.log('v :>> ', v)
                return temp
            })
            console.log('this.tableList :>> ', this.tableList)
        }, 500)
    }
    async getData_Line() {
        this.lineLoading = true
        const testData: any = {
            xAxis: [],
            yAxis: [],
            series: [],
        }
        testData.xAxis = ['10月', '11月', '12月', '1月', '2月', '3月', '4月']
        const res: any = await this.syncTestData(testData, 1)
        console.log('bar-res :>> ', res)
        this.lineLoading = false
        const { xAxis, series }: any = res.data
        this.lineOption.xAxis = xAxis
        this.lineOption.series = series
    }
    syncTestData(testData: any, outerLen: number = 2, max: number = 3000) {
        const res: any = { code: 200, data: {}, message: '请求成功' }
        return new Promise((resolve, reject) => {
            const { xAxis, yAxis, series }: any = testData
            const innerLen: number = xAxis?.length ?? yAxis?.length
            console.log('innerLen :>> ', innerLen)
            res.data.xAxis = xAxis
            res.data.yAxis = yAxis
            res.data.series = series
            if (innerLen) {
                for (let i = 0; i < outerLen; i++) {
                    const temp: any = []
                    for (let j = 0; j < innerLen; j++) {
                        temp.push(Math.floor(Math.random() * max))
                    }
                    res.data.series.push(temp)
                }
            }
            setTimeout(() => {
                resolve(res)
            }, 500)
        })
    }
    setMarkData() {
        const obj: any = {
            clggldjg: 6,
            clggldjgTotal: 10,
            clzhzfzdb: 5,
            clzhzfzdbTotal: 10,
            yfggssfa: 4,
            yfggssfaTotal: 10,
            sxslzb: 3,
            sxslzbTotal: 10,
            clgggzzb: 2,
            clgggzzbTotal: 10,
            zkhybstj: 1,
            zkhybstjTotal: 10,
            lyfgl: 9,
            lyfglTotal: 10,
            sgsxzb: 8,
            sgsxzbTotal: 10,
            ggsxzb: 0,
            ggsxzbTotal: 10,
            ggfazb: 7,
            ggfazbTotal: 10,
        }
        return obj
    }
    setTestTableData(len: number = 10) {
        const yjzbList = ['部署推进(权重10%)', '职责体系(权重20%)']
        const ejzbList = ['组织机构', '领导重视']
        const sjzbList = [
            '成立综合执法指导办',
            '成立改革工作专班',
            '成立改革领导机构',
        ]
        const obj: any = {
            yjzb: '部署推进(权重10%)',
            ejzb: '组织机构',
            sjzb: '成立改革领导机构',
            mbyq: '党政领导领衔',
            df: 1,
            mf: 2,
            pfbzs:
                '党政主要领导领衔：2分，6月底前党政主要领导 出席：2分，未成立：0分',
            pfbz: [
                {
                    bz1: '党政主要领导领衔',
                    fs: '2分',
                },
                {
                    bz1: '6月底前党政主要领导 出席',
                    fs: '2分',
                },
                {
                    bz1: '未成立',
                    fs: '0分',
                },
            ],
        }
        const res: any = new Array(len).fill(obj).map((v: any, index) => {
            const temp: any = {
                ...v,
                // yjzb: yjzbList[Math.floor(Math.random() * 2)],
                ejzb: ejzbList[Math.floor(Math.random() * 2)],
                sjzb: sjzbList[Math.floor(Math.random() * 3)],
            }
            return temp
        })
        return res
    }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
    // overflow-y: auto;
    // height: 848px;
    background: #083279;

    .el-dialog__header {
        display: flex;
        justify-content: center;
        padding: 16px 26px;

        .el-dialog__headerbtn .el-dialog__close {
            font-size: 20px;
            color: #fff;
        }
    }

    .el-dialog__title {
        font-size: 24px;
        color: #fff;
        padding-left: 24px;
    }

    .el-dialog__body {
        font-size: 18px;
        color: #fff;
        padding: 16px;
    }
}

.dialog-content {
    .group-title {
        display: block;
        font-size: 20px;
        color: #80b4fb;
        margin-bottom: 16px;

        &:before {
            display: inline-block;
            content: '·';
            margin-right: 6px;
        }
    }
}

.content-header {
    font-size: 20px;
    color: #83fffe;
    line-height: 28px;
    margin-bottom: 16px;
}

.content-body {
    border-radius: 6px;
    border: 1px solid #5b8ff9;
    padding: 0 14px 14px;

    .content-body__top {
        display: flex;
        padding: 0 10px 10px 24px;
        // padding: 35px 36px 20px 24px;

        .group-view {
            display: flex;
            flex-direction: column;
            width: 320px;
            padding-top: 46px;

            .view-two {
                display: flex;
                align-items: center;

                .radio-txt {
                    font-size: 16px;
                    color: #ff2828;
                    margin-left: 16px;
                }
            }
        }

        .group-chart {
            flex: 1;
            padding-top: 20px;
            // height: 160px;
            // border: 1px solid #fff;
        }
    }

    .content-body__center {
        background: rgba(3, 32, 116, 0.8);
        line-height: 28px;
        border-radius: 6px;
        padding: 16px 0 8px 8px;

        .list-wrap {
            display: flex;
            flex-wrap: wrap;
            padding: 0 32px;

            .item {
                display: flex;
                justify-content: flex-end;
                width: 25%;
                font-size: 18px;
                margin-bottom: 16px;
                padding-right: 54px;

                &:nth-child(4n) {
                    padding-right: 0;
                }

                .item-label {
                    flex: 1;
                    text-align: right;
                }

                .item-right {
                    width: 140px;
                    text-align: right;

                    .item-right--score {
                        color: #ffc86c;
                        margin-right: 24px;
                    }
                }
            }
        }

        .more-btn {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
            cursor: pointer;
        }
    }

    .content-body__bottom {
        padding: 24px 0 0 0;
    }
}
</style>
