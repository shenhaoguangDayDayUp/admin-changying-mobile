<template>
    <div class="vip" >
        <!-- {{queryParams.start}} -->
        <!-- <v-container fluid> -->
        <v-layout wrap>
            <v-flex xs12
                    sm5
                    md3>
      <v-menu
        ref="start"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="queryParams.start"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="queryParams.start"
          label="开始时间"
     
          readonly
        ></v-text-field>
        <v-date-picker  locale='zh-Hans' v-model="queryParams.start" no-title scrollable >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">取消</v-btn>
          <v-btn flat color="primary" @click="$refs.start.save(queryParams.start)">确定</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>

            </v-flex>

              <v-flex xs12
                    sm5
                    md3>
      <v-menu
        ref="end"
        :close-on-content-click="false"
        v-model="menus"
        :nudge-right="40"
        :return-value.sync="queryParams.end"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="queryParams.end"
          label="结束时间"
          readonly
        ></v-text-field>
        <v-date-picker   locale='zh-Hans' v-model="queryParams.end" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menus = false">取消</v-btn>
          <v-btn flat color="primary" @click="$refs.end.save(queryParams.end)">确定</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>



        
            <v-flex xs12
                    sm5
                    md3
                    offset-sm1
                    offset-xs2
                    offset-md1
                    offset-lg1 class="btn-layout" >
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
                    <k-table @pageChage='handleCurrentChange' :tableSource='list' :page.sync='page'>
                      <template slot-scope='props'   slot='items'>
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
          {{page}}
            <!-- <v-pagination :length="4"
                          v-model="page"
                          circle></v-pagination> -->
        </div>
        <!-- </v-container> -->
    </div>
</template>
<script>
// import { memberApi } from "@/api/api";
import { common } from "@/logic";
import { mixin } from "@/mixins/search";
export default {
  mixins: [mixin],
  name: "vip",
  mounted() {
    this.getList();
      this.$vuetify.lang.current = 'zhHans'
  
  },
  computed: {
    max(){
        if(this.queryParams.end){
          return  this.$dateFilter(new Date(this.queryParams.end)) 
        }else{
           return this.$dateFilter(new Date()) 
        }
       
    },
 
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
    //  await  memberApi.entity({id:this.form.mobileNumber},token)
    },
    async certain() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      // await memberApi.vipRemove({ id: this.detail.mobileNumber }, token);
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
      // const { data } = await memberApi.memberList({ id: 0 }, token);
      this.items = data;
    }
  },
  data() {

    return {
      queryParams:{
          start:'',
          end:''
      },
      menus:false,
      menu:false,
      date:'2018-03-02',
      page:1,
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
  .btn-layout{
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center
  }
</style>

