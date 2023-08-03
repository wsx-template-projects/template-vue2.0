<!--
   底部按钮 - 全局组件
-->
<template>
    <div class="hx-button-group">
        <div
            :class="['button-group__content', bottomFixed && 'is-bottom-fixed']"
        >
            <van-button
                v-bind="btn.attr"
                :class="classNames"
                v-for="btn in dataSource"
                :key="btn.text"
                @click="onBtn(btn)"
            >
                {{ btn.text }}
            </van-button>
        </div>
        <!-- ios底部安全距离适配 -->
        <div class="sg-ios-bottom-adapt"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Notify } from 'vant'

/** 按钮基本属性配置，参考 vant-ui 按钮属性 */
export interface BtnBaseConfig {
    [propName: string]: any
}

export interface BtnColumn {
    /** 按钮文本 */
    text: string
    /** 按钮类型：path/other */
    type: string
    /** 按钮基本属性配置，参考 vant-ui 按钮属性 */
    attr?: BtnBaseConfig
    /** 跳转页面配置项，只在 type === 'path' 必传 */
    jumpConfig?: {
        /** 跳转页面路由，只在 type === 'path' 必传 */
        path: string
        /** 跳转页面参数，只在 type === 'path' 生效 */
        query?: any
        /** 是否不需要保存当前页面地址记录 */
        isReplace?: boolean
    }
    /** 其它属性 */
    [propName: string]: any
}

@Component({
    name: 'HxButtonGroup',
    components: {},
})
export default class HxButtonGroup extends Vue {
    /** 按钮配置 */
    @Prop({ default: () => [] }) dataSource!: BtnColumn[]
    /** 是否固定在底部 */
    @Prop({ default: () => true }) bottomFixed!: boolean
    /** 动态类名 */
    get classNames() {
        return 'view-btn'
    }
    created() {}
    mounted() {
        // todo 还有局部不够完善，后续优化
    }
    /**
     * 按钮事件
     * @param {*} item
     * */
    public onBtn(item: any) {
        console.log('item :>> ', item)
        if (item.type !== 'path') {
            this.$emit('callback', item)
            return
        }

        const { path = '', query = {}, isReplace = false } =
            item?.jumpConfig || {}

        if (!path) {
            Notify({ type: 'danger', message: '请添加 jumpConfig 相关配置' })
            return
        }

        if (isReplace) {
            this.$router.replace({ path, query })
            return
        }

        this.$router.push({ path, query })
    }
}
</script>

<style lang="less" scoped>
.hx-button-group {
    .button-group__content {
        display: flex;
        width: 100%;
        background: #fff;
        text-align: center;
        border-top: 1px solid #ddd;
        box-sizing: border-box;
        padding: 15px;

        > button {
            margin-right: 10px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .is-bottom-fixed {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }

    .van-button--normal {
        flex: 1;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
    }
}

/** ios底部安全距离适配 */
.sg-ios-bottom-adapt {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
