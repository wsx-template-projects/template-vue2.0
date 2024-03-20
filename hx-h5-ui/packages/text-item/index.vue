<!--

-->
<template>
    <div :class="['hx-text-item', `is-${layout}`]">
        <img
            class="hx-text-item--icon"
            :src="row.icon"
            alt=""
            v-if="row.icon"
        />
        <div class="hx-text-item__right">
            <div class="hx-text-item--title" v-html="row.title"></div>
            <div class="hx-text-item--desc" v-html="row.desc"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Layout } from '../../src/constants/index'

@Component({
    name: 'HxTextItem',
    components: {},
})
export default class HxTextItem extends Vue {
    @Prop({ type: Object, default: () => ({}) }) row!: any
    @Prop({ type: String, default: Layout.HORIZONTAL }) layout!: Layout
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.hx-text-item {
    &.is-horizontal {
        display: flex;
        align-items: center;
    }

    &.is-vertical {
        display: flex;
        flex-direction: column;
    }

    .hx-text-item--icon {
        width: 40px;
        height: 40px;
        margin-right: 8px;
    }

    .hx-text-item--title {
        font-size: 16px;
        line-height: 22px;
        color: rgba(51, 51, 51, 1);
    }

    .hx-text-item--desc {
        font-size: 12px;
        line-height: 18px;
        color: rgba(102, 102, 102, 1);
    }
}
</style>
