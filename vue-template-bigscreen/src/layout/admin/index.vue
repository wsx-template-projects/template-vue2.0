<template>
    <div class=" Index app-wrapper" :class="classObj">
        <navbar>
            <template slot="default" slot-scope="{ scope }">
                <slot :scope="scope" name="navbar"></slot>
            </template>
        </navbar>
        <sidebar
            class="sidebar-container app-sidebar"
            v-bind="sidebarProps"
        ></sidebar>
        <!-- 右侧区域 -->
        <section class="main-container" :class="{ hasTagsView: needTagsView }">
            <tags-view v-if="needTagsView" />
            <!-- <app-breadcrumb></app-breadcrumb> -->
            <app-main id="appMain"></app-main>
            <!-- <app-copyright></app-copyright> -->
        </section>
    </div>
</template>

<script>
import {
    Sidebar,
    Navbar,
    AppMain,
    AppBreadcrumb,
    TagsView,
    AppCopyright,
} from './components'
import { mapState } from 'vuex'
export default {
    name: 'Index',
    props: {
        sidebarProps: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    components: {
        Sidebar,
        Navbar,
        AppMain,
        AppBreadcrumb,
        TagsView,
        AppCopyright,
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            sidebar: state => state.app.sidebar,
            needTagsView: state => state.settings.tagsView,
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
            }
        },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        logout() {},
    },
}
</script>

<style lang="less">
@import url('./style.less');
</style>
