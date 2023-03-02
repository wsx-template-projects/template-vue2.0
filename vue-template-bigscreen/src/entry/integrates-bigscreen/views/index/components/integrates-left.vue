<template>
  <div class="integrates-left">
    <!-- 改革概览 -->
    <reform />
    <!-- 创新实践 -->
    <carousel class="mt20" />
  </div>
</template>

<script>
/** 改革概览 */
import reform from './reform.vue'
/**创新实践 */
import carousel from './carousel.vue'
export default {
  name: 'IntegratesLeft',
  components: { reform, carousel },
  props: {},
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.integrates-left {
  width: 660px;
  height: 100%;
  max-height: 1280px;
  color: #fdfcfb;
  z-index: 10;
}
</style>