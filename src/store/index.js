import Vue from 'vue'
import Vuex from 'vuex'
import modules from './loader'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug
})
