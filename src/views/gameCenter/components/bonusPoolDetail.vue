<template>
    <div>
        <v-layout wrap row>
        <v-flex xs5 sm5 md3>
            <v-menu ref="start" :close-on-content-click="false" v-model="menu"
                :nudge-right="40" :return-value.sync="queryParams.start" lazy
                transition="scale-transition" offset-y full-width min-width="290px" >
                <v-text-field slot="activator" v-model="queryParams.start" label="开始时间" readonly ></v-text-field>
                <v-date-picker :max='startMax'  locale='zh-Hans' v-model="queryParams.start" no-title scrollable >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.start.save(queryParams.start)">确定</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
        
        <v-flex xs5 sm5 md3 offset-xs2>
            <v-menu ref="end" :close-on-content-click="false" v-model="menus"
                :nudge-right="40" :return-value.sync="queryParams.end" lazy
                transition="scale-transition" offset-y full-width min-width="290px" >
                <v-text-field slot="activator"  v-model="queryParams.end" label="结束时间" readonly ></v-text-field>
                <v-date-picker :min='startMin' :max='max'    locale='zh-Hans' v-model="queryParams.end" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menus = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.end.save(queryParams.end)">确定</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
        </v-layout>
       <v-layout wrap row>
            <v-flex xs6 sm5 md3 offset-sm1 offset-lg1 class="btn-layout" >
                <v-btn  class='text-xs-right mx-0 px-0' flat color="primary">余额:{{amount}}</v-btn>  
            </v-flex>
            <v-flex xs6 sm5 md3 offset-sm1 offset-lg1 class="btn-layout" justify-end>
                <v-btn small round  class='text-xs-rihgt px-0 mx-0'  @click='reset'>重置</v-btn>
                <v-btn small round  class='text-xs-rihgt px-0 ' color="info" @click='search'>过滤</v-btn> 
            </v-flex>
        </v-layout>
        <k-table @pageChage='handleCurrentChange' :tableSource='list' :pageCofig='pageCofig' :page.sync='page'>
            <template slot-scope='props' slot='items'> 
                <tr>
                    <td class="px-0">{{ props.item.updateAt|dateFilter( "yyyy-MM-dd hh:mm:ss")}}</td>
                    <td class="px-0"> {{ props.item.type|prizeTypeFilter}}</td>
                    <td  class="px-0"> {{ props.item.mobileNumber}}</td>
                    <td  class="px-0"> {{ props.item.amount_}}</td>
                </tr>
            </template>
        </k-table>

    </div>
    
</template>
<script>
import { mixin } from "@/mixins/search";
import { integralApi } from '@/api/api';
import { common } from "@/logic";
export default {
   mixins: [mixin],
   data(){
       return{
           list:{
                'hide-actions':true,
                headers: [
                    { text: '日期',  sortable: false,  align: 'center' },
                    { text: '类型',  sortable: false,  align: 'center' },
                    { text: '手机号', sortable: false,  align: 'center' },
                    { text: '积分', sortable: false,   align: 'center', },
                ],
                items:[]
            },
            pageCofig:{
                length:1,
                circle:true
            },
            page:1, 
            menu:false,
            menus:false,
            queryParams:{
                start:'',
                end:''
            },
            amount:0
       }
   },
   methods:{
        async getList(params = Object.assign({}, this.tableParams, this.queryParams)) {
            if(params.start&&params.end){
                try {
                    const { data} = await integralApi.prizePoolList(Object.assign({},{id:this.$route.params.code},{start:this.$date(params.start, "start"),end:this.$date(params.end, "end"),index:params.index}), {
                        headers: {
                            'x-auth-token': common.getCommon()
                        }
                    })
                    this.pageCofig.length = Math.ceil(data.count/12) 
                    this.list.items = data.records.map(v=>{
                        return {...v,amount_:this.$amountTypeFilter("game",this.$currency( v.amount), v.type),mobileNumber:v.sender ? v.sender.code : v.receiver.code}
                    }) //手机号字段不一定;
                    this.getTotal(); //不传参，因为余额不随时间的变化而变化
                } catch (error) {}
            }else{}
        },
        async getTotal() {
            try {
                const {data } = await integralApi.integralRest({id: this.$route.params.code
                    }, {headers: { 'x-auth-token': common.getCommon() }
                })
                this.amount = this.$currency(data);
            } catch (error) {}
        },  
    }
}
</script>
