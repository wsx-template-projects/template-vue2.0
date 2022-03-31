<template>
    <div class="sg-page">
        <div class="page-btns">
            <el-button
                class=""
                type="primary"
                icon="el-icon-plus"
                @click="onAddForm"
                >表单弹框</el-button
            >
            <el-button
                class=""
                type="primary"
                icon="el-icon-plus"
                @click="onAddTable"
                >表格弹框</el-button
            >
        </div>

        <div class="page-main">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
                <el-table-column prop="date" label="日期"> </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="{ row, $index }">
                        <el-button
                            type="text"
                            size="small"
                            @click="onEdit(row, $index)"
                            >编辑</el-button
                        >
                        <el-button
                            type="text"
                            size="small"
                            @click="onCleck(row, $index)"
                            >查看</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 表单dialog -->
        <form-dialog
            ref="formDialogRef"
            :type="dialogType"
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            @callback="handleCallbackFormDialog"
        />
    </div>
</template>

<script>
import FormDialog from './components/formDialog.vue'
export default {
    components: { FormDialog },
    data() {
        return {
            dialogType: 'add',
            dialogTitle: '',
            dialogVisible: false,
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                },
            ],
        }
    },
    watch: {},
    created() {},
    methods: {
        /** 弹框关闭回调函数，用来处理关闭弹框后需要执行后续操作 */
        handleCallbackFormDialog(data) {
            console.log('data :>> ', data)
        },
        /** 新增 */
        onAddForm() {
            this.dialogType = 'add'
            this.dialogTitle = '新增'
            this.dialogVisible = true
        },
        /**  */
        onAddTable() {
            console.log('add table :>> ')
            this.$message.warning('暂未开放...')
        },
        /** 编辑 */
        onEdit(row, index) {
            console.log('row :>> ', row)
            console.log('index :>> ', index)
            this.dialogType = 'edit'
            this.dialogTitle = '编辑'
            this.dialogVisible = true
            this.$refs.formDialogRef.getInitFormData(row)
        },
        /** 查看 */
        onCleck(row, index) {
            console.log('row :>> ', row)
            console.log('index :>> ', index)
        },
    },
}
</script>

<style lang="scss" scoped></style>
