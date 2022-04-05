<!--
   批量报送
-->
<template>
    <div class="components-dialog">
        <el-dialog
            center
            :title="title"
            :width="width"
            :visible="true"
            @close="handleClose"
        >
            <div class="dialog-content">
                <div class="content-top">
                    导入格式支持 excel，其中Excel格式，请先<i
                        class="iconfont icon_enclosure"
                        style="font-size: 12px"
                    ></i>
                    <!-- <span class="download-text">下载EXCEL导入模板</span> -->
                    <el-link
                        type="primary"
                        href="/static/assets/file/地方金融组织管理.xls"
                        >下载导入模板</el-link
                    >
                </div>

                <div class="content-center sg-flexbox v">
                    <span>Excel导入说明:</span>
                    <span>1、导入数据时请先下载EXCEL导入模版；</span>
                    <span
                        >2、下载导入模板后请按照导入模板里的字段填录信息；</span
                    >
                    <span
                        >3、使用非本系统提供的导入模板或擅自修改导入模板的格式和内容会导致操作不成功。</span
                    >
                </div>
                <div class="content-bottom">
                    <!-- <upload-file
                        v-model="fileList"
                        list-type="text"
                        :limit="1"
                        :upload-config="uploadConfig"
                        @remove="handleFileRemove"
                    /> -->
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import UploadFile from '@/entry/client/components/upload-file'
export default {
    name: '',
    // components: { UploadFile },
    props: {
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '800px',
        },
    },
    data() {
        return {
            uploadConfig: {
                action: '',
                accept: '.xls,.xlsx',
            },
            fileList: [],
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        handleClose() {
            console.log('close :>> ')
            this.$options.cancel(false)
        },
        onSubmit() {
            console.log('submit :>>')
            this.$options.confirm(true)
        },
        handleFileRemove(data) {
            console.log('remove :>> ', data)
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.dialog-content {
    font-size: 14px;
    line-height: 30px;

    .content-top {
        font-size: 16px;
        color: #333;
        line-height: 20px;
        margin-bottom: 20px;
    }

    .content-center {
        color: rgba(102, 102, 102, 1);
    }
}
.icon_enclosure:before {
    content: '\e71b';
}
</style>
