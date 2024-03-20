<template>
    <span class="my-copy" @click="handleCopy" :class="id"
        ><slot><svg-icon icon="copy"></svg-icon></slot
    ></span>
</template>

<script>
import Clipboard from 'clipboard'
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
export default {
    name: 'MyCopy',
    components: {},
    props: {
        // 待复制的文本
        text: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            id: 'copy' + guid(),
        }
    },
    created() {},
    mounted() {},
    methods: {
        handleCopy() {
            const cls = `.${this.id}`
            const text = this.text

            let clipboard = new Clipboard(cls, {
                text: function() {
                    return text
                },
            })
            clipboard.on('success', e => {
                this.$message({
                    message: '复制成功',
                    showClose: true,
                    type: 'success',
                })
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$message({
                    message: '复制失败,',
                    showClose: true,
                    type: 'error',
                })
                clipboard.destroy()
            })
        },
    },
}
</script>

<style lang="less">
.my-copy {
    margin: 0 10px;
    color: #2064ef;
    cursor: pointer;
}
</style>
