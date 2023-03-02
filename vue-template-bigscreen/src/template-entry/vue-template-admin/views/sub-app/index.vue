<template>
    <div class="sg-page page-sub-appp">
        <iframe class="iframe" :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
import AppConfig from '@/config/app'
const { OLD_ORIGIN, OLD_PREFFIX } = AppConfig
export default {
    name: 'SubApp',
    components: {},
    props: {
        origin: {
            type: String,
            default: '',
        },
    },
    data() {
        return {}
    },
    computed: {
        // 内嵌页面为老应用的时候加前缀方便代理，普通页面则不做处理
        src() {
            const origin = decodeURIComponent(this.origin)

            let uri =
                origin.indexOf(OLD_ORIGIN) > -1
                    ? OLD_PREFFIX + origin.replace(OLD_ORIGIN, '')
                    : origin
            const query = {
                _: new Date().valueOf(),
                appCode: 'zql',
            }
            const query$ = Object.keys(query)
                .map(key => {
                    return `${key}=${query[key]}`
                })
                .join('&')
            if (uri.indexOf('?') > -1) {
                uri = uri + query$
            } else {
                uri = uri + '?' + query$
            }

            return uri
        },
    },
    watch: {},
    created() {
        console.log(this.$route.params)
    },
    mounted() {},
    methods: {},
}
</script>

<style lang="less" scoped>
.iframe {
    width: 100%;
    height: 100%;
}
</style>
