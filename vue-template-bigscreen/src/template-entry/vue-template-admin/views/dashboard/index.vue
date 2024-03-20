<template>
    <div class="sg-page GovDashboard">
        <el-row :gutter="20" :class="$style.row">
            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="color-1 sg-error-color">卡片名称</span>
                        <el-button
                            style="float: right; padding: 3px 0"
                            type="text"
                            >操作按钮</el-button
                        >
                    </div>
                    <div>
                        列表内容
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button
                            style="float: right; padding: 3px 0"
                            type="text"
                            >操作按钮</el-button
                        >
                    </div>
                    <div>列表内容</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button
                            style="float: right; padding: 3px 0"
                            type="text"
                            >操作按钮</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { confirm } from '@/decorator'
import { Component, Vue, Prop, Emit, Ref } from 'vue-property-decorator'

// function isExternal2(path: string): boolean {
//     return /^(https?:|mailto:|tel:)/.test(path)
// }

@Component({
    components: {},
    // beforeRouteEnter(to: any, from: any, next: any) {
    //     console.log('beforeRouteLeave')
    //     next()
    // },
})
export default class DashBoard extends Vue {
    private foo = 'App Foo!'
    private count: number = 1
    @Prop() private msg!: string
    @Prop(Boolean) private defaultArg: string | undefined

    created() {}

    mounted() {}
}
</script>

<style lang="less" module>
.row {
    margin-bottom: 20px;
    color: red;
}
</style>
