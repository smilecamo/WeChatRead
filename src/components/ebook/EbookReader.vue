<template>
  <div class="read-wrapper">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from 'utils/mixin'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    // 初始化图书
    initEpub () {
      const url = 'http://192.168.18.51:8081/epub/' + this.fileName + '.epub'
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
      this.rendition.display()
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
      })
    },
    // 上一页
    pervPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    // 下一页
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    // 切换显示菜单
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    // 只是隐藏
    hideTitleAndMenu () {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
    }

  },
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
