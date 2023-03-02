interface Raw {
    [propName: string]: any
}

class RouteProvider {
    /**
     * 自动生成路由的目录
     * @type {Array}
     * @private
     */
    routes

    constructor(requireContext: any, auto: boolean = false) {
        this.routes = this.generateRoutes(requireContext, auto)
    }
    // auto 是否自动组装成树级菜单
    generateRoutes(requireContext: any, auto: boolean = false) {
        const modules: Raw = {}
        const routes: Array<any> = []

        const requireAll = (context: any) => {
            context.keys().forEach((key: any) => {
                if (key.indexOf('router.js') > -1) {
                    modules[key] =
                        requireContext(key).default || requireContext(key)
                }
            })
        }

        requireAll(requireContext)
        Object.values(modules).forEach(item => {
            if (Array.isArray(item)) {
                routes.push(...item)
            } else {
                routes.push(item)
            }
        })

        let result: any = []
        if (auto) {
            const map: any = {}
            routes.forEach((item: any) => {
                if (!map[item.name]) {
                    map[item.name] = item
                }
            })
            while (routes.length) {
                const pop = routes.pop()
                const { parent } = pop.meta
                if (parent) {
                    const target = map[parent]
                    if (target) {
                        target.children = target.children || []
                        target.children.push(pop)
                        // const index = routes$.indexOf(pop)
                        // routes$.splice(index, 1)
                    }
                }
            }
            Object.keys(map).forEach(name => {
                if (!map[name]['meta']['parent']) {
                    result.push(map[name])
                }
            })
            // todo 目前只支持三级
            result.forEach((item: any) => {
                if (item.children && item.children.length) {
                    item.redirect = item.redirect || item.children[0]['path']
                    let result = item.children
                    result.forEach((item: any) => {
                        if (item.children && item.children.length) {
                            item.redirect =
                                item.redirect || item.children[0]['path']
                        }
                    })
                }
            })
        } else {
            result = [...routes]
        }

        console.log('路由结构', result)
        return result
    }

    /**
     * 根据目录生成路由对象的数组，供vue-router使用（routes选项）
     * @return {Array}
     */
    generate(
        filterCallback = function() {
            return true
        },
    ) {
        return this.filterMapRoutes(filterCallback)
    }
    filterMapRoutes(filterCallback: any) {
        const routes = this.routes
        const loop = (curRoutes: any) =>
            curRoutes
                .filter((route: any) => filterCallback(route.meta || {}, route))
                .map((route: any) => {
                    const { children, ...newRoute } = route
                    if (children) newRoute.children = loop(children)
                    return newRoute
                })
        return loop(routes)
    }
}

export default RouteProvider
