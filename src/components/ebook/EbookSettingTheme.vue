<template>
    <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible ===1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
          <div class="preview" :style="{background: item.style.body.background}" :class="{'selected': item.name === defaultTheme}"></div>
          <div class="text" >{{item.alias}}</div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { saveTheme } from 'utils/localStorage'
import { ebookMixin } from 'utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    // 选择主题
    setTheme (index) {
      let theme = this.themeList[index].name
      this.setDefaultTheme(theme).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        // 全局样式
        this.initGlobalStyle()
      })
      saveTheme(this.fileName, theme)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~styles/global";
  .setting-wrapper {
    background: #fff;
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 190;
    width: 100%;
    height: px2rem(90);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          border: none;
          &.selected {
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .1);
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          @include center;
        }
      }
    }
  }
</style>
