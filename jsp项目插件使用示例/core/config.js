// console.log('window.BASE_CONFIG :>> ', window.BASE_CONFIG)
require.config({
    // 配置基础路径用的 一般baseUrl都使用绝对路径
    baseUrl: '/',
    //paths可以用来给每个模块的路径设置一个别名，方便使用
    //具名模块的别名一定要和模块中定义的名字保持一致
    //在path中配置过的模块，找模块的时候，使用的是 baseUrl + path中的路径 来查找的
    paths: {
        jquery: 'core/lib/jquery/jQuery-3.2.1',
        'jquery.validate': 'core/lib/validate/jquery.validate.min', // 表单校验模块
        'jquery.layout': 'core/lib/layout/jquery.layout-latest',
        'jquery.serialize': 'core/lib/jquery/jquery.serialize-object.min',
        'jquery.nanoscroller': 'core/lib/jquery/jquery.nanoscroller.min',
        'jquery.marquee': 'core/lib/jquery/jquery.marquee',
        'jquery.media': 'core/lib/jquery/jquery.media',

        handlebars: 'core/lib/handlebars-1.0.0',
        xzoom: 'core/lib/xzoom/xzoom.min',
    },
    //shim 可以用来帮不支持模块化的第三方模块使用到requirejs中来
    shim: {
        //属性名：要配置的模块别名
        //属性值： 对象（可以包含两个属性 exprots， deps）
        // elementUI: {
        //     deps: ['ELEMENT', 'element', 'core/lib/element-ui/2.13.2/theme-chalk/index']
        // },
        bootstrap: {
            deps: ['jquery'],
        },
        xzoom: {
            deps: ['jquery'],
        },
    },
    waitSeconds: 0,
})
