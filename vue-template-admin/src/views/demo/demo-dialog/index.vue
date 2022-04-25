<template>
    <div class="sg-page">
        <div class="page-btns">
            <el-button
                class=""
                type="primary"
                icon="el-icon-plus"
                @click="onOpenDialog"
                >全局dialog打开方式</el-button
            >
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
                            type="danger"
                            size="small"
                            @click="onDel(row, $index)"
                            >删除</el-button
                        >
                        <el-button
                            type="primary"
                            size="small"
                            @click="onEdit(row, $index)"
                            >编辑</el-button
                        >
                        <el-button
                            type="default"
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
            :visible.sync="formDialogVisible"
            @callback="handleCallbackFormDialog"
        />

        <!-- 列表dialog -->
        <table-dialog
            ref="tableDialogRef"
            :title="dialogTitle"
            :visible.sync="tableDialogVisible"
            @callback="handleCallbackTableDialog"
        />
    </div>
</template>

<script>
import FormDialog from './components/formDialog.vue'
import TableDialog from './components/tableDialog.vue'
import DemoJson from './demo-json.json'
export default {
    components: { FormDialog, TableDialog },
    data() {
        return {
            dialogType: 'add',
            dialogTitle: '',
            formDialogVisible: false,
            tableDialogVisible: false,
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
    created() {
        const jsonData = DemoJson
        console.log('jsonData', jsonData)
        const result = jsonData.map((v) => this.handleJsonData(v))
        console.log('result', result)
    },
    methods: {
        handleJsonData(list) {
            console.log('list', list)
            const stack = [...list]
            const temp = []
            while (stack.length) {
                const pop = stack.shift()
                console.log('pop', pop)
                const isHas = temp.some((item) =>
                    item.some((v) => v.val === pop.val),
                )
                if (isHas) {
                } else {
                    temp.push([pop])
                }
            }
            return temp
        },
        isHas(list, key, value) {
            let isIdx = list.findIndex((v) => v[key] === value)
            console.log('isIdx', isIdx)
        },
        /** 表单弹框关闭回调函数，用来处理关闭弹框后需要执行后续操作 */
        handleCallbackFormDialog(data) {
            console.log('data :>> ', data)
        },
        /** 表格弹框关闭回调函数，用来处理关闭弹框后需要执行后续操作 */
        handleCallbackTableDialog(data) {
            console.log('data :>> ', data)
        },
        /** 批量报送 */
        onOpenDialog() {
            this.$modalDialog(() => import('./components/globalDialog.vue'), {
                title: '标题',
            })
                .then((res) => {
                    console.log('res :>> ', res)
                })
                .catch((err) => {
                    console.log('err :>> ', err)
                })
        },
        /** 表单新增 */
        onAddForm() {
            this.dialogType = 'add'
            this.dialogTitle = '表单新增'
            this.formDialogVisible = true
        },
        /** 列表查询 */
        onAddTable() {
            this.dialogTitle = '列表查询'
            this.tableDialogVisible = true
        },
        /** 删除 */
        onDel(row, index) {
            console.log('del :>>')
            console.log('row :>> ', row)
            console.log('index :>> ', index)
        },
        /** 表单编辑 */
        onEdit(row, index) {
            console.log('row :>> ', row)
            console.log('index :>> ', index)
            this.dialogType = 'edit'
            this.dialogTitle = '表单编辑'
            this.formDialogVisible = true
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
