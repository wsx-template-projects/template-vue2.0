<template>
    <div class="app-containers">
        <!-- <router-view /> -->
        <el-row :gutter="20">
            <el-col :span="4">
                <el-button type="primary" @click="addMenu"
                    ><i class="el-icon-plus" /> 新增菜单</el-button
                >
            </el-col>
        </el-row>
        <div class="list">
            <el-table
                :data="list"
                style="width: 100%"
                stripe
                row-key="id"
                default-expand-all
                :tree-props="{
                    children: 'children',
                    hasChildren: 'hasChildren',
                }"
            >
                <el-table-column prop="name" label="菜单名称"></el-table-column>
                <el-table-column prop="code" label="菜单编码"></el-table-column>
                <el-table-column label="图表">
                    <template slot-scope="scope">
                        <i :class="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="router"
                    label="路由地址"
                ></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            plain
                            type="success"
                            v-if="scope.row.status == 0"
                            >正常</el-button
                        >
                        <el-button size="small" plain type="danger" v-else
                            >禁用</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            round
                            type="warning"
                            @click="addRow(scope.$index, scope.row)"
                            ><i class="el-icon-plus" /> 添加下级</el-button
                        >
                        <el-button
                            size="small"
                            round
                            type="primary"
                            @click="editRow(scope.$index, scope.row)"
                            ><i class="el-icon-edit-outline" /> 编辑</el-button
                        >
                        <el-button
                            size="small"
                            round
                            type="danger"
                            @click="deleteRow(scope.$index, scope.row)"
                            ><i class="el-icon-delete" /> 删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList"
            />
        </div>

        <!-- 新增 -->
        <el-dialog
            :visible.sync="dialogFormVisible"
            width="30%"
            :title="dialogFormTitle"
            @close="resetForm('dialogForm')"
        >
            <el-form
                :model="dialogForm"
                :rules="dialogFormRules"
                ref="dialogForm"
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
                <el-form-itemr
                    label="菜单编码"
                    prop="code"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="dialogForm.code"
                        autocomplete="off"
                        placeholder="请输入菜单编码"
                    />
                </el-form-itemr>
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
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
    components: { Pagination },
    data() {
        return {
            loading: false, //是显示加载
            searchRules: {
                name: [
                    {
                        required: true,
                        message: '用户名，名称，电话',
                        trigger: 'blur',
                    },
                ],
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
            searchForm: {
                name: '',
            },
            list: [],
            dialogFormVisible: false,
            dialogFormTitle: '',
            formLabelWidth: '80px',
            dialogForm: {
                name: '',
                code: '',
                router: '',
                icon: '',
                status: '',
            },
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
            },
        }
    },
    watch: {
        dialogForm: {
            handler(val) {
                console.log('val :>> ', val)
            },
            deep: true,
        },
    },
    created() {
        this.getList()
    },
    methods: {
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
        search() {
            this.$refs['searchForm'].validate((valid) => {
                if (valid) {
                    this.$message.success('搜索成功!')
                } else {
                    this.$message.error('搜索失败!')
                }
            })
        },
        addMenu() {
            this.dialogFormVisible = true
            //console.log(this.$refs['dialogForm'])
            this.resetForm('dialogForm')
            this.dialogFormTitle = '新增菜单'
        },
        addRow(index, row) {
            console.log(row)
            this.dialogFormTitle = '新增下级'
            this.dialogFormVisible = true
            //this.resetForm('dialogForm')
        },
        editRow(index, row) {
            console.log(row)
            this.dialogFormTitle = '编辑菜单'
            this.dialogFormVisible = true
            //this.resetForm('dialogForm')
            this.dialogForm.name = row.name
            this.dialogForm.code = row.code
            this.dialogForm.router = row.router
            this.dialogForm.status = row.status
        },
        deleteRow(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    console.log(row.name)
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
        resetForm(formName) {
            this.$refs[formName] && this.$refs[formName].resetFields()
        },
        cancel() {
            this.dialogFormVisible = false
            this.resetForm('dialogForm')
        },
        submitCon() {
            this.$refs['dialogForm'].validate((valid) => {
                if (valid) {
                    // console.log(this.dialogForm)
                    const params = { ...this.dialogForm }
                    console.log('params :>> ', params)
                    // todo 即将请求接口
                    setTimeout(() => {
                        this.dialogFormVisible = false
                    }, 1000)
                    //this.resetForm('dialogForm')
                }
            })
        },
        getList() {
            this.listLoading = true
            ;(this.list = [
                {
                    id: '1',
                    name: '系统管理',
                    code: 'system',
                    icon: 'el-icon-setting',
                    router: '/system',
                    status: '0',
                    children: [
                        {
                            id: '1-1',
                            name: '角色管理',
                            code: 'role',
                            icon: '',
                            router: '/role',
                            status: '0',
                        },
                        {
                            id: '1-2',
                            name: '部门管理',
                            code: 'department',
                            icon: '',
                            router: '/department',
                            status: '1',
                        },
                    ],
                },
                {
                    id: '2',
                    name: '系统管理1',
                    code: 'system1',
                    icon: '',
                    router: '/system1',
                    status: '0',
                    children: [
                        {
                            id: '2-1',
                            name: '角色管理1',
                            code: 'role1',
                            icon: '',
                            router: '/role1',
                            status: '0',
                        },
                        {
                            id: '2-2',
                            name: '部门管理1',
                            code: 'department1',
                            icon: '',
                            router: '/department1',
                            status: '1',
                        },
                    ],
                },
            ]),
                (this.total = this.list.length)
        },
    },
}
</script>

<style lang="scss">
td.el-table_1_column_1 .cell,
td.el-table_1_column_3 .cell i {
    color: #40a0fc;
}
td.el-table_1_column_3 .cell i {
    font-size: 18px;
}
.list {
    margin-top: 20px;
}
.el-table .cell {
    text-align: center;
}
.list .el-table th {
    background: #f2f6ff;
    text-align: center;
}
.list .el-button--small.is-round,
.el-button--small {
    padding: 5px 15px;
}
.el-select {
    width: 100%;
}
.pagination {
    text-align: right;
}
.search .el-form-item__content {
    width: 90%;
}
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
