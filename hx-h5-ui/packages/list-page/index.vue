<!--

-->
<template>
    <div class="sg-page hx-list-page">
        <!-- 搜索框 -->
        <div class="component-search" v-if="hasSearch">
            <hx-search
                ref="searchRef"
                v-bind="searchConfig"
                @search="searchHandler"
                @input="inputHandler"
                @search-jump="searchJumpHandler"
            >
                <template #action v-if="isCustomSearchBtn">
                    <div @click="onCustomSearch">
                        {{ customSearchBtn || '搜索' }}
                    </div>
                </template>
            </hx-search>
        </div>

        <slot name="search-bottom" />

        <!-- 条件状态查询 -->
        <div class="component-status" v-if="hasCondition">
            <hx-condition-inquire
                ref="conditionRef"
                v-bind="conditionConfig"
                @change="changeCondition"
            />
        </div>

        <slot name="list-top" />

        <!-- tab切换 -->
        <div class="component-tab" v-if="hasTab">
            <hx-tab ref="tabRef" v-bind="tabConfig" @change="changeTab" />
        </div>

        <!-- 列表显示区域 -->
        <div class="component-list">
            <!-- 列表域 -->
            <hx-list ref="listRef" v-bind="listConfig" :load="syncData">
                <template v-slot:default="{ row, index }">
                    <slot :row="row" :index="index" />
                </template>
            </hx-list>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import HxSearch from '../search/index.vue'
import HxConditionInquire from '../condition-inquire/index.vue'
import HxTab from '../tab/index.vue'
import HxList from '../list'
import {
    SearchComponent,
    SearchRef,
    ConditionComponent,
    ConditionRef,
    TabComponent,
    TabRef,
    ListComponent,
    ListRef,
} from '../../index'

@Component({
    name: 'HxListPage',
    components: { HxSearch, HxConditionInquire, HxTab, HxList },
})
export default class HxListPage extends Vue {
    public $refs!: {
        searchRef: SearchRef
        conditionRef: ConditionRef
        tabRef: TabRef
        listRef: ListRef
    }
    /** 是否自定义搜索按钮 */
    @Prop({ type: Boolean, default: true }) isCustomSearchBtn!: boolean
    /** 自定义搜索按钮 */
    @Prop({ type: String, default: '搜索' }) customSearchBtn!: string
    /** 搜索栏点击有跳转 */
    @Prop({ type: Boolean, default: true }) hasSearchJump!: boolean
    /** 搜索栏配置项 */
    @Prop({ default: () => ({}) }) searchConfig!: SearchComponent
    /** 条件查询配置项 */
    @Prop({ default: () => ({}) }) conditionConfig!: ConditionComponent
    /** tab配置项 */
    @Prop({ default: () => ({}) }) tabConfig!: TabComponent
    /** list配置项 */
    @Prop({ default: () => ({}) }) listConfig!: ListComponent
    /** 请求方法 */
    @Prop() load!: (query: any) => Promise<any>
    public keyword = ''
    public conditionData: any = {}
    public tabActive = ''
    /** 是否有搜索栏 */
    get hasSearch() {
        return this.isEmpty(this.searchConfig)
    }
    /** 是否有条件查询 */
    get hasCondition() {
        return this.isEmpty(this.conditionConfig)
    }
    /** tabs查询 */
    get hasTab() {
        return this.isEmpty(this.tabConfig)
    }
    created() {
        this.initDefault()
    }
    mounted() {}
    isEmpty(data: any) {
        return data && JSON.stringify(data) !== '{}'
    }
    /** 初始化相关的默认值 */
    initDefault() {
        if (this.hasSearch) {
            // todo 初始化关键字搜索，目前用不上
        }
        if (this.hasCondition) {
            // todo 初始化条件搜索，目前用户上
        }
        if (this.hasTab) {
            const { defaultActiveTab } = this.tabConfig
            this.tabActive = defaultActiveTab
        }
    }
    initSearch() {
        this.$refs.searchRef?.init()
    }
    initCondition() {
        this.$refs.conditionRef?.init()
    }
    initTab() {
        this.$refs.tabRef?.init()
    }
    initList() {
        this.$refs.listRef.init()
    }
    onInit() {
        this.initDefault()
        this.initSearch()
        this.initCondition()
        this.initTab()
        this.initList()
    }
    /** 刷新 */
    onRefresh() {
        this.initList()
    }
    /** 自定义搜索 */
    onCustomSearch() {
        console.log('keyword :>> ', this.keyword)
        this.initList()
    }
    searchHandler(data: any) {
        console.log('search-data :>> ', data)
        this.keyword = data
        this.initList()
    }
    inputHandler(data: any) {
        console.log('search-input-data :>> ', data)
        this.keyword = data
        this.initList()
    }
    searchJumpHandler() {
        this.$emit('search-jump')
    }
    /** 查询条件改变 */
    changeCondition(data: { index: number; value: any }) {
        console.log('condition-data :>> ', data)
        const { index, value } = data
        this.conditionData[index] = value
        this.initList()
    }
    /** tab改变 */
    changeTab(val: any) {
        console.log('tab-val :>> ', val)
        this.tabActive = val
        this.initList()
    }
    async syncData(query: any) {
        let params = {
            ...query,
        }

        if (this.hasSearch) {
            params.keyword = this.keyword
        }

        if (this.hasCondition) {
            params = {
                ...params,
                condition: { ...this.conditionData },
            }
        }

        if (this.hasTab) {
            params = {
                ...params,
                tab: this.tabActive,
            }
        }
        try {
            const res = await this.load(params)
            const { result = [], total = 0 } = res
            return {
                result,
                total,
            }
        } catch (err) {
            return {
                result: [],
                total: 0,
            }
        }
    }
}
</script>

<style lang="less" scoped>
.hx-list-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .component-list {
        flex: 1;
        overflow-y: auto;
        padding: 10px 0 0 0;
    }
}
</style>
