<!--
   字段展示组件 - 类似表单项
-->
<template>
    <div
        :class="[
            'hx-field-view',
            `is-${rowFlex}`,
            `is-${layout}`,
            isBottomBorder && 'is-bottom-border',
        ]"
    >
        <div class="left">
            <svg-icon class="icon" :icon="icon" v-if="icon" />
            {{ label }}
        </div>
        <div :class="['right', `text-${align}`]">
            <span :class="[isEllipsis && 'sg-ellipsis-1']">{{ value }}</span>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'HxFieldView',
    components: {},
})
export default class HxFieldView extends Vue {
    @Prop({ type: String, default: '' })
    icon!: string
    @Prop({ type: String, default: () => '' })
    label!: string
    @Prop({ type: String, default: 'horizontal' })
    layout!: 'horizontal' | 'vertical'
    @Prop({ type: String, default: 'start' })
    rowFlex!: 'start' | 'center' | 'end'
    @Prop({ type: String, default: 'left' })
    align!: 'left' | 'center' | 'right'
    @Prop() value: any
    /** value是否超出省略 */
    @Prop({ type: Boolean, default: false })
    isEllipsis!: boolean
    /** 是否显示下划线 */
    @Prop({ type: Boolean, default: false })
    isBottomBorder!: boolean
    created() {}
    mounted() {}
}
</script>

<style lang="less">
.hx-field-view {
    position: relative;
    display: flex;
    width: 100%;
    background: #fff;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
    padding: 12px 12px;

    &.is-start {
        align-items: flex-start;
    }
    &.is-center {
        align-items: center;
    }
    &.is-end {
        align-items: flex-end;
    }

    .icon {
        color: #000000;
        flex-shrink: 0;
        margin-right: 4px;
    }

    .left,
    .right {
        display: inline-block;
        vertical-align: top;
        color: #666666;
        flex-shrink: 0; // 处理-设置display: flex后元素变形
    }

    .right {
        flex: 1;
        overflow: hidden;
        color: #333333;
        word-break: break-all;

        &.text-left {
            text-align: left;
        }

        &.text-center {
            text-align: center;
        }

        &.text-right {
            text-align: right;
        }
    }
}

.is-bottom-border {
    &:after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        left: 12px;
        right: 12px;
        bottom: 0;
        border-bottom: 1px solid #ddd;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

.is-vertical {
    flex-direction: column;
}
</style>
