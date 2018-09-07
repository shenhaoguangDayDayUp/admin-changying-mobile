
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
         this.tableSource.items.map(colum => {
            return h("template", {
              props: {
                    
               },
               slot:'items',
               scopedSlots: {
                default: props => {
                   
                    return (<td class="text-xs-right">{props.item}</td>)
                  }
                }
            });
          })
        ]
      );
    }
  }
};
</script>
