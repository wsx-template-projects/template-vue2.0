/**
 * 案例模块 - 路由
 */
const baseComponentRouter = [
    {
        path: '/base',
        name: 'Base',
        component: () => import(/* webpackChunkName: 'base' */ '@/views/example/base'),
        meta: {
            title: '基础组件-案例',
        },
    },
    {
        path: '/my-list',
        name: 'ExampleMyList',
        component: () => import(/* webpackChunkName: 'my-list' */ '@/views/example/base/my-list'),
        meta: {
            title: 'my-list',
        },
    },
    {
        path: '/my-tab-list',
        name: 'ExampleMyTabList',
        component: () => import(/* webpackChunkName: 'my-tab-list' */ '@/views/example/base/my-tab-list'),
        meta: {
            title: 'my-tab-list',
        },
    },
    {
        path: '/my-form',
        name: 'ExampleMyForm',
        component: () => import(/* webpackChunkName: 'my-form' */ '@/views/example/base/my-form'),
        meta: {
            title: 'my-form',
        },
    },
    {
        path: '/my-upload-file',
        name: 'ExampleMyUploadFile',
        component: () => import(/* webpackChunkName: 'my-upload-file' */ '@/views/example/base/my-upload-file'),
        meta: {
            title: 'my-upload-file',
        },
    },
]

const mapComponentRouter = [
    {
        path: '/map',
        name: 'Map',
        component: () => import(/* webpackChunkName: 'map' */ '@/views/example/map'),
        meta: {
            title: '地图组件-案例',
        },
    },
]

const operationComponentRouter = [
    {
        path: '/operation',
        name: 'Operation',
        component: () => import(/* webpackChunkName: 'operation' */ '@/views/example/operation'),
        meta: {
            title: '业务组件-案例',
        },
    },
    {
        path: '/preview-file',
        name: 'ExamplePreviewFile',
        component: () => import(/* webpackChunkName: 'preview-file' */ '@/views/example/operation/preview-file'),
        meta: {
            title: '业务组件-案例',
        },
    },
]

const otherComponentRouter = [
    {
        path: '/other',
        name: 'Other',
        component: () => import(/* webpackChunkName: 'other' */ '@/views/example/other'),
        meta: {
            title: '其它组件-案例',
        },
    },
    {
        path: '/tools-related',
        name: 'ExampleToolsRelated',
        component: () => import(/* webpackChunkName: 'tools-related' */ '@/views/example/other/tools-related'),
        meta: {
            title: '工具函数-案例',
        },
    },
]

/**
 * 插件 - router
 */
const pluginsRouter = [
    {
        path: '/plugins',
        name: 'Plugins',
        component: () => import(/* webpackChunkName: 'plugins' */ '@/views/example/plugins'),
        meta: {
            title: '插件-plugins',
        },
    },
]

const exampleRouter = [
    ...baseComponentRouter,
    ...mapComponentRouter,
    ...operationComponentRouter,
    ...otherComponentRouter,
    ...pluginsRouter,
]

export default exampleRouter
