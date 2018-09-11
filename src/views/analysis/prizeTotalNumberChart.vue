<template>
    <div>
        <v-select :items="options" label="时间" menu-props="auto" v-model="value"></v-select>
        <v-select :items="gameList" label="游戏" menu-props="auto" v-model="application"  item-text="name" item-value="code"></v-select>
        <v-flex xs12 sm5 md3 offset-sm1 offset-lg1 class="btn-layout" >
                <v-btn class='text-xs-right' primary @click='reset'>重置</v-btn>
                <v-btn class='text-xs-right' color="info" @click='search'>搜索</v-btn>
        </v-flex>
        <div id="prizeChart" style="width:100%; height:700px;"  @click="goto('/reword')"></div>
        
    </div>
</template>
<script>
    import echarts from 'echarts';
    import {chartApi} from '@/api/api';
    import {common} from '@/logic';
    import {chartMixin} from "@/mixins/analysisHandle.js";
    import { game } from "@/mixins/game";
    export default {
        mixins: [chartMixin,game], // 混入
        data(){
           return {
                icon:['fa','sync-alt'], //刷新
            }
        },
        async mounted() {
            await this.reset(); //重置和初始mounted渲染相同
        },
        methods: {
            async search() {
                await this.getList(this.value,this.application);
                this.drawLineChart('prizeChart', '奖金数量','奖金合计');
            },
            async reset(){
                this.placeholderTime = '6小时' ;this.value = '';this.application ='';
                await this.getList(6,'');
                this.drawLineChart('prizeChart', '奖金数量','奖金合计');
            },
            async getList(value,application) {
                let params = application?{hours:value||6,application:application}:{hours:value||6}
                try {
                    const {data} = await chartApi.prizeChart({}, {headers: {'x-auth-token': common.getCommon()},params: params,})
                    let {xAxis,yAxis} = this.arrHandle(this.xAxis, this.yAxis, data);
                    this.xAxis = xAxis;
                    this.yAxis = yAxis;
                } catch (error) {alert(error)};
                 try {
                    const {data} = await chartApi.prizeTotalChart({}, {headers: {'x-auth-token': common.getCommon()},params: params,})
                    this.xAxisReverse = this.arrHandle(this.xAxisReverse, this.yAxisReverse, data).xAxis;
                    this.yAxisReverse = this.arrHandle(this.xAxisReverse, this.yAxisReverse, data).yAxis;
                } catch (error) {alert(error)}
            },
        }
    }
</script>




