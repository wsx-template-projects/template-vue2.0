<template>
    <div class="sg-page admin-form-layout">
        <el-card class="my-card">
            <section slot="header">
                <div class="sg-flexbox align-center">
                    <span class="sg-flex-1 ">表单slot</span>
                </div>
            </section>
            <section class="sg-card-body">
                <sg-base-form
                    ref="form"
                    :span="24"
                    :rules="editForm.rules"
                    v-model="editForm.model"
                    :fields="editForm.fields"
                    label-width="150px"
                    class=""
                >
                    <el-col
                        slot="add-batch-append"
                        class="market-grid-client-assign-manager-components-company-import-confirm-dialog__headline"
                    >
                        1）添加批次信息
                    </el-col>
                    <el-col
                        slot="assign-batch-append"
                        class="market-grid-client-assign-manager-components-company-import-confirm-dialog__headline"
                    >
                        2）分配批次信息
                    </el-col>
                </sg-base-form>
                <el-row type="flex" justify="center" slot="footer">
                    <el-button
                        type="primary"
                        @click="handleSubmit"
                        native-type="submit"
                        >确定分配
                    </el-button>
                </el-row>
            </section>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'AdminFormLayout',
    components: {},
    props: {},
    data() {
        return {
            editForm: {
                rules: {
                    addBatchName: [
                        { required: true, message: '请填写', trigger: 'blur' },
                    ],
                    allotBatchName: [
                        { required: true, message: '请填写', trigger: 'blur' },
                    ],
                },
                model: {},
                fields: [
                    {
                        class:
                            'market-grid-client-assign-manager-components-company-import-confirm-dialog__fieldset',
                        appendSlot: 'add-batch-append',
                        columns: [
                            {
                                name: 'addBatchNo',
                                label: '添加批次',
                                tag: 'text',
                                attrs: {
                                    value: '1',
                                },
                            },
                            {
                                name: 'addBatchName',
                                label: '请填写添加批次名称',
                                tag: 'input',
                                attrs: {
                                    placeholder:
                                        '4-20位数字、大小写字母或中文组合',
                                },
                            },
                        ],
                    },
                    {
                        class:
                            'market-grid-client-assign-manager-components-company-import-confirm-dialog__fieldset',
                        appendSlot: 'assign-batch-append',
                        columns: [
                            {
                                name: 'allotBatchNo',
                                label: '分配批次',
                                tag: 'text',
                                attrs: {
                                    value: '2',
                                },
                            },
                            {
                                name: 'allotBatchName',
                                label: '请填写分配批次名称',
                                tag: 'input',
                                attrs: {
                                    placeholder:
                                        '4-20位数字、大小写字母或中文组合',
                                },
                            },
                        ],
                    },
                ],
            },
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        handleSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$emit('success', this.editForm.model)
                    this.handleClose()
                }
            })
        },
    },
}
</script>

<style lang="less">
.admin-form-layout {
    .market-grid-client-assign-manager-components-company-import-confirm-dialog__fieldset {
        padding: 15px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 12px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
