const filterXSS = require('xss')
function formatter(x) {
    if (x && typeof x === 'string') {
        x = x.replace(/^\s+|\s+$/gm, '')
        x = filterXSS(x)
    } else if (x && typeof x === 'number') {
        x = Number(x.toString().replace(/^\s+|\s+$/gm, ''))
    }
    return x
}

export default {
    props: {
        name: {
            type: String,
            default: '',
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        label: {
            type: String,
            default: '',
        },
        onChange: {
            type: Function,
            default() {},
        },
        listeners: {
            type: Object,
            default() {
                return {}
            },
        },

        appendSlot: {
            type: String,
            default: '',
        },
        prependSlot: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
    methods: {
        dictToArray(dict) {
            return Object.keys(dict).map(name => {
                console.log('name', typeof name, name)
                return { label: dict[name], value: name }
            })
        },
        onInputEvent(value) {
            const dataList = this.dataList || []
            const target = dataList.filter(item => item.value == value)[0]
            this.onChange &&
                this.onChange({
                    name: this.name,
                    value: value,
                    option: target,
                })

            this.$emit('input', formatter(value))
        },
        reset() {
            this.currentValue = ''
        },
    },
    watch: {
        value(val) {
            this.currentValue = formatter(val)
        },
    },
}
