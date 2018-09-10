<template>
    <!-- <el-tabs class="prizeRank"  v-model="activeName">
        <el-tab-pane label="兑换排行榜" name="mbrRechargeRank" v-loading="loading">
            <keep-alive><Rank v-if="activeName=='mbrRechargeRank'" @getList='list'  :tableData='tableData' labelX='商品' labelY='积分'></Rank></keep-alive>
        </el-tab-pane>
    </el-tabs> -->
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
         }
     },
     methods:{
         async list(val){
            try {
                    const {
                        data
                    } = await chartApi.exchangeRank({
                    }, {
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
 
 
         
