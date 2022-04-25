# Git 提交规范

```bash

git add .

git commit -m 'type: subject'

```

-   Commit message 格式 type: subject

```bash
  # type 用于说明 commit 的类别，只允许使用下面7个标识。

  'feat', // 新特性
  'fix', // 修改问题，修复bug
  'docs', // 文档修改
  'style', // 代码格式修改，注意不是css修改，不影响代码运行的变动
  'refactor', // 代码重构
  'test', // 测试用例修改
  'chore', // 其它修改，比如构建流程、或者增加依赖库、工具等
  'merge' // 合并分支

  # 冒号后面接一个空格，注意冒号为英文输入法下面的冒号

  # subject 是commit目的的简短描述，不超过50个字符，且结尾不加句号

```
