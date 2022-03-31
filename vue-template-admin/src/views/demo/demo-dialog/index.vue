<template>
    <div class="sg-page">
        <el-button class="" type="primary" icon="el-icon-plus" @click="addMenu"
            >常规用法</el-button
        >

        <!-- 添加或者编辑 -->
        <add-menu
            ref="addmenuRef"
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            @callback="handleCallbackAddMenu"
        />
    </div>
</template>

<script>
import AddMenu from './components/addMenu.vue'
export default {
    components: { AddMenu },
    data() {
        return {
            dialogTitle: '',
            dialogVisible: false,
        }
    },
    watch: {},
    created() {},
    methods: {
        /** 弹框关闭回调函数，用来处理关闭弹框后需要执行后续操作 */
        handleCallbackAddMenu(data) {
            console.log('data :>> ', data)
        },

        addMenu() {
            this.dialogTitle = '新增'
            this.dialogVisible = true
        },
        editRow(row, index = 0) {
            console.log('row :>> ', row)
            console.log('index :>> ', index)
            this.dialogTitle = '编辑'
            this.dialogVisible = true
            this.$refs.addmenuRef.getInitFormData(row)
        },
    },
}
</script>

<style lang="scss" scoped></style>
