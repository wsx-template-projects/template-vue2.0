<template>
    <span class="sg-data-export">
        <a ref="link"></a>
        <el-button
            class="sg-data-export-button sg-data-export__button"
            type="primary"
            @click="onExport"
            v-bind="$attrs"
        >
            <slot :scope="this">{{ label }}</slot>
        </el-button>
    </span>
</template>

<script>
const XLSX = require('xlsx')
export default {
    name: 'SgDataExport',
    props: {
        // 导出文件名称
        name: {
            type: String,
            default: 'data',
        },
        // 按钮文案
        label: {
            type: String,
            default: '导出',
        },
        // 数据列配置
        columns: {
            type: Array,
            default() {
                return []
            },
        },
        // 元数据
        data: {
            type: Array,
            required: true,
            default() {
                return []
            },
        },
    },
    watch: {
        columns: {
            handler(val) {
                if (val) {
                    this.myColumns = val
                } else {
                    this.myColumns = []
                }
            },
            immediate: true,
        },
        data: {
            handler(val) {
                const columns = this.myColumns
                if (val) {
                    this.result = val.map((item, index) => {
                        let res = {}
                        if (columns.length) {
                            columns.forEach(col => {
                                const { prop, label, render } = col
                                if (render) {
                                    res[label] = render(item, index)
                                } else {
                                    res[label] = item[prop] || ''
                                }
                            })
                        } else {
                            res = {
                                ...item,
                            }
                        }

                        return res
                    })
                }
            },
            deep: false,
            immediate: true,
        },
    },
    data() {
        return {
            result: [],
            fullscreenLoading: false, // 加载中
            outFile: '', // 导出文件el
        }
    },
    mounted() {
        this.outFile = this.$refs['link']
    },
    methods: {
        onExport(name) {
            this.$emit('click')
            const rs = this.result
            const fileName =
                typeof name === 'string'
                    ? name || this.name || 'data'
                    : this.name || 'data'

            if (!rs.length) {
                console.warn('[没有数据]')
                return
            }
            // 按钮导出
            let data = [{}]
            for (const k in rs[0]) {
                data[0][k] = k
            }
            data = data.concat(rs)
            this.downloadExl(data, fileName)
        },

        downloadExl: function(json, downName, type) {
            // 导出到excel
            const keyMap = [] // 获取键
            for (const k in json[0]) {
                keyMap.push(k)
            }
            const tmpdata = [] // 用来保存转换好的json
            json.map((v, i) =>
                keyMap.map((k, j) =>
                    Object.assign(
                        {},
                        {
                            v: v[k],
                            position:
                                (j > 25
                                    ? this.getCharCol(j)
                                    : String.fromCharCode(65 + j)) +
                                (i + 1),
                        },
                    ),
                ),
            )
                .reduce((prev, next) => prev.concat(next))
                .forEach(function(v) {
                    tmpdata[v.position] = {
                        v: v.v,
                    }
                })
            const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
            const tmpWB = {
                SheetNames: ['mySheet'], // 保存的表标题
                Sheets: {
                    mySheet: Object.assign(
                        {},
                        tmpdata, // 内容
                        {
                            '!ref':
                                outputPos[0] +
                                ':' +
                                outputPos[outputPos.length - 1], // 设置填充区域
                        },
                    ),
                },
            }
            const tmpDown = new Blob(
                [
                    this.s2ab(
                        XLSX.write(
                            tmpWB,
                            {
                                bookType: type === undefined ? 'xlsx' : type,
                                bookSST: false,
                                type: 'binary',
                            }, // 这里的数据是用来定义导出的格式类型
                        ),
                    ),
                ],
                {
                    type: '',
                },
            ) // 创建二进制对象写入转换好的字节流
            const href = URL.createObjectURL(tmpDown) // 创建对象超链接
            this.outFile.download = downName + '.xlsx' // 下载名称
            this.outFile.href = href // 绑定a标签
            this.outFile.click() // 模拟点击实现下载
            setTimeout(() => {
                this.$emit('success')
                // 延时释放
                URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
            }, 100)
        },
        s2ab: function(s) {
            // 字符串转字符流
            const buf = new ArrayBuffer(s.length)
            const view = new Uint8Array(buf)
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff
            }
            return buf
        },
        getCharCol: function(n) {
            // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
            let s = ''
            let m = 0
            while (n > 0) {
                m = (n % 26) + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        },
        fixdata: function(data) {
            // 文件流转BinaryString
            let o = ''
            let l = 0
            const w = 10240
            for (; l < data.byteLength / w; ++l) {
                o += String.fromCharCode.apply(
                    null,
                    new Uint8Array(data.slice(l * w, l * w + w)),
                )
            }
            o += String.fromCharCode.apply(
                null,
                new Uint8Array(data.slice(l * w)),
            )
            return o
        },
    },
}
</script>
