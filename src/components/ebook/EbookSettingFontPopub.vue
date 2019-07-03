<template>
<transition name="popup-slide-up">

  <div class="ebook-popub-list" v-show="fontFamilyVisible">
    <div class="ebook-popub-title">
      <div class="ebook-popub-title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="ebook-popub-title-text">选择字体</span>
    </div>
    <div class="ebook-popub-list-wrapper">
      <div class="ebook-popub-item" v-for="(item,key) in fontFamilyList " :key="key">
        <div class="ebook-popub-item-text" :class="{'selected':isSelected(item)}">
          {{item.font}}
        </div>
        <div class="ebook-popub-item-check">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { ebookMixin } from 'utils/mixin'
import { FONT_FAMILY } from 'utils/book'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    hide () {
      this.setFontFamilyVisible(false)
    },
    isSelected (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~styles/global";
.ebook-popub-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background: #fff;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0,0,0,.1);
  .ebook-popub-title {
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    @include center;
    .ebook-popub-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    .ebook-popub-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popub-list-wrapper {
  }
}
</style>
