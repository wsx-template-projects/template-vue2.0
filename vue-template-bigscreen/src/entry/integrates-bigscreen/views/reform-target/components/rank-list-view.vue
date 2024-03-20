<!--
   排行榜
-->
<template>
    <div class="rank-list-view">
        <div class="view-box view-left">
            <div class="view-box--title">区县指数最高TOP10</div>
            <el-table :data="leftList" stripe style="width: 100%">
                <el-table-column prop="index" label="序号"> </el-table-column>
                <el-table-column prop="areaname" label="区域">
                </el-table-column>
                <el-table-column prop="final_score" label="改革指数">
                </el-table-column>
            </el-table>
        </div>
        <div class="view-box view-right">
            <div class="view-box--title">区县指数最低TOP10</div>
            <el-table :data="rightList" stripe style="width: 100%">
                <el-table-column prop="index" label="序号"> </el-table-column>
                <el-table-column prop="areaname" label="区域">
                </el-table-column>
                <el-table-column prop="final_score" label="改革指数">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: '',
    components: {},
})
export default class RankListView extends Vue {
    @Prop({ default: () => ({}) }) infoData!: any
    get leftList() {
        console.log('left :>> ', this.infoData?.left)
        return this.infoData?.left || []
    }
    get rightList() {
        return this.infoData?.right || []
    }
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
/deep/ .el-table {
    background: rgba(0, 0, 0, 0);
    font-size: 18px;
    color: #fff;

    thead {
        color: #fff;
    }

    th {
        background: rgba(3, 58, 143, 0.9);
    }

    tr {
        background: rgba(3, 58, 143, 0.4);
    }

    th,
    td {
        // margin-bottom: 39px;
        height: 70px;
    }

    td,
    th.is-leaf {
        // border: none;
        border-bottom: 9px solid #fff;
    }
}

/deep/ .el-table--medium {
    th,
    td {
        // padding: 10px 40px;
        padding: 0 40px;
    }
}

/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgba(88, 153, 255, 0.3);
}

.rank-list-view {
    display: flex;

    .view-box {
        width: calc(50% - 30px);
        margin-right: 30px;

        &:last-child {
            margin-right: 0;
        }

        .view-box--title {
            font-size: 20px;
            color: #83fffe;
            line-height: 28px;
            margin-bottom: 16px;
        }
    }
}
</style>
