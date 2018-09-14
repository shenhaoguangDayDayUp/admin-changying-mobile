// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from '@/store'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import 'vuetify/src/stylus/main.styl'
import 'vuetify/src/stylus/settings/_colors.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@/style/main.styl'
import './filters';
Vue.use(Vuetify,{
  lang: {
    locales: { zhHans},
    current: 'zhHans'
  }
})






Vue.config.productionTip = false
import  './components/index'
import { plugin} from './components/index'
// import { plugin,pluginMessage} from './components/index'

Vue.use(plugin.install);
// Vue.use(pluginMessage.install);
/* eslint-disable no-new */
window.global = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
