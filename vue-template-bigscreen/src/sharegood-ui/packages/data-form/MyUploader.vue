<template>
    <div class="sg-data-form-field">
        <el-upload
            class="sg-upload"
            ref="myRef"
            :name="this.name"
            :file-list="fileList"
            v-bind="exAttrs"
        >
            <slot :slot="slotType" name="inputSlot">
                <el-button type="primary">选取文件</el-button>
            </slot>
        </el-upload>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
//import formMixins from './form-model'

export default {
    name: 'MyUploader',
    props: {
        name: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        value: {
            type: Array,
            default() {
                return []
            },
        },
        slotType: {
            type: String,
            default: 'trigger',
        },
    },
    //mixins: [formMixins],
    watch: {
        value(val) {
            this.fileList = val
            //this.handleChange && this.handleChange(this.currentValue)
        },
    },
    computed: {
        exAttrs() {
            const globalConfig = this.$ShareGood || {}
            const config = globalConfig.uploader || {}
            const attrs = this.$attrs || {}
            let { action, ...rest } = attrs
            action = process.env.VUE_APP_BASEURL_API + action
            const defaults = {
                'auto-upload': true,
                'on-success': this.onSuccess,
                'on-error': this.onError,
                'on-remove': this.onRemove,
                'on-preview': this.onPreview,
                'on-progress': this.onProgress,
                'on-change': this.onChange,
            }
            //console.log('uploader exAttrs', attrs, this.name)
            const result = {
                ...defaults,
                ...config,
                ...rest,
                action,
            }
            return result
        },
    },
    data() {
        return {
            fileList: [],
            currentValue: this.value,
        }
    },
    created() {},
    methods: {
        onChange(file, fileList) {
            console.log('onChange', file)
        },
        onProgress(event, file, fileList) {},
        onSuccess(response, file, fileList) {
            const { status, successfulPayload, message = '上传失败' } = response
            if (status) {
            } else {
                this.$$message.error(message)
            }
        },
        onError(err, file, fileList) {
            console.log('onError', err, file, fileList)
        },
        submit() {
            this.$refs.myRef.submit()
        },
        onRemove(file, fileList) {
            console.log(file, fileList)
        },
        onPreview(file) {
            console.log(file)
        },
    },
    mounted() {
        //this.$emit('update:refObj', this.$refs.myRef)
    },
}
</script>
