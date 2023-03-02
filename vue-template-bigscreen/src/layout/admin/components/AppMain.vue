<template>
    <section class="app-main">
        <!-- <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
            <router-view :key="key" />
        </keep-alive>
        </transition> -->
        <keep-alive :include="cachedViews">
            <router-view :key="key" />
        </keep-alive>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        cachedViews() {
            const cachedViews = this.$store.state.tagsView.cachedViews

            return cachedViews
        },
        key() {
            return this.$route.fullPath
        },
    },
}
</script>

<style lang="less">
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    // transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    // transform: translateX(30px);
}
.fixed-header + .app-main {
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        // min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
