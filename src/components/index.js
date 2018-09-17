
import KTable from './KTable'
import Vue from 'vue'
import LoadingComponent from './Loading.vue'
import MessageComponent from './Message.vue'


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

let $vms;
export  const pluginMessage = {
    install(vue, options = {}) {
        const Confirm = vue.extend(MessageComponent)       
        if (!$vms) {
            $vms = new Confirm({
                el: document.createElement('div'),
                propsData: {
                    title: ''
                },
                data:options,
                mounted () {
                    console.log(2222)
                    console.log(this)
                }
            })

            document.body.appendChild($vms.$el)
        }
        const present = {
            show(options) {
                console.log(22222)
                console.log($vms )
                $vms.showToast = true
                console.log(22222)
            },
            hide() {
                $vms.showToast = false
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.$$Message) {
            vue.$$Message = {
                present
            }
        } else {
            vue.$$Message.present = present
        }

        vue.mixin({
            created: function () {
                this.$$Message = vue.$$Message
            }
        })
    }
}


// Vue.use(plugin.install);
