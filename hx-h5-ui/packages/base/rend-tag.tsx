import { Component, Vue, Prop } from 'vue-property-decorator'
import InputEl from './input'
import SpanEl from './span'

const TAG_TYPES: Record<string, any> = {
    span: SpanEl,
    'van-field': InputEl,
}

@Component({
    name: 'RendTag',
    components: { SpanEl, InputEl },
})
export default class RendTag extends Vue {
    @Prop({ default: () => {} }) cell!: Record<string, any>
    created() {}
    mounted() {}
    render(h: any) {
        const { tag } = this.cell
        console.log('tag :>> ', tag)
        return h(TAG_TYPES[tag], {
            props: { cell: this.cell },
            on: this.$listeners,
        })
    }
}
