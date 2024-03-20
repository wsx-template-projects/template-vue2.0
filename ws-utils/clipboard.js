import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
    Vue.prototype.$message({
        // message: 'Copy successfully',
        message: '复制成功',
        type: 'success',
        duration: 1500,
    })
}

function clipboardError() {
    Vue.prototype.$message({
        // message: 'Copy failed',
        message: '复制失败',
        type: 'error',
    })
}

export default function handleClipboard(text, event, customMsg = false) {
    return new Promise((resolve, reject) => {
        const clipboard = new Clipboard(event.target, {
            text: () => text,
        })
        clipboard.on('success', () => {
            !customMsg && clipboardSuccess()
            clipboard.destroy()
            resolve()
        })
        clipboard.on('error', () => {
            clipboardError()
            clipboard.destroy()
            reject()
        })
        clipboard.onClick(event)
    })
}
