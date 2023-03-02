<template>
  <my-big-screen class="sg-page" v-bind="$attrs">
    <!-- 背景底图 -->
    <video class="fullscreenvideo" autoplay muted loop>
      <source
        src="../../../assets/images/integrates/integrates.mp4"
        type="video/mp4"
      />
    </video>
    <section class="screen-content">
      <slot></slot>
    </section>
  </my-big-screen>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import MyBigScreen from '../my-big-screen/index.vue'
@Component({
  name: 'MyScreen',
  components: { MyBigScreen },
})
export default class MyScreen extends Vue {
  created() {}
  mounted() {}
}
</script>

<style lang="less" scoped>
.fullscreenvideo {
  width: 100%;
  height: 100%;
}
.screen-content {
  overflow: hidden;
  width: 2560px;
  height: 1440px;
  background: url('../../../assets/images/integrates/bg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
