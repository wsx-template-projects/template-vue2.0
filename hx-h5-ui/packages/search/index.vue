<!--
   搜索框
-->
<template>
    <div class="my-search" @click="onClick">
        <form action="">
            <van-search
                ref="searchRef"
                v-model="keyword"
                v-bind="searchAttr"
                v-on="listeners"
            >
                <template #action>
                    <slot name="action" />
                </template>
            </van-search>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BaseSearch } from '../../index'
import _ from 'lodash'

const DEFAULT_SEARCH_CONFIG = {
    clearable: true,
    placeholder: '请输入搜索关键词',
}

type SearchEventType =
    | 'search'
    | 'cancel'
    | 'clear'
    | 'input'
    | 'blur'
    | 'focus'

@Component({
    name: 'HxSearch',
    components: {},
})
export default class HxSearch extends Vue {
    /** 搜索栏点击有跳转 */
    @Prop({ default: false }) hasSearchJump!: boolean
    /** 是否搜索框值改变触发自定义事件 */
    @Prop({ default: true }) isChangeDispatch!: boolean
    /** input事件触发，节流时间间隔 */
    @Prop({ default: 2000 }) duration!: number
    /** 搜索栏配置项 */
    @Prop({ default: () => ({}) }) config!: BaseSearch

    public keyword = ''

    listeners = {
        search: this.onSearch,
        cancel: this.onCancel,
        clear: this.onClear,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
    }

    /** 搜索框绑定属性 */
    get searchAttr() {
        return { ...DEFAULT_SEARCH_CONFIG, ...this.config }
    }

    /** input事件节流处理 */
    get throttleInput() {
        const options = {
            leading: false,
            trailing: true,
        }
        return _.throttle(this.inputHandler, this.duration, options)
    }

    created() {}
    mounted() {}
    init() {
        console.log('init-search-data :>> ')
        this.keyword = ''
    }
    onClick() {
        // console.log('this.hasSearchJump :>> ', this.hasSearchJump)
        this.hasSearchJump && this.$emit('search-jump')
    }
    onSearch(val: string) {
        console.log('search-val :>> ', val)
        this.searchHandler('search', val)
    }
    onCancel() {
        this.searchHandler('cancel')
    }
    onClear(event: Event) {
        console.log('clear :>> ')
        this.searchHandler('clear', event)
    }
    onInput(val: string) {
        console.log('input-val :>> ', val)
        this.throttleInput(val)
    }
    /** 获得焦点 */
    onFocus(event: Event) {
        console.log('focus :>> ')
        this.searchHandler('focus', event)
    }
    /** 失去焦点 */
    onBlur(event: Event) {
        this.searchHandler('blur', event)
    }
    inputHandler(val: string) {
        console.log('throttle-input-val :>> ', val)
        if (!this.isChangeDispatch) return
        console.log('result-input-val :>> ', val)
        this.searchHandler('input', val)
    }
    searchHandler(type: SearchEventType, value?: string | Event) {
        value = value || this.keyword
        this.$emit(type, value)
    }
}
</script>

<style lang="less" scoped></style>
