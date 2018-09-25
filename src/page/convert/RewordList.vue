<template>
  <div class="vip">
    <!-- {{queryParams.start}} -->
    <!-- <v-container fluid> -->
   
      <v-layout row>

        <v-flex xs12>

          <k-table @pageChage='handleCurrentChange'
                   :tableSource='list'
                   :pageCofig='pageCofig'
                   :page.sync='page'>
            <template slot-scope='props'
                      slot='items'>

              <tr @click='gotoRow(props)'>
                <td class="text-xs-center px-0">
                  <img :src="props.item.imagePath"
                       alt="">
                </td>
                <td class="text-xs-center ">{{ props.item.name}}</td>
                <td class="text-xs-center px-0">{{ props.item.price|currency }}</td>
                <td class="text-xs-center px-0">{{ props.item.status|productStatus }}</td>
              </tr>

            </template>

          </k-table>
        </v-flex>
      </v-layout>



    <div class="text-xs-center mt-5">

      <!-- <v-pagination :length="4"
                          v-model="page"
                          circle></v-pagination> -->
    </div>
    <!-- </v-container> -->
  </div>
</template>
<script>
import { productListApi, productDetailApi } from "@/api/api";

import { common } from "@/logic";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  name: "vip",

  computed: {
    max() {
      if (this.queryParams.end) {
        return this.$dateFilter(new Date(this.queryParams.end));
      } else {
        return this.$dateFilter(new Date());
      }
    }
  },
  methods: {
    async getTotal(params, token) {
      const { start, end } = params;
      const query = Object.assign({}, { start: start, end: end });
      const { data } = await prizepoolsTotalApi.query(query, token);
      this.amount = data;
    },
    gotoRow(row) {
    
    },
    gotoItem(row) {
      console.log(row);
    },
    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };

      const { data } = await productListApi.query(params, token);
      this.pageCofig.length = Math.ceil(data.count / 12);
      this.list.items = data.records;

      //   this.items = data;
    }
  },
  data() {
    return {

      amount: 0,
      queryParams: {},
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
            text: "缩略图",
            align: "center",
            sortable: false,
            value: "imagePath"
          },
          { text: "名称", value: "name", sortable: false, align: "center" },
          {
            text: "积分价格",
            value: "price",
            sortable: false,
            align: "center"
          },
          {
            text: "状态",
            value: "status",
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
.btn-layout {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>

