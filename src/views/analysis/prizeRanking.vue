<template>
    <!-- <el-tabs  class="prizeRank" v-model="activeName">
            <el-tab-pane label="会员收奖" name="mbrPrize" v-loading="loading">
                 <keep-alive><Rank v-if="activeName=='mbrPrize'" @getList='list' :tableData='tableData' labelY="收奖" tabActive="prizeDetail"></Rank></keep-alive>
            </el-tab-pane>
            <el-tab-pane label="游戏奖金" name="gamePrize" v-loading="loading1">
                 <keep-alive><Rank v-if="activeName=='gamePrize'" @getList='list1' :tableData='tableData1' labelX="游戏" labelY="积分" tabActive="integralDetail"></Rank></keep-alive>
            </el-tab-pane>
        </el-tabs> -->
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
             loading1:false
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
 
 
         