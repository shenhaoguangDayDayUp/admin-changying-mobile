<template>
    <section>
        <game-info></game-info>
        <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2" class="cy-mbr-info">
            <v-tab ripple v-for="(v,i) in tabs" :key="i">{{v}}</v-tab>
            <v-tab-item>
               <redeem-detail></redeem-detail>
            </v-tab-item>
            <v-tab-item>
               <bonus-pool-detail></bonus-pool-detail>
            </v-tab-item>
            <v-tab-item>
                <issuance-detail></issuance-detail>
            </v-tab-item>
             <v-tab-item>
                <welfare-detail></welfare-detail>
            </v-tab-item>
        </v-tabs>
    </section>
</template>
<script>
import {gameInfo,bonusPoolDetail,redeemDetail,issuanceDetail,welfareDetail} from './components';
export default {
    data(){
        return{
            tabs:['下注明细','奖金池明细','发行费明细','公益金明细'],
            active:0,
        }
    },
    components:{
        gameInfo,
        bonusPoolDetail,
        redeemDetail,
        issuanceDetail,
        welfareDetail
    }
}
</script>

