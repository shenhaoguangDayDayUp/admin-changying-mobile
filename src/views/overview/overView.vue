<template>
    <section>
        <div class="refresh"><i :class="icon" @click="getInfo()"></i></div>  
        <div class="panel-group">
            <cy-card  v-for="(v,i) in infoArr" :key="i" @click.native="v.query?pushDataQuery(v.push):(v.push?pushData(v.push):'')">
                <!-- <div @click.native="v.query?pushDataQuery(v.push):pushData(v.push)"> -->
                    <div class="icon" >
                        <!-- <font-awesome-icon :icon="v.icon" :style="{color: v.color}"></font-awesome-icon> -->
                        <i :class="v.icon"  :style="{color: v.color}"></i>
                        <!-- {{v.icon}} -->
                    </div>
                    <div class="box-container">
                        <div v-for="(vv,ii) in v.content" :key="ii">
                            <span>{{ii}}:</span>
                            <count-to class="card-panel-num" :startVal="0" :endVal="vv" :duration="500"></count-to>
                        </div>
                    </div>
                <!-- </div> -->
            </cy-card>
        </div>  
    </section>
</template>
<script>
    import {chartApi} from '@/api/api';
    import CountTo from 'vue-count-to';
    import {common} from '@/logic';
    import CyCard from '@/components/CyCard';
    export default {
        data() {
            return {
                iconArr:['fas fa-user','fas fa-gamepad', 'fas fa-exchange-alt','fa fa-coins','fa fa-piggy-bank','fas fa-tree','fa fa-yen-sign','fa fa-wallet','fa fa-gift'],
                colorArr:['#40c9c6','#40c9c6','#40c9c6','#36a3f7','#36a3f7','#36a3f7','#B6A2DE','#B6A2DE','#B6A2DE'],
                pushArr:['会员名单','游戏清单','奖品清单','奖金池','发行费','公益金','充值','下注','奖金'], // 需跳转的页面
                queryArr:[0,0,0,0,0,0,1,1,1], //需不需要带时间查询字符串
                dataArr:[],
                infoArr: [],
                icon:'fa fa-sync-alt', //刷新
                defaultQuery:{
                    // this.$dateFilter(date1,'yyyy-MM-dd')
                    start:this.$dateFilter((Date.parse(new Date())), 'yyyy-MM-dd'),
                    end: this.$dateFilter((Date.parse(new Date())), 'yyyy-MM-dd'),
                },
                loading:false,
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            async getInfo() {
                this.loading = true;
                try {
                const {data} = await chartApi.overView({}, {headers: {'x-auth-token': common.getCommon()} })
                setTimeout(()=>{this.loading = false;},200); 
                this.infoArr = [];
                console.log(11111)
                this.dataArr = [Object.assign({},{'在线':data.memberOnline},{'注册':data.memberRegister}),Object.assign({},{'运行':data.gameActive},{'注册':data.gameRegister}),Object.assign({},{'上架':data.productActive}),Object.assign({},{'奖金池':data.totalPrizepool}),Object.assign({},{'发行费':data.balanceIssuance}),Object.assign({},{'公益金':data.balanceWelfare}),Object.assign({},{'今日充值':data.rechargeToday}),Object.assign({},{'今日下注':data.betToday}),Object.assign({},{'今日奖金':data.payoutToday})];
                console.log(this.dataArr)
                for(let i = 0;i < this.iconArr.length;i++){
                    this.infoArr.push(Object.assign({},{push:this.pushArr[i]},{query:this.queryArr[i]},{icon:this.iconArr[i]},{color:this.colorArr[i]},{content:this.dataArr[i]}))
                }
                console.log(this.infoArr);
                
                } catch (error) {}
            },
            pushData(name) {
                this.$router.push({name:name})
            },
            pushDataQuery(name){
                this.$router.push({name:name,query:{start:this.defaultQuery.start,end:this.defaultQuery.end,index:1}})
            }
        },
        components: {
            CountTo,
            CyCard,
        },
    }
</script>
<style lang="scss" scoped>
        
    .panel-group{
        margin-bottom: 20px;
        padding:0 24px;
        .el-col {
                padding: 30px 20px;
        }
        .fa, .fas {
            font-size: 40px; 
        }
        .icon{
            width:50px;
            // height:100%;
            // border:1px solid #d1dbe5;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .svg-inline--fa{
            height:50px!important;
            width:50px!important;
            padding:5px;
            border-radius: 5px;
        }
        .box-container{
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            div{
                padding:3px;
                // color:#000;
                font-size:18px;
                display:flex;
                justify-content: space-between;
                span:nth-child(1){
                    padding-right:20px;
                    // color: #666;
                }
                span:nth-child(2),span:nth-child(3){
                    line-height: 24px;
                    font-weight: bold;
                }
            }
        }
    }
</style>
<style lang="scss" >
    .panel-group .el-col .el-card__body{
        display:flex;
        justify-content: space-between;
        height:64px;
        cursor: pointer;
        color:#000;
    }
    @mixin svg-hover{
        color:#fff!important;
        transition:all .2s ease-in 0s;
        -moz-transition:all .2s ease-in 0s; /* Firefox 4 */
        -webkit-transition:all .2s ease-in 0s; /* Safari and Chrome */
        -o-transition:all .2s ease-in 0s; /* Opera */
    }
    @for $i from 1 through 9 {
        .panel-group .el-col:nth-child(#{$i}) .el-card__body:hover {
            @if $i < 10 and $i >6{ 
                span{
                    color:#B6A2DE;
                }
                .svg-inline--fa{
                    @include svg-hover;
                    background:#B6A2DE;
                }
            }@else if $i < 7 and $i >3{  
                span{
                    color:#36a3f7;
                }
                .svg-inline--fa{
                    @include svg-hover;
                    background:#36a3f7;
                }
            }@else if $i < 4 { 
                span{
                    color:#40c9c6;
                }
                .svg-inline--fa{
                    @include svg-hover;
                    background:#40c9c6;
                }
            }
        }
    }
    .panel-group .el-col:hover{
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0);
        @include svg-hover;
    }
    .brick-item-active {
        -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0)
    } 
</style>


