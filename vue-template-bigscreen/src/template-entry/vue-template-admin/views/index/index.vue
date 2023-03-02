<template>
    <admin :sidebar-props="sidebarProps">
        <template slot="navbar" slot-scope="{ scope }">
            <div class="app-logo"></div>
            <div class="app-menu"></div>
            <div class="app-user">
                <template v-if="userInfo && userInfo.name">
                    <span class="name" v-html="userInfo.name"></span>
                </template>
                <template v-else>
                    <span class="name">管理员</span>
                </template>
                <span @click="scope.logOut">退出</span>
            </div>
        </template>
    </admin>
</template>

<script>
import Admin from '@/layout/admin'
import { mapGetters } from 'vuex'
export default {
    name: 'Index',
    components: { Admin },
    computed: {
        ...mapGetters(['userInfo', 'settings']),
    },
    data() {
        return {
            sidebarProps: {
                backgroundColor: '#ddd',
                textColor: '#333',
                activeTextColor: '#409EFF',
            },
        }
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style lang="less"></style>
