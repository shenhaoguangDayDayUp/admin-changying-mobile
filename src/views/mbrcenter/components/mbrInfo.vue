<template>
    <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2" class="cy-mbr-info">
        <v-tab ripple v-for="(v,i) in tabs" :key="i">{{v}}</v-tab>
        <v-tab-item > <!--信息-->
           <v-layout row align-center >
                <v-flex xs3 sm5 md3>
                    <v-subheader v-for="(v,i) in list" :key="i">{{i}}</v-subheader>
                </v-flex>
                <v-flex xs6  sm5 md3 class="text-xs-left">
                    <v-subheader v-for="(v,i) in list" :key="i">{{v}}</v-subheader>
                </v-flex>
            </v-layout>
        </v-tab-item>
        <v-tab-item > <!--地址-->
            <rank :selectShow='false' :headers='headers' :tableData='addressTableData' :rankTable="false"></rank>
        </v-tab-item>
    </v-tabs>
    
</template>
<script>
import {mbrApi,integralApi} from '@/api/api';
import {common} from '@/logic';
import Rank from '@/views/analysis/components/RankTable.vue';
export default {
    data() {
        return {
            active:0,
            value: '',
            addressTableData: [], // 地址列表
            tabs:['信息','地址'],
            list:{},
            headers: [
                { text: '默认地址', align: 'center',sortable: false,},
                { text: '  姓 名 ', align: 'center', sortable: false},
                { text: ' 手 机 号', align: 'center',sortable: false,},
                { text: '    收 货 地 址    ', align: 'center', sortable: false},
            ],
        };
    },
    async mounted() {
        await this.userInfo();
    },
    methods: {
        // 用户信息
        async userInfo() {
            try {
                const {
                    data
                } = await mbrApi.userInfo({
                    id: this.$route.params.code,
                }, {
                    headers: {
                        'x-auth-token': common.getCommon()
                    }
                })
                this.list = {'手机号:': data.mobileNubmer,'姓名:':data.name,'昵称:':data.nickname,'一卡通:':'','身份证:':data.idCardNumber,'等级:':data.level,'贵宾:':(data.vip==1?'是':'否'),'黑名单:':(data.status=='SUSPEND'?'是':'否'),'状态:':this.$statusFilter(data.status)};
                this.addressTableData = data.receivers.map(v=>{
                    return {...v,isfavorite:this.$defaultAddressFilter(v.favorite),address:v.province+v.city+v.district+v.street}
                });
                
            } catch (error) {}
        },
    },
    components:{
        Rank
    }
};
</script>
<style lang="scss" scoped>
.cy-mbr-info .v-subheader{
    height:40px;
}
</style>


