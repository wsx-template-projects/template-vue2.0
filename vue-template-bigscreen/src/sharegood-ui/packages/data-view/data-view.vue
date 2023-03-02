<template>
    <div class="sg-data-view" ref="wrap">
        <slot name="header"></slot>
        <div class="sg-data-view__wrap">
            <el-table
                :id="printId"
                class="sg-data-view__table"
                v-loading="listLoading"
                :data="dataSource"
                style="width: 100%;"
                ref="table"
                :border="border"
                v-bind="$attrs"
                v-on="$listeners"
            >
                <template v-for="(col, index) in columns">
                    <template v-if="col.type === 'selection'">
                        <el-table-column
                            :key="index"
                            type="selection"
                            :width="col.width"
                            align="center"
                            :selectable="handleSelectAble"
                        ></el-table-column>
                    </template>
                    <template v-else-if="col.type === 'index'">
                        <el-table-column
                            :key="index"
                            type="index"
                            :width="col.width || '50px'"
                            align="center"
                            :label="col.label"
                        ></el-table-column>
                    </template>
                    <template v-else-if="col.type === 'slot'">
                        <slot :name="col.name || col.prop"></slot>
                    </template>
                    <template v-else-if="col.slotName">
                        <el-table-column
                            :label="col.label"
                            :prop="col.prop"
                            :align="col.align || 'center'"
                            :key="index"
                            :type="col.type"
                            :width="col.width"
                            :fixed="col.fixed || false"
                        >
                            <template slot-scope="scope">
                                <slot
                                    :name="col.slotName"
                                    :row="scope.row"
                                    :$index="scope.$index"
                                ></slot>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column
                            :key="index"
                            :align="col.align || 'center'"
                            v-bind="col"
                        >
                            <template slot-scope="scope">
                                <ex-slot
                                    v-if="col.render"
                                    :render="col.render"
                                    :row="scope.row"
                                    :index="scope.$index"
                                    :column="col"
                                    :defaultValue="defaultValue"
                                ></ex-slot>
                                <template v-else>
                                    <template
                                        v-if="
                                            col.tooltip && scope.row[col.prop]
                                        "
                                    >
                                        <el-tooltip
                                            popper-class="sg-table-tooltip"
                                            effect="light"
                                            :content="
                                                scope.row[col.prop] ||
                                                    (scope.row[col.prop] === 0
                                                        ? '0'
                                                        : defaultValue)
                                            "
                                            placement="top-end"
                                        >
                                            <span
                                                :class="col.class"
                                                class="sg-table-txt-cut"
                                            >
                                                {{
                                                    scope.row[col.prop] ||
                                                    (scope.row[col.prop] === 0
                                                        ? '0'
                                                        : defaultValue)
                                                }}
                                            </span>
                                        </el-tooltip>
                                    </template>
                                    <template v-else>
                                        <span :class="col.class">
                                            {{
                                                 scope.row[col.prop] ||
                                                    (scope.row[col.prop] === 0
                                                        ? '0'
                                                        : defaultValue)
                                            }}
                                        </span>
                                    </template>
                                </template>
                            </template>
                        </el-table-column>
                    </template>
                </template>
                <div class="" slot="empty">
                    <slot name="empty" v-if="!isVirgin">
                        暂无数据
                    </slot>
                    <slot name="virgin" v-else>
                        请先查询数据
                    </slot>
                </div>
            </el-table>

            <sg-pagination
                v-if="pageVisible"
                :total="total"
                :page.sync="exPagination.page"
                :limit.sync="exPagination.pageSize"
                :pageSizes.sync="exPagination.pageSizes"
                v-bind="exPagination"
                @pagination="onLoad"
                class="sg-pagination sg-data-view__pagination"
            >
                <div class="sg-flex-1" slot="page-header">
                    <slot name="page-header"></slot>
                </div>

                <span slot="page-body" class="sg-data-view__pager-action">
                    <template v-for="(action, index) in pageActionLayout">
                        <template v-if="action.key === 'print'">
                            <el-button
                                :key="index"
                                type="primary"
                                style="margin-right:7px"
                                @click="handlePrint"
                                >{{ action.label }}</el-button
                            >
                        </template>
                        <template v-else-if="action.key === 'export'">
                            <sg-data-export
                                :key="index"
                                :data="exportData"
                                :columns="exportColumns"
                                :name="exportName"
                            ></sg-data-export>
                        </template>
                    </template>

                    <slot name="page-body"></slot>
                </span>
                <!-- <div slot="page-body">

                </div> -->
            </sg-pagination>
        </div>
    </div>
</template>

<script>
import printJS from 'print-js'
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
// 自定义内容的组件
const exSlot = {
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null,
        },
        defaultValue: String,
    },

    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
        }
        let defaultValue = ctx.props.defaultValue

        if (ctx.props.column) params.column = ctx.props.column

        return h('div', [ctx.props.render(h, params) || defaultValue])
    },
}
export default {
    name: 'SgDataView',
    components: {
        'ex-slot': exSlot,
        Fun: {
            render(h) {
                let template = <button type="button"></button>
                template.children = template.children || []
                template.children.push(<span>1111</span>)
                return template
            },
        },
    },
    props: {
        // 底部按钮布局
        pageActionLayout: {
            type: Array,
            default() {
                return [
                    {
                        key: 'print',
                        label: '打印',
                    },
                    {
                        key: 'export',
                        label: '导出',
                    },
                ]
            },
        },
        border: {
            type: Boolean,
            default: true,
        },
        // table操作栏
        hasBar: {
            type: Boolean,
            default: false,
        },
        exportName: {
            type: String,
            default: '导出数据',
        },
        // 默认值
        defaultValue: {
            type: String,
            default: '-',
        },
        // 排序
        sortOptions: {
            type: Array,
            default() {
                return []
            },
        },
        // 列
        columns: {
            type: Array,
            default() {
                return []
            },
        },
        // 第一次是否自动请求
        auto: {
            type: Boolean,
            default: true,
        },
        // 是否需要分页
        pageVisible: {
            type: Boolean,
            default: true,
        },
        // 分页配置
        pagination: {
            type: Object,
            default() {
                return {}
            },
        },
        // 数据请求
        load: {
            type: Function,
            default() {
                return []
            },
        },

        // table最小高度
        minHeight: {
            type: Number,
            default: 200,
        },
        // 页面留白高度
        spaceHeight: {
            type: Number,
            default: 120,
        },
        // 是否自动计算高度
        isAutoHeight: {
            type: Boolean,
            default: false,
        },
        handleSelectAble: {
            type: Function,
            default() {
                return true
            },
        },
        paramsSerializer: {
            type: Function,
            default: null,
        },
    },
    data() {
        return {
            printId: `table-${guid()}`,
            exportData: [], // 导出数据
            exportColumns: [], // 导出配置
            sortParams: {},
            sort: '', // 默认排序值
            operationVisible: false, // 列
            tableHeight: null,
            isVirgin: true,
            total: 0,
            listLoading: false,
            dataSource: [],
            myColumns: [],
            operations: [],
            operation: [],
            multipleSelection: [],
        }
    },
    computed: {
        myParamsSerializer() {
            const CONFIG = this.$ShareGood || {}
            const DataViewConfig = CONFIG.DataView || {}

            let paramsSerializer =
                this.paramsSerializer || DataViewConfig.paramsSerializer
            return paramsSerializer
        },
        exAttrs() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}
            const attrs = this.$attrs || {}
            const defaults = {
                border: true,
                fit: true,
            }
            return {
                ...defaults,
                ...DataViewConfig,
                ...attrs,
            }
        },
        exPagination() {
            const config = this.$ShareGood || {}
            const DataViewConfig = config.DataView || {}
            const PageConfig = DataViewConfig.pagination || {}
            const myPageConfig = this.pagination || {}

            const result = {
                pageSize: 20,
                visible: true,
                page: 1,
                pageSizes: [10, 20, 50, 100],
                layout: 'total, sizes, prev, pager, next, jumper',
                ...PageConfig,
                ...myPageConfig,
            }
            console.log('exPagination', result)
            return result
        },
    },
    created() {
        this.exportColumns = this.columns
            .map(item => {
                let target = {
                    ...item,
                }
                if (item.noExport) {
                    return null
                } else {
                    const { prop, exportRender, label } = target
                    return {
                        prop,
                        label,
                        render: exportRender,
                    }
                }
            })
            .filter(item => item)
        this.myColumns = [...this.columns]
        this.operations = this.columns
            .map(item => {
                if (item.prop) {
                    return {
                        checked: true,
                        label: item.label,
                        value: item.prop,
                    }
                } else {
                    return null
                }
            })
            .filter(item => item)

        this.operation = this.operations.map(item => item.value)

        this.auto && this.onLoad({})
    },
    mounted() {
        this.isAutoHeight && this.calcHeight()
    },
    methods: {
        //
        handlePrint(id) {
            id = typeof id === 'string' ? id : this.printId
            console.log('handlePrint', id)
            printJS({
                printable: id,
                type: 'html',
                //properties: [
                //    { field: 'name', displayName: '姓名', columnSize:`50%`},
                //    { field: 'sex', displayName: '性别',columnSize:`50%`},
                //],
                // header: `<p class="custom-p"> 名单 </p>`,
                // style: '#printCons {width: 600px;} .no-print{width: 0px} .itemText1 { width: 200px } .itemText2 { width: 200px } .itemText3 { width: 200px } .itemText4 { width: 200px }',
                // gridHeaderStyle:'font-size:12px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
                // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
                // repeatTableHeader: true,
                // scanStyles:true,
                targetStyles: ['*'],
                ignoreElements: ['no-print'],
            })
        },
        // 排序
        onSortChange(val) {
            const target = this.sortOptions.filter(
                item => item.value === val,
            )[0]
            const { key, value } = target
            const params = {
                page: 1,
            }
            this.sortParams[key] = value

            this.onLoad(params)
        },
        // 刷新
        handleReload() {
            this.onLoad()
        },
        //
        onOperationChange() {
            //this.onLoad({ page: 1 })
        },
        onOperationChange(val) {
            this.columns = this.myColumns
                .map(item => {
                    if (
                        val.indexOf(item.prop) > -1 ||
                        item.type === 'selection'
                    ) {
                        return item
                    } else {
                        return null
                    }
                })
                .filter(item => item)
        },
        // 计算tabel高度
        calcHeight() {
            let H = window.innerHeight
            let minHeight = this.minHeight
            let wrapHeight = this.$refs.wrap.getBoundingClientRect().top
            let height = null
            //height = H - wrapHeight - Number(this.spaceHeight)
            height = H - Number(this.spaceHeight)

            this.tableHeight = Math.max(minHeight, height)
        },

        scrollTop() {
            this.$nextTick(() => {
                try {
                    let $el = this.$refs.table.$el,
                        $wrap = $el.getElementsByClassName(
                            'el-table__body-wrapper',
                        )[0]
                    $wrap && ($wrap.scrollTop = 0)
                } catch (e) {
                    console.log(e)
                }
            })
        },
        // 加载数据
        onLoad(params = {}) {
            let page = params.page
            let paramsSerializer = this.myParamsSerializer
            params.pageSize = params.pageSize || this.exPagination.pageSize
            if (page) {
                this.exPagination.page = page
            } else {
                page = this.exPagination.page
            }

            this.listLoading = true
            Object.assign(params, this.sortParams)
            params = paramsSerializer ? paramsSerializer(params) : params
            this.load(params)
                .then(({ result = [], total }) => {
                    this.dataSource = [...result]
                    this.exportData = [...result]

                    this.total = total || 0
                    this.listLoading = false
                    this.isVirgin = false

                    this.scrollTop()
                })
                .catch(err => {
                    console.error('[data-view load]', err)
                    this.dataSource = []
                    this.total = 0
                    this.listLoading = false
                    this.isVirgin = false
                    this.scrollTop()
                })
        },
    },
}
</script>
