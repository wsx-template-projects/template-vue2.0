<template>
    <MyScreen :is-scale="true" :width="width" :height="height">
        <div class="sg-page page-integrates">
            <header class="page-integrates__header">
                <index-title
                    :left-one="'返回总驾驶舱'"
                    @leftOneClick="leftOneClick"
                    :title="'“大综合一体化”执法监管数字应用'"
                >
                    <div slot="right-one" style="font-size: 18px">
                        <i
                            class="el-icon-time"
                            style="margin-right: 10px; font-size: 20px"
                        ></i
                        >{{ currentTime }}
                    </div>
                </index-title>
                <!-- <h1>监管全貌</h1> -->
            </header>
            <div class="page-integrates__content">
                <!-- 左屏 -->
                <integrates-left></integrates-left>
                <!-- <div style="width: 660px"></div> -->
                <section class="integrates-center">
                    <!-- 指数总览 -->
                    <div class="header-exponent">
                        <div
                            v-for="(item, index) in exponentData"
                            :key="index"
                            @click="onExponent(item)"
                        >
                            <div class="header-exponent-value">
                                <img
                                    src="../../assets/images/integrates/exponent_zl.png"
                                    alt=""
                                />
                                <MyCountTo
                                    class="number-color font48"
                                    :startVal="0"
                                    :endVal="item.value"
                                    :duration="2000"
                                    :decimals="item.decimals || 0"
                                    ref="countRef"
                                ></MyCountTo>
                            </div>
                            <div class="header-exponent-label">
                                {{ item.label }}
                            </div>
                        </div>
                    </div>
                    <div class="map-box">
                        <el-select
                            clearable
                            class="integrates-map-select"
                            popper-class="integrates-map-select"
                            v-model="deptValue"
                            placeholder="请选择部门"
                            @change="selectChange"
                        >
                            <el-option
                                v-for="item in deptOption"
                                :key="item.value"
                                :label="item.title"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <!-- 地图 -->
                        <echarts-map
                            :area-map.sync="areaMap"
                            :map-data="mapData"
                            :formatter-data="formatterData"
                            class="EchartsMap mt30"
                            :isShowTooltip="false"
                        ></echarts-map>
                    </div>

                    <!-- 协同指挥 -->
                    <synergia-command
                        :param="param"
                        class="mt30"
                    ></synergia-command>
                </section>
                <!-- 右屏 -->
                <integrates-right :param="param"></integrates-right>
            </div>
        </div>
    </MyScreen>
</template>

<script>
/** 翻牌器 */
import countTo from 'vue-count-to'
/** 头部 */
import IndexTitle from './components/index-title.vue'
/** 左边区域 */
import IntegratesLeft from './components/integrates-left.vue'
/** 右边区域 */
import IntegratesRight from './components/integrates-right.vue'
/** 协同指挥 */
import SynergiaCommand from './components/synergia-command.vue'
import MyScreen from '../../components/global/my-screen/index.vue'
export default {
    name: 'Index',
    components: {
        countTo,
        IndexTitle,
        IntegratesLeft,
        IntegratesRight,
        SynergiaCommand,
        MyScreen,
    },
    props: {},
    data() {
        return {
            width: 2560,
            height: 1440,
            currentTime: '',
            areaMap: '',
            mapData: [],
            formatterData: [],
            exponentData: [], // 指数指标数据
            deptOption: [], // 部门下拉
            deptValue: null,
            areacode: '33', // 默认全省 '33'
            param: {},
            interval: null,
        }
    },
    computed: {},
    watch: {
        areaMap(e) {
            this.areacode = e.areacode
            console.log(this.deptValue)
            let dutycode = ' '
            if (!(this.deptValue == '33' || !this.deptValue))
                dutycode = this.deptValue
            this.param = {
                areacode: this.areacode,
                dutycode,
            }
            this.getData()
            console.log(e)
        },
    },
    created() {
        this.currentTime = new Date()
            .toLocaleDateString()
            .split('/')
            .join('-')
    },
    mounted() {
        this.getDeptCode()
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
        /** 改革指数 - 点击事件 */
        onExponent(item) {
            console.log('item :>> ', item)
            const { label } = item
            switch (label) {
                case '改革指数':
                    window.open('reform-target', '_blank')
                    break
                default:
                    console.log('其它')
                    break
            }
        },
        /**
         * 左一 方法
         */
        leftOneClick() {
            window.open(
                'http://59.202.53.93/sifating/login?systemcode=17375d9984888eac7bf6af12cb0e77ca',
            )
        },
        /**
         * 获取领域
         */
        async getDeptCode() {
            this.deptOption = []
            const deptOption = []
            let params = {
                placeCode: 'CODE',
                placeAreaCode: 'CODE',
                param: { itemcode: 'dutycode' },
            }
            const { dutycode: data } = await this.$http
                .post('/api/v2/bi/place/dataRuleGroup/doGetPlaceData', params)
                .then(res => {
                    const obj = {}
                    const { processResult } = res[0]
                    processResult.forEach(elem => {
                        obj[elem.key] = elem.value
                    })
                    return obj
                })
            data.forEach(elem => {
                deptOption.push({
                    title: elem.dutyname,
                    value: elem.dutycode,
                })
            })
            deptOption.unshift({
                title: '全部',
                value: '33',
            })
            this.deptOption = deptOption
        },
        /**
         * 获取数据
         */
        async getData() {
            let params = {
                placeCode: 'DZH-ZP',
                placeAreaCode: 'DZH-ZP-ZB',
                param: {
                    areacode: '33',
                    dutycode: ' ',
                    ...this.param,
                },
            }
            const { 'dzh-zbj': data } = await this.$http
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
            if (this.areacode != '33') {
                this.exponentData = [
                    {
                        label: '改革指数',
                        value: '--',
                        decimals: 2,
                    },
                    {
                        label: '效能指数',
                        value: this.filterData(data, '效能指数'),
                        decimals: 2,
                    },
                ]
            } else {
                this.exponentData = [
                    {
                        label: '改革指数',
                        value: this.filterData(data, '改革指数'),
                        decimals: 2,
                    },
                    {
                        label: '效能指数',
                        value: this.filterData(data, '效能指数'),
                        decimals: 2,
                    },
                ]
            }
        },
        /**
         * 获取地图数据
         */
        async getMapData() {
            let params = {
                placeCode: 'DZH-ZP',
                placeAreaCode: 'DZH-ZP-ZB',
                param: {
                    item_position: '地图',
                    areacode: '33',
                },
            }
            const { 'dzh-zbj': data } = await this.$http
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
            const ggzsData = data.filter(elem => elem.itemcode == '改革指数')
            const xnzsData = data.filter(elem => elem.itemcode == '效能指数')
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
                /** 改革指数 */
                const ggzs = ggzsData.filter(item => item.dutyname == elem.name)
                /** 效能指数 */
                const xnzs = xnzsData.filter(item => item.dutyname == elem.name)
                elem.value = ggzs.length > 0 ? ggzs[0].value : 0
                elem.mapData = {
                    xnzs: xnzs.length > 0 ? xnzs[0].value : 0,
                    ggzs: ggzs.length > 0 ? ggzs[0].value : 0,
                }
            })
            this.formatterData = [
                {
                    label: '改革指数：',
                    key: 'ggzs',
                },
                {
                    label: '效能指数：',
                    key: 'xnzs',
                },
            ]
            this.mapData = mapData
        },
        /**
         *下拉框change事件
         */
        selectChange(e) {
            let dutycode = e
            if (e == '33' || !e) dutycode = ' '
            this.param = {
                areacode: this.areacode,
                dutycode,
            }
            this.getData()
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
            return filterData.length > 0 ? filterData[0].value : 0
        },
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
}
</script>

<style lang="less" scoped>
.page-integrates {
    .EchartsMap {
        width: 100%;
        height: 664px;
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
        .integrates-center {
            flex: 1;
            margin: 20px;
            z-index: 1;
        }
        .integrates-center .header-exponent {
            display: flex;
            justify-content: space-around;
            &-value {
                display: flex;
                align-items: center;
                img {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
            }
            &-label {
                width: 240px;
                height: 66px;
                margin-top: 20px;
                background: url('../../assets/images/integrates/exponent_bg.png')
                    no-repeat;
                background-size: 100%;
                font-size: 32px;
                text-align: center;
                line-height: 10px;
            }
        }
        .map-box {
            position: relative;
        }
        .map-box .integrates-map-select {
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 10;
        }
    }
}
</style>
<style lang="less">
.page-integrates .number-color {
    background-image: -webkit-linear-gradient(90deg, #02ffff 0%, #ffffff 99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    //
}
.integrates-map-select {
    .el-input--medium {
        font-size: 24px;
    }
    .el-input--medium .el-input__inner {
        width: 220px;
        height: 52px;
        line-height: 52px;
    }
    .el-input__inner {
        background: rgba(89, 89, 89, 0.11);
        border-color: #0a74ff83;
        color: #fdfcfb;
    }
    .el-select-dropdown__item {
        color: #fdfcfb;
        font-size: 20px;
        height: 40px;
        line-height: 40px;
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
        background: #5967b95c;
        color: #52e0ff;
    }
}
.integrates-map-select.el-select:hover .el-input__inner {
    border-color: #0a74ff96;
}
.integrates-map-select.el-select-dropdown {
    background: rgb(4, 15, 77, 0.9);
    //   background: rgba(89, 89, 89, 0.11);
    color: #fdfcfb;
    border-color: #52e0ff;
}
</style>
