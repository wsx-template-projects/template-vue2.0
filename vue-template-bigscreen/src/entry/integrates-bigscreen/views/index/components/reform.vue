<template>
  <div class="reform">
    <div class="reform-title" @click="toHref()">
      改革全景
      <img src="../../../assets/images/integrates/reform-right.png" alt="" />
    </div>
    <div class="reform-box">
      <div class="pic-group">
        <div class="item-pic" @click="openChartlet(1)">体系架构图</div>
        <div class="item-pic" @click="openChartlet(2)">目标路径图</div>
        <div class="item-pic" @click="openChartlet(3)">应用架构图</div>
      </div>
      <div class="border">
        <img src="../../../assets/images/integrates/border.png" alt="" />
      </div>
      <!-- <div class="animation-one">
        <div class="gp posa">
          <img src="../../../assets/images/integrates/gp.png" alt="" />
        </div>
        <div class="a3 posa">
          <img src="../../../assets/images/integrates/a3.png" alt="" />
        </div>
        <div class="at3 posa">
          <img src="../../../assets/images/integrates/at3.png" alt="" />
        </div>
        <div class="a1 posa">
          <img src="../../../assets/images/integrates/a1.png" alt="" />
        </div>
        <div class="at1 posa">
          <img src="../../../assets/images/integrates/at1.png" alt="" />
        </div>
        <div class="a2 posa">
          <img src="../../../assets/images/integrates/a2.png" alt="" />
        </div>
        <div class="at2 posa">
          <img src="../../../assets/images/integrates/at2.png" alt="" />
        </div>

        <div class="a4 posa">
          <img src="../../../assets/images/integrates/a4.png" alt="" />
        </div>
        <div class="at4 posa">
          <img src="../../../assets/images/integrates/at4.png" alt="" />
        </div>
        <div class="a5 posa">
          <img src="../../../assets/images/integrates/a5.png" alt="" />
        </div>
        <div class="at5 posa">
          <img src="../../../assets/images/integrates/at5.png" alt="" />
        </div>
      </div> -->
      <!-- <ReformTop class="reform-top"></ReformTop> -->
      <ReformTopOne class="reform-top"></ReformTopOne>
      <div class="animation-two">
        <div class="an2-guanghuan posa">
          <img src="../../../assets/images/integrates/guanghuan.png" alt="" />
        </div>
        <div class="an2-guangpao posa">
          <img src="../../../assets/images/integrates/guangpao.png" alt="" />
        </div>
        <div class="an2-gp posa">
          <img src="../../../assets/images/integrates/an2gp.png" alt="" />
        </div>
        <div class="an2-text posa">
          <img src="../../../assets/images/integrates/an2text.png" alt="" />
        </div>
      </div>
      <!-- <svga-player
        :src="'static/assets/svga/mxzq.svga'"
        :style-obj="{ height: '300px' }"
      ></svga-player> -->
    </div>
    <el-dialog
      ref="dialogRef"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="85%"
      :modal-append-to-body="false"
    >
      <div class="dialog-reform">
        <div
          class="close"
          :class="{ mubiao: dialogIndex == 2, app: dialogIndex == 3 }"
          @click="handleClose()"
        ></div>
        <div class="dialog-reform-content">
          <img
            v-if="dialogIndex == 1"
            src="../../../assets/images/integrates/txjgt.png"
            alt=""
          />
          <img
            v-if="dialogIndex == 2"
            src="../../../assets/images/integrates/mbljt.png"
            alt=""
          />
          <img
            v-if="dialogIndex == 3"
            src="../../../assets/images/integrates/yyjgt.png"
            alt=""
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SVGA from 'svgaplayerweb'
import svgaPlayer from './svga-player.vue'
import ReformTop from './integrates-reform-top.vue'
import ReformTopOne from './integrates-reform-topOne.vue'

export default {
  name: 'Reform',
  components: { svgaPlayer, ReformTop, ReformTopOne },
  props: {},
  data() {
    return {
      player: null,
      parser: null,
      dialogVisible: false,
      dialogTitle: '',
      dialogIndex: 1,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 打开贴图
     */
    openChartlet(e) {
      this.dialogVisible = true
      this.dialogIndex = e
      switch (e) {
        case 1:
          this.dialogTitle = `"大综合一体化"行政执法改革"5+6+1+4"体系架构图`
          break
        case 2:
          this.dialogTitle = `"大综合一体化"改革目标路径图`
          break
        case 3:
          this.dialogTitle = `大综合一体化执法监管数字应用架构图`
          break
      }
    },
    /**
     * 关闭弹窗
     */
    handleClose() {
      //   this.$refs.dialogRef.close()
      this.dialogVisible = false
    },
    /**
     * 跳转
     */
    toHref() {
      window.open('reform')
    },
  },
}
</script>

<style lang="less" scoped>
.reform {
  width: 660px;
  height: 850px;
  color: #f3ecec;
  .reform-title {
    text-align: center;
    font-size: 42px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: url('../../../assets/images/integrates/reform-title.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-size: 657px 60px;
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
    }
  }
  .reform-box {
    margin-top: 10px;
    background: url('../../../assets/images/integrates/reform.png');
    background-repeat: no-repeat;
    background-size: 660px 770px;
    padding-top: 20px;
    .pic-group {
      display: flex;
      justify-content: space-between;
      position: relative;
      z-index: 10;
      .item-pic {
        width: 194px;
        height: 75px;
        text-align: center;
        line-height: 75px;
        background: url('../../../assets/images/integrates/tab-bg.png');
        background-size: contain;
        background-repeat: no-repeat;
        font-size: 22px;
        cursor: pointer;
      }
      .item-pic:hover {
        color: #40a9ff;
      }
    }
    .animation-one {
      position: relative;
      top: -30px;
      height: 300px;
      width: 650px;
      margin: 0 auto;
      .gp {
        top: -80px;
      }
    }
    .animation-two {
      position: relative;
      width: 600px;
      height: 350px;
      //   margin: 0 auto;
      margin-left: 10px;
      .an2-gp {
        top: -208px;
        left: 30px;
      }
      .an2-guangpao {
        top: -44px;
        left: 42px;
      }
      .an2-text {
        bottom: 119px;
        left: 130px;
        width: 362px;
      }
      .an2-guanghuan {
        left: 57px;
      }
    }
    .posa {
      position: absolute;
    }
  }
  .reform-top {
    position: relative;
    height: 400px;
    width: 650px;
    margin: 0 auto;
    margin-top: -100px;
  }
  /deep/.el-dialog {
    // margin-top: 6vh !important;
    background: #0000;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
    }
    // background: transparent;
  }
  .dialog-reform {
    position: relative;
    .close {
      position: absolute;
      right: 65px;
      top: 42px;
      width: 64px;
      height: 64px;
      background: #0000;
      cursor: pointer;
      &.app {
        top: 50px;
      }
      &.mubiao {
        background: url('../../../assets/images/integrates/close.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    &-content {
      img {
        // max-width: none;
        width: 100%;
      }
    }
  }
}
</style>
