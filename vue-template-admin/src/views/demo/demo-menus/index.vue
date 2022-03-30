<!--
   菜单 - 案例
-->
<template>
    <div class="wq-page">
        菜单示例
        <pagination
            :total="total"
            :page.sync="pagination.pageNum"
            :limit.sync="pagination.pageSize"
            @pagination="handlePagination"
        />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import { getMenuList } from '@/api/menu'
export default {
    name: 'DemoMenus',
    components: { Pagination },
    data() {
        return {
            tableList: [], // 表格数据
            total: 0, // 总的数据条数
            pagination: {
                pageNum: 1, // todo 注意：后端接口接收的页码从零开始的话，自行在处理参数的地方，将页码减1
                pageSize: 10,
            },
        }
    },
    computed: {},
    created() {
        this.getData()
    },
    mounted() {},
    methods: {
        /** 分页事件回调函数 */
        handlePagination(data) {
            console.log('data :>> ', data)
            this.getPageData(data)
        },
        /** 获取当前页数据 */
        getPageData(params) {
            console.log('获取当前页数据 :>> ', params)
            params = { pageNum: params.page, pageSize: params.limit }
            console.log('params :>> ', params)
            // 接口请求
        },
        /** 获取列表数据 */
        getData() {
            setTimeout(() => {
                this.tableList = [{ menuName: '这是一级菜单' }]
                this.total = 100
            }, 1000)
            // getMenuList(params).then((res) => {
            //     console.log('res :>> ', res)
            // })
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
