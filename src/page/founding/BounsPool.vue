<template>
    <div class="vip" >
        <!-- {{queryParams.start}} -->
        <!-- <v-container fluid> -->
         
        <v-layout wrap>
 
 

 

           
    <v-flex xs12
                    sm5
                    md3
                    offset-sm1
              
               
                    offset-lg1 class="btn-layout" >
             <v-btn class='text-xs-riht' flat color="primary">合计:{{amount}}</v-btn>  
 

            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
             
                    <k-table @pageChage='handleCurrentChange' :tableSource='list' :pageCofig='pageCofig' :page.sync='page'>
                      <template slot-scope='props'   slot='items'>
                        
                          <tr @click='gotoRow(props)'>
                                <td class="text-xs-right">{{ props.item.code }}</td>
                             <td  style='width:300px;color:blue'>{{ props.item.owner.name}}</td>
        <td class="text-xs-right">{{ props.item.balance|currency }}</td>
                          </tr>
       
                        </template>

                    </k-table>
            </v-flex>
        </v-layout>
   
        <div class="text-xs-center mt-5">

            <!-- <v-pagination :length="4"
                          v-model="page"
                          circle></v-pagination> -->
        </div>
        <!-- </v-container> -->
    </div>
</template>
<script>
import { prizepoolsApi, prizepoolsTotalApi } from "@/api/api";

import { common } from "@/logic";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  name: "vip",
 
  computed: {
    max(){
        if(this.queryParams.end){
          return  this.$dateFilter(new Date(this.queryParams.end)) 
        }else{
           return this.$dateFilter(new Date()) 
        }
    },
 
  },
  methods: {
      async getTotal(params,token) {
      const {start,end} = params
      const query = Object.assign({},{start:start,end:end})
      const { data } = await prizepoolsTotalApi.query(
        query,
        token
      );
      this.amount = data;
    },
      gotoRow(row){
          console.log(row.item.code)
          this.$router.push({
                    name: "奖金池详情",
                    params: { id: row.item.code},
               
                  })
      },
      gotoItem(row){
        console.log(row)

      },
    async getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      if(params.start){
        params.start = this.$date(params.start, "start") 
      }
      if(params.end){
          params.end = this.$date(params.end, "end")
      }
   const { data } = await prizepoolsApi.query(params, token);
   this.pageCofig.length = Math.ceil(data.count/12) 
   this.list.items = data.records
   this.getTotal(params,token);
    //   this.items = data;
    }
  },
  data() {

    return {
        amount:0,
      queryParams:{
          start:'',
          end:''
      },
      pageCofig:{
          length:1,
          circle:true

      },
      menus:false,
      menu:false,
      page:1,
      list:{
         'hide-actions':true,
          headers: [
             {
          text: '编号',
          align: 'center',
          sortable: false,
          value: 'code'
        },
        { text: '游戏', value: 'owner',  sortable: false, align: 'center', },
          { text: '积分余额', value: 'balance',  sortable: false,   align: 'center', },
  
      ],
     items:[
   
      ]
    },
    };
  }
};
</script>
 <style lang="scss" scoped>
  .rest{
    background: red;
  }
  .btn-layout{
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center
  }
</style>

