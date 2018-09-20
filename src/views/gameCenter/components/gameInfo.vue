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
              <v-card style="height:100px;">
                <img :src="imageUrl" alt="" style="width:100%;height:100%;">
              </v-card>
            </v-flex>
        </v-tab-item>
        <v-tab-item > <!--游戏轮播-->
            <v-layout row wrap>
                <v-flex  xs6  v-for="(v,i) in bannerImageUrl" :key="i" style="padding:4px;">
                    <v-card  style="height:100px; border-radius:5px;">
                         <!-- <v-img :src="v"></v-img> -->
                         <img :src="v" alt="" style="width:100%;height:100%;">
                    </v-card>
                </v-flex>
            </v-layout>
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
                this.list = {'编号:': data.code,'密码:':data.password,'名称:':data.name,'描述:':data.description,'链接:':data.link};
                this.costList = {'返奖率:':data.prizepoolPct,'发行率:':data.issuancePct,'公益率:':data.welfarePct};
                this.imageUrl = config.imgUrl[config.env.NODE_ENV] + data.icon;
                this.bannerImageUrl = [];
                data.banners.split(',').forEach((v, i) => {
                        const element = config.imgUrl[config.env.NODE_ENV] + v;
                        this.bannerImageUrl.push(element);
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


