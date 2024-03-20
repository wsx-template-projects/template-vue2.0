<!--
   预览 - pdf
-->
<template>
    <div class="preview-pdf">
        <iframe
            class="content"
            :src="pdfUrl"
            width="100%"
            height="100%"
        ></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

export interface PreviewPdfRefIF extends Vue {
    pdfUrl: string
    handlePreviewPdf: {
        (val: string): void
    }
    /** 其它属性 */
    [propName: string]: any
}

@Component({
    name: 'HxPreviewPdf',
    components: {},
})
export default class HxPreviewPdf extends Vue {
    /** 是否流文件 */
    @Prop({ type: Boolean, default: () => false }) isStreamFile!: boolean
    @Prop({ type: String, default: () => '' }) fileUrl!: string
    @Prop({ type: String, default: () => '/mock/demo-pdf/pdfFile' })
    apiUrl!: string
    public pdfUrl = ''
    /** 监听fileUrl */
    @Watch('fileUrl')
    changeFileUrl(val: string) {
        if (val) {
            if (this.isStreamFile) {
                this.getPdfUrl()
            } else {
                this.handlePreviewPdf(val)
            }
        }
    }
    created() {}
    mounted() {}
    /** 接口获取pdf */
    async getPdfUrl() {
        const res = await this.$http.post(
            `${this.apiUrl}?fileUrl=${this.fileUrl}`,
        )
        let blob = new Blob([res.data], { type: res.data.type })
        let url = URL.createObjectURL(blob)
        this.handlePreviewPdf(url)
    }
    /** 预览 - pdf */
    handlePreviewPdf(url: string) {
        console.log('url:', url)
        this.pdfUrl = url
    }
}
</script>

<style lang="less" scoped></style>
