
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
  computed: {
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
      [this.renderTable(h),this.renderPage(h)]
    );
  },
  methods: {
    renderPage(h){
        if(this.index == 0){
            this.index = 1
        }
      
      return  h('div',{class:{
          "text-xs-center":true,
          "m-t-20":true
      }},[
           h('v-pagination',{
                props:{...this.pageCofig,value:this.index},
                on:{
                    'input':(value)=>{
                      this.index = value
                      this.$emit('pageChage',this.index)
                    },
                }
            },)
        ])
    },
    renderTable(h) {
     const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map(vnode => {
        vnode.context = this._self
        return vnode
      })
    const self = this
        console.log(this.$scopedSlots)
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
</style>
