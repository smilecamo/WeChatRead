<template>
 <div class="ebook-menu">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible>=0}" v-show="menuVisible"
          >
        <div class="icon-wrapper" >
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper" >
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popub></ebook-setting-font-popub>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
  </div>
</template>

<script>
import EbookSettingFont from './EbookSettingFont'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingFontPopub from './EbookSettingFontPopub'
import EbookSettingProgress from './EbookSettingProgress'
import { ebookMixin } from 'utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFont,
    EbookSettingFontPopub,
    EbookSettingTheme,
    EbookSettingProgress
  },
  methods: {
    showSetting (key) {
      this.setSettingVisible(key)
      console.log(key)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~styles/global";
.menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(22);
    background: #fff;
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-A {
        font-size: px2rem(20);
      }
    }
  }
</style>
