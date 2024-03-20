import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'InputEl',
    components: {},
})
export default class InputEl extends Vue {
    @Prop({ default: () => {} }) cell!: Record<string, any>
    public value = ''
    created() {}
    mounted() {}
    render(h: any) {
        console.log('van-field-cell :>> ', this.cell)
        return <div class="">van-field</div>
        // return (
        //     <van-field
        //         v-model={this.value}
        //         v-bind={this.cell.attrs}
        //     ></van-field>
        // )
    }
}
