## 移动端 h5 项目模板

#### 技术栈

vue2 + vant

#### 运行及打包

-   常用命令

```bash

# 运行项目
  yarn serve

# 以指定环境打包项目(目前环境有dev、test、prod，具体以项目的.env相关文件)
  yarn build:环境名； 例如：打包正式服 yarn build:prod

```

#### 结构

#### 代码规范

-   代码规范的目的是提高项目的可维护性。
    <!-- - 请阅读以上目录结构，了解每个文件和文件夹的作用，按照项目结构风格来编程。 -->
-   项目已配置 eslint + prettier，需要自行配置好编辑器才能生效。

#### vscode 相关配置

-   KoroFileHeader (文件头部注释说明，快捷键：cart + alt + i), 根据个人喜好自行选择

    1、安装 KoroFileHeader 插件
    2、打开 vscode 设置的 setting.json 添加如下配置

```bash

"fileheader.customMade": {
  "Author": "wangshengxian",
  "Date": "Do not edit",
  "LastEditors": "wangshengxian",
  "LastEditTime": "Do not edit",
  "Desc": ""
}


```

-   eslint：

    1、安装 eslint 插件。
    2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    "vue"
  ],
"eslint.options": {
  "plugins": ["html"]
},


```

-   prettier：

    1、安装 prettier 插件。
    2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
  "prettier": {
    "eslintIntegration": true,
    "singleQuote": true,
    "semi": true
  }
},


```

-   还需要安装个插件：EditorConfig for VS Code (用来自动识别项目的.editorconfig 文件配置，保持编辑器编码风格的统一。)

    根路径下添加.editorconfig 文件，添加如下配置

```bash

  # https://editorconfig.org
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = crlf
  insert_final_newline = true
  trim_trailing_whitespace = true

  [*.md]
  insert_final_newline = false
  trim_trailing_whitespace = false


```
