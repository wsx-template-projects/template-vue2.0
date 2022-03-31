<!--
    菜单 - 示例
-->
<template>
    <div class="app-containers">
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
                        <div v-if="scope.row.status == 0">
                            <el-button size="small" plain type="success"
                                >正常</el-button
                            >
                        </div>
                        <div v-else>
                            <el-button size="small" plain type="danger"
                                >禁用</el-button
                            >
                        </div>
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

        <!-- 添加或者编辑菜单 -->
        <add-menu
            ref="addmenuRef"
            :title="dialogFormTitle"
            :visible.sync="dialogFormVisible"
            @callback="handleCallbackAddMenu"
        />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import AddMenu from './components/addMenu.vue'
export default {
    components: { Pagination, AddMenu },
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
            // dialogFormRules: {
            //     name: [
            //         {
            //             required: true,
            //             message: '请输入部门名称',
            //             trigger: 'blur',
            //         },
            //     ],
            //     code: [
            //         {
            //             required: true,
            //             message: '请输入部门简介',
            //             trigger: 'blur',
            //         },
            //     ],
            // },
            searchForm: {
                name: '',
            },
            list: [],
            dialogFormVisible: false,
            dialogFormTitle: '',
            // formLabelWidth: '80px',
            // dialogForm: {
            //     name: '',
            //     code: '',
            //     router: '',
            //     icon: '',
            //     status: '',
            // },
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
            },
        }
    },
    watch: {
        // dialogForm: {
        //     handler(val) {
        //         console.log('val :>> ', val)
        //     },
        //     deep: true,
        // },
    },
    created() {
        this.getList()
    },
    methods: {
        /** 弹框关闭回调函数，用来处理关闭弹框后需要执行后续操作 */
        handleCallbackAddMenu(data) {
            console.log('data :>> ', data)
        },
        // handleAvatarSuccess(res, file) {
        //     this.dialogForm.icon = URL.createObjectURL(file.raw)
        // },
        // beforeAvatarUpload(file) {
        //     const isPNG = file.type === 'image/png'
        //     const isLt2M = file.size / 1024 / 1024 < 2

        //     if (!isPNG) {
        //         this.$message.error('上传头像图片只能是 PNG 格式!')
        //     }
        //     if (!isLt2M) {
        //         this.$message.error('上传头像图片大小不能超过 2MB!')
        //     }
        //     return isPNG && isLt2M
        // },
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
            this.dialogFormTitle = '新增菜单'
            // this.resetForm('dialogForm')
        },
        addRow(index, row) {
            console.log(row)
            this.dialogFormTitle = '新增下级'
            this.dialogFormVisible = true
            //this.resetForm('dialogForm')
        },
        editRow(index, row) {
            console.log(row)
            console.log('this :>> ', this.$refs.addmenuRef)
            this.dialogFormVisible = true
            this.dialogFormTitle = '编辑菜单'
            this.$refs.addmenuRef.getInitFormData(row)
            //this.resetForm('dialogForm')
            // this.dialogForm.name = row.name
            // this.dialogForm.code = row.code
            // this.dialogForm.router = row.router
            // this.dialogForm.status = row.status
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
        // resetForm(formName) {
        //     this.$refs[formName] && this.$refs[formName].resetFields()
        // },
        // cancel() {
        //     this.dialogFormVisible = false
        //     this.resetForm('dialogForm')
        // },
        // submitCon() {
        //     this.$refs['dialogForm'].validate((valid) => {
        //         if (valid) {
        //             // console.log(this.dialogForm)
        //             const params = { ...this.dialogForm }
        //             console.log('params :>> ', params)
        //             // todo 即将请求接口
        //             setTimeout(() => {
        //                 this.dialogFormVisible = false
        //             }, 1000)
        //             //this.resetForm('dialogForm')
        //         }
        //     })
        // },
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
</style>
