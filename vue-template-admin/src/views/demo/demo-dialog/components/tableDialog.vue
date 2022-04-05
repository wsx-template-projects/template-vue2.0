<!--
   table - dialog
-->
<template>
    <div class="components-dialog">
        <el-dialog
            :title="title"
            :width="width"
            :visible.sync="dialogVisible"
            @close="handleClose"
        >
            <el-form
                ref="formRef"
                :model="formFields"
                :rules="formRules"
                :label-width="labelWidth"
            >
                <el-form-item label="姓名" prop="name">
                    <el-input
                        v-model="formFields.name"
                        placeholder="请输入姓名"
                    />
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input
                        v-model="formFields.address"
                        placeholder="请输入地址"
                    />
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-input
                        v-model="formFields.date"
                        placeholder="请输入日期"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCancel">取消</el-button>
                    <el-button
                        type="primary"
                        :loading="isLoading"
                        @click="onSubmit"
                        >确定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: {
        /** 弹框类型 add/edit */
        type: {
            type: String,
            default: 'add',
        },
        /** 弹框标题 */
        title: {
            type: String,
            default: '',
        },
        /** 是否显示弹框 */
        visible: {
            type: Boolean,
            default: false,
        },
        /** 弹框宽度 */
        width: {
            type: String,
            default: '800px',
        },
    },
    data() {
        return {
            labelWidth: '100px',
            isLoading: false,
            formFields: {
                name: '',
                address: '',
                date: '',
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur',
                    },
                ],
                address: [
                    {
                        required: true,
                        message: '请输入地址',
                        trigger: 'blur',
                    },
                ],
                date: [
                    {
                        required: true,
                        message: '请输入日期',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    watch: {
        visible(newV, oldV) {
            // console.log('newV :>> ', newV)
            // console.log('oldV :>> ', oldV)
        },
    },
    created() {},
    mounted() {},
    methods: {
        /** 获取初始化的formData表单数据，主要用来处理编辑 */
        getInitFormData(data) {
            console.log('init-form-data :>> ', data)
            this.formFields = { ...data }
        },
        handleClose() {
            console.log('close :>> ')
            this.resetForm()
        },
        /** 重置 */
        resetForm() {
            console.log('reset :>> ')
            this.formFields = { name: '', address: '', date: '' }
            this.$refs['formRef'] && this.$refs['formRef'].resetFields()
        },
        /** 取消 */
        onCancel() {
            console.log('cancel :>> ')
            this.dialogVisible = false
        },
        /** 确认/提交 */
        onSubmit() {
            console.log('submit :>> ')
            this.$refs['formRef'].validate((valid) => {
                if (!valid) {
                    console.log('error submit!!! :>> ')
                    return false
                }
                // todo 即将请求接口
                const params = { ...this.formFields }
                console.log('params :>> ', params)
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false
                    this.dialogVisible = false
                    const msg = this.type === 'add' ? '添加成功' : '编辑成功'
                    this.$message.success(msg)
                    this.$emit('success')
                }, 1000)
            })
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
