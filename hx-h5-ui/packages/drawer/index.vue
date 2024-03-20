<!--
   抽屉
-->
<template>
    <div class="hx-drawer">
        <van-popup
            class="hx-drawer-wrap"
            v-model="isShow"
            v-bind="configBind"
            :style="{ width, height, ...configBind.style }"
            @close="close"
            @click-overlay="closeOverlay"
        >
            <div class="hx-drawer__content">
                <slot />
            </div>
            <div class="hx-drawer__footer">
                <van-button
                    class="confirm-btn"
                    v-bind="confirmBind"
                    :loading="loading"
                    @click="onConfirm"
                    v-if="footerBind.confirmShow"
                    >{{ footerBind.confirmText }}</van-button
                >
                <van-button
                    class="close-btn"
                    v-bind="cancelBind"
                    @click="onCancel"
                    v-if="footerBind.cancelShow"
                    >{{ footerBind.cancelText }}</van-button
                >
            </div>
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import _ from 'lodash'

const DEFAULT_CONFIG = {
    position: 'right',
    'get-container': 'body',
    'close-on-click-overlay': false,
}

const DEFAULT_FOOTER_CONFIG = {
    confirmShow: true,
    confirmText: '保存',
    cancelText: '关闭',
    cancelShow: true,
    /** 是否自定义取消事件 */
    customCancelEvent: false,
    /** 是否自定义确认事件 */
    customConfirmEvent: false,
    confirm: {
        type: 'info',
        'loading-text': '加载中...',
    },
    cancel: {
        type: 'default',
    },
}

@Component({
    name: 'HxDrawer',
    components: {},
})
export default class HxDrawer extends Vue {
    /** 宽度，默认80% */
    @Prop({ type: String, default: '80%' }) width!: string
    /** 高度，默认100% */
    @Prop({ type: String, default: '100%' }) height!: string
    /** 是否显示 */
    @Prop({ type: Boolean, default: false }) visible!: boolean
    /** 配置项，参考vant-ui组件配置 */
    @Prop({ type: Object, default: () => {} }) config!: any
    /** 底部按钮配置项 */
    @Prop({ type: Object, default: () => {} }) footerConfig!: any
    /** 回调函数 */
    @Prop()
    callback!: (data?: any) => Promise<any>
    public loading = false
    get configBind() {
        console.log({ ...this.config })
        return { ...DEFAULT_CONFIG, ...this.config }
    }
    get footerBind() {
        return _.merge({}, DEFAULT_FOOTER_CONFIG, this.footerConfig)
    }
    get confirmBind() {
        return this.footerBind.confirm
    }
    get cancelBind() {
        return this.footerBind.cancel
    }
    get isShow() {
        return this.visible
    }
    set isShow(val: boolean) {
        this.$emit('update:visible', val)
    }
    created() {}
    mounted() {}
    handleClose() {
        this.isShow = false
    }
    close() {
        console.log('close :>> ')
    }
    closeOverlay() {
        console.log('close-overlay :>> ')
        this.handleClose()
    }
    onCancel() {
        if (this.footerBind.customCancelEvent) {
            this.$emit('cancel')
            return
        }
        this.handleClose()
    }
    async onConfirm() {
        if (this.footerBind.customConfirmEvent) {
            this.$emit('confirm')
            return
        }
        console.log('start confirm :>> ')
        this.loading = true
        await this.callback()
        console.log('close drawer :>> ')
        this.loading = false
        this.handleClose()
    }
}
</script>

<style lang="less" scoped>
.hx-drawer {
    background-color: #fff;
}

.hx-drawer-wrap {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 8px 0 0 8px;
}

.hx-drawer__content {
    flex: 1;
    overflow-y: auto;
}

.hx-drawer__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px -1px 0px 0px rgba(221, 221, 221, 1);
    padding: 16px;

    .van-button {
        flex: 1;
        height: 48px;
        font-size: 18px;
        font-weight: 600;
        border-radius: 4px;
        margin-right: 16px;

        &:last-child {
            margin-right: 0;
        }
    }

    .confirm-btn {
        background: #3192e4;
        color: #fff;
        border: 1px solid #3192e4;
    }

    .close-btn {
        color: #808080;
        border: 1px solid rgba(221, 221, 221, 1);
    }
}
</style>
