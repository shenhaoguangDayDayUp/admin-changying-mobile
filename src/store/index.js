import Vue from 'vue'
import Vuex from 'vuex'
import app from './state'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  getters
})

export default store
