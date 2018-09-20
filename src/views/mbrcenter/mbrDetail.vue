<template>
    <section>
        <mbr-info></mbr-info>
        <v-tabs  v-model="active" @input='change' color="transparent" dark slider-color="#1976d2" class="cy-mbr-info">
            <v-tab ripple v-for="(v,i) in tabs" :key="i">{{v}}</v-tab>
            <v-tab-item >
               <keep-alive><charge-detail v-if="active=='0'"></charge-detail></keep-alive>
            </v-tab-item >
            <v-tab-item >
                <keep-alive><bet-detail v-if="active=='1'"></bet-detail></keep-alive>
            </v-tab-item>
             <v-tab-item >
                 <keep-alive><prize-detail v-if="active=='2'"></prize-detail></keep-alive>
            </v-tab-item>
            <v-tab-item >
                <keep-alive><redeem-detail v-if="active=='3'"></redeem-detail></keep-alive>
            </v-tab-item>
            <v-tab-item >
                 <keep-alive><integral-detail v-if="active=='4'"></integral-detail></keep-alive>
            </v-tab-item>
        </v-tabs>
        
    </section>
</template>
<script>
import {mbrInfo, chargeDetail, betDetail, prizeDetail, redeemDetail, integralDetail} from './components';
export default {
    data(){
        return{
            tabs:['充值明细','下注明细','奖金明细','兑换明细','交易明细'],
            active:'',
        }
    },
    methods:{
        change(val){ 
            // if(this.$route.query.toggle){
            //     alert(1)
            //     var query = Object.assign({},this.$route.query,{active:this.$route.query.active})
            //     this.$router.push({ path: this.$route.path, query: query });
            //     this.active =this.$route.query.active;
            // }else{
            //     alert(2)
            //     var query = Object.assign({},this.$route.query,{active:val})
            //     this.$router.push({ path: this.$route.path, query: query });
            //     this.active =val;
            // }
            
        }
    },
    components:{
        mbrInfo,
        chargeDetail,
        betDetail,
        prizeDetail,
        redeemDetail,
        integralDetail
    }
}
</script>
