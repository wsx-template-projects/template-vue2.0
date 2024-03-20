import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'SpanEl',
    components: {},
})
export default class SpanEl extends Vue {
    @Prop({ default: () => {} }) cell!: Record<string, any>
    created() {}
    mounted() {}
    render(h: any) {
        console.log('span-cell :>> ', this.cell)
        return <span class="">{this.cell.text}</span>
    }
}
