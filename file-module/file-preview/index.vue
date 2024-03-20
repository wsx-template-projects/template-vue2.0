<!--
   文件预览
-->
<template>
    <div class="file-preview">
        <el-dialog custom-class="inner-dialog" title="文件预览" visible :before-close="handleClose" :append-to-body="true" style="margin-top: -10vh;" width="80%">
            <component :is="compMap.comp" v-bind="compMap.prop"></component>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

/**
 * @description 可以预览的文件类型
 */
const CAN_PREVIEW_FILE = ['pdf', 'jpg', 'png', 'jpeg', 'mp4']

enum TAG_TYPE {
    IFRAME = 'iframe',
    VIDEO = 'video',
    IMAGE = 'image',
}

const compMap: any = {
    [TAG_TYPE.IFRAME]: () => import('./iframe-view.vue'),
    [TAG_TYPE.IMAGE]: () => import('./image-view.vue'),
    [TAG_TYPE.VIDEO]: () => import('./video-view.vue'),
}

@Component({
    name: 'FilePreview',
    components: {},
})
export default class FilePreview extends Vue {
    @Prop({ type: String, default: '' }) fileUrl!: string
    @Prop({ type: String, default: '' }) previewUrl!: string
    public compMap = {
        comp: null,
        prop: { url: '' },
    }
    created() {}
    mounted() {
        this.loadComp()
    }
    handleClose() {
        this.cancel()
    }
    confirm(data: any) {
        this.$options?.confirm!(data)
    }
    cancel() {
        this.$options?.cancel!()
    }
    isImg(type: string) {
        return ['jpg', 'png', 'jpeg'].includes(type)
    }
    isVideo(type: string) {
        return ['mp4'].includes(type)
    }
    isPdf(type: string) {
        return ['pdf'].includes(type)
    }
    loadComp() {
        const fileType = this.getFileType()
        const compName = this.getCompName(fileType)
        console.log('fileType :>> ', fileType)
        console.log('compName :>> ', compName)
        this.compMap.comp = compMap[compName]
        this.compMap.prop = { url: this.previewUrl }
    }
    getFileType() {
        const arr = this.fileUrl.split('.')
        const fileType = arr[arr.length - 1]
        return fileType
    }
    getCompName(fileType: string) {
        if (this.isPdf(fileType)) return TAG_TYPE.IFRAME
        if (this.isImg(fileType)) return TAG_TYPE.IMAGE
        if (this.isVideo(fileType)) return TAG_TYPE.VIDEO
        return ''
    }
}
</script>

<style lang="less" scoped></style>
