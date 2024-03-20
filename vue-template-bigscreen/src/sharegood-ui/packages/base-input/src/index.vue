<template>
    <div class="sg-data-form-field ">
        <slot name="prependSlot"></slot>
        <el-input
            :value="currentValue"
            :clearable="clearable"
            @input="onInputEvent"
            v-bind="$attrs"
            autocomplete="off"
        >
            <slot slot="prefix" name="prefix"></slot>
            <slot slot="suffix" name="suffix"></slot>
            <slot slot="prepend" name="prepend"></slot>
            <slot slot="append" name="append"></slot>
        </el-input>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseInput',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        // 当前组件slot插槽类型prefix、suffix、prepend、append
        slotType: {
            type: String,
            default() {
                return ''
            },
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        inputSlots: {
            type: Array,
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    data() {
        return {
            slots: [
                {
                    name: 'prefix',
                },
                {
                    name: 'suffix',
                },
            ],
            currentValue: this.value,
        }
    },
    methods: {},
}
</script>
