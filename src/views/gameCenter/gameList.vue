<template>
    <v-layout row>
        <v-flex xs12>
            <k-table @pageChage='handleCurrentChange' :tableSource='list' :pageCofig='pageCofig' :page.sync='page'>
                <template slot-scope='props' slot='items'>
                    <tr @click='rowClick(props)'>
                        <td  class="px-0"> {{ props.item.code}}</td>
                        <td >{{ props.item.name}}</td>
                        <td >{{ props.item.prizepoolPct}}</td>
                        <td >{{ props.item.issuancePct}}</td>
                        <td >{{ props.item.welfarePct}}</td>
                        <td >{{ props.item.status|statusFilter}}</td>
                    </tr>
                </template>
            </k-table>
        </v-flex>
    </v-layout>
</template>
<script>
	import { gameApi } from '@/api/api';
    import {common} from '@/logic';
    import { mixin } from "@/mixins/search";
	export default {
        mixins: [mixin],
		name:'mbrList',
		data() {
			return {
				filters: {
					searchMbr: this.$route.query.name || this.$route.query.mobileNumber || '',
					mobileNumber:'',
					name:''
				},
				users: [],
				total: 0,
				page: Number(this.$route.query.index) || 1,
                listLoading: false,
                list:{
                    'hide-actions':true,
                    headers: [
                        { text: '编号',  sortable: false,  align: 'center' },
                        { text: '名称', sortable: false,  align: 'center' },
                        { text: '返奖率',  sortable: false,   align: 'center', },
                        { text: '发行率',  sortable: false,   align: 'center', },
                        { text: '公益率',  sortable: false,   align: 'center', },
                        { text: '状态',  sortable: false,   align: 'center', },
                    ],
                    items:[]
                },
                pageCofig:{
                    length:1,
                    circle:true
                },
			}
		},
		mounted() {
			this.getList();
		},
		methods: {	
			//获取用户列表
			async getList() {
				try {
					const { data } = await gameApi.gameList({
						index: this.page,
						mobileNumber: this.filters.mobileNumber,
						name: this.filters.name,
					}, {
						headers: {
							'x-auth-token': common.getCommon()
						}
					})
					this.pageCofig.length = Math.ceil(data.count/12) 
					this.total = data.count;
                    this.list.items = data.records
                    console.log('111');
                    console.log(this.list);
				} catch (error) {}
            },
			//进入用户详情
			rowClick(prop) {
				this.$router.push({
					name:'游戏详情',
					params: {
						code: prop.item.code
					}
				})
			},
		},
	}
</script>
