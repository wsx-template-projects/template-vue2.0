<!--
   字段展示组件 - 类似表单项
-->
<template>
    <div class="my-field-view">
        <div class="left">{{ label }}</div>
        <div class="right">
            <span>{{ value }}</span>
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
    @Prop({ type: String, default: () => '' }) label!: string
    @Prop() value: any
    created() {}
    mounted() {}
}
</script>

<style lang="less">
.my-field-view {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;

    .left,
    .right {
        display: inline-block;
        vertical-align: top;
        color: #666666;
        line-height: 22px;
        letter-spacing: 0;
    }

    .right {
        flex: 1;
        color: #151515;
    }
}
</style>
