<template>
    <section>
        <mbr-info></mbr-info>
        <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2" class="cy-mbr-info">
            <v-tab ripple v-for="(v,i) in tabs" :key="i">{{v}}</v-tab>
            <v-tab-item>
               <keep-alive><charge-detail></charge-detail></keep-alive>
            </v-tab-item>
            <v-tab-item>
                <keep-alive><bet-detail></bet-detail></keep-alive>
            </v-tab-item>
             <v-tab-item>
                 <keep-alive><prize-detail></prize-detail></keep-alive>
            </v-tab-item>
            <v-tab-item>
                <keep-alive><redeem-detail></redeem-detail></keep-alive>
            </v-tab-item>
            <v-tab-item>
                 <keep-alive><integral-detail></integral-detail></keep-alive>
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
            active:0,
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
