<!--
   发送验证码
-->
<template>
    <div class="hx-sms-code">
        <span class="code-text" @click="sendCode">{{ currText }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'HxSmsCode',
    components: {},
})
export default class HxSmsCode extends Vue {
    @Prop({ type: String, default: '获取验证码' }) text!: string
    @Prop({ type: Number, default: 60 }) interval!: number
    @Prop({ type: String, default: '' }) waitText!: string
    @Prop() callback!: (data?: any) => Promise<any>
    public timer: any = null
    public count = 0
    public isCountDown = false
    get currText() {
        if (!this.isCountDown) return this.text
        if (!this.waitText) return `${this.count}S`
        return `${this.waitText}(${this.count}s)`
    }
    created() {}
    mounted() {
        this.count = this.interval
        this.$once('hook:beforeDestroy', this.clear)
    }
    async sendCode() {
        if (this.isCountDown) {
            this.$message.warning('当前还在验证码有效期内，请勿再次发送')
            return
        }
        try {
            const res = await this.callback()
            console.log('res :>> ', res)
            console.log('start time :>> ')
            this.isCountDown = true
            this.loopFunc()
        } catch (err) {
            console.log('sms-code-err :>> ', err)
            // const _err: any = err
            // const msg =
            //     _err?.message || _err?.msg || '~网络走神了，请您稍后重试'
            // this.$message.error(msg)
        }
    }
    start() {}
    loopFunc() {
        this.timer = setInterval(() => {
            this.count--
            if (this.count < 0) {
                this.clear()
            }
        }, 1000)
    }
    clear() {
        console.log('time end :>> ')
        clearInterval(this.timer)
        this.timer = null
        this.count = this.interval
        this.isCountDown = false
    }
}
</script>

<style lang="less" scoped>
.hx-sms-code {
    text-align: center;
    color: #1138fb;
    cursor: pointer;
}
</style>
