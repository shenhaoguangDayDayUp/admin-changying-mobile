
import KTable from './KTable'
import Vue from 'vue'
import LoadingComponent from './Loading.vue'

KTable.install = function(Vue){
    Vue.component(KTable.name,KTable);
}
Vue.use(KTable)




let $vm
export  const plugin = {
    install(vue, options = {}) {
        const Confirm = vue.extend(LoadingComponent)       
        if (!$vm) {
            $vm = new Confirm({
                el: document.createElement('div'),
                propsData: {
                    title: ''
                },
                data:options,
                mounted () {
                    console.log(this)
                }
            })
            console.log($vm)
            document.body.appendChild($vm.$el)
        }
        const present = {
            show(options) {
                $vm.showToast = true
            },
            hide() {
                $vm.showToast = false
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.$$Loading) {
            vue.$$Loading = {
                present
            }
        } else {
            vue.$$Loading.present = present
        }

        vue.mixin({
            created: function () {
                this.$$Loading = vue.$$Loading
            }
        })
    }
}


// Vue.use(plugin.install);
