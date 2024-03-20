<template>
    <el-select
        class="sg-select"
        v-model="currentValue"
        @input="onInputEvent"
        v-bind="$attrs"
    >
        <el-option
            v-for="(item, index) in dataList"
            :key="index"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
    </el-select>
</template>

<script>
export default {
    name: 'SgSelect',
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

    data() {
        return {
            originList: [],
            dataList: [],
            currentValue: this.value,
        }
    },
    watch: {
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
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                this.initOptions(result)
            }
        }
    },
    methods: {
        onInputEvent(value) {
            const dataList = this.dataList || []
            const target = dataList.filter(item => item.value == value)[0]
            this.onChange &&
                this.onChange({
                    name: this.name,
                    value: value,
                    option: target,
                })

            this.$emit('input', value)
        },
        setData(data) {
            this.dataList = data
        },
        filter(cb) {
            const result = []

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
