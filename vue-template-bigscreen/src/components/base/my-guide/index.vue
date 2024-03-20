<template>
    <div class="my-guide" v-drag>
        <el-dropdown trigger="click">
            <button class="my-guide__shortcut">
                <i class="my-guide__shortcut-icon el-icon-share"></i>
            </button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    icon="el-icon-url"
                    v-for="(item, index) in result"
                    :key="index"
                    @click.native="handleClick(item)"
                >
                    {{
                        item.meta && item.meta.title
                            ? item.meta.title
                            : item.name
                    }}
                    {{ item.path }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
    name: 'MyGuide',
    props: {
        // url前缀
        prefix: {
            type: String,
            default: '',
        },
        // 路由数据源
        dataSource: {
            type: Array,
            default() {
                return []
            },
        },
        // 是否显示
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {}
    },
    computed: {
        result() {
            const prefix = this.prefix
            return this.dataSource
                .filter(item => item.path.indexOf(prefix) > -1)
                .map(item => {
                    return {
                        path: item.path,
                        name: item.name,
                        meta: item.meta,
                    }
                })
        },
        myVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    methods: {
        handleClick(item) {
            console.log(item)
            let routeUrl = this.$router.resolve({
                path: item.path,
            })
            location.replace(routeUrl.href)
            //window.open(routeUrl.href, '_blank')
        },
    },

    mounted() {},
    directives: {
        drag(el) {
            let oDiv = el // 当前元素
            // let self = this // 上下文
            // 禁止选择网页上的文字
            // document.onselectstart = function() {
            //     return false
            // }
            oDiv.onmousedown = function(e) {
                // 鼠标按下，计算当前元素距离可视区的距离
                let disX = e.clientX - oDiv.offsetLeft
                let disY = e.clientY - oDiv.offsetTop
                document.onmousemove = function(e) {
                    // 通过事件委托，计算移动的距离
                    let l = e.clientX - disX
                    let t = e.clientY - disY
                    // 移动当前元素
                    oDiv.style.left = l + 'px'
                    oDiv.style.top = t + 'px'
                }
                document.onmouseup = function(e) {
                    document.onmousemove = null
                    document.onmouseup = null
                }
                // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
                return false
            }
        },
    },
}
</script>
<style lang="less">
.my-guide {
    position: fixed;
    right: 15px;
    bottom: 15px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 40px;
    height: 40px;
    user-select: none;
}
.my-guide__shortcut {
    display: flex;
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 12px;
    line-height: 1;
    color: #909090;
    color: #007fff;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    border-radius: 50%;
    outline: none;
    box-shadow: 0 0 5px rgb(0 0 0 / 5%);
    transition: background-color 0.3s, color 0.3s;
    align-items: center;
    justify-content: center;
}
</style>
