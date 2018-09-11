<template>
    <div class="Rank">
        <!-- <el-select v-model="value" placeholder="6小时" @change="selectChange(value)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select> -->
        <!-- <font-awesome-icon :icon="icon" @click="getList()"></font-awesome-icon> -->
        <!-- <el-table :data="tableData" style="width: 100%"  @row-click="rowClick" > -->
         <!-- <el-table :data="tableData" style="width: 100%"  @row-click="rowClick" :class="{mytable:isActive}">
            <el-table-column prop="x" :label="labelX">
            </el-table-column>
            <el-table-column prop="y" :label="labelY">
            </el-table-column>
        </el-table> -->
        <v-select :items="options" label="时间" menu-props="auto" v-model="value"  item-text="label" item-value="value" @change="selectChange(value)"></v-select>
        <v-data-table :headers="headers" :items="tableData" hide-actions class="elevation-1" >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.x }}</td>
                <td>{{ props.item.y }}</td>
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
             icon:['fa','sync-alt'], 
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