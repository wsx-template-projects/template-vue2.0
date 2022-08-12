let store = {}
const hasPermission = (requirePermission) => {
    // 当前菜单需要的权限
    const requirePermissionList = Array.isArray(requirePermission)
        ? requirePermission
        : [requirePermission]
    // 用户持有的权限
    const userPermissionList = store.state.user.permissions || []

    // 用户拥有所有的权限 *
    if (userPermissionList.includes('*')) {
        return true
    }
    // 判断用户是否持有菜单需要权限
    return userPermissionList.some((e) => requirePermissionList.includes(e))
}

export default {
    install(Vue, options = {}) {
        store = options.store
        Vue.directive('permission', {
            inserted: (el, binding) => {
                // 权限
                let permission = binding.value
                // 有效环境
                let validEnv = []
                if (
                    !Array.isArray(binding.value) &&
                    typeof binding.value === 'object'
                ) {
                    permission = binding.value.permission
                    validEnv = binding.value.validEnv || []
                }
                if (!hasPermission(permission, validEnv)) {
                    el.parentNode.removeChild(el)
                }
            },
        })

        Vue.prototype.$hasPermission = hasPermission
    },
}
