<!--
   image - view
-->
<template>
    <div class="video-wrap">
        <video id="videoPlayer" controls :autoplay="false">
            <source :src="url" type="video/mp4" />
        </video>
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
    created() {}
    mounted() {}
}
</script>

<style lang="less" scoped>
.video-wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    video {
        width: 100%;
    }
}
</style>
