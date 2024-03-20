<template>
    <div id="tags-view-container">
        <div class="tags-view-container">
            <scroll-pane
                ref="scrollPane"
                class="tags-view-wrapper"
                @scroll="handleScroll"
            >
                <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :key="tag.fullPath"
                    :class="isActive(tag) ? 'active' : ''"
                    :to="{
                        path: tag.path,
                        query: tag.query,
                        fullPath: tag.fullPath,
                    }"
                    tag="span"
                    class="tags-view-item"
                    @click.middle.native="
                        !isAffix(tag) ? closeSelectedTag(tag) : ''
                    "
                    @contextmenu.prevent.native="openMenu(tag, $event)"
                >
                    {{ tag.meta.title }}
                    <template v-if="tag._"> - {{ tag._ }} </template>
                    <span
                        v-if="!isAffix(tag)"
                        class="el-icon-close"
                        @click.prevent.stop="closeSelectedTag(tag)"
                    />
                </router-link>
            </scroll-pane>
            <ul
                v-show="visible"
                :style="{ left: left + 'px', top: top + 'px' }"
                class="contextmenu"
            >
                <!-- <li @click="refreshSelectedTag(selectedTag)">刷新</li> -->
                <li
                    v-if="!isAffix(selectedTag)"
                    @click="closeSelectedTag(selectedTag)"
                >
                    关闭
                </li>
                <li @click="closeOthersTags">关闭其他</li>
                <li @click="closeAllTags(selectedTag)">关闭所有</li>
            </ul>
        </div>
    </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import { mapGetters } from 'vuex'
import { findChildrenByPath } from '@/scripts/utils'

export default {
    components: { ScrollPane },
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            affixTags: [],
        }
    },
    computed: {
        ...mapGetters(['permission_menus']),
        visitedViews() {
            return this.$store.state.tagsView.visitedViews
        },
        routes() {
            return this.$store.state.user.routes || []
        },
    },
    watch: {
        $route() {
            this.addTags()
            this.moveToCurrentTag()
        },
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        },
    },
    mounted() {
        this.initTags()
        this.addTags()
    },
    methods: {
        isActive(route) {
            return route.fullPath === this.$route.fullPath
        },
        isAffix(tag) {
            return tag.meta && tag.meta.affix
        },
        filterAffixTags(routes, basePath = '/') {
            let tags = []
            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path)
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta },
                    })
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(
                        route.children,
                        route.path,
                    )
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            return tags
        },
        initTags() {
            const affixTags = (this.affixTags = this.filterAffixTags(
                this.routes,
            ))

            for (const tag of affixTags) {
                // Must have tag name
                if (tag.name) {
                    this.$store.dispatch('tagsView/addVisitedView', tag)
                }
            }
        },
        addTags() {
            const {
                name,
                meta = {},
                query,
                params,
                path,
                fullPath,
                hash,
            } = this.$route
            const view = {
                title: meta.title || name,
                _: query._ || '',
                query: {
                    ...query,
                },
                params: {
                    ...params,
                },
                path: path,
                fullPath: fullPath,
                hash: hash,
                name: name,

                meta: {
                    ...meta,
                },
            }
            if (name) {
                const permission_menus = this.permission_menus || []
                const result = findChildrenByPath(permission_menus, item => {
                    return item.path === path
                })
                const target = result.slice(-1)[0]
                if (target && target.meta && target.meta.title) {
                    view.meta.title = target.meta.title
                }
                this.$store.dispatch('tagsView/addView', view)
            }
            return false
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.fullPath === this.$route.fullPath) {
                        this.$refs.scrollPane.moveToTarget(tag)
                        // when query is different then update
                        if (tag.to.fullPath !== this.$route.fullPath) {
                            this.$store.dispatch(
                                'tagsView/updateVisitedView',
                                this.$route,
                            )
                        }
                        break
                    }
                }
            })
        },
        refreshSelectedTag(view) {
            this.$store.dispatch('tagsView/delCachedView', view).then(() => {
                const { fullPath } = view
                this.$nextTick(() => {
                    this.$router.replace({
                        path: '/redirect' + fullPath,
                    })
                })
            })
        },
        closeSelectedTag(view) {
            this.$store
                .dispatch('tagsView/delView', view)
                .then(({ visitedViews }) => {
                    if (this.isActive(view)) {
                        this.toLastView(visitedViews, view)
                    }
                })
        },
        closeOthersTags() {
            this.$router.push(this.selectedTag)
            this.$store
                .dispatch('tagsView/delOthersViews', this.selectedTag)
                .then(() => {
                    this.moveToCurrentTag()
                })
        },
        closeAllTags(view) {
            this.$store
                .dispatch('tagsView/delAllViews')
                .then(({ visitedViews }) => {
                    if (
                        this.affixTags.some(
                            tag => tag.fullPath === view.fullPath,
                        )
                    ) {
                        return
                    }
                    this.toLastView(visitedViews, view)
                })
        },
        toLastView(visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
                this.$router.push(latestView.fullPath)
            } else {
                // now the default is to redirect to the home page if there is no tags-view,
                // you can adjust it according to your needs.
                if (view.name === 'Dashboard') {
                    // to reload home page
                    this.$router.replace({ path: '/redirect' + view.fullPath })
                } else {
                    this.$router.push('/')
                }
            }
        },
        openMenu(tag, e) {
            const menuMinWidth = 105
            const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
            const offsetTop = this.$el.getBoundingClientRect().top
            const offsetWidth = this.$el.offsetWidth // container width
            const maxLeft = offsetWidth - menuMinWidth // left boundary
            const left = e.clientX - offsetLeft + 15 // 15: margin right

            if (left > maxLeft) {
                this.left = maxLeft
            } else {
                this.left = left
            }

            this.top = e.clientY - offsetTop
            this.top = 45
            this.visible = true
            this.selectedTag = tag
        },
        closeMenu() {
            this.visible = false
        },
        handleScroll() {
            this.closeMenu()
        },
    },
}
</script>

<style lang="less" scoped>
#tags-view-container {
    padding: 0 20px;
    margin-bottom: 10px;
}
.tags-view-container {
    height: 34px;
    background: #fff;
    border-bottom: 1px solid @primary-color;

    .tags-view-wrapper {
        .tags-view-item {
            position: relative;
            display: inline-block;
            vertical-align: top;
            height: 33px;
            padding: 0 20px;

            font-size: 14px;
            line-height: 33px;
            color: #495060;
            cursor: pointer;
            background: #fff;

            &:first-of-type {
                &::before {
                    display: none;
                }
                // margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }
            &::before {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                display: inline-block;
                width: 2px;
                height: 15px;
                margin-right: 2px;
                background: #ddd;
                border-radius: 50%;
                content: ' ';
            }
            &.active {
                color: #fff;
                background-color: @primary-color;
                border-color: @primary-color;
                &::before {
                    display: none;
                }
                &::after {
                    position: absolute;
                    right: -2px;
                    width: 2px;
                    top: 0;
                    height: 100%;
                    content: ' ';
                    background-color: @primary-color;
                    z-index: 10;
                }
            }
        }
    }
    .contextmenu {
        position: absolute;
        z-index: 3000;
        padding: 5px 0;
        margin: 0;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        list-style-type: none;
        background: #fff;
        border-radius: 4px;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            padding: 7px 16px;
            margin: 0;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            text-align: center;
            vertical-align: 2px;
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
                display: inline-block;
                vertical-align: -3px;
                transform: scale(0.6);
            }
            &:hover {
                color: #fff;
                background-color: #b4bccc;
            }
        }
    }
}
</style>
