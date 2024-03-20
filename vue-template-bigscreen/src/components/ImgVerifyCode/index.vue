<template>
    <div class="my-img-verify-code" @click="onLoad">
        <div class="code" v-loading="loading">
            <template v-if="isError">
                <slot name="error">加载失败</slot>
            </template>
            <template v-else>
                <img :src="code" alt="" v-if="code" />
            </template>
        </div>
        <div class="tip">{{ tip }}</div>
    </div>
</template>

<script>
export default {
    name: 'ImgVerifyCode',
    props: {
        auto: {
            type: Boolean,
            default: true,
        },
        tip: {
            type: String,
            default: '看不清？换一张',
        },
        load: {
            type: Function,
            default() {
                return Promise.resolve('')
            },
        },
    },
    data() {
        return {
            code: '',
            loading: false,
            isError: false,
        }
    },
    created() {},
    mounted() {
        this.auto && this.onLoad()
    },
    methods: {
        onLoad() {
            if (!this.loading) {
                this.loading = true
                this.isError = false
                this.load()
                    .then(res => {
                        console.log(1, res)
                        this.loading = false
                        this.code = res
                    })
                    .catch(err => {
                        console.log(2, err)
                        this.loading = false
                        this.isError = true
                    })
            }
        },
    },
}
</script>

<style lang="less">
.my-img-verify-code {
    color: #666;
    width: 120px;
    cursor: pointer;
    margin-left: 10px;
    position: relative;
    .code {
        width: 120px;
        height: 40px;
        position: relative;
        text-align: center;
        border-radius: 4px;
        overflow: hidden;
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
    }
    .tip {
        text-align: center;
        color: #666;
        font-size: 12px;
        line-height: 20px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -20px;
    }

    .el-loading-spinner {
        margin-top: -12px;
    }

    .el-loading-spinner .circular {
        width: 24px;
        height: 24px;
    }
}
</style>
