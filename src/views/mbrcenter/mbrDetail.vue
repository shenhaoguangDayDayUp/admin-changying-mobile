<template>
    <section>
        <v-layout row align-center>
            <v-flex xs6 sm5 md3>
              <v-subheader v-for="(v,i) in subheaders" :key="i">
                {{v}}
              </v-subheader>
            </v-flex>
            <v-flex xs6 sm5 md3 class="text-xs-left">
              aaaaa
            </v-flex>
          </v-layout>
    </section>
</template>
<script>
    import {mbrApi,integralApi} from '@/api/api';
    import {common} from '@/logic';
    // import ktable from './tab/ktable.vue';
    export default {
        data() {
            return {
                activeName: 'userInfo',
                activeName2: this.$route.query.active||'chargeDetail',
                userInfoForm: {},
                value: '',
                addressTableData: [], // 地址列表
                vipSwitch: false,
                blackListSwitch: false,
                switchWidth: Number(40),
                subheaders:['手机号','姓名','昵称','身份证','等级','贵宾','黑名单','状态']
            };
        },
        async mounted() {
            await this.userInfo();
        },
        methods: {
            // 用户信息
            async userInfo() {
                try {
                    const {
                        data
                    } = await mbrApi.userInfo({
                        id: this.$route.query.code,
                    }, {
                        headers: {
                            'x-auth-token': common.getCommon()
                        }
                    })
                    this.userInfoForm = data;
                    // this.value = this.$statusFilter(this.userInfoForm.status);
                } catch (error) {}
            },
        },
        components:{
            // ktable
        }
    };
</script>