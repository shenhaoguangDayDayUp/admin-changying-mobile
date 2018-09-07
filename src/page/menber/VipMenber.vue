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
                <v-data-table :headers="headers"
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

                                <!-- <v-icon color="error" dark>remove</v-icon> -->
                            </v-btn>
                        </td>

                    </template>
                </v-data-table>
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
      const { data } = await memberApi.vipMember({ id: 0 }, token);
      this.items = data;
    }
  },
  data() {
    return {
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
