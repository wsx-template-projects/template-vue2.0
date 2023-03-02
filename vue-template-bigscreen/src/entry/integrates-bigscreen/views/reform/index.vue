<template>
    <MyScreen :is-scale="true" :width="width" :height="height">
        <div class="sg-page page-reform">
            <header class="page-reform__header">
                <index-title @back="back" :ifBack="true" :title="'改革全景'">
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
                <!-- 左屏 -->
                <reform-left :param="param"></reform-left>
                <section class="reform-center">
                    <!-- 全览指标   晾晒台 -->
                    <div class="reform-center-title pointer" @click="toHref(1)">
                        晾晒台
                        <!-- <img
                src="../../assets/images/integrates/reform-right.png"
                alt=""
              /> -->
                    </div>
                    <div class="reform-center-title-icon"></div>
                    <div class="sun-cure-platform">
                        <div class="indicator">
                            <div></div>
                            <div>目标</div>
                            <div>进度</div>
                        </div>
                        <div
                            class="information"
                            v-for="(item, index) in sunCureData"
                            :key="index"
                        >
                            <div>{{ item.label }}</div>
                            <div>
                                <div v-if="item.isCountTo">
                                    <count-to
                                        v-if="!isNaN(item.target)"
                                        class="font32"
                                        :startVal="0"
                                        :endVal="Number(item.target)"
                                        :duration="2000"
                                        :decimals="2"
                                        suffix="%"
                                        ref="countRef"
                                    ></count-to>
                                    <span v-else>{{ item.target }}</span>
                                </div>
                                <div v-else>{{ item.target }}</div>
                            </div>
                            <div>
                                <div v-if="item.isCountTo">
                                    <count-to
                                        v-if="!isNaN(item.schedule)"
                                        class="schedule-color font32"
                                        :startVal="0"
                                        :endVal="Number(item.schedule)"
                                        :duration="2000"
                                        :decimals="2"
                                        suffix="%"
                                        ref="countRef"
                                    ></count-to>
                                    <span v-else>{{ item.schedule }}</span>
                                </div>
                                <div class="schedule-color" v-else>
                                    {{ item.schedule }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 地图部分 -->
                    <echarts-map
                        :areaMap.sync="areaMap"
                        :mapData="mapData"
                        :formatterData="formatterData"
                        :isDescend="true"
                        class="EchartsMap mt20"
                    ></echarts-map>
                    <!-- 执法监督体系 -->
                    <section class="supervision">
                        <div
                            class="reform-title margin10-0 pointer"
                            @click="toHref(2)"
                        >
                            执法监督体系
                            <img
                                src="../../assets/images/integrates/reform-right.png"
                                alt=""
                            />
                        </div>
                        <div class="supervision-box">
                            <div
                                class="supervision-box-item"
                                v-for="(item, index) in supervisionListData"
                                :key="index"
                            >
                                <div class="item-title">{{ item.title }}</div>
                                <img :src="item.icon" class="mt30" alt="" />
                                <div class="flex mt10" style="width: 100%">
                                    <div
                                        class="item-data"
                                        v-for="(elem, i) in item.element"
                                        :key="i"
                                    >
                                        <div>{{ elem.label }}</div>
                                        <div v-if="!isNaN(Number(elem.value))">
                                            <count-to
                                                class="number-color font32"
                                                :startVal="0"
                                                :endVal="Number(elem.value)"
                                                :duration="2000"
                                                :decimals="
                                                    elem.decimals == 0 ? 0 : 2
                                                "
                                                ref="countRef"
                                            ></count-to>
                                            <span class="font20">{{
                                                elem.unit || ''
                                            }}</span>
                                        </div>
                                        <div v-else>
                                            {{ elem.value || '-' }}
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                <reform-right :param="param"></reform-right>
            </div>
        </div>
    </MyScreen>
</template>

<script>
/** 数字翻牌器 */
import countTo from 'vue-count-to'
/** header */
import IndexTitle from '../index/components/index-title.vue'
/** 左屏 */
import ReformLeft from './components/reform-left.vue'
/** 右屏 */
import ReformRight from './components/reform-right.vue'
import MyScreen from '../../components/global/my-screen/index.vue'

export default {
    name: 'Reform',
    components: { countTo, IndexTitle, ReformLeft, ReformRight, MyScreen },
    props: {},
    data() {
        return {
            width: 2560,
            height: 1440,
            currentTime: '', // 当前时间
            areaMap: '',
            mapData: [],
            formatterData: [],
            allData: [], // 全部数据
            sunCureData: [],
            supervisionListData: [],
            param: {},
            areacode: '',
            interval: null,
            MyScreen,
        }
    },
    computed: {},
    watch: {
        areaMap(e) {
            this.areacode = e.areacode
            this.param = {
                areacode: this.areacode,
            }
            this.getData()
        },
    },
    created() {
        this.currentTime = new Date()
            .toLocaleDateString()
            .split('/')
            .join('-')
    },
    mounted() {
        this.getData()
        this.getMapData()
        this.interval = setInterval(() => {
            const countRef = this.$refs.countRef
            countRef.forEach(e => {
                e.start()
            })
        }, 10 * 1000)
    },
    methods: {
        /**
         * 获取数据
         */
        async getData() {
            let params = {
                placeCode: 'DZH-GG',
                placeAreaCode: 'DZH-GG-ZB',
                param: {
                    areacode: '33',
                    ...this.param,
                },
            }
            const { 'dzh-zbj-gg': data } = await this.$http
                .post('/api/v2/bi/place/dataRuleGroup/doGetPlaceData', params)
                .then(res => {
                    const obj = {}
                    const { processResult } = res[0]
                    processResult.forEach(elem => {
                        obj[elem.key] = obj[elem.key]
                            ? [...obj[elem.key], ...elem.value]
                            : elem.value
                    })
                    return obj
                })
            this.allData = data
            this.getSunCureData()
            this.getSupervisionListData()
        },
        /**
         * 获取地图数据
         */
        async getMapData() {
            let params = {
                placeCode: 'DZH-GG',
                placeAreaCode: 'DZH-GG-ZB',
                param: {
                    areacode: '33',
                },
            }
            const { 'dzh-zbj-gg': data } = await this.$http
                .post('/api/v2/bi/place/dataRuleGroup/doGetPlaceData', params)
                .then(res => {
                    const obj = {}
                    const { processResult } = res[0]
                    processResult.forEach(elem => {
                        obj[elem.key] = obj[elem.key]
                            ? [...obj[elem.key], ...elem.value]
                            : elem.value
                    })
                    return obj
                })
            const mapAllData = data.filter(elem => elem.item_position == '地图')
            const formatterData = [
                { label: '队伍精简：', itemcode: '队伍精简', key: 'dwjj' },
                {
                    label: '力量下沉县乡：',
                    itemcode: '力量下沉县乡',
                    key: 'llxcxx',
                },
                {
                    label: '综合执法事项：',
                    itemcode: '综合执法事项占比',
                    key: 'zhzfsxzb',
                },
                {
                    label: '综合执法量：',
                    itemcode: '综合执法量占比',
                    key: 'zhzflzb',
                },
            ]
            const mapData = [
                {
                    name: '杭州',
                    value: 100,
                    mapData: {},
                },
                {
                    name: '宁波',
                    value: 200,
                    mapData: {},
                },
                {
                    name: '温州',
                    value: 300,
                    mapData: {},
                },
                {
                    name: '嘉兴',
                    value: 350,
                    mapData: {},
                },
                {
                    name: '湖州',
                    value: 400,
                    mapData: {},
                },
                {
                    name: '绍兴',
                    value: 500,
                    mapData: {},
                },
                {
                    name: '金华',
                    value: 550,
                    mapData: {},
                },
                {
                    name: '衢州',
                    value: 650,
                    mapData: {},
                },
                {
                    name: '舟山',
                    value: 700,
                    mapData: {},
                },
                {
                    name: '台州',
                    value: 750,
                    mapData: {},
                },
                {
                    name: '丽水',
                    value: 900,
                    mapData: {},
                },
            ]
            mapData.forEach(elem => {
                // 过滤每个地区的数据
                const areaData = mapAllData.filter(
                    v => v.dim6 == elem.name || v.dim6.indexOf(elem.name) > -1,
                )
                // 往地图 mapData 添加数据
                formatterData.forEach(item => {
                    const filterData = areaData.filter(
                        v => v.itemcode == item.itemcode,
                    )
                    elem.mapData[item.key] =
                        filterData.length > 0 ? filterData[0].value : 0
                    if (item.key == 'zhzflzb')
                        elem.value =
                            filterData.length > 0 ? filterData[0].value : 0
                    switch (item.key) {
                        case 'llxcxx':
                        case 'zhzfsxzb':
                        case 'zhzflzb':
                            elem.mapData[item.key] += '%'
                            break
                    }
                })
            })
            this.formatterData = formatterData
            this.mapData = mapData
        },
        /**
         * 获取晾晒指标数据
         */
        getSunCureData() {
            const data = this.allData
            console.log(JSON.parse(JSON.stringify(data)))
            this.sunCureData = [
                {
                    label: '队伍精简',
                    target: '1+8支以内',
                    schedule: this.filterData(data, '晾晒台队伍精简'),
                    isCountTo: false,
                },
                {
                    label: '力量下沉县乡',
                    target: '85',
                    schedule: this.filterData(data, '力量下沉县乡'),
                    isCountTo: true,
                },
                {
                    label: '综合执法事项',
                    target: '20',
                    schedule: this.filterData(data, '综合执法事项占比'),
                    isCountTo: true,
                },
                {
                    label: '综合执法量',
                    target: '60',
                    schedule: this.filterData(data, '晾晒台综合执法量'),
                    isCountTo: true,
                },
            ]
            console.log(this.filterData(data, '队伍精简'))
            console.log(JSON.parse(JSON.stringify(this.sunCureData)))
        },
        /**
         * 获取执法监督体系
         */
        getSupervisionListData() {
            const data = this.allData
            this.supervisionListData = [
                {
                    title: '基层法制审核',
                    icon: require('../../assets/images/reform/jcfzsh.svg'),
                    element: [
                        {
                            label: '案件审查量',
                            value: this.filterData(data, '案件审查量'),
                            unit: '',
                        },
                        {
                            label: '争议下降率',
                            value: this.filterData(data, '争议下降量'),
                            unit: '%',
                        },
                    ],
                },
                {
                    title: '行政执法评议',
                    icon: require('../../assets/images/reform/zfpy.svg'),
                    element: [
                        {
                            label: '评议活动数',
                            value: this.filterData(data, '评议活动数'),
                            unit: '次',
                            decimals: 0,
                        },
                        {
                            label: '群众满意度',
                            value: this.filterData(data, '群众满意度'),
                            unit: '%',
                        },
                    ],
                },
                {
                    title: '公权力监督',
                    icon: require('../../assets/images/reform/jcfzsh.svg'),
                    element: [
                        {
                            label: '监督次数',
                            value: this.filterData(data, '监督次数'),
                            unit: '',
                        },
                        {
                            label: '纠错率',
                            value: this.filterData(data, '纠错率'),
                            unit: '',
                        },
                    ],
                },
            ]
        },
        /**
         * 数据过滤
         */
        filterData(data, itemcode) {
            const filterData =
                Array.isArray(data) &&
                data.filter(item => {
                    return item.itemcode == itemcode
                })
            console.log(filterData)
            if (itemcode == '队伍精简')
                console.log(filterData.length > 0 ? filterData[0].value : 0)
            return filterData.length > 0 ? filterData[0].value : 0
        },
        /**
         * 左一 方法
         */
        back(e) {
            window.open('about:blank', '_top').close()
        },
        toHref(e) {
            switch (e) {
                case 1:
                    window.open(
                        'https://datav.aliyuncs.com/share/51cb556af28e57de688c83b32f065720',
                    )
                    break
                case 2:
                    window.open(
                        'http://zfjd.zjsft.gov.cn/enforcement/workbench',
                    )
                    break
            }
        },
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
}
</script>

<style lang="less" scoped>
.margin10-0 {
    margin: 10px 0;
}
.page-reform {
    .EchartsMap {
        width: 100%;
        height: 620px;
        position: relative;
    }
    &__header {
        width: 100%;
        height: 160px;
    }
    &__content {
        padding: 0 50px;
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 10;
    }
    .reform-center {
        flex: 1;
        margin: 0 10px;
        margin-top: 10px;
        &-title {
            width: 100%;
            text-align: center;
            font-size: 42px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: url('../../assets/images/reform/center-title.png')
                no-repeat;
            background-size: 100% 100%;
            color: #f3ecec;
            img {
                width: 28px;
                height: 28px;
            }
        }
        &-title-icon {
            width: 100%;
            text-align: center;
            font-size: 42px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: url('../../assets/images/reform/center-title-icon.png')
                no-repeat;
            background-size: 100% 100%;
            margin-top: -20px;
        }
        .sun-cure-platform {
            width: 100%;
            height: 180px;
            background: url('../../assets/images/integrates/section_bg.png')
                no-repeat;
            background-size: 100% 100%;
            display: flex;
            .schedule-color {
                color: rgb(162, 238, 95);
            }
            .indicator,
            .information {
                > div {
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 26px;
                }
                > :nth-child(2),
                > :nth-child(3) {
                    background: #00ffdd23;
                    margin-bottom: 8px;
                }
            }
            .indicator {
                width: 120px;
                > :nth-child(2)::before {
                    width: 24px;
                    height: 24px;
                    content: '';
                    display: inline-block;
                    background: url('../../assets/images/reform/mubiao.svg');
                    background-size: 100% 100%;
                    margin-right: 10px;
                    position: relative;
                    top: 2px;
                }
                > :nth-child(3)::before {
                    width: 24px;
                    height: 24px;
                    content: '';
                    display: inline-block;
                    background: url('../../assets/images/reform/jindu.svg')
                        no-repeat;
                    background-size: 100% 100%;
                    margin-right: 10px;
                    position: relative;
                    top: 2px;
                }
            }
            .information {
                flex: 1;
                border-right: 1px solid #00409b;
            }
        }
        .supervision {
            .reform-title {
                text-align: center;
                font-size: 42px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background: url('../../assets/images/integrates/reform-title.png')
                    no-repeat;
                background-size: 100% 100%;
                color: #f3ecec;
                margin-bottom: 15px;
                img {
                    width: 28px;
                    height: 28px;
                }
            }
            .item-title {
                width: 100%;
                height: 36px;
                background: url('../../assets/images/integrates/item-title.png')
                    no-repeat;
                background-size: 100% 100%;
                color: #f3ecec;
                font-size: 24px;
                line-height: 30px;
                padding-left: 20px;
            }
            .supervision-box {
                display: flex;
                justify-content: space-around;
            }
            .supervision-box-item {
                width: 330px;
                height: 255px;
                background: url('../../assets/images/integrates/section_bg.png')
                    no-repeat;
                background-size: 100% 100%;
                font-size: 24px;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 50px;
                    height: 50px;
                }
            }
            .supervision-box-item .item-data {
                margin: 10px 16px;
                width: 40%;
            }
        }
    }
}
</style>
<style lang="less">
.page-reform .number-color {
    background-image: -webkit-linear-gradient(90deg, #02ffff 0%, #ffffff 99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    //
}
</style>
