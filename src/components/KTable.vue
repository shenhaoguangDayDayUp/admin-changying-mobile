
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
    pageCofig:{
      type: Object,
      default: function() {
        return {length:4};
      }
    },
    page:{
      type: [String,Number],
      default: function() {
        return 1;
      },
 
    }
  },
  data(){
    return{
      // select:['Foo', 'Bar', 'Fizz', 'Buzz']
    }

  },
  computed: {
      select(){
        var list = []
        for (var i=1;i<=this.pageCofig.length;i++){
            list.push(i)
        }
        return  list
      },
      index:{
          get(){
                return this.page
        
          },
          set(value){
              this.$emit("update:page",value)
          }
      }
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
      [this.renderTable(h), this.pageCofig.length? this.renderPage(h):'']
    );
  },
  methods: {
    renderSelect(h){ //下拉框
    return h('div',{
          class:{
              total_page:true
           }
              },[
              //  h('v-btn',{
              //     props:{
              //       flat:true,
              //        color:"primary"
              //     },
              //    domProps:{
              //     innerHTML:`共${this.pageCofig.length}页`
              //   }
              //  }),
              //    h('div',{
              //      class:{
              //         'mr-2':true 
              //      },
              //    domProps:{
              //     innerHTML:`前往`
              //   }
              //  }),
        //        h('v-select',{
        //       props:{
        //         multiple:false,
        //         items:this.select,
        //         value: this.index ,
        //       },
        //       style:{
        //         width:'50px'
        //       },
        //       class:{
                
        //       },
        //       attrs:{
        //         multiple:false
        //       },
        //       on:{
        //         input:(val)=>{
        //             this.index = val;
        //            this.$emit('pageChage',this.index)
        //         }
        //       }
        // }),
          //  h('div',{
          //          class:{
          //             'ml-2':true 
          //          },
          //        domProps:{
          //         innerHTML:`页`
          //       }
          //      }),
             ])

    },
    renderPage(h){  // pagination
       
      return  h('div',{class:{
          "text-xs-center":true,
          "m-t-20":true
      }},[
          h('div',{
            class:{
               'page_content':true
            }
          },[
                h('v-pagination',{
                props:{...this.pageCofig,value:this.index},
                on:{
                    'input':(value)=>{
                      this.index = value
                      this.$emit('pageChage',this.index)
                    },
                }
            }),
           this.renderSelect(h)

          ]),
      
            //   h('div',{
            //     props:{},
            //     on:{
                  
            //     },
            //     domProps:{
            //       innerHTML:`共${this.pageCofig.length}页`
            //     }
            // },[])
        ])
    },
    renderTable(h) { // table
     const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map(vnode => {
        vnode.context = this._self
        return vnode
      })
    const self = this
      return h(
        "v-data-table",
        {
          props: {
            ...this.tableSource
          },
          on: {},
          scopedSlots:this.$scopedSlots
        },
        slots
      );
    }
  }
};
</script>
<style scoped='scss'>
 .m-t-20{
    margin-top:20px; 
 }
 .page_content{
     display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 }
 .total_page{
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   align-items: center
 }
</style>
