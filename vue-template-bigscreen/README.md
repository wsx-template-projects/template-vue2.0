## 大综合一体化大屏

### 概要

-   技术选型: vue
-   开发方式: 前后端分离
-   访问方式：浏览器(支持: IE10+、chrome)
-   产品类型: 组件化产品（大综合一体化大屏 datav 中一个模块）

### 特性

-   基于`@vue/cli3`
-   CSS 预编译语言：[lecss](http://lesscss.org/)
-   数据请求：axios
-   基于`element-ui`
-   区域图基于`echarts`
-   地图基于`天地图`
-   公司内部天地图二次封装库`icinfo.map-base`

## 环境依赖

| 名称  | 版本      | 备注 |
| ----- | --------- | ---- |
| node  | v0.10.28+ |      |
| vue   | 2.6.11    |      |
| nginx | 1.18+     |      |

## 开发上手

### web

```sh
# 安装依赖
npm install

# 启动服务
npm run dev:integrates-bigscreen

# 构建开发环境
npm run dev:integrates-bigscreen

# 构建测试环境
npm run build:test:integrates-bigscreen

# 构建生产环境
npm run build:integrates-bigscreen
```

浏览器访问 http://localhost:8080

## 数据交互

**Request Headers**

```
token: ''
Content-Type: 'application/json'
```

> Content-Type: application/x-www-form-urlencoded or application/json

## 配置说明

### 环境配置

默认配置 **.env.development**

```
# 编译模式
NODE_ENV = development
# 开发环境
VUE_APP_ENV = dev
# 静态资源请求目录
BASE_URL = '/'
# 是否启用 mock
VUE_APP_MOCK = true
# 接口前缀
VUE_APP_BASEURL_API = ''
# 接口反向代理
DEV_PROXY_TARGET_API = ''
# 打包路径
outputDir = 'dist'
# 移动端调试
VUE_APP_ERUDA = false
```

新建本地配置 **.env.development.local**

```sh
# 是否启用 mock
VUE_APP_MOCK = false
# 接口前缀
VUE_APP_BASEURL_API = ''
# 接口反向代理
#测试环境
DEV_PROXY_TARGET_API = http://192.168.1.200

```

## 代码提交

### commit 格式

格式 `type: subject`

> 比如 feat: 新增登录模块

```javascript
;[
    'docs', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
    'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等
    'feat', // Adds a new feature. 新增feature
    'fix', // Solves a bug. 修复bug
    'merge', // Merge branch ? of ?.
    'perf', // Improves performance. 优化相关，比如提升性能、体验
    'refactor', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug
    'revert', // Reverts a previous commit. 回滚到上一个版本
    'style', // Improves formatting, white-space. 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
    'test', // Adds or modifies tests. 测试用例，包括单元测试、集成测试等
]
```

## 工程目录

```

 fed-integrates-bigscreen
 ├── api-server.js
 ├── api.rest
 ├── babel.config.js
 ├── config.js
 ├── docs ------------- 组件文档地址
 ├── jsconfig.json
 ├── package-lock.json
 ├── package.json
 ├── plop-templates ------------- 模板地址
 ├── plopfile.js
 ├── public
 ├── README.md
 ├── src
 │   ├── @types
 │   │   └── index.ts
 │   ├── api
 │   │   └── modules
 │   │       ├── api
 │   │       ├── demo
 │   │       ├── index.ts
 │   │       └── sys
 │   ├── assets ------------- 静态资源地址
 │   ├── async-router.ts
 │   ├── bus
 │   │   └── index.js
 │   ├── catchError.js
 │   ├── components ------------- 公共组件
 │   ├── config
 │   │   └── app.ts
 │   ├── decorator
 │   │   └── index.ts
 │   ├── Dockerfile
 │   ├── entry ------------- 多页面入口
 │   │   └── integrates-bigscreen ------------- 页面模块
 │   │       ├── App.vue
 │   │       ├── assets
 │   │       ├── components
 │   │       ├── index.html
 │   │       ├── main.ts
 │   │       ├── router
 │   │       ├── scripts
 │   │       ├── settings.js
 │   │       ├── style.less
 │   │       ├── styles
 │   │       ├── views
 │   │       └── vue.config.js
 │   ├── layout
 │   │   └── admin
 │   │       ├── components
 │   │       ├── index.vue
 │   │       ├── mixin
 │   │       └── style.less
 │   ├── main.d.ts
 │   ├── main.ts
 │   ├── menus.js
 │   ├── mock
 │   ├── registerServiceWorker.js
 │   ├── scripts
 │   ├── sharegood-ui
 │   ├── shims-tsx.d.ts
 │   ├── shims-vue.d.ts
 │   ├── styles ------------- 项目公共样式
 │   │   ├── global.less
 │   │   ├── reset.less
 │   │   └── vars.less
 │   ├── vconsole.js
 │   └── vue.d.ts
 ├── static-server.js
 ├── tests
 │   └── unit
 │       ├── a.spec.js
 │       └── example.spec.js
 ├── tsconfig.json
 ├── typedoc.json
 └── vue.config.js
```

**package.json**

```json
{
    "scripts": {
        //启动本地服务
        "dev:integrates-bigscreen": "cross-env VUE_APP_ENTRY=integrates-bigscreen vue-cli-service serve --open",
        //测试环境打包
        "build:test:integrates-bigscreen": "cross-env VUE_APP_ENTRY=integrates-bigscreen vue-cli-service build --mode=test",
        //正式环境打包
        "build:integrates-bigscreen": "cross-env VUE_APP_ENTRY=integrates-bigscreen vue-cli-service build --mode=production"
    }
}
```

## 发布部署

| 环境     | 分支   | 访问地址                                           | 构建命令                                  | 发布部署                                                  | 备注 |
| -------- | ------ | -------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------- | ---- |
| 开发环境 | dev    | http://localhost:8080/                             | `npm run dev:integrates-bigscreen`        | 本地服务                                                  | -    |
| 测试环境 | dev    | http://integrates-bigscreen.icinfo.fat1.icinfo.co/ | `npm run build:test:integrates-bigscreen` | [蜻蜓发布](http://pub.fed.icinfo.co/integrates-bigscreen) |      |
| 生产环境 | master | 内网环境无法访问(发布后找产品确认)                 | `npm run build:integrates-bigscreen`      | 运维（或者田润家也可发布,需更新到 master 分支）           | -    |

### 运维

**打包**

```
# 测试环境：devlop分支
git clone -b dev git@gitlab.icinfo.co:fed/fed-integrates-bigscreen.git
# 依赖安装
npm install
# 测试环境
npm run build:test:integrates-bigscreen
or
# 生产环境：master分支
git clone  -b master git@gitlab.icinfo.co:fed/fed-integrates-bigscreen.git
# 依赖安装
npm install
# 生产环境
npm run build:integrates-bigscreen
```

## 更多资料

### 文档

-   接口文档 - 后端发文档
-   产品文档 -暂无
-   UI 稿-UI 发文档
-   [icinfo.map-base 文档](http://gitlab.icinfo.co/fed/icinfo.map-base)
-   [天地图官方文档](https://ditu.zjzwfw.gov.cn/)

### 作者列表

-   前端：曾文强
-   后端：任天一、王永冲
-   产品：曹乾阳
-   设计：陈继皓
