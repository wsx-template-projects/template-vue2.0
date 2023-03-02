<template>
    <div class="sg-edit-table" ref="wrap">
        <el-table
            class="sg-edit-table__table"
            :data="dataSource"
            style="width: 100%;"
            ref="table"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <template v-for="(col, index) in columns">
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
                        <template
                            v-if="scope.row['sg_editing'] && col.editOption"
                        >
                            <component
                                :is="col.editOption.type"
                                v-model="scope.row[col.prop]"
                                v-bind="col.editOption.props"
                            ></component>
                        </template>
                        <template v-else>
                            <ex-slot
                                v-if="col.render"
                                :render="col.render"
                                :row="scope.row"
                                :index="scope.$index"
                                :column="col"
                            ></ex-slot>
                            <template v-else>
                                <span :class="col.class">
                                    {{ scope.row[col.prop] }}
                                </span>
                            </template>
                        </template>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
import SgInput from '../../input/src/index.vue'
import SgSelect from '../../select/src/index.vue'
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
        const defaultValue = ctx.props.defaultValue

        if (ctx.props.column) params.column = ctx.props.column

        return h('div', [ctx.props.render(h, params) || defaultValue])
    },
}
export default {
    name: 'SgEditTable',
    components: { 'ex-slot': exSlot, SgInput, SgSelect },
    props: {
        columns: {
            type: Array,
            default() {
                return []
            },
        },
        data: {
            type: Array,
            default() {
                return []
            },
        },
        // table操作栏
        hasBar: {
            type: Boolean,
            default: false,
        },
        exportName: {
            type: String,
            default: '',
        },
        // 默认值
        defaultValue: {
            type: String,
            default: '-',
        },
    },
    data() {
        return {
            dataSource: [],
        }
    },
    computed: {
        // exAttrs() {
        //     const config = this.$ShareGood || {}
        // },
    },
    watch: {
        data() {
            this.onLoad()
        },
    },
    created() {
        this.onLoad({})
    },
    mounted() {},
    methods: {
        onLoad() {
            this.dataSource = this.data.map(item => {
                this.$set(item, 'sg_editing', false)
                return item
            })
        },
    },
}
</script>
