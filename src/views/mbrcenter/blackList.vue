<template>
    <v-layout column>
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
			//获取黑名列表
			async getList() {
				try {
					let params = {index:this.page};
					const { data } = await mbrApi.getBlackList(params, {
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
		},
	}
</script>
