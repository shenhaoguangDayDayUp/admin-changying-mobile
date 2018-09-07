
import KTable from './KTable'
import Vue from 'vue'

KTable.install = function(Vue){
    Vue.component(KTable.name,KTable);
}
Vue.use(KTable)

