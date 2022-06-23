<!--
    表格 - 案例
-->
<template>
    <div class="sg-page">
        demo-list 123
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="date" label="日期" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="province" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="number" label="数量" width="100">
                <template slot-scope="{ row }">
                    <el-input
                        v-if="row.isEdit"
                        v-model="row.number"
                        @focus="handleFocus"
                        @blur="(e) => handleBlur(e, row)"
                    ></el-input>
                    <el-button v-else type="primary" @click="onClick(row)">{{
                        row.number
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="handleClick(scope.row)"
                        >查看</el-button
                    >
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333,
                    number: 100,
                    isEdit: false,
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333,
                    number: 800,
                    isEdit: false,
                },
            ],
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        onClick(row) {
            row.isEdit = true
        },
        handleFocus(val) {
            console.log('focus-val :>> ', val)
        },
        handleBlur(e, row) {
            console.log('blur-row :>> ', row)
            row.isEdit = false
        },
        handleClick(row) {
            console.log(row)
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
