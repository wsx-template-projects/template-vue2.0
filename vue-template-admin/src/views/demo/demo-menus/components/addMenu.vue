<!--
   新增菜单 - dialog
-->
<template>
    <div class="components-dialog">
        <el-dialog
            :title="title"
            :width="width"
            :visible.sync="dialogFormVisible"
            @close="resetForm('dialogForm')"
        >
            <el-form
                ref="dialogForm"
                :model="dialogForm"
                :rules="dialogFormRules"
            >
                <el-form-item
                    label="菜单名称"
                    prop="name"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="dialogForm.name"
                        autocomplete="off"
                        placeholder="请输入菜单名称"
                    />
                </el-form-item>
                <el-form-item
                    label="菜单编码"
                    prop="code"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="dialogForm.code"
                        autocomplete="off"
                        placeholder="请输入菜单编码"
                    />
                </el-form-item>
                <el-form-item
                    label="路由地址"
                    prop="router"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="dialogForm.router"
                        autocomplete="off"
                        placeholder="请输入路由地址"
                    />
                </el-form-item>
                <el-form-item
                    label="上传图标"
                    prop="icon"
                    :label-width="formLabelWidth"
                >
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="dialogForm.icon"
                            :src="dialogForm.icon"
                            class="avatar"
                        />
                        <i
                            v-else
                            class="el-icon-upload2 avatar-uploader-icon"
                        ></i>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    label="状态"
                    prop="status"
                    :label-width="formLabelWidth"
                >
                    <el-select
                        v-model="dialogForm.status"
                        placeholder="请选择状态"
                    >
                        <el-option label="正常" value="0" />
                        <el-option label="禁用" value="1" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="submitCon"
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
            default: '30%',
        },
    },
    data() {
        return {
            formLabelWidth: '80px',
            dialogForm: {
                name: '',
                code: '',
                router: '',
                icon: '',
                status: '',
            },
            dialogFormRules: {
                name: [
                    {
                        required: true,
                        message: '请输入部门名称',
                        trigger: 'blur',
                    },
                ],
                code: [
                    {
                        required: true,
                        message: '请输入部门简介',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    computed: {
        dialogFormVisible: {
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
            console.log('newV :>> ', newV)
            console.log('oldV :>> ', oldV)
        },
    },
    created() {},
    mounted() {},
    methods: {
        /** 获取初始化的formData表单数据，主要用来处理编辑 */
        getInitFormData(data) {
            console.log('form-data :>> ', data)
            this.dialogForm = { ...data }
        },
        /** 重置 */
        resetForm(formName) {
            console.log('重置 :>> ')
            this.$refs[formName] && this.$refs[formName].resetFields()
            this.$emit('callback', false)
        },
        /** 取消 */
        cancel() {
            console.log('取消 :>> ')
            this.dialogFormVisible = false
        },
        /** 确认/提交 */
        submitCon() {
            this.$refs['dialogForm'].validate((valid) => {
                if (valid) {
                    // console.log(this.dialogForm)
                    const params = { ...this.dialogForm }
                    console.log('params :>> ', params)
                    // todo 即将请求接口
                    setTimeout(() => {
                        this.dialogFormVisible = false
                        this.$emit('callback', true)
                    }, 1000)
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.dialogForm.icon = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isPNG = file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isPNG) {
                this.$message.error('上传头像图片只能是 PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isPNG && isLt2M
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.avatar-uploader {
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    text-align: right;
    padding: 0 15px;
}
.avatar-uploader img {
    display: inline-block;
    width: 23px;
    height: auto;
    padding-top: 6px;
}
</style>
