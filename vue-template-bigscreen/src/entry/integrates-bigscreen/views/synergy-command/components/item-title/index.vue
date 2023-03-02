<template>
  <div class="item-title">
    <header
      class="item-title__header"
      @click="headerClick()"
      :class="backgroundType"
    >
      {{ itemTitle }}
    </header>
    <section class="item-title__content">
      <slot></slot>
    </section>
  </div>
</template>

<script lang="ts">
type params = number | string | object | any[]
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'ItemTitle',
  components: {},
})
export default class ItemTitle extends Vue {
  @Prop({ type: String, default: '' }) private itemTitle!: string
  /** long   center   short  */
  @Prop({ type: String, default: 'center' }) private backgroundType!: string
  @Prop() private titleClick!: Function
  @Prop() private params!: params
  /** 头部点击 */
  public headerClick() {
    this.titleClick && this.titleClick(this.params)
  }
  created() {}
  mounted() {}
}
</script>

<style lang="less" scoped>
.item-title {
  &__header {
    width: 100%;
    height: 60px;
    font-size: 42px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 55px;
    text-align: center;
    &.long {
      background: url('../../images/long-item-title.png') no-repeat;
      background-size: 100% 100%;
    }
    &.center {
      background: url('../../images/item-title.png') no-repeat;
      background-size: 100% 100%;
    }
    &.short {
    }
  }
  &__content {
    width: 100%;
    background: url('../../images/item-content.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 5px;
  }
}
</style>
