<template>
    <div class="sg-data-form-container">
        <el-form
            ref="form"
            :model="formData"
            class="sg-data-form"
            :class="{ column: !isFieldInline }"
            :rules="rules"
            v-bind="exAttrs"
            @submit.native.prevent
        >
            <div class="sg-data-form-header">
                <slot name="header"></slot>
            </div>
            <template v-for="(row, index) in rows">
                <el-row
                    :key="index"
                    :type="row.type || type"
                    :gutter="row.gutter || gutter"
                    class="sg-form-row"
                    :class="row.class"
                    :justify="row.justify || justify"
                >
                    <template v-for="(field, index) in row.fields">
                        <el-col
                            :key="field.name"
                            :span="getSpan(field)"
                            v-show="field.visible"
                            :class="field.class"
                        >
                            <el-form-item
                                :prop="field.name"
                                :label="field.label"
                                :rules="field.rules"
                                class="sg-form-item"
                                :label-width="field.labelWidth || labelWidth"
                                v-if="getFieldType(field.fieldType)"
                            >
                                <template
                                    slot="label"
                                    v-if="field.showLabelTooltip && field.label"
                                >
                                    <span style="position:relative">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="field.label"
                                            placement="top-start"
                                        >
                                            <span>{{ field.label }}</span>
                                        </el-tooltip>
                                    </span>
                                </template>
                                <component
                                    :class="field.class"
                                    :key="field.name"
                                    :is="getFieldType(field.fieldType)"
                                    :value="formData[field.name]"
                                    @input="updateForm"
                                    v-bind="field"
                                    ref="formItem"
                                    @keyup.enter.native="
                                        handleSubmit(
                                            field.isTriggerSubmit ||
                                                (fields.length - 1 === index &&
                                                    field.fieldType ===
                                                        'input'),
                                        )
                                    "
                                >
                                    <template
                                        v-if="field.slotType"
                                        slot="inputSlot"
                                    >
                                        <slot :name="field.slotName"></slot>
                                    </template>
                                    <template
                                        v-if="field.autocompleteSlot"
                                        slot="autocompleteSlot"
                                        slot-scope="{ item }"
                                    >
                                        <slot
                                            :name="field.autocompleteSlot"
                                            :item="item"
                                        ></slot>
                                    </template>

                                    <template
                                        slot="appendSlot"
                                        v-if="field.appendSlot"
                                    >
                                        <slot :name="field.appendSlot"></slot>
                                    </template>
                                </component>
                            </el-form-item>
                            <template v-else-if="field.fieldType === 'slot'">
                                <el-form-item
                                    class="sg-form-item"
                                    :prop="field.name"
                                    :label="field.label"
                                    :rules="field.rules"
                                    :label-width="
                                        field.labelWidth || labelWidth
                                    "
                                >
                                    <template
                                        slot="label"
                                        v-if="
                                            field.showLabelTooltip &&
                                                field.label
                                        "
                                    >
                                        <span style="position:relative">
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="field.label"
                                                placement="top-start"
                                            >
                                                <span>{{ field.label }}</span>
                                            </el-tooltip>
                                        </span>
                                    </template>
                                    <slot
                                        :name="
                                            field.appendSlot || field.slotName
                                        "
                                    ></slot>
                                </el-form-item>
                            </template>
                            <template v-else-if="field.fieldType == 'action'">
                                <div class="sg-data-form-action">
                                    <template
                                        v-for="(button, i) in field.value || []"
                                    >
                                        <template v-if="button.isSubmit">
                                            <el-button
                                                :key="i"
                                                type="primary"
                                                @click="submit"
                                                native-type="submit"
                                                >{{
                                                    button.text || onSubmitText
                                                }}
                                            </el-button>
                                        </template>
                                        <template v-else-if="button.isReset">
                                            <el-button
                                                :key="i"
                                                :type="button.type"
                                                @click="reset"
                                                >{{
                                                    button.text || onResetText
                                                }}</el-button
                                            >
                                        </template>
                                        <template v-else-if="button.isMore">
                                            <el-button
                                                :key="i"
                                                :type="button.type"
                                                @click="onMore"
                                                >{{
                                                    button.text || onMoreText
                                                }}</el-button
                                            >
                                        </template>
                                    </template>
                                </div>
                            </template>
                            <template v-else-if="field.slotName">
                                <slot :name="field.slotName"></slot>
                            </template>
                        </el-col>
                    </template>
                </el-row>
            </template>
            <div class="sg-data-form-footer">
                <slot name="footer"></slot>
            </div>
        </el-form>
    </div>
</template>

<script>
import MyInput from './MyInput'
import MySelect from './MySelect'
import MyDate from './MyDate'
import MyCheckbox from './MyCheckbox'
import MyRadio from './MyRadio'
import MyCascader from './MyCascader'
import MyUploader from './MyUploader'
import MyAutoComplete from './MyAutoComplete'

const types = {
    input: 'MyInput',
    select: 'MySelect',
    date: 'MyDate',
    checkbox: 'MyCheckbox',
    radio: 'MyRadio',
    cascader: 'MyCascader',
    uploader: 'MyUploader',
    autocomplete: 'MyAutoComplete',
}

export default {
    name: 'SgDataForm',
    components: {
        MyInput,
        MySelect,
        MyDate,
        MyCheckbox,
        MyRadio,
        MyCascader,
        MyUploader,
        MyAutoComplete,
    },
    props: {
        formItemRef: {
            type: Object,
            default() {
                return {}
            },
        },
        // 布局模式
        type: {
            type: String,
            default: 'flex',
        },
        // 宽度
        span: {
            type: [Number, String],
            default: 8,
        },
        // 水平位置
        justify: {
            type: [String],
            default: '',
        },
        // 间距
        gutter: {
            type: [Number, String],
            default: 0,
        },
        // 表单数据
        fields: {
            type: Array,
            default() {
                return []
            },
        },
        // 验证规则
        rules: {
            type: Object,
            default() {
                return {}
            },
        },
        // label宽度
        labelWidth: {
            type: [Number, String],
            default: '120px',
        },
        onSubmitText: {
            type: String,
            default: '提交',
        },
        // label宽度
        onResetText: {
            type: String,
            default: '重置',
        },
        onMoreText: {
            type: String,
            default: '更多搜索',
        },
        isFieldInline: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            rows: [],
            hiddens: [],
            types: types,
            formData: this.value, // 表单数据
        }
    },
    computed: {
        exAttrs() {
            return this.$attrs
        },
    },
    watch: {
        fields: {
            handler(val) {
                //console.log(1)
                this.rows = this.formatterData()
            },
            deep: true,
        },
        // 用户输入的时候需要修改内部form 不然无法输入
        value: {
            handler(val) {
                //console.log(2)
                this.formData = val
            },
            deep: true,
        },
        data: {
            handler(val) {
                //console.log(3)
                // 将form实例返回到父级
                this.$emit('update:refObj', this.$refs.form)
            },
            deep: true, // 深度监听
        },
    },
    created() {
        this.initData()
    },
    mounted() {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
    },
    methods: {
        //如果是最后一个input默认触发提交  或者 配置了字段 isTriggerSubmit
        handleSubmit(isSubmit) {
            console.log('isTriggerSubmit', isSubmit)
            if (isSubmit) {
                this.$emit('submit')
            }
        },
        // 显示或隐藏搜索条件
        onMore() {
            this.hiddens.forEach(item => {
                item.visible = !item.visible
            })
            console.log('[more]')
            this.$emit('more')
        },
        // 计算宽度
        getSpan(field) {
            const span = field.span || this.span
            if (typeof span === 'function') {
                return span(this.rows)
            } else {
                return span
            }
        },
        setData(name, value) {
            if (!this.formData.hasOwnProperty(name)) {
                this.$set(this.formData, name, value)
            } else {
                this.formData[name] = value
            }
        },
        // 格式化数据为 [{fields:[{fieldType,name,label}]}]
        formatterData() {
            const hasRow = this.fields.some(item => {
                if (item.fields) {
                    return true
                } else {
                    return false
                }
            })
            let result = []
            if (hasRow) {
                result = [...this.fields]
            } else {
                result = [
                    {
                        fields: [...this.fields],
                    },
                ]
            }

            return result
        },
        // 初始化 只执行一次
        initData() {
            const rows = this.formatterData()
            rows.forEach(row => {
                const fields = row.fields || []
                fields.forEach(item => {
                    const { name, fieldType, value, visible } = item
                    item.visible = visible === false ? false : true

                    if (!item.visible) {
                        this.hiddens.push(item)
                    }
                    if (name && item.hasOwnProperty('value')) {
                        console.log(name, value)
                        this.setData(name, value)
                    } else {
                        // 初始化formData默认值
                        if (!this.formData.hasOwnProperty(name)) {
                            if (['input', 'select'].indexOf(fieldType) > -1) {
                                this.setData(name, '')
                            }
                        }
                    }
                })
            })

            this.rows = rows
            this.$emit('input', this.formData)
        },
        setFieldData(name, data) {
            const formItems = this.$refs['formItem']
            const target = formItems.filter(item => item.name === name)[0]
            if (target) {
                target.setData && target.setData(data)
            } else {
                console.warn('[setFieldData]', `${name} is not matched`)
            }
        },
        getFieldType(type) {
            const types = this.types

            if (types[type]) {
                return types[type]
            } else {
                return null
            }
        },
        // 获取原始配置数据
        getFieldProps(name) {
            const types = this.types
            const rows = this.rows
            let target = null
            rows.some(row => {
                const fields = row.fields || []
                const result = fields.some(item => {
                    if (item.name === name) {
                        target = item
                        return true
                    } else {
                        return false
                    }
                })
                if (result) {
                    return true
                } else {
                    return false
                }
            })
            if (target) {
                return target
            } else {
                throw `[error]: 未找到name=${name}的数据项`
            }
        },

        updateForm(name, value) {
            //console.log('[input,update]', name, value)

            // todo 未知bug
            if (name && value !== undefined) {
                this.setData(name, value)
            }

            this.$emit(`update`, name, value)
            this.$emit('input', this.formData)
        },

        submit() {
            console.log('[submit]', JSON.stringify(this.formData))
            this.$emit('submit', this.formData)
        },
        validate(cb) {
            this.$refs['form'].validate(valid => {
                cb && cb(valid)
            })
        },
        validateField(prop, cb) {
            this.$refs['form'].validateField(prop, error => {
                if (error) {
                    cb(false)
                } else {
                    cb(true)
                }
            })
        },
        clearValidate() {
            this.$refs['form'].clearValidate()
        },
        reset() {
            console.log('[reset]')
            this.$refs['form'].resetFields()
            this.$emit('reset')
        },
    },
}
</script>
