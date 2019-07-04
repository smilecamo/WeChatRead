<template>
  <div class="read-wrapper">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from 'utils/mixin'
import { saveFontFamily, saveFontSize, getFontFamily, getFontSize } from 'utils/localStorage'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  mounted () {
    // this.$route.params.fileName 动态路由的名称
    if (this.$route.params.fileName) {
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    } else {
      console.log('查询不到')
    }
  },
  methods: {
    // 初始化图书
    initEpub () {
      const url = `${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`
      // 初始化图书
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      // 渲染图书
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight
        // 兼容微信
        // method: 'default'
      })
      // 加载图书
      this.rendition.display().then(() => {
        // 字体设置
        this.initFontFamily()
        // 字号设置
        this.initFontSize()
      })
      // 手指进入事件
      this.rendition.on('touchstart', event => {
        // 手指X轴坐标
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      // 手指离开事件
      this.rendition.on('touchend', event => {
        // 偏移量手势 从左到右是正
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        // 滑动的时间
        const time = event.timeStamp - this.touchStartTime
        // 如果滑动的距离大于40并且时间小于.5s,切换上一页
        if (time < 500 && offsetX > 40) {
          this.pervPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          // 显示中间状态栏
          this.toggleTitleAndMenu()
        }
        // event.preventDefault()
        // event.stopPropagation()
        // 字体设置,字体文件需要从网络上进行引入(url)
        this.rendition.hooks.content.register(contents => {
          Promise.all(
            [
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/book/res/fonts/daysOne.css`),
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/book/res/fonts/cabin.css`),
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/book/res/fonts/montserrat.css`),
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/book/res/fonts/tangerine.css`)
            ]
          ).then(() => {

          })
        })
      })
    },
    // 字体设置
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    // 字号设置
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.currentBook.rendition.themes.fontSize(fontSize + 'px')
        this.setDefaultFontSize(fontSize)
      }
    },
    // 上一页
    pervPage () {
      if (this.rendition) {
        this.rendition.prev()
        // 隐藏菜单和标题
        this.hideTitleAndMenu()
      }
    },
    // 下一页
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        // 隐藏菜单和标题
        this.hideTitleAndMenu()
      }
    },
    // 切换显示菜单
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        // 隐藏字体设置
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    // 只是隐藏
    hideTitleAndMenu () {
      // 隐藏
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      // 隐藏字体设置
      this.setFontFamilyVisible(false)
    }

  }
}
</script>

<style scoped lang="scss">
@import "~styles/global";
  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask {
      position: absolute;
      z-index: 150;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
