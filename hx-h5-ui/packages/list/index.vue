<!--
   list - 组件
-->
<template>
    <div class="my-list" ref="myList">
        <div class="my-list__header">
            <slot name="header" />
        </div>
        <div class="my-list__content">
            <template v-if="!dataSource.length">
                <van-empty class="custom-image" v-bind="bindEmpty" />
            </template>
            <template v-else>
                <van-pull-refresh
                    v-model="isRefreshing"
                    :disabled="disableRefresh"
                    @refresh="refreshData"
                >
                    <van-list
                        v-model="isLoading"
                        v-bind="bindList"
                        :finished="isFinished"
                        :error.sync="isError"
                        @load="onLoad"
                    >
                        <van-cell
                            class="item-group"
                            v-for="(item, index) in dataSource"
                            :key="index"
                        >
                            <slot :row="item" :index="index" />
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { BaseList, EmptyConfig } from '../../index'

@Component({
    name: 'HxList',
    components: {},
})
export default class HxList extends Vue {
    /** 配置项，参考 vant API - props属性 */
    @Prop({ default: () => ({}) }) config!: BaseList
    /** 空数据的配置项 */
    @Prop({ default: () => ({}) }) emptyConfig!: EmptyConfig
    /** 第一次是否自动请求，默认为true */
    @Prop({ default: () => true }) autoLoad!: boolean
    /** 禁用下拉刷新，默认为 false */
    @Prop({ default: () => false }) disableRefresh!: boolean
    /** 自定义loading加载动画，默认为false */
    @Prop({ default: () => false }) diyAnimation!: boolean
    /** 请求方法 */
    @Prop() load!: (query: any) => Promise<any>
    /** 数据源 */
    public dataSource: any[] = []
    /** 总的数据条数 */
    public total = 0
    // 是否数据全部加载完
    public isFinished = false
    // 是否正在加载中
    public isLoading = true
    // 是否出错状态
    public isError = false
    // 是否正在刷新
    public isRefreshing = false
    // 分页相关
    public pagination: any = {
        pageNum: 1,
        pageSize: 10,
    }
    /** 没有数据的默认配置 */
    public emptyDefaultConfig: any = {
        image: require('./assets/no-data.png'),
        description: '没有数据!',
    }
    /** 列表的默认配置 */
    public defaultConfig: BaseList = {
        // 滚动条与底部距离小于 offset 时触发load事件
        offset: 300,
        // 加载失败后的提示文案
        'error-text': '请求失败，点击重新加载',
        // 加载完成后的提示文案
        'finished-text': '没有更多了',
        // 是否在初始化时立即执行滚动位置检查
        'immediate-check': false, // todo 此属性有问题暂不推荐使用
    }
    /** 列表配置项 */
    get bindList() {
        return { ...this.defaultConfig, ...this.config }
    }
    /** 空数据配置项 */
    get bindEmpty() {
        return { ...this.emptyDefaultConfig, ...this.emptyConfig }
    }
    /** 监听数据源的变化 */
    @Watch('dataSource', { deep: true })
    dataSourceHandler(newV: any, oldV: any) {
        if (newV.length >= this.total) {
            console.log('数据全部加载完成')
            this.isFinished = true
        }
    }
    created() {}
    mounted() {
        this.autoLoad && this.onLoad()
        // window.addEventListener('scroll', this.handleScroll, true)
    }
    /** scroll事件 - 回调 */
    // public handleScroll(e: any) {
    //     // todo 滚动的距离
    //     let scrollTop = e.target.scrollTop
    //     console.log('scrollTop :>> ', scrollTop)
    // }
    /** 初始化请求数据 */
    public init() {
        this.reset()
        this.onLoad(true)
    }
    /**重置data数据 */
    public reset() {
        this.pagination = {
            pageNum: 1,
            pageSize: 10,
        }
        this.isFinished = false
    }
    /** 下拉刷新 */
    public refreshData() {
        this.init()
    }
    /** 重置滚动条 */
    public scrollTop() {
        this.$nextTick(() => {
            try {
                const childEl: any = document.querySelector('.my-list')
                const $wrap = childEl.parentNode
                console.log('$wrap :>> ', $wrap)
                $wrap && ($wrap.scrollTop = 0)
            } catch (e) {
                console.log(e)
            }
        })
    }
    /**
     * 请求数据
     * @param {boolean} isInit 是否初始化，默认为false
     * */
    onLoad(isInit = false) {
        console.log('start loading')
        const params = { ...this.pagination }
        let promise = this.load(params)
        if (!promise.then) {
            promise = Promise.resolve(promise)
        }
        this.isLoading = true
        if (this.diyAnimation) {
            this.$$loading.show({ text: '加载中...' })
        }
        promise
            .then(({ result = [], total }: any) => {
                console.log('result :>> ', result)
                console.log('total :>> ', total)
                this.pagination.pageNum++
                this.total = total || 0
                this.dataSource = isInit
                    ? [...result]
                    : [...this.dataSource, ...result]
                console.log('dataSource :>> ', this.dataSource)
                const { pageNum, pageSize } = params
                if (this.total <= pageNum * pageSize) {
                    console.log('数据全部加载完成 :>> ')
                    this.isFinished = true
                }
                this.$nextTick(() => {
                    isInit && this.scrollTop()
                })
            })
            .catch((err: any) => {
                console.log('list-err :>> ', err)
                this.isError = true
            })
            .finally(() => {
                this.isLoading = false
                this.isRefreshing = false
                if (this.diyAnimation) {
                    this.$$loading.hide()
                }
            })
    }
}
</script>

<style lang="less" scoped>
.my-list {
    ::v-deep .van-list {
        .item-group {
            margin-bottom: 10px;
        }

        .van-cell {
            padding: 10px;
        }
    }
}
</style>
