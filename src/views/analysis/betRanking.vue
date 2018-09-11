<template>
    <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2">
        <v-tab ripple> 会员下注</v-tab>
        <v-tab ripple> 游戏收注</v-tab>
        <v-tab-item >
           <Rank  @getList='list' :tableData='tableData'></Rank>
        </v-tab-item>
        <v-tab-item >
            <Rank  @getList='list1' :tableData='tableData1' :headers="headers1" ></Rank>
        </v-tab-item>
    </v-tabs>
</template>
 <script>
  import {chartApi} from '@/api/api';
 import {common} from '@/logic';
 import Rank from './components/RankTable.vue';
 export default {
     data(){
         return{
             tableData:[],
             tableData1:[],
             active:1,
             headers1: [
                { text: '游戏', align: 'center',sortable: false,},
                { text: '收注', align: 'center', sortable: false},
            ],
         }
     },
     methods:{
         async list(val){
             try {
                    const { data } = await chartApi.mbrBetRank({}, {
                        headers: { 'x-auth-token': common.getCommon() },
                        params: { hours:val },
                    })
                    this.tableData = [];
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        element.y =this.$currency(element.y);
                        this.tableData.push(element);
                    }
                    console.log(111)
                    console.log(this.tableData);
                    
                } catch (error) {
                    this.$message.error('操作失败!');
                }
         },
         async list1(val){
            try {
                const { data } = await chartApi.gameBetRank({}, {
                    headers: { 'x-auth-token': common.getCommon() },
                    params: {  hours:val },
                })
                this.tableData1 = [];
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    element.y =this.$currency(element.y);
                    this.tableData1.push(element);
                }
            } catch (error) {
                this.$message.error('操作失败！');
            }
        },
     },
     components:{
         Rank
     }
 }
 </script>
         