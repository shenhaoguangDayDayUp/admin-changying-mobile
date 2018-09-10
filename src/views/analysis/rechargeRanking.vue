<template>
      <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2">
        <v-tab v-for="n in 1" :key="n" ripple> 充值排行榜</v-tab>
        <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
            <v-card-text></v-card-text>
            </v-card>
        </v-tab-item>
    </v-tabs>
     <!-- <el-tabs class="prizeRank"  v-model="activeName">
        <el-tab-pane label="充值排行榜" name="mbrRechargeRank">
                <keep-alive><Rank v-if="activeName=='mbrRechargeRank'" @getList='list'  :tableData='tableData'></Rank></keep-alive>
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
 
 
         
