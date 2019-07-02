<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  methods: {
    initEpub () {
      console.log(this.fileName)
      const url = 'http://192.168.18.51:8081/epub/' + this.fileName + '.epub'
      // 初始化图书
      this.book = new Epub(url)
      // 渲染图书
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        // 兼容微信
        method: 'default'
      })
      // 加载图书
      this.rendition.display()
      console.log(this.rendition)
      // 手指进入事件
      this.rendition.on('touchstart', event => {
        console.log(event)
      })
      // 手指离开事件
      this.rendition.on('touchend', event => {
        console.log(event)
      })
    }
  },
  mounted () {
    // this.$route.params.fileName 动态路由的名称
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style scoped lang="scss">
@import "~styles/global";

</style>
