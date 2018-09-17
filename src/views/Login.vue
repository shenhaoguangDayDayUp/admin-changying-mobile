
<template>
    <v-layout row
              justify-center>
        <v-dialog v-model="dialog"
                  persistent
                  max-width="350px" class="login">

            <v-card>
                <v-card-title>
                    <v-container grid-list-md
                                 text-xs-center>
                        <v-layout row
                                  wrap>
                            <v-flex xs12>
                                <span class="headline">登录</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-form v-model="valid"
                                        ref="form"
                                        lazy-validation>
                                    <v-text-field :rules="nameRules"
                                                  v-model="form.mobileNumber"
                                                  label="帐号"
                                                  counter="11"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                                                  required></v-text-field>
                                    <v-text-field :rules="passwordRules"
                                                  v-model="form.password"
                                                  label="密码"
                                                  type="password"
                                                  required></v-text-field>
                                </v-form>
                            </v-flex>
                            <!-- <v-flex xs12>
                                <v-text-field :rules="passwordRules"
                                              v-model="form.password"
                                              label="密码"
                                              type="password"
                                              required></v-text-field>
                            </v-flex> -->

                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <!-- <v-spacer></v-spacer> -->
                    <!-- <v-btn @click="clear"
                           color="blue darken-1"
                           dark
                           slot="activator">关闭</v-btn> -->
                   <v-btn block    @click="submit"     color="blue darken-1" dark>登录</v-btn>
                    <!-- <v-btn @click="submit">保存</v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

    


<style>
body {
  /* background: #666 !important; */
}
</style>

<script>
import { loginApi } from "@/api/api";
import { common,user } from "@/logic";
import sha1 from "js-sha1";
export default {
  data() {
    return {
      nameRules: [
        v => !!v || "帐号不能为空",
        v => v.length <= 11 || "帐号必须在11个字符以内"
      ],
      passwordRules: [
        v => !!v || "密码不能为空",
        v => v.length <= 10 || "密码必须在10个字符以内"
      ],
      form: {
        mobileNumber: "",
        password: ""
      },
      valid: false,
      dialog: true,
      model: {
        username: "admin",
        password: "123456"
      },
      fields: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" }
      },
      show: true
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        var form = Object.assign({}, this.form, {
          password: sha1(this.form.password)
        });
        try {
          const { headers, data } = await loginApi.login(form);
          common.setCommon(headers["x-auth-token"]);
          user.setLoginUser(data);
          this.$router.push({path:'/'})
        } catch (error) {}
      }
    },
    clear() {
      console.log(this.$refs.form);
      this.$refs.form.reset();
    }
  },
};
</script>
<style lang="scss" scoped>
.login{
  .container{
    padding:0!important;
  }
  
}
</style>
<style>
.login .v-dialog{
    margin-top: -60px!important;
  }
</style>


