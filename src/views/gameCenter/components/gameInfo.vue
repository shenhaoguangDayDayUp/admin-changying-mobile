<template>
    <v-tabs v-model="active" color="transparent" dark slider-color="#1976d2" class="cy-mbr-info">
        <v-tab ripple v-for="(v,i) in tabs" :key="i">{{v}}</v-tab>
        <v-tab-item > <!--对接参数-->
           <v-layout row align-center >
                <v-flex xs3 sm5 md3>
                    <v-subheader v-for="(v,i) in list" :key="i">{{i}}</v-subheader>
                </v-flex>
                <v-flex xs6  sm5 md3 class="text-xs-left">
                    <v-subheader v-for="(v,i) in list" :key="i">{{v}}</v-subheader>
                </v-flex>
            </v-layout>
        </v-tab-item>
        <v-tab-item > <!--费用计提-->
           <v-layout row align-center >
                <v-flex xs3 sm5 md3>
                    <v-subheader v-for="(v,i) in costList" :key="i">{{i}}</v-subheader>
                </v-flex>
                <v-flex xs6  sm5 md3 class="text-xs-left">
                    <v-subheader v-for="(v,i) in costList" :key="i">{{v}}</v-subheader>
                </v-flex>
            </v-layout>
        </v-tab-item>
        <v-tab-item > <!--游戏icon-->
            <v-flex  xs4 d-flex >
              <v-card flat tile class="d-flex">
                <v-img :src="imageUrl"></v-img>
              </v-card>
            </v-flex>
        </v-tab-item>
        <v-tab-item > <!--游戏轮播-->
            <v-flex  xs6 d-flex v-for="(v,i) in bannerImageUrl" :key="i">
              <v-card flat tile class="d-flex">
                <v-img :src="v"></v-img>
              </v-card>
            </v-flex>
        </v-tab-item>
    </v-tabs>
    
</template>
<script>
import { gameApi, prizepoolsDetailTotalApi } from '@/api/api';
import {common} from '@/logic';
import config from "@/api/config";
export default {
    data() {
        return {
            active:0,
            tabs:['对接参数','费用计提','图片','轮播图'],
            list:{},
            costList:{},
            imageUrl:'', //游戏icon
            bannerImageUrl:[]
        };
    },
    async mounted() {
        await this.getList();
    },
    methods: {
        async getList() {
            try {
                const { data } = await gameApi.gameDetail({
                    id: this.$route.params.code,
                }, {
                    headers: { 'x-auth-token': common.getCommon() }
                })
                this.list = {'游戏编号:': data.code,'游戏密码:':data.password,'游戏名称:':data.name,'游戏描述:':data.description,'游戏链接:':data.link};
                this.costList = {'返奖率:':data.prizepoolPct,'发行率:':data.issuancePct,'公益率:':data.welfarePct};
                this.imageUrl = config.imgUrl[config.env.NODE_ENV] + data.icon;
                this.bannerImageUrl = [];
                data.banners.split(',').forEach((v, i) => {
                    if(v){
                        const element = config.imgUrl[config.env.NODE_ENV] + v;
                        this.bannerImageUrl.push(element);
                    }
                })
                console.log(this.bannerImageUrl)
            } catch (error) {}
        },
    },
};
</script>
<style lang="scss" scoped>
.cy-mbr-info .v-subheader{
    height:30px;
}
</style>


