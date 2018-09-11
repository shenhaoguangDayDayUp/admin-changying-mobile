<template>
      <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2">
        <v-tab ripple> 充值排行榜</v-tab>
        <v-tab-item >
           <Rank  @getList='list' :tableData='tableData'></Rank>
        </v-tab-item>
    </v-tabs>
</template> 
 <script>
 import {chartApi} from '@/api/api';
 import {common} from '@/logic';
 import Rank from './components/RankTable.vue';
 export default {
     components:{
         Rank
     },
     data(){
         return{
             activeName:'mbrRechargeRank',
             tableData:[],
             active:1
         }
     },
     methods:{
         async list(val){
            try {
                    const {
                        data
                    } = await chartApi.mbrRechargeRank({}, {
                        headers: {
                            'x-auth-token': common.getCommon()
                        },
                        params: {
                            hours:val
                        },
                    })
                    this.tableData = [];
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        element.y =this.$currency(element.y);
                        this.tableData.push(element);
                    }
                } catch (error) {
                    this.$message.error('操作失败!');
                }
        },
     }
 }
 </script>
 
 
         
