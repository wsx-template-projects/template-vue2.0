# my-sms-code

手机验证码

## 基础属性 - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| xx  | xx   | xx     | -     |

### 事件 - Events

| 事件名    |  说明   | 回调参数 |
| ------- | ------ | ------  |
| xx | xx    | xx   |

### 方法 - Methods

| 方法名    |  说明   |  参数 | 返回值 |
| ------- | ------ | ----- | ----- |
| xx | xx    |  xx  | xx |

### 插槽 - Slots

| 名称    |  说明   |
| ------- | ------ |
| default | xx    |
| xx | xx   |

### 示例

```bash

<hx-sms-code
    class="sms-code"
    :interval="60"
    :callback="sendCode"
/>

async sendCode() {
    console.log('send code :>> ')
    const { phone } = this.LoginView.model
    if (!phone) {
        return Promise.reject({ message: '请您先输入手机号' })
    }
    await this.$http.get('/xxx/xxx', {
        params: { phone },
    })
}

```
