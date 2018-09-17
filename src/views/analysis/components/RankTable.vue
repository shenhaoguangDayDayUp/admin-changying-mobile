<template>
    <div class="Rank">
        <v-select v-show="selectShow" :items="options" label="时间" menu-props="auto" v-model="value"  item-text="label" item-value="value" @change="selectChange(value)"></v-select>
         <div class="refresh"><i :class="icon" @click="getList()"></i></div> 
         <!--数据分析模块排行表-->
        <v-data-table :headers="headers" :items="tableData" hide-actions class="elevation-1" v-if="rankTable">
            <template slot="items" slot-scope="props" > 
                <td>{{ props.item.x }}</td>
                <td>{{ props.item.y }}</td>
            </template>
        </v-data-table>
        <!--用户收货地址表-->
        <v-data-table :headers="headers" :items="tableData" hide-actions  :expand="true" class="elevation-1" v-else >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.isfavorite }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.mobileNumber }}</td>
                <td>{{ props.item.address}}</td>
            </template>
        </v-data-table>
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
        }
    },
    mounted(){
         this.getList();
     },
     methods:{
        selectChange(val) { 
            this.requestId = val;
            this.getList();
        },
        getList(){
            this.$emit('getList',this.requestId);
        },
        rowClick(row, event, column) { //进入用户详情
            console.log('rowClick');
            console.log(row);
            console.log(event);
            console.log(column);
            switch (column.label) { 
                case '手机号':
                    this.$router.push({path:'/mbrDetail',query:{code:row.x,active:this.tabActive}})
                    break;
                case '游戏':
                    this.$router.push({path:'/gameDetail',query:{code:row.z,active:this.tabActive}})
                    break;
                case '商品':
                    this.$router.push({path:`/priceInfo/${row.z}`})

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
