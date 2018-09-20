<template>
      <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2">
          <!-- <v-select :items="states" v-model="e2"  ></v-select> -->
        <v-tab ripple> 充值排行榜</v-tab>
        <v-tab-item >
           <Rank  @getList='list' :tableData='tableData' tabActive="0"></Rank>
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
             active:1,
        // e2: 'Texas',
        // items: [
        //   { text: 'State 1' },
        //   { text: 'State 2' },
        //   { text: 'State 3' },
        //   { text: 'State 4' },
        //   { text: 'State 5' },
        //   { text: 'State 6' },
        //   { text: 'State 7' }
        // ],
        // states: [
        //   'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        //   'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        // ]
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
 
 
         
