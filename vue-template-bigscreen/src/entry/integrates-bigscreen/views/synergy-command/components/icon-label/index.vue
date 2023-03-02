<template>
  <div
    class="icon-label"
    :style="{
      alignItems: iconData.alignItems || 'flex-start',
    }"
  >
    <img
      :src="iconData.icon || require('../../images/item-icon.png')"
      alt=""
      :width="iconData.imgWidth || 30"
    />
    <div class="ml10">
      <div :class="iconData.labelClass || 'font20'">
        {{ iconData.label }}
      </div>
      <div class="flex font28">
        <MyCountTo
          :countToClass="'number-color ' + (iconData.valueClass || '')"
          :endVal="Number(iconData.value)"
          :unit="iconData.unit"
          :isBold="true"
        ></MyCountTo>
        <MyCountTo
          :countToClass="'white ' + (iconData.value_1Class || '')"
          class="ml10"
          v-if="iconData.value_1"
          :endVal="Number(iconData.value_1)"
          :isBold="true"
          :decimals="2"
          :suffix="iconData.unit_1"
        ></MyCountTo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'IconLabel',
  components: {},
})
export default class IconLabel extends Vue {
  @Prop({}) private iconData!: {}
  created() {}
  mounted() {}
}
</script>

<style lang="less" scoped>
.icon-label {
  display: flex;
}
</style>
