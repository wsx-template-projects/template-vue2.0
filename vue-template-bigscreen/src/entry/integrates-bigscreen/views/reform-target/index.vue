<template>
    <my-screen :is-scale="true" :width="width" :height="height">
        <div class="sg-page page-reform-target">
            <header class="page-target__header">
                <page-header :left-one="'返回总驾驶舱'" :title="'“改革指数'">
                    <!-- <div slot="right-one" style="font-size: 18px">
                        <i
                            class="el-icon-time"
                            style="margin-right: 10px; font-size: 20px"
                        ></i
                        >2022-08-24
                    </div> -->
                </page-header>
            </header>

            <div class="page-target__content">
                <div class="content-top">
                    <el-radio-group
                        class="target-nav-select"
                        v-model="activeNav"
                        fill="#0169CC"
                        @change="changeNav"
                    >
                        <el-radio-button
                            :label="tab.value"
                            v-for="(tab, index) in navList"
                            :key="index"
                            >{{ tab.label }}</el-radio-button
                        >
                    </el-radio-group>

                    <div class="target-area-select">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ areaName
                                }}<i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    :command="item.value"
                                    v-for="item in areaList"
                                    :key="item.value"
                                    >{{ item.label }}</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

                <div class="content-bottom">
                    <template v-if="activeNav === '1'">
                        <div class="target-area">
                            <div class="area-box">
                                <area-item
                                    class="area-item"
                                    :item="item"
                                    :index="index"
                                    v-for="(item, index) in tableList"
                                    :key="index"
                                />
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <rank-list :info-data="rankData" />
                    </template>
                </div>
            </div>
        </div>
    </my-screen>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PageHeader from './components/page-header.vue'
import AreaItem from './components/area-item-view.vue'
import RankList from './components/rank-list-view.vue'
import { arrayTransObj } from '@/entry/integrates-bigscreen/scripts/utils/index'
import { areaMap, AREA_CODE } from './services/index'

interface InParams {
    /** 上一级code */
    sup_areacode: string
    /** 当前地区code */
    areacode?: string
    /** 时间 */
    ds?: string
    /** 其它参数 */
    [propName: string]: any
}

interface OutParams {
    /**  */
    placeCode: string
    /**  */
    placeAreaCode: string
    /**  */
    param: InParams
}

@Component({
    components: { PageHeader, AreaItem, RankList },
})
export default class ReformTarget extends Vue {
    width: number = 2560
    height: number = 1440
    activeNav: string = '1'
    navList: any = [
        {
            label: '区域分布',
            value: '1',
        },
        {
            label: '排行榜',
            value: '2',
        },
    ]
    /** 当前月和上个月 */
    times: any = []
    /** 选中的地区code */
    activeArea: string = AREA_CODE.QUANSHENG
    /** 地区 - list */
    areaList: any = Object.values(areaMap)
    tableList: any = []
    rankData: any = {
        left: [],
        right: [],
    }
    /** 选中的地区label */
    get areaName() {
        return areaMap[this.activeArea].label
    }
    created() {
        this.times = this.getTimeData()
        this.getAreaGradeData()
        // this.getAreaData()
    }
    mounted() {}
    /** 获取当前月和上一月 */
    getTimeData(type: string = 'yyyy-MM') {
        const date: Date = new Date()
        const year: number = date.getFullYear()
        const month: number = date.getMonth() + 1
        let prevDate: string =
            month === 1
                ? `${year - 1}${12}`
                : `${year}${month < 11 ? '0' + (month - 1) : month - 1}`
        let currDate: string = `${year}${month < 10 ? '0' + month : month}`
        return [prevDate, currDate]
    }
    /** 区域分布/排行榜 - 选择 */
    changeNav(data: any) {
        console.log('nav-data :>> ', data)
    }
    /** 地区 - 选择 */
    changeArea(data: any) {
        console.log('data :>> ', data)
        if (this.activeNav == '1') {
            this.getTableData()
        } else {
            this.getRankData()
        }
    }
    handleCommand(val: any) {
        console.log('val :>> ', val)
        this.activeArea = val
        this.getAreaGradeData()
    }
    /** 获取地市总分值 */
    public async getAreaGradeData() {
        const placeAreaCode: string =
            this.activeArea != AREA_CODE.QUANSHENG ? 'GGZS' : 'GGZS-GY'
        const params: any = {
            placeAreaCode,
            sup_areacode: this.activeArea,
            ds: this.times[0],
        }
        const {
            rankObj: prevO,
            rankList: prevR,
            result: prevM,
        } = await this.getData(params)
        const {
            rankObj: currO,
            rankList: currR,
            result: currM,
        } = await this.getData({
            ...params,
            ds: this.times[1],
        })
        console.log('prevMonth :>> ', prevM)
        console.log('currMonth :>> ', currM)
        console.log('prevO :>> ', prevO)
        console.log('currO :>> ', currO)
        this.getCurrMonthData(currR)
        if (!prevM.length) {
            // todo 上个月数据不存在
            this.tableList = currM.map((v: any, index: number) => {
                return {
                    ...v,
                    diff_score: index % 2 == 1 ? 6 : -6,
                }
            })
        } else {
            this.tableList = currM.map((v: any, index: number) => {
                console.log('v :>> ', v)
                const temp: any = { ...v, diff_score: '' }
                const prev: any = prevM?.[index]
                console.log('prev :>> ', prev)
                const diff = v.final_score - prevO?.[v.areaname].final_score
                console.log('diff :>> ', diff)
                temp.option.legend = [
                    ...temp.option.legend,
                    ...prev.option.legend,
                ]
                temp.option.series = [
                    ...temp.option.series,
                    ...prev.option.series,
                ]
                return temp
            })
        }
        this.tableList = this.tableList.sort(
            (a: any, b: any) => b.final_score - a.final_score,
        )
        console.log('this.tableList :>> ', this.tableList)
    }
    /** 获取当前月排行榜数据 */
    async getCurrMonthData(data: any) {
        console.log('当前月')
        console.log('data :>> ', data)
        this.rankData.left = this.handleRankData(data.value, 'desc')
        this.rankData.right = this.handleRankData(data.value, 'asc')
        console.log('this.rankData :>> ', this.rankData)
        // if (this.activeArea == '33') {
        // } else {
        //     const params: any = {
        //         placeAreaCode: 'GGZS-GY',
        //         param: {
        //             sup_areacode: this.activeArea,
        //             ds: '202208',
        //         },
        //     }
        //     const res: any = await this.syncData(params)
        //     console.log('res :>> ', res)
        // }
    }
    /**
     * @description 处理排行榜数据
     * @param {string} type 排序类型：asc:升序；desc:降序
     * @param {number} len 返回的数组长度，默认为 10
     * */
    handleRankData(list: any, type: string, len: number = 10) {
        return list
            .sort((a: any, b: any) => {
                return type === 'asc'
                    ? a.final_score - b.final_score
                    : b.final_score - a.final_score
            })
            .slice(0, len)
            .map((v: any, index: number) => ({ ...v, index: index + 1 }))
    }
    /**
     * 获取各个月度数据
     * @param {*} params
     * */
    public async getData(params: any) {
        const { ds }: any = params
        const res: any = await this.syncData(params)
        console.log('获取各月度信息-res :>> ', res)
        const { processResult = [] }: any = res[0]
        const [rankData = {}, radarData = {}] = processResult
        console.log('processResult :>> ', processResult)
        console.log('radarData.value :>> ', radarData.value)
        const _rankData: any = arrayTransObj(rankData.value, 'areaname')
        const _radarData: any = arrayTransObj(
            radarData.value,
            'areaname',
            'array',
        )
        console.log('_rankData :>> ', _rankData)
        console.log('_radarData :>> ', _radarData)
        const radarList: any = Object.entries(_radarData).map(
            (v: any, index: number) => {
                const areaName: string = v[0]
                const radar: any = [],
                    series: any = []
                v[1].forEach((c: any) => {
                    radar.push({ name: c.zb_1, max: c.zb_score })
                    series.push(c.final_score)
                })
                return {
                    areaName,
                    option: {
                        legend: [ds],
                        radar,
                        series: [series],
                    },
                    ..._rankData[areaName],
                }
            },
        )
        return {
            rankList: rankData,
            rankObj: _rankData,
            result: radarList,
        }
    }
    /** 获取数据 */
    public async syncData({ placeAreaCode, ...other }: any) {
        const params: OutParams = {
            placeCode: 'GGZS',
            placeAreaCode: 'GGZS',
            param: {
                ...other,
            },
        }
        if (placeAreaCode) {
            params.placeAreaCode = placeAreaCode
        }
        console.log('params :>> ', params)
        const res: any = await this.$http.post(
            '/api/v2/bi/place/dataRuleGroup/doGetPlaceData',
            params,
        )
        return res
    }
    /** 获取地区列表数据 */
    public async getAreaData() {
        try {
            const res: any = await this.setAreaData(6)
            console.log('res :>> ', res)
            this.areaList = res.data
        } catch (err) {
            console.log('err :>> ', err)
        }
    }
    /** 获取地区分布 - table 数据 */
    public async getTableData() {
        const params = { areaCode: this.activeArea }
        console.log('params :>> ', params)
        try {
            const res: any = await this.setTableData(6)
            console.log('res :>> ', res)
            this.tableList = res.data
        } catch (err) {
            console.log('err :>> ', err)
        }
    }
    /** 获取排行榜数据 */
    public async getRankData() {
        const params = { areaCode: this.activeArea }
        console.log('params :>> ', params)
        try {
            const res: any = await this.setRankData(10)
            console.log('res :>> ', res)
            const {
                data: { left, right },
            }: any = res
            this.rankData.left = left
            this.rankData.right = right
        } catch (err) {
            console.log('err :>> ', err)
        }
    }
    async setAreaData(len: number = 10) {
        const obj: any = {
            areaName: '杭州市',
            areaCode: 330000,
        }
        const res: any = await this.setTestData(obj, 10)
        res.data = res.data.map((v: any, index: any) => {
            return {
                ...v,
                areaCode: v.areaCode + index,
            }
        })
        return Promise.resolve(res)
    }
    async setTableData(len: number = 10) {
        const obj: any = {
            areaName: '杭州市',
            option: {
                legend: ['7月', '8月'],
                radar: [
                    { name: '体制重塑', max: 6500 },
                    { name: '机制重建', max: 16000 },
                    { name: '数字赋能', max: 30000 },
                    { name: '改革保障', max: 38000 },
                    { name: '社会满意', max: 52000 },
                ],
                series: [
                    [4200, 3000, 20000, 35000, 50000],
                    [5000, 14000, 28000, 26000, 42000],
                ],
            },
        }
        const res: any = await this.setTestData(obj, 10)
        res.data = res.data.map((v: any, index: any) => {
            // console.log('v :>> ', v)
            return {
                ...v,
                rankNumber: index + 1,
            }
        })
        return Promise.resolve(res)
    }
    async setRankData(len: number = 10) {
        const obj: any = {
            areaName: '西湖区',
            reformNumber: '94.6',
        }
        const leftRes: any = await this.setTestData(obj, 10)
        const rightRes: any = await this.setTestData(obj, 10)
        console.log('leftRes :>> ', leftRes)
        const res: any = {
            data: {
                left: [],
                right: [],
            },
        }
        res.data.left = leftRes.data.map((v: any, index: any) => {
            // console.log('v :>> ', v)
            return {
                ...v,
                index: index + 1,
            }
        })
        res.data.right = rightRes.data.map((v: any, index: any) => {
            // console.log('v :>> ', v)
            return {
                ...v,
                index: index + 1,
            }
        })
        console.log('rank-res :>> ', res)
        return Promise.resolve(res)
    }
    public setTestData(data: any, len: number) {
        const list: any = new Array(len).fill(data)
        const res: any = {
            data: list,
            code: 200,
            message: 'xxx',
        }
        return new Promise((resolve: any, reject: any) => {
            setTimeout(() => {
                resolve(res)
            }, 1000)
        })
    }
}
</script>

<style lang="less">
.el-dropdown-menu {
    overflow: auto;
    height: 254px;
    background: #06297c;
    color: #fff;
    border-radius: 6px;
    opacity: 0.96;
    border: 1px solid #06297c;
    margin: 0;
    padding: 6px 8px;

    .el-dropdown-menu__item {
        width: 170px;
        height: 32px;
        line-height: 32px;
        font-size: 18px;
        color: #fff;
        padding: 0 12px;

        &:hover {
            background: #0164c1;
            border-radius: 2px;
        }
    }
}

.el-popper {
    .popper__arrow {
        display: none;
    }
}
</style>

<style lang="less" scoped>
/deep/ .el-radio-button--medium {
    .el-radio-button__inner {
        background: #0e286f;
        font-size: 18px;
        color: #fff;
        line-height: 26px;
        border-radius: 2px;
        border: 2px solid rgba(24, 117, 200, 0.8);
        padding: 6px 20px;
    }
}

.page-reform-target {
    display: flex;
    flex-direction: column;
    height: 100%;

    .page-target__header {
    }

    .page-target__content {
        flex: 1;
        overflow-y: auto;
        padding: 0 40px;

        .content-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
    }
}

.target-area {
    .area-box {
        display: flex;
        flex-wrap: wrap;

        .area-item {
            width: calc(25% - 18px);
            min-width: 442px;
            min-height: 484px;
            margin-right: 24px;
            margin-bottom: 30px;

            &:nth-child(4n) {
                margin-right: 0;
            }
        }
    }
}

.target-area-select {
    /deep/ .el-dropdown {
        font-size: 20px;
        font-weight: 500;
        color: #83fffe;
        line-height: 28px;
        cursor: pointer;

        .el-icon--right {
            font-size: 28px;
            margin-left: 24px;
        }
    }
}
</style>
