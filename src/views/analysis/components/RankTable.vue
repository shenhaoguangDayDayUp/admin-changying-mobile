<template>
    <div class="Rank">
        <v-select v-show="selectShow" :items="options"  label="时间" menu-props="auto" v-model="value"  item-text="label" item-value="value" @change="selectChange(value)" :placeholder="placeholderTime"></v-select>
         <div class="refresh"  v-show="selectShow"><i :class="icon" @click="getList()"></i></div> 
         <!--数据分析模块排行表-->
        <v-data-table :headers="headers" :items="tableData" hide-actions class="elevation-1" v-if="rankTable">
            <template slot="items" slot-scope="props" > 
                <tr  @click='rowClick(props)'>
                    <td >{{ props.item.x }}</td>
                    <td>{{ props.item.y }}</td>
                </tr>
            </template>
        </v-data-table>
        <!--用户收货地址表-->
        <div v-else  > 
            <v-data-table :headers="headers" :items="tableData" hide-actions  :expand="true" class="elevation-1"  style="height:200px;overflow-y:scroll;">
            <template slot="items" slot-scope="props">
                <td class="px-1">{{ props.item.isfavorite }}</td>
                <td class="px-0">{{ props.item.name }}</td>
                <td class="px-0">{{ props.item.mobileNumber }}</td>
                <td class="px-1">{{ props.item.address}}</td>
            </template>
        </v-data-table>
        </div>
        
    </div>
</template>
<script>
import {rankingMixin} from "@/mixins/rankingHandle.js";
export default {
    mixins: [rankingMixin], 
    data(){
        return{
             icon:'fa fa-sync-alt', //刷新
             requestId:6,
             placeholderTime:'6小时'
        }
    },
    props: { //在子组件中不能改变，只能接收，所以selectChange不能被分出去，因为val带不走。因为默认的时间都是6小时，所以直接在子组建写死data requestId:6这样也ok.
        tableData: {
            type: Array,
            default: () => []
        },
        headers:{
            type:Array,
            default:() => [
                { text: '手机号', align: 'center',sortable: false},
                { text: '金额(￥)',align: 'center', sortable: false},
            ]
        },
        isActive:{
            type:Boolean,
            default:true
        },
        tabActive:{
            type:String,
        },
        selectShow:{
            type:Boolean,
            default:true
        },
        rankTable:{
            type:Boolean,
            default:true
        },
        column:{
            type:String,
            default:'手机号'
        },
        tabActive:{
            type:String,
            default:'0'
        },
        toggle:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
         this.getList();
         console.log('tabactive')
         console.log(this.tabActive)
     },
     methods:{
        selectChange(val) { 
            this.requestId = val;
            this.getList();
        },
        getList(){
            this.$emit('getList',this.requestId);
        },
        rowClick(props) { //进入用户详情
            console.log(props);
            switch (this.column) { 
                case '手机号':
                    // this.$router.push({name:'会员详情',params:{code:props.item.x}})
                    this.$router.push({name:'会员详情',params:{code:props.item.x},query:{active:this.tabActive,toggle:this.toggle}})
                    break;
                case '游戏':
                    // this.$router.push({name:'游戏详情',params:{code:props.item.z}})
                    this.$router.push({name:'游戏详情',params:{code:props.item.z},query:{active:this.tabActive}})
                    break;    
                case '商品':
                    break;
            }
        },
     }
}
</script>
<style>
/* .Rank .v-input{
    width:80%;
} */
</style>
