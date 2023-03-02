<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-select v-model="currentValue" v-bind="$attrs" v-on="listeners">
            <el-option
                v-for="(item, index) in dataList"
                :key="index"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseSelect',
    props: {
        editOption: {
            type: Array,
            default() {
                return [
                    {
                        label: '请选择',
                        value: '',
                    },
                ]
            },
        },
        queryOption: {
            type: Array,
            default() {
                return [
                    {
                        label: '全部',
                        value: '',
                    },
                ]
            },
        },
        // 查询
        isQuery: {
            type: Boolean,
            default: false,
        },
        // 编辑
        isEdit: {
            type: Boolean,
            default: false,
        },

        value: {
            type: [String, Number, Array],
            default: null,
        },

        options: {
            type: [Array, Function],
            default() {
                return []
            },
        },
    },
    mixins: [formMixins],
    data() {
        return {
            originList: [],
            dataList: [],
            currentValue: this.value,
        }
    },
    watch: {
        value(val) {
            this.currentValue = val
        },
        currentValue(value) {
            this.$emit('input', value)
            const dataList = this.dataList || []
            const target = dataList.filter(item => item.value == value)[0]
            this.onChange &&
                this.onChange({
                    name: this.name,
                    value: value,
                    option: target,
                })
        },

        options: {
            handler(val, oldVal) {
                this.parseOptions()
            },
            deep: true,
        },
    },
    mounted() {
        this.parseOptions()
    },
    methods: {
        parseOptions() {
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
                } else if (Array.isArray(result)) {
                    this.initOptions(result)
                }
            }
        },
        setData(data) {
            this.dataList = data
        },
        filter(cb) {
            let result = []

            this.originList.forEach((item, index) => {
                if (cb(item, index)) {
                    result.push(item)
                }
            })

            this.dataList = result
        },
        initOptions(options) {
            if (this.isQuery) {
                this.dataList = this.queryOption.concat(options)
            } else if (this.isEdit) {
                this.dataList = this.editOption.concat(options)
            } else {
                this.dataList = options
            }
            this.originList = [...this.dataList]
        },
    },
}
</script>
