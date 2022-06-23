# git 提交

```bash

git add .

git commit -m 'type: subject'

```

## 提交规范

-   commit message 格式

```bash

git commit -m <type>: <subject>

type 用于说明commit的类别

subject 为commit的简短提交描述，不超过50个字符，且结尾不加句号

注意：冒号后面接一个空格，且冒号为英文输入法下的冒号，切记使用中文冒号


```

-   type 类型

```bash

# 方式一 (type == add、edit、delete、fixed、update)

add: 新增;

edit: 修改;

delete: 删除;

fixed: 修复bug;

update: 更新版本


# 方式二 (type == feat、fix、docs、style、refactor、test、chore)

feat：新功能（feature）

fix：修补bug

docs：文档（documentation）

style： 格式（不影响代码运行的变动）

refactor：重构（即不是新增功能，也不是修改bug的代码变动）

test：增加测试

chore：构建过程或辅助工具的变动

merge: 合并分支

```

## 使用工具校验 commit 是否符合规范 (提交规范制定 + git hook)

-   commitlint 安装与提交规范的制定

```bash

  # 相关工具模块

  局部安装：npm i @commitlint/cli @commitlint/config-conventional -D

  全局安装：npm i @commitlint/cli @commitlint/config-conventional -g

  # 项目跟目录下创建 commitlint.config.js文件，并制定提交message规范

  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2, // 标识必须输入
        'always',
        [
          'feat', // 新特性
          'fix', // 修改问题，修复bug
          'docs', // 文档修改
          'style', // 代码格式修改，注意不是css修改，不影响代码运行的变动
          'refactor', // 代码重构
          'test', // 测试用例修改
          'chore', // 其它修改，比如构建流程、或者增加依赖库、工具等
          'merge' // 合并分支
        ]
      ],
      'subject-full-stop': [0, 'never'],
      'subject-case': [0, 'never']
    }
  }

```

-   git hooks

```bash

  # 相关模块

  npm i husky lint-staged -D

  # 安装成功后需要在项目下的package.json中添加如下配置

  "config": {
    "commitizen": {
      "path": "cz-customizable"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  },

```

### 注意事项

```bash
hooks 的版本不能高于6.x，若出现错误提示，优先查看一下hooks的版本，切记切记切记

```
