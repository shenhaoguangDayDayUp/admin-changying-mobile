<template>
    <div class="vip">
        <v-layout wrap>

            <v-flex xs5
                    sm5
                    md3>
                <v-menu ref="start"
                        :close-on-content-click="false"
                        v-model="menu"
                        :nudge-right="40"
                        :return-value.sync="queryParams.start"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                    <v-text-field slot="activator"
                                  v-model="queryParams.start"
                                  label="开始时间"
                                  readonly></v-text-field>
                    <v-date-picker :max='startMax'
                                   locale='zh-Hans'
                                   v-model="queryParams.start"
                                   no-title
                                   scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat
                               color="primary"
                               @click="menu = false">取消</v-btn>
                        <v-btn flat
                               color="primary"
                               @click="$refs.start.save(queryParams.start)">确定</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-flex>

            <v-flex xs5
                    offset-xs2
                    sm5
                    md3>
                <v-menu ref="end"
                        :close-on-content-click="false"
                        v-model="menus"
                        :nudge-right="40"
                        :return-value.sync="queryParams.end"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px">
                    <v-text-field slot="activator"
                                  v-model="queryParams.end"
                                  label="结束时间"
                                  readonly></v-text-field>
                    <v-date-picker :min='startMin'
                                   :max='max'
                                   locale='zh-Hans'
                                   v-model="queryParams.end"
                                   no-title
                                   scrollable>
                        <v-spacer></v-spacer>

                        <v-btn flat
                               color="primary"
                               @click="menus = false">取消</v-btn>
                        <v-btn flat
                               color="primary"
                               @click="$refs.end.save(queryParams.end)">确定</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs12
                    md5>
                <v-text-field v-model="queryParams.mobileNumber"
                              label="手机号"></v-text-field>
            </v-flex>

            <v-flex xs12
                    justify-end
                    class="btn-layout">
                <v-btn small
                       round
                       mx-0
                       class='text-xs-right px-0'
                       primary
                       @click='reset'>重置</v-btn>
                <v-btn small
                       class='text-xs-right px-0 mx-0'
                       color="info"
                       round
                       @click='search'>过滤</v-btn>

            </v-flex>
        </v-layout>
        <v-tabs @input='change'
                v-model="active"
                color="transparent"
                dark
                slider-color="#1976d2"
                class="cy-mbr-info">
            <v-tab v-for="n in tab"
                   :key="n"
                   ripple>
                {{n}}
            </v-tab>
            <v-tab-item>
                <v-layout row>
                    <v-flex xs12>

                        <k-table @pageChage='handleCurrentChange'
                                 :tableSource='list'
                                 :pageCofig='pageCofig'
                                 :page.sync='page'>
                            <template slot-scope='props'
                                      slot='items'>
                                <tr @click='gotoRow(props)'>
                                    <td class="px-0">{{ props.item.placeAt|dateFilter( "yyyy-MM-dd hh:mm:ss") }}</td>
                                    <td class="text-xs-center px-0">{{ props.item.status|orderStatus }}</td>
                                    <td @click.stop='gotoItem(props.item )'
                                        class="text-xs-center px-0">{{ props.item.member.name }}</td>
                                    <td style='color:blue' @click.stop='gotoItem(props.item )'
                                        class="text-xs-center">{{ props.item. member.mobileNumber}}</td>

                                    <td class="text-xs-center">{{ props.item.grandTotal|currency }}</td>
                                </tr>

                            </template>

                        </k-table>
                    </v-flex>
                </v-layout>
            </v-tab-item>
            <v-tab-item>
                <k-table @pageChage='handleCurrentChange'
                         :tableSource='list'
                         :pageCofig='pageCofig'
                         :page.sync='page'>
                    <template slot-scope='props'
                              slot='items'>
                        <tr @click='gotoRow(props)'>
                            <td class="px-0">{{ props.item.placeAt|dateFilter( "yyyy-MM-dd hh:mm:ss") }}</td>
                            <td class="text-xs-center px-0">{{ props.item.status|orderStatus }}</td>
                            <td @click.stop='gotoItem(props.item )'
                                class="text-xs-center px-0">{{ props.item.member.name }}</td>
                            <td style='color:blue' @click.stop='gotoItem(props.item )'
                                class="text-xs-center">{{ props.item. member.mobileNumber}}</td>

                            <td class="text-xs-center">{{ props.item.grandTotal|currency }}</td>
                        </tr>

                    </template>

                </k-table>
            </v-tab-item>
            <v-tab-item>
                <k-table @pageChage='handleCurrentChange'
                         :tableSource='list'
                         :pageCofig='pageCofig'
                         :page.sync='page'>
                    <template slot-scope='props'
                              slot='items'>
                        <tr @click='gotoRow(props)'>
                            <td class="px-0">{{ props.item.placeAt|dateFilter( "yyyy-MM-dd hh:mm:ss") }}</td>
                            <td class="text-xs-center px-0">{{ props.item.status|orderStatus }}</td>
                            <td 
                                class="text-xs-center px-0">{{ props.item.member.name }}</td>
                            <td style='color:blue' @click.stop='gotoItem(props.item.member.mobileNumber )'
                                class="text-xs-center">{{ props.item. member.mobileNumber}}</td>

                            <td class="text-xs-center">{{ props.item.grandTotal|currency }}</td>
                        </tr>

                    </template>

                </k-table>
            </v-tab-item>
        </v-tabs>

    </div>
</template>
<script>
import {
  paymentApi,
  paymentTotalApi,
  orderUnpaidApi,
  orderUnreceivedApi,
  orderAllApi
} from "@/api/api";
import { common } from "@/logic";
import { mixin } from "@/mixins/search";
import { game } from "@/mixins/game";
export default {
  mixins: [mixin, game],
  name: "vip",

  methods: {
    async getTotal(params, token) {
      const { start, end } = params;
      const query = Object.assign(
        {},
        { start: start, end: end, application: params.application }
      );
      const { data } = await welfareTotalApi.query(query, token);
      this.amount = data;
    },
    change(val) {
       var params = Object.assign({}, this.tableParams, this.queryParams,{index:1}) 
        this.getList(params)
    },
    gotoRow(row) {
  console.log(row.item.code);
      this.$router.push({
        name: "订单详情",
        params: { id: row.item.code }
      });
    },
    gotoItem(row) {
      this.$router.push({ name: "会员详情", params: { code: row } });
    },

    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      if (params.start) {
        params.start = this.$date(params.start, "start");
      }
      if (params.end) {
        params.end = this.$date(params.end, "end");
      }
     params= Object.rmEmpty(params)
      if (this.active == 0) {
        const { data } = await orderUnpaidApi.query(params, token);
        this.pageCofig.length = Math.ceil(data.count / 12);
        this.list.items = data.records;
      } else if (this.active == 1) {
        const { data } = await orderUnreceivedApi.query(params, token);
        this.pageCofig.length = Math.ceil(data.count / 12);
        this.list.items = data.records;
      } else {
        const { data } = await orderAllApi.query(params, token);
        this.pageCofig.length = Math.ceil(data.count / 12);
        this.list.items = data.records;
      }

      //   this.items = data;
    }
  },
  data() {
    return {
      active: "",
      tab: ["待付款", "待收货", "全部"],
      amount: 0,
      queryParams: {
        start: "",
        end: "",
        mobileNumber: ""
      },
      pageCofig: {
        length: 1,
        circle: true
      },
      menus: false,
      menu: false,
      page: 1,
      list: {
        "hide-actions": true,
        headers: [
          {
            text: "下单日期",
            align: "center",
            sortable: false,
            value: "placeAt"
          },

          {
            text: "状态",
            value: "status",
            sortable: false,
            align: "center"
          },
          { text: "姓名", value: "member", sortable: false, align: "center" },
          { text: "手机号", value: "member", sortable: false, align: "center" },
          {
            text: "总计",
            value: "grandTotal",
            sortable: false,
            align: "center"
          }
        ],
        items: []
      }
    };
  }
};
</script>
 <style lang="scss" scoped>
.rest {
  background: red;
}

input {
  color: transparent !important;
  text-shadow: 0 0 0 #000;
}
</style>

