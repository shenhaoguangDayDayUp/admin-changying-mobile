<template>
    <section>
        <game-info></game-info>
        <v-tabs v-model="active" @input='change' color="transparent" dark slider-color="#1976d2" class="cy-mbr-info">
            <v-tab ripple v-for="(v,i) in tabs" :key="i">{{v}}</v-tab>
            <v-tab-item>
                <keep-alive><redeem-detail v-if="active=='0'"></redeem-detail> </keep-alive>
            </v-tab-item>
            <v-tab-item>
                <keep-alive><bonus-pool-detail v-if="active=='1'"></bonus-pool-detail></keep-alive>
            </v-tab-item>
            <v-tab-item>
                 <keep-alive><issuance-detail v-if="active=='2'"></issuance-detail></keep-alive>
            </v-tab-item>
             <v-tab-item>
                 <keep-alive><welfare-detail v-if="active=='3'"></welfare-detail></keep-alive>
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
            active:'',
        }
    },
     methods:{
        change(val){ 
            var query = Object.assign({},this.$route.query,{active:val})
            this.$router.push({ path: this.$route.path, query: query });
            this.active =val;
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

