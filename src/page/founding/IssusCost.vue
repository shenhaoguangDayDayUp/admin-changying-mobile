<template>
    <div class="vip" >
        <!-- {{queryParams.start}} -->
        <!-- <v-container fluid> -->
         
        <v-layout wrap>
 
            <v-flex xs12
                    sm5
                    md3>
      <v-menu
        ref="start"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="queryParams.start"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="queryParams.start"
          label="开始时间"
     
          readonly
        ></v-text-field>
        <v-date-picker  locale='zh-Hans' v-model="queryParams.start" no-title scrollable >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">取消</v-btn>
          <v-btn flat color="primary" @click="$refs.start.save(queryParams.start)">确定</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>

            </v-flex>

              <v-flex xs12
                    sm5
                    md3>
      <v-menu
        ref="end"
        :close-on-content-click="false"
        v-model="menus"
        :nudge-right="40"
        :return-value.sync="queryParams.end"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="queryParams.end"
          label="结束时间"
          readonly
        ></v-text-field>
        <v-date-picker   locale='zh-Hans' v-model="queryParams.end" no-title scrollable>
          <v-spacer></v-spacer>

          <v-btn flat color="primary" @click="menus = false">取消</v-btn>
          <v-btn flat color="primary" @click="$refs.end.save(queryParams.end)">确定</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
      <v-flex xs12
                    sm5
                    md3
                    offset-sm1
                    offset-md1
                    offset-lg1>
                <v-select v-model='queryParams.application'
                             :items="gameList"
                               item-text="name"
                              item-value="code"
                              label="游戏"></v-select>
                    </v-flex>
    <v-flex xs12
                    sm5
                    md3
                    offset-sm1
              
               
                    offset-lg1 class="btn-layout" >
             <v-btn class='text-xs-left' flat color="primary">合计:{{amount}}</v-btn>  
                <v-btn class='text-xs-rihgt'
                       primary @click='reset'>重置</v-btn>
                <v-btn class='text-xs-rihgt'
                       color="info"
                       @click='search'>搜索</v-btn>

            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
             
                    <k-table @pageChage='handleCurrentChange' :tableSource='list' :pageCofig='pageCofig' :page.sync='page'>
                      <template slot-scope='props'   slot='items'>
                          <tr @click='gotoRow(props)'>
                               <td  style='width:300px'>{{ props.item.updateAt|dateFilter( "yyyy-MM-dd hh:mm:ss") }}</td>
                   <td class="text-xs-center">{{ props.item.application }}</td>
        <td style='color:blue' @click.stop='gotoItem(props.item.sender.code )' class="text-xs-center">{{ props.item.sender.code }}</td>
        <td class="text-xs-right">{{ props.item.amount|currency }}</td>
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
import { issuanceApi, issuanceTotalApi } from "@/api/api";
import { common } from "@/logic";
import { mixin } from "@/mixins/search";
import { game } from "@/mixins/game";
export default {
  mixins: [mixin,game],
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
   const { data } = await issuanceTotalApi.query(
        query,
        token
      );
      this.amount = data;
    },
      gotoRow(row){
        // console.log(row)
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
   const { data } = await issuanceApi.query(params, token);
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
          end:'',
          application:''
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
          text: '日期',
          align: 'center',
          sortable: false,
          value: 'updateAt'
        },
  
       { text: '游戏', value: 'application',  sortable: false,  align: 'center', },
        { text: '手机号', value: 'sender',  sortable: false,  align: 'center', },
          { text: '积分', value: 'amount',  sortable: false,   align: 'center', },
  
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

