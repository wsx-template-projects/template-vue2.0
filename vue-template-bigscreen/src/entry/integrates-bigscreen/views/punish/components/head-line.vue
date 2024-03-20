<template>
  <div class="headLine-container" :class="[isGradient ? 'bg' : '']">
    <span class="line"></span><span class="text">{{ text }}</span
    ><span class="slot"><slot name="fill"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'HeadLine',
  props: {
    text: {
      type: String,
      required: true,
    },
    styleObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
    isGradient: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>
<style lang="less" scoped>
.headLine-container {
  padding: 8px 0px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  .line {
    width: 6px;
    height: 26px;
    border-radius: 3px;
    background-image: linear-gradient(#3897c2, #3071c2);
  }
  .text {
    color: #fff;
    font-size: 34px;
    margin-left: 10px;
  }
}
.bg {
  background-image: linear-gradient(
    to right,
    rgba(38, 70, 163, 0.5),
    rgba(38, 63, 164, 0.2)
  );
}
</style>
