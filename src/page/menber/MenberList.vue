<template>
    <div class="vip" >
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
                    offset-lg1>
                <v-btn class='text-xs-rihgt'
                       primary @click='reset'>重置</v-btn>
                <v-btn class='text-xs-rihgt'
                       color="info"
                       @click='search'>搜索</v-btn>

            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <!-- <v-data-table :headers="headers"
                              :items="items"
                              hide-actions>
                    <template slot="items"
                              slot-scope="props">
                        <td>{{ props.item.status }}</td>
                        <td class="text-xs-center">
                            <v-btn flat
                                   small
                                   color="primary">{{ props.item.mobileNumber }}</v-btn>
                        </td>
                        <td class="text-xs-center">{{ props.item.name }}</td>
                        <td class="text-xs-center">
                            <v-btn @click='gotoRemove(props.item)'
                                   fab
                                   dark
                                   small
                                   color="error">
                                删除

                            </v-btn>
                        </td>

                    </template>
                </v-data-table> -->
                    <k-table :tableSource='list'>
                      <template  slot-scope="data">
                          1{{data}}1
                        </template>
                    </k-table>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog"
                  max-width="290">
            <v-card>
                <v-card-title class="headline">是否移贵宾?</v-card-title>
                <v-card-text class="text-xs-left">手机:{{detail.mobileNumber}}</v-card-text>
                <v-card-text class="text-xs-left">姓名:{{detail.name}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1"
                           flat="flat"
                           @click.native="dialog = false">取消</v-btn>
                    <v-btn color="green darken-1"
                           flat="flat"
                           @click='certain'>确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="text-xs-center mt-5">
            <v-pagination :length="4"
                          v-model="page"
                          circle></v-pagination>
        </div>
        <!-- </v-container> -->
    </div>
</template>
<script>
import { memberApi } from "@/api";
import { common } from "@/logic";
export default {
  name: "vip",
  mounted() {
    this.getList();
  },
  methods: {
      reset(){
        this.form.name = ''
         this.form.mobileNumber = ''
      },
    async search() {
     var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      }; 
     await  memberApi.entity({id:this.form.mobileNumber},token)
    },
    async certain() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      await memberApi.vipRemove({ id: this.detail.mobileNumber }, token);
      this.dialog = false;
      this.getList();
    },
    gotoRemove(data) {
      this.detail = data;
      this.dialog = true;
    },
    async getList() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      const { data } = await memberApi.memberList({ id: 0 }, token);
      this.items = data;
    }
  },
  data() {

    return {
      list:{
          'hide-actions':true,
          headers: [
             {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
  
      ],
         items:[
         {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    },
      page: 0,
      detail: {
        
      },
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
  .rest{
    background: red;
  }
</style>

