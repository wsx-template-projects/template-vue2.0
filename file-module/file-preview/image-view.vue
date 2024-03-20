<!--
   image - view
-->
<template>
    <div class="image-wrap">
        <el-image :src="url" :preview-src-list="previewList"></el-image>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'ImageView',
    components: {},
})
export default class ImageView extends Vue {
    @Prop({ type: String, default: '' }) url!: string
    public previewList: any[] = []
    created() {}
    mounted() {
        this.previewList = [this.url]
    }
}
</script>

<style lang="less" scoped>
.image-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 0;
}
</style>
