<template>
    <div class="sg-data-form-field">
        <el-autocomplete
            :value="currentValue"
            :clearable="clearable"
            @input="onInputEvent"
            :value-key="valueKey"
            :debounce="debounce"
            :fetch-suggestions="fetchSuggestions || querySearch"
            v-bind="$attrs"
            @select="handleSelect"
        >
            <slot :slot="slotType" name="inputSlot"></slot>

            <template slot-scope="{ item }">
                <slot name="autocompleteSlot" :item="item"></slot>
            </template>
        </el-autocomplete>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import formMixins from './form-model'

export default {
    name: 'MyAutoComplete',
    props: {
        value: {
            type: [String, Number],
            default: null,
        },
        slotType: {
            type: String,
            default() {
                return ''
            },
        },
        debounce: {
            type: Number,
            default: 1500,
        },
        valueKey: {
            type: String,
            default: 'value',
        },
        fetchSuggestions: {
            type: Function,
            default: null,
        },
        onSelect: {
            type: Function,
            default() {},
        },
        load: {
            type: Function,
            default() {
                return Promise.resolve([])
            },
        },
    },
    mixins: [formMixins],
    data() {
        return {
            queryString: '',
            dataList: [],
            timeout: null,
            currentValue: this.value,
        }
    },
    mounted() {},
    methods: {
        handleSelect(item) {
            this.onSelect(item)
        },
        querySearch(queryString, cb) {
            // clearTimeout(this.timeout)
            // this.timeout = setTimeout(() => {
            //     this.load(queryString).then(results => {
            //         this.dataList = results

            //         cb(results)
            //     })
            // }, 1000)
            this.load(queryString).then(results => {
                this.dataList = results

                cb(results)
            })
        },
    },
}
</script>
