import Vue from 'vue'
import Vuex from 'vuex'
import canvas from './modules/canvas'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    canvas
  }
})
