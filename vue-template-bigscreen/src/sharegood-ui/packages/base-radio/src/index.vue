<template>
    <div class="sg-form-field">
        <slot name="prependSlot"></slot>
        <el-radio-group v-model="currentValue" v-bind="$attrs" v-on="listeners">
            <el-radio
                :label="item.value"
                v-for="(item, index) in dataList"
                :key="index"
                >{{ item.label }}</el-radio
            >
        </el-radio-group>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseRadio',
    props: {
        value: null,
        options: {
            type: [Object, Array, Function],
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    watch: {
        currentValue(value) {
            this.onChange &&
                this.onChange({
                    name: this.name,
                    value: value,
                })
            this.$emit('input', value)
        },
        options(val) {
            this.initOptions(val)
        },
    },
    mounted() {
        // console.log(this, this.name, this.onChange, this.listeners, this.$attrs)
        if (Array.isArray(this.options)) {
            this.initOptions(this.options)
        } else if (typeof this.options === 'function') {
            const result = this.options()
            if (result.then) {
                result
                    .then(list => {
                        this.initOptions(list)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                this.initOptions(result)
            }
        } else {
            this.initOptions(this.options)
        }
    },
    data() {
        return {
            dataList: [],
            currentValue: this.value,
        }
    },
    methods: {
        initOptions(options = []) {
            if (Array.isArray(options)) {
                this.dataList = options
            } else {
                console.log(options, this.dictToArray(options))
                this.dataList = this.dictToArray(options)
            }
        },
    },
}
</script>
