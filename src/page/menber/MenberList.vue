<template>
  <div class="vip">
    <!-- <v-container fluid> -->
    <v-layout wrap>
      <v-flex xs12
              sm5
              md3>
        <v-text-field v-model='form.name'
                      label="姓名"></v-text-field>
      </v-flex>
      <v-flex xs12
              sm5
              md3
              offset-sm1
              offset-md1
              offset-lg1>
        <v-text-field v-model='form.mobileNumber'
                      label="手机号"></v-text-field>
      </v-flex>
      <v-flex xs12
              sm5
              md3
              offset-sm1
              offset-xs2
              offset-md1
              offset-lg1
              class="btn-layout">
        <v-btn class='text-xs-rihgt'
               primary
               @click='reset'>重置</v-btn>
        <v-btn class='text-xs-rihgt'
               color="info"
               @click='search'>过滤</v-btn>

      </v-flex>
    </v-layout>
    <v-layout row>
 
      <v-flex xs12>

        <k-table :tableSource='list'
                 :page.sync='page'>
          <template slot-scope='props'
                    slot='items'>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
            <!-- <tr>2</tr>
                                   <tr>3</tr>
                                   <tr>4</tr>
                                   <tr>5</tr>
                                   <tr>6</tr> -->
          </template>
          <!-- <template slot-scope='scope'   slot='items'>
                                <tr>{{scope}}</tr>
                           </template> -->
        </k-table>
      </v-flex>
    </v-layout>

    <div class="text-xs-center mt-5">
      {{page}}
      <!-- <v-pagination :length="4"
                          v-model="page"
                          circle></v-pagination> -->
    </div>
    <!-- </v-container> -->
  </div>
</template>
<script>
// import { memberApi } from "@/api";
import { common } from "@/logic";
export default {
  name: "vip",

  methods: {
    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      const { data } = await rechargesApi.query(params, token);
      this.items = data;
    }
  },
  data() {
    return {
      page: 1,
      list: {
        "hide-actions": true,
        headers: [
          {
            text: "Dessert (100g serving)",
            align: "left",
            sortable: false,
            value: "name"
          },
          { text: "Calories", value: "calories" },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" }
        ],
        items: [
          {
            value: false,
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%"
          },
          {
            value: false,
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%"
          },
          {
            value: false,
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%"
          },
          {
            value: false,
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%"
          },
          {
            value: false,
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%"
          },
          {
            value: false,
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%"
          },
          {
            value: false,
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%"
          },
          {
            value: false,
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%"
          },
          {
            value: false,
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%"
          },
          {
            value: false,
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%"
          }
        ]
      },
      page: 0,
      detail: {},
      dialog: false,
      headers: [
        {
          text: "状态",
          align: "center",
          value: "name",
          sortable: false
        },
        { text: "手机号", align: "center", value: "calories", sortable: false },
        { text: "姓名", value: "fat", align: "center", sortable: false },
        { text: "操作", value: "fat", align: "center", sortable: false }
      ],
      items: [],
      form: {
        name: "",
        mobileNumber: ""
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

