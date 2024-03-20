<!--
   list-group
-->
<template>
    <van-row
        :class="['hx-list-group', `is-${layout}`, `is-col-${col}`]"
        :gutter="gutter"
        type="flex"
    >
        <van-col
            :span="spanValue"
            :class="[
                'group-item',
                `group-item-${index + 1}`,
                item.class,
                activeIdx === index && 'is-active',
                index < hasMarginBottomNode && `sg-m-b-${marginBottom}`,
            ]"
            :style="style"
            v-for="(item, index) in list"
            :key="index"
            @click="onItem(item, index)"
        >
            <slot :item="item" :index="index" />
        </van-col>
    </van-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

type LayoutType = 'vertical' | 'horizontal'

@Component({
    name: 'HxListGroup',
    components: {},
})
export default class HxListGroup extends Vue {
    /** 布局，默认水平 */
    @Prop({ type: String, default: 'horizontal' }) layout!: LayoutType
    /** 列数 */
    @Prop({ type: Number, default: 1 }) col!: number
    /** item间隔 */
    @Prop({ type: Number, default: 10 }) gutter!: number
    /** item底部间距 */
    @Prop({ type: [Number, String], default: 10 }) marginBottom!: number
    /** item样式配置项 */
    @Prop({ type: Object, default: () => ({}) }) configStyle!: any
    /** 数据源 */
    @Prop({ type: Array, default: () => [] }) list!: any[]
    public activeIdx = 0
    get style() {
        return { ...this.configStyle }
    }
    get spanValue() {
        return 24 / this.col
    }
    get hasMarginBottomNode() {
        if (!this.list?.length) {
            return 0
        }
        const row = Math.ceil(this.list.length / this.col) - 1
        return row * this.col
    }
    /** 动态类名，扩展使用 */
    get dynamicClass() {
        return ''
    }
    created() {
        // todo 多行需要单独设置，目前有间距的偏移，gutter配置后有偏移
    }
    mounted() {}
    onItem(item: Record<string, any>, index: number) {
        console.log('item :>> ', item)
        console.log('index :>> ', index)
        this.activeIdx = index
        this.$emit('change', { item, index })
    }
}
</script>

<style lang="less" scoped>
.hx-list-group {
    display: flex;
    align-items: center;

    .group-item {
        // display: flex;
        // justify-content: center;
        // align-items: center;
        cursor: pointer;
    }

    // 水平
    &.is-horizontal {
        flex-wrap: wrap;
    }

    // 垂直
    &.is-vertical {
        flex-direction: column;

        .group-item {
            width: 100%;
        }
    }
}
</style>
