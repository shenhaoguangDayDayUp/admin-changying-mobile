
<script>
export default {
  name: "KTable",
  props: {
    tableSource: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  render(h) {
    const self = this

    return h(
      "div",
      {
        class: {
          "k-table": true
        }
      },
      [this.renderTable(h)]
    );
  },
  methods: {
     renderTemplate(h){
         console.log(this.$slots)
         return (
             h('template',
                 { 
                    slot:'items',
                    scopedSlots: { 
                        default: props => {
                            console.log(props)
                        // return h('td',{
                        //     domProps: {
                        //     innerHTML: "取 消"
                        //     }
                        // })
                   return (<td class="text-xs-right">{props.item}</td>)
                  }
                }
             }
         ))
     },
    renderTable(h) {
      return h(
        "v-data-table",
        {
          props: {
            ...this.tableSource
          },
          on: {}
        },
        [
         this.renderTemplate(h)
        ]
      );
    }
  }
};
</script>
// this.tableSource.items.map(colum => {
//             return h("template", {
//               props: {
                        
//                 },
//                slot:'items',
//                scopedSlots: {
                
//                 default: props => {
//                 return h('td',{
//                       domProps: {
//                          innerHTML: "取 消"
//                      }
//                  })
//                     // return (<td class="text-xs-right">{props.item}</td>)
//                   }
//                 }
//             });
//           })