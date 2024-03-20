# my-list

基础页面组件

## 基础属性

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| isWebview     |  是否app内嵌    | Boolean       | false    |
| hasNav     |  是否有导航栏    | Boolean       | false    |
| isDefaultPrevPage     |  是否默认点击返回箭头返回上一页    | Boolean       | true    |
| navConfig     |  导航栏配置,只在hasNav=true情况下生效    | Object       | 参考van-nav-bar属性    |

### 插槽

| 名称    |  说明   |
| ------- | ------ |
| default | 页面内容区    |
| footer | 页面底部插槽   |

### 方法

| 名称    |  说明   |
| ------- | ------ |
| go-back | 自定义返回事件，需要设置hasNav=true,isDefaultPrevPage=false才可生效    |

### 示例

```html

<hx-base-page class="sign-confirm" has-nav>
    <div class="content">123456</div>
    <div class="" slot="footer">
        <van-button type="info" size="large">返回</van-button>
    </div>
</hx-base-page>

```
