<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-upload
            class="sg-upload"
            ref="myRef"
            :name="this.name"
            :file-list="fileList"
            v-bind="exAttrs"
            v-on="listeners"
        >
            <!-- <slot :slot="slotType" name="inputSlot">
                <el-button type="primary">选取文件</el-button>
            </slot> -->
            <slot slot="default" name="default">
                <el-button type="primary">选取文件</el-button>
            </slot>
            <slot slot="tip" name="tip"></slot>
        </el-upload>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
//import formMixins from './form-model'

export default {
    name: 'SgBaseUploader',
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
        submit() {
            this.$refs.myRef.submit()
        },
    },
    mounted() {
        //this.$emit('update:refObj', this.$refs.myRef)
    },
}
</script>
