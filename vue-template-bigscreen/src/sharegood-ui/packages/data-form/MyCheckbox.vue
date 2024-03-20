<template>
    <div class="sg-data-form-field">
        <el-checkbox-group v-model="currentValue">
            <el-checkbox
                :label="item.value"
                v-for="item in dataList"
                :key="item.value"
                >{{ item.label }}</el-checkbox
            >
        </el-checkbox-group>
    </div>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'Checkbox',
    props: {
        value: {
            type: Array,
            default() {
                return []
            },
        },
        options: {
            type: [Array, Function],
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
            this.$emit('input', this.name, value)
        },
        options(val) {
            this.dataList = val
        },
    },
    mounted() {
        if (Array.isArray(this.options)) {
            this.initOptions(this.options)
        } else {
            const result = this.options()
            if (result.then) {
                result
                    .then(list => {
                        this.initOptions(list)
                    })
                    .catch(err => {})
            } else {
                this.initOptions(result)
            }
        }
    },
    data() {
        return {
            dataList: [],
            currentValue: this.value,
        }
    },
    methods: {
        initOptions(options) {
            this.dataList.push(...options)
        },
    },
}
</script>
