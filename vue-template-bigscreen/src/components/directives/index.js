/** 权限指令**/
export const permission = function(el, binding, vnode) {
    const value = binding.value
    // 获取用户权限
    const state = vnode.context.$store.state
    const userInfo = state.user.userInfo
    const roles = state.user.roles || []
    const permission = userInfo.permission || []
    if (roles.includes('admin')) {
        return
    }
    try {
        el.style.opacity = '0'
    } catch (e) {
        console.warn(e)
    }
    // 假如不是超级管理员则判断用户用户权限
    if (!permission.includes(value)) {
        // 解决权限模块闪现问题
        setTimeout(function() {
            try {
                el.parentNode.removeChild(el)
            } catch (e) {
                console.warn(e)
            }
        }, 10)
    }
    setTimeout(function() {
        try {
            el.style.opacity = '1'
        } catch (e) {
            console.warn(e)
        }
    }, 10)
}
