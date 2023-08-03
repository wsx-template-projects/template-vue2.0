<!--
   tab切换 - 全局组件
-->
<template>
    <div class="components-my-tabs">
        <van-tabs v-model="activeTab" v-bind="bindTab" @click="onClick">
            <van-tab
                v-for="(tab, idx) in list"
                :key="idx"
                :title="tab.title"
                :name="tab.name"
            ></van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { TabComponent } from '../../index'

const DEFAULT_CONFIG = {
    ellipsis: false,
}

@Component({
    name: 'HxTab',
    components: {},
})
export default class HxTab extends Vue {
    @Prop({ default: '' }) defaultActiveTab!: number | string | boolean
    /** 标签栏数据 */
    @Prop({ default: () => [] }) list!: TabComponent['list']
    /** 配置项 */
    @Prop({ default: () => {} }) config!: TabComponent['attrs']
    /** 选中tab */
    public activeTab: any = ''
    /** tab配置项 */
    get bindTab() {
        return { ...DEFAULT_CONFIG, ...this.config }
    }
    // 监听变量
    // @Watch('activeTab')
    // changeTabs(newVal: string) {
    //     console.log('newVal :>> ', newVal)
    //     this.$emit('change', newVal)
    // }
    created() {
        this.init()
    }
    mounted() {}
    init() {
        console.log('init-tab-data :>> ')
        this.activeTab = this.defaultActiveTab
    }
    onClick(name: number | string, title: string) {
        this.$emit('change', name)
    }
}
</script>

<style lang="less" scoped></style>
