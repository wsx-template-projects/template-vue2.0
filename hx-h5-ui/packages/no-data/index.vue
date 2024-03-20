<!--
   空数据
-->
<template>
    <div :class="['hx-no-data', `is-${layout}`]">
        <img
            :style="imgStyle"
            class="empty-img"
            src="./assets/icon-no-data.svg"
            alt=""
        />
        <span class="empty-desc">{{ text }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

type ILayout = 'horizontal' | 'vertical'

@Component({
    name: 'HxNoData',
    components: {},
})
export default class HxNoData extends Vue {
    @Prop({ type: String, default: '暂无数据' }) text!: string
    /** 图片宽度，默认36px */
    @Prop({ type: String, default: '36px' }) imgWidth!: string
    /** 布局: horizontal-横向；vertical-竖向，默认横向 */
    @Prop({ type: String, default: 'horizontal' }) layout!: ILayout
    get imgStyle() {
        return {
            width: this.imgWidth,
        }
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.hx-no-data {
    display: flex;
    justify-content: center;

    .empty-desc {
        font-size: 14px;
        color: #808080;
    }

    &.is-horizontal {
        align-items: center;

        .empty-desc {
            margin-left: 12px;
        }
    }

    &.is-vertical {
        flex-direction: column;
        align-items: center;

        .empty-desc {
            margin-top: 12px;
        }
    }
}
</style>
