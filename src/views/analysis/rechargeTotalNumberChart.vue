<template>
    <div>
        <v-select :items="options" label="时间" menu-props="auto" v-model="value"></v-select>
        <v-flex xs12 sm5 md3 offset-sm1 offset-lg1 class="btn-layout" >
                <v-btn class='text-xs-right' primary @click='reset'>重置</v-btn>
                <v-btn class='text-xs-right' color="info" @click='search'>过滤</v-btn>
        </v-flex>
        <div class="refresh"><i :class="icon" @click="search()"></i></div>  
        <div id="chartLine" style="width:100%; height:700px;"  @click="goto('/topup')"></div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import {chartApi} from '@/api/api';
    import {common} from '@/logic';
    import {chartMixin} from "@/mixins/analysisHandle";
    import { game } from "@/mixins/game";
    export default {
        mixins: [chartMixin,game], // 混入
        data(){
           return {
                icon:'fa fa-sync-alt', //刷新
            }
        },
        async mounted() {
            await this.reset(); //重置和初始mounted渲染相同
        },
        methods: {
            async search() {
                await this.getList(this.value,this.application);
                this.drawLineChart('chartLine', '充值数量','充值合计');
            },
            async reset(){
                this.placeholderTime = '6小时' ;this.value = '';this.application ='';
                await this.getList(6,'');
                this.drawLineChart('chartLine', '充值数量','充值合计');
            },
            async getList(value,application) {
                let params = application?{hours:value||6,application:application}:{hours:value||6}
                try {
                    const {data} = await chartApi.rechargeChart({}, {headers: {'x-auth-token': common.getCommon()}, params: params,})
                    let {xAxis,yAxis} = this.arrHandle(this.xAxis, this.yAxis, data);
                    this.xAxis = xAxis;
                    this.yAxis = yAxis;
                } catch (error) {
                    alert(error)
                };
                 try {
                    const {data} = await chartApi.rechargeTotalChart({}, { headers: {'x-auth-token': common.getCommon()},params: params,})
                    this.xAxisReverse = this.arrHandle(this.xAxisReverse, this.yAxisReverse, data).xAxis;
                    this.yAxisReverse = this.arrHandle(this.xAxisReverse, this.yAxisReverse, data).yAxis;
                } catch (error) {
                    alert(error)
                }
            },
        }
    }
</script>





