<!--
   条件查询 - 组件
-->
<template>
    <div class="my-condition-inquire">
        <van-dropdown-menu v-bind="menuAttr">
            <div class="item" v-for="(item, index) in copyList" :key="index">
                <van-dropdown-item
                    ref="itemRef"
                    v-model="item.value"
                    v-bind="{
                        ...defaultConfig,
                        ...item.dropdownItem,
                    }"
                    @change="args => itemHandler('change', index, args)"
                    @open="() => itemHandler('open', index)"
                    @close="() => itemHandler('close', index)"
                    v-if="
                        item.dropdownItem &&
                            item.dropdownItem.options &&
                            item.dropdownItem.options.length
                    "
                ></van-dropdown-item>

                <van-dropdown-item
                    ref="itemRef"
                    :title="item.value"
                    @open="() => openCalendar(index)"
                    v-else
                ></van-dropdown-item>
            </div>
        </van-dropdown-menu>

        <van-calendar
            ref="calendarRef"
            v-model="showCalendar"
            v-bind="calendarAttr"
            @confirm="confirmCalendar"
            @close="closeCalendar"
        >
            <template #footer>
                <slot name="calendar-footer" />
            </template>
        </van-calendar>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { BaseDropdownMenu, ConditionItem, BaseCalendar } from '../../index'
import { useConstant } from './business-hooks'
import { formatDate } from '../utils/index'
import _ from 'lodash'

/** 默认配置项 */
const DEFAULT_CONFIG = useConstant()

/** item事件类别 */
type ItemEventType = 'change' | 'open' | 'close' | 'opened' | 'closed'

@Component({
    name: 'HxConditionInquire',
    components: {},
})
export default class HxConditionInquire extends Vue {
    @Prop({ default: () => null }) menuConfig!: BaseDropdownMenu
    @Prop({ default: () => [] }) list!: ConditionItem[]
    public defaultConfig = { ...DEFAULT_CONFIG.itemConfig }
    public copyList: ConditionItem[] = []
    public activeIdx = -1
    /** 显示日期组件 */
    public showCalendar = false
    /** 日期配置项 */
    public calendarAttr: BaseCalendar = {
        ...DEFAULT_CONFIG.calendarConfig,
    }
    /** 下拉菜单配置项 */
    get menuAttr() {
        const config = this.menuConfig || {}
        return { ...DEFAULT_CONFIG.menuConfig, ...config }
    }
    created() {}
    mounted() {
        this.copyList = _.cloneDeep(this.list)
        this.init()
    }
    init() {
        console.log('init-condition-inquire :>> ')
        this.copyList = _.cloneDeep(this.list)
    }
    /**
     * @description 选择的时间格式化处理
     * @param {string | string[]} date
     * @param {DirectionType} index 0、1、2  copyList数组下标
     * @return {string} 2023.02.10-2023.02.13 或者 2023-02-10至2023-02-13
     */
    timesFormat(
        date: any,
        index: number,
    ): { result: string | string[]; timeStr: string } {
        const isString = !Array.isArray(date)
        const { format, valueFormat, splitTxt = '-' } =
            this.copyList[index] || {}
        let times: string | string[] = ''
        if (format) {
            times = isString
                ? formatDate(date, format)
                : date.map((time: string) => formatDate(time, format))
        }
        if (valueFormat) {
            times = isString
                ? valueFormat(date)
                : date.map((time: string) => valueFormat(time))
        }
        console.log('format-times :>> ', times)
        const result = times || date
        return {
            result,
            timeStr: isString ? result : result.join(splitTxt),
        }
    }
    /**
     * @description item处理事件
     * @param {ItemEventType} eventType 事件类别
     * @param {number} index 当前选中的选择框下标
     * @param {*} val change事件传递的值
     */
    itemHandler(eventType: ItemEventType, index: number, val?: any) {
        this.activeIdx = index
        this.$emit(eventType, { index, value: val })
    }
    /**
     * @description 日期组件 - open事件
     */
    openCalendar(index: number) {
        const currConfig = this.copyList[index].calendar
        this.activeIdx = index
        this.showCalendar = true
        this.calendarAttr = { ...this.calendarAttr, ...currConfig }
    }
    /**
     * @description 日期组件 - confirm事件
     */
    confirmCalendar(date: any) {
        this.showCalendar = false
        let { result, timeStr } = this.timesFormat(date, this.activeIdx)
        this.copyList[this.activeIdx].value = timeStr
        this.$emit('change', { index: this.activeIdx, value: result })
    }
    /**
     * @description 日期组件 - close事件
     */
    closeCalendar() {
        // console.log('close-calendar :>> ')
    }
}
</script>

<style lang="less" scoped></style>
