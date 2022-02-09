# mock 教程

## 使用方式

```bash

```

### 简单语法

```bash

# Mock对象
提供了4个方法：
Mock.mock()
Mock.setup()
Mock.valid()
Mock.toJSONSchema()

一个工具库
Mock.Random

```

### 常用的变量（语法）

```bash

# '@date('yyyy-MM-dd)'

# '@name'

# '@string(number,10)'

# 生成一个英文名字
name: Mock.Random.name(),
# 生成一个中文名字
chineseName: Mock.Random.cname()
# 用于生成高度自定义的图片地址
imgURL: Mock.Random.image()
# 生成日期
date: Mock.Random.date('yyyy-MM-dd')
# 生成布尔值
boolean: Mock.Random.boolean()

'id|+1': 1,//id排列

'color': '@color()',//随机颜色

'date': '@datetime()',//随机时间

'img': '@image()',//随机图片

'url': '@url(http)',//随机url地址

'email': '@email()',//随机email

'name': "@name(1,2)",//随机英文名字

'name': "@cname",  //随机中文名字

'text': '@paragraph()',//随机英文句子

'title':'@ctitle',//穗子中文题目

'city': '@county(true)',//随机城市名字

'price': '@integer(100,2000)'//随机价格

```

### 注意事项

```bash


```

### 参考文档

```bash

[mock官网] http://mockjs.com

[Mock生成随机数据常用的类型规则] https://blog.csdn.net/weixin_55560445/article/details/114420050

```
