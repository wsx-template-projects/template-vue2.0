<!--
   dialog - 组件
-->
<template>
    <div class="">
        <van-overlay :show="dialogVisible" @click="dialogVisible = false">
            <div class="wrapper">
                <div
                    class="dialog-wrapper"
                    :style="{ width: width }"
                    @click.stop
                >
                    <div class="dialog-title">{{ title }}</div>
                    <div class="dialog-content sg-flexbox v align-center">
                        <slot />
                    </div>

                    <van-icon
                        class="icon-close"
                        name="cross"
                        @click="onClose"
                    />
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'HxDialog',
    components: {},
})
export default class HxDialog extends Vue {
    @Prop({ type: String, default: () => '' }) title!: string
    @Prop({ type: Boolean, default: () => false }) visible!: boolean
    @Prop({ type: String, default: () => '350px' }) width!: string
    get dialogVisible() {
        return this.visible
    }
    set dialogVisible(val: any) {
        this.$emit('update:visible', val)
    }
    created() {}
    mounted() {}
    public onClose() {
        this.dialogVisible = false
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.dialog-wrapper {
    position: relative;
    // width: 350px;
    background-color: #fff;
    font-size: 14px;
    border-radius: 12px;
    padding: 25px 0 0;
    // padding: 25px 16px 0;

    .icon-close {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 16px;
    }

    .dialog-title {
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
        text-align: center;
        // margin-bottom: 15px;
    }

    .dialog-content {
        .item {
            margin-bottom: 16px;
        }
    }
}
</style>
