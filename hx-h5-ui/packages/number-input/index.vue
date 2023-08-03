<!--
   数字输入框
-->
<template>
    <div class="my-number-input">
        <!-- <van-field readonly clickable :value="value" @touchstart.native.stop="visible = true" /> -->
        <field-item
            v-model="currentValue"
            v-bind="fieldConfig"
            v-on="$listeners"
        />
        <van-number-keyboard
            v-bind="keyboardBind"
            :show="visible"
            @blur="onBlur"
            @input="onInput"
            @delete="onDelete"
        />
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Toast } from 'vant'

type TagType = 'number' | 'password'

/** 数字键盘默认配置项 */
const DEFAULT_KEYBOARD_CONFIG = {
    'close-button-text': '完成',
}

const FieldItem = {
    functional: true,
    props: {
        value: {
            type: [],
            default: '',
        },
        tag: {
            type: String,
            default: 'number',
        },
        config: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    // computed: {
    //     currentVal: {
    //         get() {
    //             return this.value
    //         },
    //         set(val: any) {
    //             console.log('val :>> ', val)
    //             this.$emit('update:input', val)
    //         },
    //     },
    // },
    render(h: any, ctx: any) {
        console.log('h :>> ', h)
        console.log('ctx :>> ', ctx)
        const { tag, value, config } = ctx.props
        return (
            <div class="field-item">
                <van-field value={value} />
            </div>
        )
    },
}

@Component({
    name: 'HxNumberInput',
    components: { FieldItem },
})
export default class HxNumberInput extends Vue {
    @Prop({ type: String, default: '' }) value!: string
    /** 标签类型 */
    @Prop({ type: String, default: 'number' }) tag!: TagType
    /** 数字键盘配置项 */
    @Prop({ type: Object, default: () => ({}) }) keyboardConfig!: Record<
        string,
        any
    >
    /** field - config */
    @Prop({ type: Object, default: () => ({}) }) fieldConfig!: Record<
        string,
        any
    >
    public visible = false
    public currentValue = this.value
    get keyboardBind() {
        return { ...DEFAULT_KEYBOARD_CONFIG, ...this.keyboardConfig }
    }
    created() {}
    mounted() {}
    onBlur() {
        Toast('blur')
    }
    onInput(value: any) {
        Toast(value)
    }
    onDelete() {
        Toast('删除')
    }
}
</script>

<style lang="less" scoped></style>
