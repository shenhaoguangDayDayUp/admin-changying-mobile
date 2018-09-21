<template>
    <v-layout column>
	    <v-layout wrap>
			<v-flex xs12>
        <v-text-field v-model="filters" placeholder="手机号 / 姓名" required maxlength="11"></v-text-field>
      </v-flex>
			<v-flex xs12 sm5 md3 offset-sm1 offset-lg1 class="btn-layout" justify-end>
                <v-btn small round  class='text-xs-rihgt px-0 mx-0'  @click='reset'>重置</v-btn>
                <v-btn small round  class='text-xs-rihgt px-0 ' color="info" @click='getList'>过滤</v-btn> 
        </v-flex>
        </v-layout>
        <v-flex xs12>
            <k-table @pageChage='handleCurrentChange' :tableSource='list' :pageCofig='pageCofig' :page.sync='page'>
                <template slot-scope='props' slot='items'>
                    <tr @click='rowClick(props)'>
                        <td class="px-0">{{ props.item.mobileNumber}}</td>
                        <td> {{ props.item.name}}</td>
                        <td >{{ props.item.status|statusFilter }}</td>
                    </tr>
                </template>
            </k-table>
        </v-flex>
    </v-layout>
</template>
<script>
	import {mbrApi} from '@/api/api';
    import {common} from '@/logic';
    import { mixin } from "@/mixins/search";
	export default {
        mixins: [mixin],
		name:'mbrList',
		data() {
			return {
				users: [],
				total: 0,
				page: Number(this.$route.query.index) || 1,
                listLoading: false,
                list:{
                    'hide-actions':true,
                    headers: [
                        { text: '手机号', value: 'mobileNumber',  sortable: false,  align: 'center' },
                        { text: '姓名', value: 'name',  sortable: false,  align: 'center' },
                        { text: '状态', value: 'status',  sortable: false,   align: 'center', },
                    ],
                    items:[]
                },
                pageCofig:{
                    length:1,
                    circle:true
				},
				filters:''
			}
		},
		mounted() {
			this.getList();
		},
		methods: {	
			//获取用户列表
			async getList() {
				try {
					let params = {index:this.page};
					// 搜索字段有值 且为数字时request字段为mobileNumber,为汉字时为name
					this.filters&&(this.checkRate(this.filters)?(params={index:this.page,mobileNumber:this.filters}):(params={index:this.page,name:this.filters}))
					const { data } = await mbrApi.getMbrList(params, {
						headers: {
							'x-auth-token': common.getCommon()
						}
					})
					this.pageCofig.length = Math.ceil(data.count/12) 
					this.total = data.count;
                    this.list.items = data.records;
				} catch (error) {}
            },
			//进入用户详情
			rowClick(prop) {
				this.$router.push({
					name:'会员详情',
					params: {
						code: prop.item.mobileNumber
					}
				})
			},
			// 重置
			reset(){
				this.filters=''
				this.$router.push({ path: "/mbrList"})
				this.getList();
			},
			// 搜索内容是否为手机号
			checkRate(str) {　　
				str = str.replace(/\s+/g,"");// 去掉查询中的空格
				var re = /^[1-9]+[0-9]*]*$/ ; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
				if (!re.test(str)) {　　　　
					return false;　　
				}
				return true;
			},
		},
	}
</script>
