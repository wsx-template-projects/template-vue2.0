const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    permission_menus: state => state.user.menus,
    userInfo: state => state.user.info,
    token: state => state.user.token,
    addRouters: state => state.user.addRouters,
    settings: state => state.settings,
    title: state => state.settings.title,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    permission_routes: state => state.user.routes,
}
export default getters
