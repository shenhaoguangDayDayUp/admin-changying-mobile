// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from '@/store'
Vue.use(Vuetify)

import 'font-awesome/scss/font-awesome.scss'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon)
import 'vuetify/src/stylus/main.styl'
import 'vuetify/src/stylus/settings/_colors.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/style/main.styl'

Vue.config.productionTip = false
import  './components/index'
/* eslint-disable no-new */
window.global = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
