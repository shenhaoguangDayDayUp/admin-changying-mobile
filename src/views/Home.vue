<template>
    <div>
        <v-app>
            <v-navigation-drawer app
                                 enable-resize-watcher
                                 v-model='drawer'>
                <v-list dense
                        two-line>
                    <v-list-group 
                                  v-model="item.active"
                                  v-for="item in $router.options.routes"
                                  v-show="!item.hidden"
                                  :key="item.name"
                                  no-action>
                        <v-list-tile slot="activator">   
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <template v-for="subItem in item.children">
                                <v-list-tile 
                                     :key="subItem.name"
                                     :to='subItem.path'
                                     router
                                     ripple
                                     v-if='!subItem.children'>
                  
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ subItem.name}}{{items.children}}</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon></v-icon>
                                </v-list-tile-action>       
                        </v-list-tile>
                         <template v-else>
                            <v-list-group  router ripple
                                          sub-group>
                                <v-list-tile slot="activator">
                                    <v-list-tile-action>
                                        <v-icon>border_color</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{subItem.name}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <!-- <v-list-tile class="px-5" v-for="subMenu in subItem.children"
                                             :key="subMenu.title"
                                             :to='subMenu.href'
                                             router
                                             ripple>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ subMenu.title}}</v-list-tile-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-icon>{{ subMenu.action }}</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile> -->
                            </v-list-group>
                        </template>
                     </template>
                    
                       

                    </v-list-group>
                </v-list>

            </v-navigation-drawer>
            <v-toolbar app
                       dark
                       color="primary">
                <v-toolbar-side-icon @click.native.stop='drawer = !drawer'></v-toolbar-side-icon>
                <v-toolbar-title>

                </v-toolbar-title>
                <v-spacer></v-spacer>
                <span class="mx-3">欢迎您 !{{userName}} </span>
                <v-menu offset-y>
                    <v-btn icon
                           slot="activator">
                        <v-icon>face</v-icon>
                        <!-- <v-icon>account</v-icon>   -->
                        <!-- <v-icon>person</v-icon>   -->
                        <!-- <v-icon>assignment return</v-icon>   -->

                    </v-btn>
                    <v-list>
                        <v-list-tile @click='exit'>
                            <v-list-tile-title>登出</v-list-tile-title>
                        </v-list-tile>
                        <v-divider dark
                                   :key="1"></v-divider>
                        <v-list-tile>
                            <v-list-tile-title>修改密码</v-list-tile-title>
                        </v-list-tile>
                    </v-list>

                </v-menu>
            </v-toolbar>

            <v-content>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-content>
            <!-- <v-footer app></v-footer> -->
        </v-app>
    </div>

</template>
<script>
import { common, user } from "@/logic";
import { loginApi } from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    userName() {
      return user.getLoginUser().name;
    },
    ...mapGetters(["routes"])
  },
  methods: {
    async exit() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      await loginApi.logout({}, token);
      common.clear();
      this.$router.push({ name: "Login" });
    }
  },
  watch: {
    $route: {
      handler(val) {
        //  console.log(val)
        // if(val.path){
        //     this.
        // }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: true
        },
        {
          text: "Link 1",
          disabled: true
        },
        {
          text: "Link 2",
          disabled: true
        }
      ],
      drawer: false,
      items: [
        {
          action: "local_activity",
          title: "会员管理",
          //   active: true,
          items: [{ title: "贵宾名单", href: "/vip" },
          { title: "会员名单", href: "/menber" }]
        },
        {
          action: "restaurant",
          title: "Dining",
          active: true,
          items: [
            {
              title: "Breakfast & brunch",
              children: [
                {
                //   action: "restaurant",
                  title: "测试",
                  active: true,
                  href: "/test1"
                },
                {
                //   action: "restaurant",
                  title: "测试2",
                  active: true,
                  href: "/test2"
                }
              ]
            },
            { title: "New American", href: "/test2" },
            { title: "Sushi", href: "/test3" }
          ]
        },
        {
          action: "school",
          title: "Education",
          items: [{ title: "List Item" }]
        },
      ]
    };
  }
};
</script>
