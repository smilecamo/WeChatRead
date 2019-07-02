import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import book from './modules/book'
import demo from './modules/demo'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    demo
  },
  getters
})
