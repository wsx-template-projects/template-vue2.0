<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-breadcrumb">
        <el-breadcrumb-item
            v-for="item in breadList"
            :to="{ path: item.path }"
            :key="item.path"
            >{{ item.meta.title }}</el-breadcrumb-item
        >
    </el-breadcrumb>
</template>

<script>
// good
function treeFindPath(tree, func, path = []) {
    if (!tree) return []
    for (const data of tree) {
        //这里按照你的需求来存放最后返回的内容吧
        path.push(data)
        if (func(data)) return path
        if (data.children) {
            const findChildren = treeFindPath(data.children, func, path)
            if (findChildren.length) return findChildren
        }
        path.pop()
    }
    return []
}
// bad
function getParents(tree, path) {
    const quque = [...tree]

    let target = null

    while (quque.length) {
        const node = quque.shift()
        if (!node.$parents) {
            node.$parents = [node]
        }

        if (node.path === path) {
            target = node
            break
        }
        if (node.children) {
            node.children.forEach(item => {
                item.$parents = [...node.$parents, item]
            })
            quque.unshift(...node.children)
        }
    }
    if (target) {
        return target.$parents
    } else {
        return []
    }
}
import { mapGetters } from 'vuex'
export default {
    inject: ['app'],
    created() {
        this.getBreadcrumb()
    },
    data() {
        return {
            breadList: [],
        }
    },
    computed: {
        ...mapGetters(['permission_menus']),
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        },
    },
    methods: {
        getBreadcrumb() {
            const path = this.$route.path
            //const breadList = getParents(this.permission_menus, path)
            const breadList = treeFindPath(this.permission_menus, item => {
                return item.path === path
            })

            this.breadList = breadList
        },
    },
}
</script>
<style lang="less">
.el-breadcrumb {
    height: 40px;
    margin: 0 20px;
    line-height: 40px;
}
</style>
