<template>
  <div :id="svId" :class="className || ''" :style="styleObj || {}"></div>
</template>

<script>
import SVGA from 'svgaplayerweb' // 引入SVGA
let svgaId = 0 // id序号

export default {
  props: [
    'src', // String  资源路径
    'className', // String class-name 静态class
    'loops', // Number  循环播放次数 默认为最大正整数
    'onFrame', // Function 每帧执行回调
    'styleObj', // Object  style-obj 绑定的style样式
    'mode', // String  可选 "ScaleToFill" | "AspectFill" | "AspectFit"
    'onlyTag', // String  only-tag 唯一标识，每帧/执行完毕 函数回调时标识，用户同一动画，多出显示
  ],

  data() {
    return {
      svId: `svga-id-${svgaId++}`, // 动态生成id,处理页面多个svga的情况
    }
  },

  mounted() {
    this.render()
  },
  methods: {
    render() {
      this.$nextTick(() => {
        try {
          // 创建player
          let player = new SVGA.Player(`#${this.svId}`)
          player.loops = this.loops || Number.MAX_SAFE_INTEGER
          player.clearsAfterStop = false
          // 创建解析者
          let parser = new SVGA.Parser(`#${this.svId}`)
          parser.load(this.src, (videoItem) => {
            player.setVideoItem(videoItem)
            player.setContentMode(this.mode || 'AspectFit')
            player.startAnimation()
            player.onFinished(() => this.onFinished?.(this.onlyTag))
            player.onFrame((frame) => this.onFrame?.(frame, this.onlyTag))
          })
        } catch (error) {
          console.error(error)
        }
      })
    },
  },
}
</script>
