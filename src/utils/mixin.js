import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss } from 'utils/book'
export const ebookMixin = {
  // 数据混入
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'speakingIconBottom'
    ]),
    themeList () {
      return themeList(this)
    }
  },
  // 方法混入
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setSpeakingIconBottom'
    ]),
    initGlobalStyle () {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(
            `${process.env.VUE_APP_RES_URL}/book/res/theme/theme_default.css`
          )
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/book/res/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/book/res/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(
            `${process.env.VUE_APP_RES_URL}/book/res/theme/theme_night.css`
          )
          break
        default:
          addCss(
            `${process.env.VUE_APP_RES_URL}/book/res/theme/theme_default.css`
          )
      }
    }
  }
}
