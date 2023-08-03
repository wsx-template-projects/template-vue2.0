<!--
   my-popup - 组件
-->
<template>
    <div class="component-my-popup">
        <van-cell is-link @click="openPopup">{{ leftTxt }}</van-cell>
        <div class="sg-popup">
            <div class="item" v-for="(item, index) in list" :key="index">
                <span class="left-txt">{{ item.label }}</span>
                <span class="right-icon">{{ rightTxt }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'HxPopup',
    components: {},
})
export default class HxPopup extends Vue {
    @Prop({ type: Array, default: () => [] }) list!: any[]
    leftTxt: any = '全部'
    rightTxt: any = '筛选'
    isPopup = false
    created() {}
    mounted() {}
    openPopup() {}
}
</script>

<style lang="less" scoped>
.sg-popup {
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    -webkit-overflow-scrolling: touch;
}

.sg-popup--top {
    top: 0;
    left: 0;
    width: 100%;
}

.sg-popup--bottom {
    bottom: 0;
    left: 0;
    width: 100%;
}

.sg-popup--left {
    top: 50%;
    left: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
}

.sg-popup--right {
    top: 50%;
    right: 0;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
}
</style>
