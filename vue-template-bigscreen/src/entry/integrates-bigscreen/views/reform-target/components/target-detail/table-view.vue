<!--
   table - view
-->
<template>
    <div class="table-view">
        <el-table
            :data="list"
            border
            :cell-style="handleCellStyle"
            :header-cell-style="handleHeaderCellStyle"
            :span-method="handleSpanMethod"
            style="width: 100%"
        >
            <el-table-column
                prop="zb_1"
                label="一级指标"
                align="center"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="zb_2"
                label="二级指标"
                align="center"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="zb_3"
                label="三级指标"
                align="center"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="zb_mb"
                label="目标要求"
                align="center"
                min-width="160"
            >
            </el-table-column>
            <el-table-column
                prop="final_score"
                label="得分"
                align="center"
                min-width="70"
            >
            </el-table-column>
            <el-table-column
                prop="zb_score"
                label="满分"
                align="center"
                min-width="70"
            >
            </el-table-column>
            <el-table-column
                prop="zb_bz"
                label="评分标准"
                align="center"
                min-width="260"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: '',
    components: {},
})
export default class TableView extends Vue {
    @Prop({ default: () => [] }) list!: any[]
    spanData: any = []
    pos: any = 0
    @Watch('list', { immediate: true, deep: true })
    listHandler(val: any) {
        console.log('table-view-list :>> ', val)
    }
    created() {}
    mounted() {}
    handleCellStyle({ row, column }: any) {
        return {
            color: 'rgba(255, 255, 255, 0.9)',
            background: '#052D88',
            'border-color': '#4163A9',
        }
    }
    handleHeaderCellStyle({ row, column }: any) {
        return {
            color: 'rgba(255, 255, 255, 0.9)',
            background: '#03227A',
            'border-color': '#4163A9',
        }
    }
    handleSpanMethod({ row, column, rowIndex, columnIndex }: any) {
        // console.log('row :>> ', row)
        // console.log('row.type_zb_1 :>> ', row.type_zb_1)
        // console.log('row.type_zb_2 :>> ', row.type_zb_2)
        if (columnIndex === 0) {
            const _row = row.type_zb_1
            const _col = _row > 0 ? 1 : 0
            return { rowspan: _row, colspan: _col }
        }

        if (columnIndex === 1) {
            const _row = row.type_zb_2
            const _col = _row > 0 ? 1 : 0
            return { rowspan: _row, colspan: _col }
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .el-table--border {
    border-color: #7d9ad7;
}
.column-item {
    display: flex;

    span {
        flex: 1;
    }
}
</style>
