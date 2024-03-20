<template>
    <div :class="{ 'has-logo': showLogo }">
        <div
            class="sidebar-fold-wrapper"
            @click="toggleSideBar"
            :class="{ collapsed: isCollapse }"
        >
            <i class="el-icon-s-fold sidebar-fold-icon" v-if="!isCollapse"></i>
            <i class="el-icon-s-unfold sidebar-fold-icon" v-else></i>
        </div>

        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="backgroundColor"
                :text-color="textColor"
                :unique-opened="false"
                :active-text-color="activeTextColor"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in permission_menus"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
//import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { findChildrenByPath } from '@/scripts/utils'
import variables from '@/styles/vars.less'
// import variables from '@/styles/variables.scss'
export default {
    components: { SidebarItem },
    props: {
        backgroundColor: {
            type: String,
            default: '#1C2F4D',
        },
        textColor: {
            type: String,
            default: '#bfcbd9',
        },
        activeTextColor: {
            type: String,
            default: '#409EFF',
        },
    },
    data() {
        return {}
    },
    mounted() {
        // console.log('permission_menus', this.$store, this.permission_menus)
    },
    computed: {
        ...mapGetters(['permission_menus', 'sidebar']),
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // const menus = findChildrenByPath(this.permission_menus, item => {
            //     console.log(1, item.path, path, item.path == path)
            //     return item.path === path
            // })
            // console.log(12121, menus, path, this.permission_menus)
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo
        },
        variables() {
            //return {}
            return variables
        },
        isCollapse() {
            return !this.sidebar.opened
        },
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
    },
}
</script>
