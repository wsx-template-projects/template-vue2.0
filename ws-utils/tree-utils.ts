/**
 * @description 递归处理tree数据
 */
export const treeDeep = ({
    source,
    level = 1,
    childKey = 'children',
}: any) => {
    return source.map((item: any) => {
        if (item[childKey]?.length) {
            item[childKey] = treeDeep({
                source: item[childKey],
                level: level + 1,
                childKey,
            })
        }
        return { ...item, level }
    })
}

/**
 * @description tree数据打平
 */
export const treeFlat = (tree: any[]) => {
    const result: any[] = []
    const stack = [...tree]
    while (stack.length) {
        const pop = stack.pop()
        result.push(pop)
        if (pop.children) {
            stack.push(...pop.children)
        }
    }
    return result
}


/**
 * @description 获取树形数据所有层级id组合的二维数组
 */
export const getTreeAllPaths = (tree: any, childKey = 'children') => {
    let paths: any = []

    function findPaths(node: any, currentPath: any) {
        currentPath.push(node.id)

        if (node?.[childKey]?.length) {
            for (let child of node[childKey]) {
                findPaths(child, currentPath.slice()) // 使用slice()复制数组，避免引用问题
            }
        } else {
            paths.push(currentPath)
        }
    }

    const source = Array.isArray(tree) ? tree[0] : tree

    findPaths(source, [])

    return paths
}


/**
 * @description 获取tree的最后一级的节点key的集合
 */
export const getTreeLastLevelAllPaths = (
    source: any[],
    key = 'value',
    childKey = 'children',
) => {
    const stack = [...source]
    const result: any[] = []
    while (stack.length) {
        const pop = stack.pop()
        if (pop[childKey]?.length) {
            stack.push(...pop[childKey])
        } else {
            result.push(pop[key])
        }
    }
    return result
}
