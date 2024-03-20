<template>
    <div class="sg-data-form-field">
        <slot name="prependSlot"></slot>
        <el-autocomplete
            v-model="currentValue"
            :clearable="clearable"
            :value-key="valueKey"
            :debounce="debounce"
            :fetch-suggestions="fetchSuggestions || querySearch"
            v-bind="$attrs"
            v-on="listeners"
        >
            <slot slot="prefix" name="prefix"></slot>
            <slot slot="suffix" name="suffix"></slot>
            <slot slot="prepend" name="prepend"></slot>
            <slot slot="append" name="append"></slot>

            <template slot-scope="{ item }">
                <slot name="autocompleteSlot" :item="item"> </slot>
            </template>
        </el-autocomplete>
        <slot name="appendSlot"></slot>
    </div>
</template>

<script>
import formMixins from '../../base-form/form-model'

export default {
    name: 'SgBaseAutoComplete',
    props: {
        value: {
            type: [String, Number],
            default: null,
        },
        debounce: {
            type: Number,
            default: 500,
        },
        valueKey: {
            type: String,
            default: 'value',
        },
        fetchSuggestions: {
            type: Function,
            default: null,
        },
        load: {
            type: Function,
            default() {
                return Promise.resolve([])
            },
        },
    },
    watch: {
        currentValue: {
            handler(val) {
                this.$emit('input', val)
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
        querySearch(queryString, cb) {
            this.load(queryString).then(results => {
                this.dataList = results

                cb(results)
            })
        },
    },
}
</script>
