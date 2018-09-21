<template>
    <div>
        <v-layout column>
            <v-flex xs12
                    class="mb-3">
                <v-card class="py-3 px-3">
                    <v-layout column>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            下单日期: {{form.placeAt|dateFilter('yyyy-MM-dd hh:mm:ss')}}
                        </v-flex>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            状态: {{form.status|orderStatus}}
                        </v-flex>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            会员姓名: {{form.member.name}}
                        </v-flex>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            手机: {{form.member.mobileNumber}}
                        </v-flex>

                    </v-layout>

                </v-card>
            </v-flex>
            <v-flex xs12
                    class="mb-3">
                <v-card class="py-3 px-3">
                    <v-layout column
                              justify-start>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            收货姓名: {{form.receiverName}}
                        </v-flex>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            收货手机: {{form.receiverMobileNumber}}
                        </v-flex>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            收货地址:         {{form.province}}{{form.city}}{{form.district}}{{form.receiverStreet}}
                        </v-flex>

                    </v-layout>

                </v-card>
            </v-flex>
            <v-flex xs12
                    class="mb-3">
                <v-card class="py-3 px-3">
                    <v-layout column
                              justify-start>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            商品合计: {{form.itemsSubtotal}}
                        </v-flex>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            快递费:{{form.deliveryFee}}
                        </v-flex>
                        <v-flex xs12
                                justify-start
                                class="text-xs-left px-1">
                            总计: {{form.grandTotal}}
                        </v-flex>

                    </v-layout>

                </v-card>
            </v-flex>
            <v-flex xs12
                    class="mb-3"
                    v-for='(item,key) in form.items'
                    :key='key'>
                <v-card class="py-3 px-3">
                    <v-layout row
                              justify-start>
                        <v-flex xs12
                                justify-start
                                class="px-1">
                            <v-card>
                                <v-img :src="item.product.imagePath">
                                </v-img>
                            </v-card>
                            <v-card-title primary-title>
                                <div>
                                    <div class="headline text-xs-left">    {{item.product.name}}</div>
                                    <div class="grey--text text-xs-left">积分价格:    {{item.price}}X 数量          {{item.quantity}}</div>
                                </div>
                            </v-card-title>
                        </v-flex>

                    </v-layout>

                </v-card>
            </v-flex>
        </v-layout>
    </div>

</template>
<script>
import { orderEntityDetailApi } from "@/api/api";
import { common } from "@/logic";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      form: {}
    };
  },
    computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      "getDistrict"
      // ...
    ])
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      var token = {
        headers: {
          "x-auth-token": common.getCommon()
        }
      };
      try {
        const { data } = await orderEntityDetailApi.get(
          { id: this.$route.params.id },
          token
        );
        this.form = data;
        //  var city = this.getDistrict.filter(item=>item.value==this.form.receiverCity)[0].name
        //  var province =  this.getDistrict.filter(item=>item.value==this.form.receiverProvince)[0].name
        //  var district=  this.getDistrict.filter(item=>item.value==this.form.receiverDistrict)[0].name
        var place = this.getDistrict.filter(
          item =>
            item.value == this.form.receiverProvince ||
            item.value == this.form.receiverCity ||
            item.value == this.form.receiverDistrict
        );
        Object.assign(this.form, {
          city: place[1].name,
          province: place[0].name,
          district: place[2].name
        });

        // Object.hasValue()
      } catch (error) {}
    }
  }
};
</script>

