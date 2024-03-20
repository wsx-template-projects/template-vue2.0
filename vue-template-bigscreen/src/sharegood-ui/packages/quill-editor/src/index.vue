<template>
    <!--    这是一个富文本的组件-->
    <div class="sg-quill-editor">
        <div class="ql-upload-box">
            <el-upload
                id="uploadBtn"
                class="quill-uploader"
                name="multipartFiles"
                accept="image/*"
                :action="action"
                :show-file-list="false"
                :on-success="onUploadSuccess"
            >
            </el-upload>
        </div>
        <el-row v-loading="quillUpdateImg">
            <quill-editor
                v-model="currentValue"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                v-on="this.$listeners"
            >
            </quill-editor>
        </el-row>
    </div>
</template>

<script>
// import upload from '../../utils/api/index' // 这里我封装的一个上传图片的，返回一个url地址，将它插入光标位置
import Quill from 'quill' //引入编辑器
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
const filterXSS = require('xss')
// 自定义字体大小
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['12px', '14px', '16px', '18px', '20px', '24px', '32px']
Quill.register(Size, true)

/*富文本编辑图片上传配置*/
const uploadConfig = {
    action: '', // 必填参数 图片上传地址
    methods: 'POST', // 必填参数 图片上传方式
    token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'img', // 必填参数 文件的参数名
    size: 500, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon', // 可选 可上传的图片格式
}

//quill编辑器的字体
// var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
// var Font = Quill.import('formats/font');
// Font.whitelist = fonts; //将字体加入到白名单
// Quill.register(Font, true);
//quill图片可拖拽改变大小
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)

// 富文本工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    //[{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: Size.whitelist }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    //[{ font: fonts }],
    [{ align: [] }],
    ['link', 'image'],
    //['link', 'image', 'video'],
    ['clean'], // remove formatting button
]
export default {
    name: 'SgQuillEditor',
    data() {
        return {
            action:
                process.env.VUE_APP_BASEURL_API +
                '/core/md-core-file/update_file',
            currentValue: this.value, // 我们不能直接使用props传过来的值，先赋值到这里
            // 富文本配置项
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            editorOption: {
                placeholder: '',
                theme: 'snow', // or 'bubble'
                modules: {
                    // imageResize: {
                    //     //调整大小组件。
                    //     displayStyles: {
                    //         backgroundColor: 'black',
                    //         border: 'none',
                    //         color: 'white',
                    //     },
                    //     modules: ['Resize', 'DisplaySize', 'Toolbar'],
                    // },
                    toolbar: {
                        container: toolbarOptions, // 工具栏
                        handlers: {
                            image: function(value) {
                                console.log(
                                    this,
                                    value,
                                    document.getElementById('uploadBtn'),
                                )
                                if (value) {
                                    // 触发input框选择图片文件
                                    document
                                        .getElementById('uploadBtn')
                                        .querySelector('input')
                                        .click()
                                } else {
                                    this.quill.format('image', false)
                                }
                            },
                        },
                    },
                },
            },
        }
    },
    props: ['value', 'disabled'],
    components: { quillEditor },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        },
    },
    created() {
        console.log('quill-editor created')
    },
    mounted() {
        if (this.disabled) {
            this.$refs.myQuillEditor.quill.enable(false)
        }

        //
        // setTimeout(() => {
        //     this.$refs.myQuillEditor.quill.enable(true)
        // }, 0)
    },
    watch: {
        disabled: {
            handler(val) {
                if (val === true) {
                    this.$refs.myQuillEditor.quill.enable(false)
                } else {
                    this.$refs.myQuillEditor.quill.enable(true)
                }
            },
        },
        value: {
            handler(val) {
                this.currentValue = val
            },
        },
    },
    methods: {
        reset() {
            this.currentValue = ''
        },
        getText(len) {
            let content = this.currentValue || ''
            content = content.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '')
            if (len) {
                return content.slice(0, len)
            }
            return content
        },
        onUploadSuccess(res) {
            // 获取富文本组件实例
            const quill = this.$refs.myQuillEditor.quill
            const { successfulPayload, status } = res
            // 如果上传成功
            if (status) {
                const imgData = successfulPayload[0]
                const url = imgData.url
                // 获取光标所在位置
                const length = quill.getSelection().index
                // 插入图片，res为服务器返回的图片链接地址
                quill.insertEmbed(length, 'image', url)
                // 调整光标到最后
                quill.setSelection(length + 1)
            } else {
                this.$$message.error('图片插入失败')
            }
        },
        uploadQuillImage: function(e) {
            //这是上传图片的函数，可以改成自己的，成功返回一个地址插入光标处
            const that = this
            // 获取富文本组件实例
            const quill = this.$refs.myQuillEditor.quill
            const func_s = function(data) {
                that.$message({
                    message: '上传成功',
                    type: 'success',
                })
                // 获取光标所在位置
                const length = quill.getSelection().index
                // 插入图片  data.url为服务器返回的图片地址
                quill.insertEmbed(length, 'image', data.url)
                // 调整光标到最后
                quill.setSelection(length + 1)
            }
            const func_f = function(err) {
                that.$message.error('上传失败')
            }
            // loading动画消失
            this.quillUpdateImg = false
            upload.upload(e, func_s, func_f)
        },
        beforeQuillrUpload: function(file) {
            // 显示loading动画
            this.quillUpdateImg = true
            //这是我封装的一个判断是否上传为图片，图片大小的公共函数，自己可自定义
            //Utils.base.beforeAvatarUpload(file)
        },
        // 成功失败回调
        uploadQuillSuccess() {},
        uploadQuillError() {
            // loading动画消失
            this.quillUpdateImg = false
            this.$message.error('图片插入失败')
        },
        onEditorFocus(event) {
            if (this.disabled) {
                event.enable(false)
            }
        },
        onEditorReady(editor) {
            // 准备编辑器
        },
        onEditorBlur() {}, // 失去焦点事件
        // onEditorFocus() {
        //     console.log(
        //         this.$refs.myQuillEditor.quill.getSelection().index,
        //         '获取示例',
        //     )
        // },
        // 获得焦点事件
        onEditorChange() {
            //let content = filterXSS(this.currentValue)
            const content = this.currentValue
            // if (
            //     content !== '' &&
            //     content.indexOf('sg-quill-editor-content') === -1
            // ) {
            //     content = `<div class="sg-quill-editor-content">${content}</div>`
            // }
            // console.log('onEditorChange', this.currentValue)
            this.$emit('input', content) //将值绑定到changeQuill上传递过去,引入组件的时候监听这个值，可以拿到改变的值，
        }, // 内容改变事件
    },
}
</script>
