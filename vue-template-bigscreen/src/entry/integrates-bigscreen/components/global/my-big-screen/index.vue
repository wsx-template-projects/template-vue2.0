<template>
  <div class="my-big-screen-layout">
    <div class="big-screen-lay-bg">
      <div
        class="big-screen-lay-wrap"
        :style="`width: ${width}px; height: ${height}px;`"
        :class="[{ scale: isScale }, bgClass]"
        ref="ScaleBox"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'MyBigScreen',
  components: {},
  props: {
    // 背景class
    bgClass: {
      type: String,
      default: '',
    },
    // 是否需要缩放
    isScale: {
      type: Boolean,
      default: true,
    },
    // 缩放类型
    scaleType: {
      type: String,
      default: 'carvelBuilt', // equalRatio: 等比；carvelBuilt：铺满
    },
    // 宽
    width: {
      type: Number,
      default: 1920,
    },
    // 高
    height: {
      type: Number,
      default: 1080,
    },
  },
  data() {
    return {
      scale: null,
    }
  },
  created() {},
  mounted() {
    if (this.isScale) {
      this.setScale()
      window.addEventListener('resize', this.setScaleDebounce)
      document.addEventListener(
        'DOMContentLoaded',
        this.setScaleDebounce,
        false,
      )
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.setScaleDebounce)
        document.removeEventListener('DOMContentLoaded', this.setScaleDebounce)
      })
    }
  },
  methods: {
    /**
     * @description 获取窗口缩放比例
     */
    setScale() {
      const docEl = document.documentElement
      const width = docEl.clientWidth
      const heiht = docEl.clientHeight
      if (!width || !heiht) return
      const ww = width / this.width
      const wh = heiht / this.height
      let scale = ww < wh ? ww : wh
      if (this.scaleType === 'carvelBuilt') {
        // 平铺
        this.scale = `${ww}, ${wh}`
      } else {
        // 等比
        this.scale = scale.toFixed(6)
      }
      // this.$refs.ScaleBox.style.setProperty('--scale', this.scale)
      this.$nextTick(() => {
        this.$refs.ScaleBox.style.transform = `scale(${this.scale}) translate(-50%, 0)`
      })
    },
    setScaleDebounce: debounce(function () {
      this.setScale()
    }, 500),
    /**
     * @description 节流
     */
    debounce(fn, delay) {
      let delays = delay || 500
      let timer
      return () => {
        let _this = this
        let args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          timer = null
          fn.apply(_this, args)
        }, delays)
      }
    },
  },
}
</script>

<style lang="less">
.my-big-screen-layout {
  width: 100vw;
  height: 100vh;
  position: relative;

  .big-screen-lay-bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .big-screen-lay-wrap.scale {
      // transform: scale(var(--scale)) translate(-50%, 0);
      width: 100%;
      height: 100%;
      transform-origin: 0 0;
      position: absolute;
      left: 50%;
      top: 0;
      // transition: 0.3s;
      z-index: 999;
      overflow: hidden;
    }
  }
}
</style>
