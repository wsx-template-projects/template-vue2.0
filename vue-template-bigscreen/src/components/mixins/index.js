export const $goBack = function() {
    this.$router.go(-1)
}
export const $hasPermission = function(value) {
    const state = this.$store.state
    const userInfo = state.user.userInfo
    const roles = state.user.roles || []
    const permission = userInfo.permission || []
    if (roles.includes('admin')) {
        return true
    }
    return permission.includes(value)
}
