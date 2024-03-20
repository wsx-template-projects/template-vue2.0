<!--
   iframe - view
-->
<template>
    <iframe width="100%" :height="600" :src="url" frameborder="0"></iframe>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'IframeView',
    components: {},
})
export default class IframeView extends Vue {
    @Prop({ type: String, default: '' }) url!: string
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped></style>
