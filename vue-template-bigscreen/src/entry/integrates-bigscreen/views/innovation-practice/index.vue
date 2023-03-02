<template>
  <my-big-screen
    :is-scale="true"
    class="sg-page page-demo-bigscreen1"
    :width="width"
    :height="height"
    bg-class="demo-bigscreen1-bg"
    ref="fullScreen"
  >
    <video class="fullscreenvideo" autoplay muted loop>
      <source
        src="../../assets/images/integrates/integrates.mp4"
        type="video/mp4"
      />
    </video>
    <div class="sg-page page-innovation-practice">
      <section class="head">
        <index-title :ifBack="true" @back="goBack" :title="'创新实践'">
          <div slot="right-one" style="font-size: 18px">
            <i
              class="el-icon-time"
              style="
                margin-right: 10px;
                font-size: 20px;
                color: rgb(121, 218, 255);
              "
            ></i
            >{{ time }}
          </div>
        </index-title>
      </section>
      <div class="container">
        <div class="container-left">
          <div class="left-top">
            <left-top />
          </div>
          <div class="left-bottom">
            <left-bottom />
          </div>
        </div>
        <div class="container-right"></div>
      </div>
    </div>
  </my-big-screen>
</template>

<script>
import IndexTitle from '../index/components/index-title.vue'
import LeftTop from './components/left-top.vue'
import LeftBottom from './components/left-bottom.vue'

export default {
  name: 'InnovationPractice',
  components: { IndexTitle, LeftTop, LeftBottom },
  props: {},
  data() {
    return {
      zoom: false,
      width: 2560,
      height: 1440,
      time: '',
      timer: '',
    }
  },
  computed: {
    // time() {
    //   return '2022-5-18'
    // },
  },
  watch: {},
  created() {},
  mounted() {
    this.getTimer()
    this.timer = setInterval(() => {
      this.getTimer()
    }, 360000)
  },
  methods: {
    handleIsFullScreen(type) {
      if (type) {
        document.documentElement.requestFullscreen()
      } else {
        document.documentElement.exitFullscreen()
      }
    },
    getTimer() {
      let timer = new Date()
      this.time = ''
      this.time +=
        timer.getFullYear() +
        '-' +
        (timer.getMonth() * 1 + 1) +
        '-' +
        timer.getDate()
    },
    goBack() {
      console.log('back')
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style lang="less" scoped>
.fullscreenvideo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -10;
}
.page-innovation-practice {
  .container {
    display: flex;
    box-sizing: border-box;
    padding: 0 0 50px 50px;
  }
}
</style>
