<template>
    <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2">
        <v-tab ripple> 会员收奖</v-tab>
        <v-tab ripple> 游戏奖金</v-tab>
        <v-tab-item >
           <Rank  @getList='list' :tableData='tableData' :headers="headers"></Rank>
        </v-tab-item>
        <v-tab-item >
            <Rank  @getList='list1' :tableData='tableData1' :headers="headers1" column="游戏"></Rank>
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
             activeName:'mbrPrize',
             tableData: [],
             tableData1:[],
             active:false,
             loading:false,
             loading1:false,
             headers: [
                { text: '手机号', align: 'center',sortable: false,},
                { text: '收奖', align: 'center', sortable: false},
            ],
             headers1: [
                { text: '游戏', align: 'center',sortable: false,},
                { text: '积分', align: 'center', sortable: false},
            ],
         }
     },
     methods:{
         async list(val){
             this.loading = true;
            try {
                    const {
                        data
                    } = await chartApi.mbrPrizeRank({}, {
                        headers: {
                            'x-auth-token': common.getCommon()
                        },
                         params: {
                            hours:val
                        },
                    })
                    setTimeout(()=>{this.loading = false;},500);
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
        async list1(val){
             this.loading1 = true;
            try {
                    const {
                        data
                    } = await chartApi.gamePrizeRank({}, {
                        headers: {
                            'x-auth-token': common.getCommon()
                        },
                         params: {
                            hours:val
                        },
                    })
                    setTimeout(()=>{this.loading1 = false;},500);
                    this.tableData1 = [];
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        element.y =this.$currency(element.y);
                        this.tableData1.push(element);
                    }
                } catch (error) {
                    this.$message.error('操作失败!');
                }
        },
     },
     components:{
         Rank
     }
 }
 </script>
 
 
         