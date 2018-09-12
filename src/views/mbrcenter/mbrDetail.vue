<template>
    <section>
        <mbr-info></mbr-info>
        <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2" class="cy-mbr-info">
            <v-tab ripple v-for="(v,i) in tabs" :key="i">{{v}}</v-tab>
            <v-tab-item >
                <mbr-table></mbr-table>
            </v-tab-item>
        </v-tabs>
        
    </section>
</template>
<script>
import mbrInfo from './components/mbrInfo';
import mbrTable from './components/mbrTable';
export default {
    data(){
        return{
            tabs:['充值明细','下注明细','奖金明细','兑换明细','交易明细'],
            active:0,
        }
    },
    components:{
        mbrInfo,
        mbrTable
    }
}
</script>
