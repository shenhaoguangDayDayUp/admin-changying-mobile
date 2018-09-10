<template>
    <div>
        <div class="chart-title">
            <!-- <el-form inline >
                <el-form-item label="时间">
                    <el-select v-model="value" :placeholder="placeholderTime">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>    
                <el-form-item>
                <el-button type="primary" @click='search'>搜索</el-button>
                    <el-button @click='reset'>重置</el-button>
                </el-form-item> 
                <el-form-item>
                </el-form-item>
            </el-form> -->
            <div><font-awesome-icon :icon="icon" @click="search()"></font-awesome-icon></div>
        </div>
        <div id="exchangeChart" style="width:100%; height:800px;"  @click="goto('/convert')"></div>
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
            await this.reset();
        },
        methods: {
            async search() {
                await this.getList(this.value,this.application);
                this.drawLineChart('exchangeChart', '兑换数量','兑换合计');
            },
            async reset(){
                this.placeholderTime = '6小时' ;this.value = '';this.application ='';
                await this.getList(6,'');
                this.drawLineChart('exchangeChart', '兑换数量','兑换合计');
            },
            async getList(value,application) {
                let params = application?{hours:value||6,application:application}:{hours:value||6}
                try {
                    const {data} = await chartApi.exchangeChart({}, { headers: {'x-auth-token': common.getCommon()},params: params,})
                    let {xAxis,yAxis} = this.arrHandle(this.xAxis, this.yAxis, data);
                    this.xAxis = xAxis;
                    this.yAxis = yAxis;
                } catch (error) {alert(error)};
                 try {
                    const {data} = await chartApi.exchangeTotalChart({}, {headers: {'x-auth-token': common.getCommon()},params: params})
                    this.xAxisReverse = this.arrHandle(this.xAxisReverse, this.yAxisReverse, data).xAxis;
                    this.yAxisReverse = this.arrHandle(this.xAxisReverse, this.yAxisReverse, data).yAxis;
                } catch (error) {alert(error)}
            },
        }
    }
</script>




