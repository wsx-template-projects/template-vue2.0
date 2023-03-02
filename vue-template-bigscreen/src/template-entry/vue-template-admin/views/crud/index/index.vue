<template>
    <div class="sg-page admin-crud-index">
        <el-card class="box-card">
            <div slot="header">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                    >操作按钮</el-button
                >
            </div>
            <sg-base-form
                class="sg-m-b-15"
                :fields="FormView.fields"
                v-model="FormView.model"
                :span="8"
            >
            </sg-base-form>
            <sg-data-view
                :columns="TableView.columns"
                :load="TableView.load"
                ref="table"
            >
                <template slot-scope="scope" slot="dom">
                    <el-tag
                        type="warning"
                        v-for="(tag, index) in scope.row['dom'].split(',')"
                        :key="index"
                        style="margin-right:5px"
                        >{{ tag }}</el-tag
                    >
                </template>
            </sg-data-view>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'CrudIndex',
    components: {},
    props: {},
    data() {
        return {
            FormView: {
                model: {},
                fields: [
                    {
                        columns: [
                            {
                                tag: 'input',
                                name: 'title',
                                itemAttrs: {
                                    showLabelTooltip: true,
                                    label: '查询标题',
                                },
                                attrs: {
                                    placeholder: '请输入',
                                },
                            },

                            {
                                tag: 'select',
                                name: 'status',
                                value: '1',
                                itemAttrs: {
                                    label: '内容状态',
                                },
                                attrs: {
                                    isQuery: true,

                                    placeholder: '请选择',
                                    options: [
                                        {
                                            label: '未发布',
                                            value: '1',
                                        },
                                        {
                                            label: '已发布',
                                            value: '2',
                                        },
                                    ],
                                },
                            },

                            {
                                tag: 'input',
                                name: '隐藏域',
                                visible: false,
                                itemAttrs: {
                                    label: '隐藏域',
                                },
                                attrs: {
                                    placeholder: '请输入',
                                },
                            },
                            {
                                span(count) {
                                    return count >= 3 ? 24 : 8
                                },
                                tag: 'action',
                                buttons: [
                                    {
                                        isSubmit: true,
                                        type: 'primary',
                                        text: '查询',
                                    },
                                    {
                                        isReset: true,
                                        text: '重置',
                                    },
                                    {
                                        isMore: true,
                                        text: '更多条件',
                                        hiddenText: '收起条件',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            TableView: {
                load: params => {
                    let query = { name: '测试' }
                    params = {
                        ...params,
                        ...query,
                    }
                    this.selected = [params]
                    console.log('params', params)

                    return this.syncData(params)
                },
                columns: [
                    {
                        label: '全选',
                        type: 'selection',
                    },
                    {
                        label: '序号',
                        type: 'index',
                    },
                    {
                        label: '名字',
                        prop: 'name',
                        width: '200px',
                    },

                    {
                        label: '粉丝数',
                        prop: 'fans',
                        width: '200px',
                    },

                    {
                        label: '生日',
                        prop: 'birthday',
                        width: '100px',
                    },

                    {
                        label: '标签',

                        prop: 'dom',
                        slotName: 'dom',
                        width: '200px',
                    },

                    {
                        label: '性别',
                        prop: 'gender',
                        render: (h, { row }) => {
                            return row['gender'] == '1' ? '男' : '女'
                        },
                    },
                    {
                        label: '备注',
                        prop: 'remark',
                        width: '400px',
                        tooltip: true,
                    },
                    {
                        label: '创建时间',
                        prop: 'date',
                        width: '200px',
                    },
                    {
                        label: '操作',
                        prop: 'action',
                        width: '150px',
                        fixed: 'right',
                        render: (h, { row }) => {
                            // 默认网格不可操作

                            return [
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'text',
                                        },
                                        on: {
                                            click: () => {
                                                this.handleUpdate(row)
                                            },
                                        },
                                    },
                                    '编辑',
                                ),

                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'text',
                                        },
                                        on: {
                                            click: () => {
                                                this.handleDelete(row)
                                            },
                                        },
                                    },
                                    '删除',
                                ),
                            ]
                        },
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
        syncData() {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve({
                        result: [
                            {
                                name: '张国荣',
                                birthday: '1967-12-12',
                                fans: 10000,
                                gender: 1,

                                dom: '香港,帅气',

                                remark:
                                    '张国荣（1956年9月12日-2003年4月1日），出生于香港，中国香港男歌手、演员、音乐人，影视歌多栖发展的代表之一。1977年正式出道。1983年以《风继续吹》获得关注。1984年演唱的《Monica》是香港歌坛第一支同获十大中文金曲、十大劲歌金曲的舞曲',
                            },
                            {
                                name: '张学友',
                                birthday: '1967-11-12',
                                fans: 20000,
                                gender: 1,

                                dom: '歌神,吻别',

                                remark:
                                    '1990年，张学友在拍摄电影《阿飞正传》的间隙，也在筹备新专辑，每日奔波两地，十分辛苦。唱到今天，2020年7月10日，张学友59岁了。还有多少人，在等他的演唱会？岁月，请你慢点走，且让歌神再唱一首',
                            },
                        ],
                        total: 120,
                    })
                }, 1000)
            })
        },
        handleUpdate(row) {
            this.$router.push({
                path: '/curd/index/edit',
                query: {
                    _: row.name,
                    id: row.name,
                },
            })
        },
        handleDelete(row) {
            this.selected = [row]
        },
        onSelectionChange(val) {
            console.log('onSelectionChange', val)
            this.selected = val
        },
    },
}
</script>

<style lang="less" module></style>
