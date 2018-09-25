<template>
    <div>
        <v-app id='app'>
            <v-navigation-drawer app
                                 enable-resize-watcher
                                 v-model='drawer'>
          

                   <v-list style="overflow-y: hidden;height:80%" dense
                        two-line>
                    <div style="overflow:auto;height:100%">
                        <template v-for="item in $router.options.routes">
                       <v-list-tile v-if="item.leaf" :key="item.name" :to="item.children[0].path">
                         <!-- <font-awesome-icon :icon="item.iconCls"></font-awesome-icon> -->
                          <v-list-tile-action> <i :class="item.iconCls"></i> </v-list-tile-action>
                          <v-list-tile-content>{{item.name}}</v-list-tile-content>
                        </v-list-tile>
                          
                       <v-list-group v-else v-model="item.active" v-show="!item.hidden" :key="item.name" >
                          <v-list-tile slot="activator">  
                                  <v-list-tile-action>
                                  <i :class="item.iconCls"></i>
                                  </v-list-tile-action>
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
                                      v-if='!subItem.children&&subItem.menuShow'>
                                       <v-list-tile-action>
                                         <v-icon></v-icon>
                                  </v-list-tile-action>
                                  <v-list-tile-content>
                                      <v-list-tile-title>{{ subItem.name}}{{items.children}}</v-list-tile-title>
                                  </v-list-tile-content>      
                          </v-list-tile>
                          <template v-else>
                              <v-list-group v-if='subItem.menuShow'
                                router ripple
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
                        
                       </template>  
                
                      </div>  
                           <v-list-tile class="logout" @click='dialog=true'>
                         <!-- <font-awesome-icon :icon="item.iconCls"></font-awesome-icon> -->
                          <v-list-tile-action> <i class="fa fa-sign-out-alt"></i> </v-list-tile-action>
                          <v-list-tile-content>登出</v-list-tile-content>
                        </v-list-tile>  
                         
                   
                    
                </v-list>

               

            </v-navigation-drawer>
            <v-toolbar app
                       dark
                       color="primary">
                <v-toolbar-side-icon @click.native.stop='drawer = !drawer'></v-toolbar-side-icon>
                <v-toolbar-title>

                </v-toolbar-title>
              <v-spacer></v-spacer>
                <!-- <span class="mx-3">欢迎您 !{{userName}} </span>  -->
                <!-- <v-menu offset-y>
                    <v-btn icon
                           slot="activator">
                        <v-icon>face</v-icon>
                        <v-icon>account</v-icon>   
                        <v-icon>person</v-icon>  
                   <v-icon>assignment return</v-icon>  

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

                </v-menu> -->
             </v-toolbar> 

            <!-- <v-content> -->
                <v-container fluid>
                   <v-layout row wrap>
                      <v-flex   xs12>
                          <v-breadcrumbs class="px-0" divider="/">
                            <v-breadcrumbs-item @click.native='gotoBread(item)' 
                              v-for="item in breadcrumbs"
                              :key="item.text"
                              :disabled="item.disabled"
                        
                             >
                            {{ item.text }}
                          </v-breadcrumbs-item>
                        </v-breadcrumbs>
                       </v-flex>
                   </v-layout>

                    <router-view></router-view>

            <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline text-xs-center">提示</v-card-title>
        <v-card-text>是否登出确定登出?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed small @click.native="dialog = false">取消</v-btn>
          <v-btn color="info darken-1" small  @click.native="loginOut">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
                </v-container>

            <!-- </v-content> -->
            <!-- <v-footer app></v-footer> -->
        </v-app>
        
    </div>

</template>
<script>
import { common, user } from "@/logic";
import { loginApi,logoutApi } from "@/api/api";
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
    loginOut(){
      this.logoutApi();
    },
   async logoutApi() {
      try {
        const { status } = await loginApi.logout(
          sessionStorage.getItem("TOKEN")
        );
        // this.$message({
        // 	type: 'success',
        // 	message: '登出成功!'
        // });
        sessionStorage.removeItem("TOKEN");
        this.$router.push("/login");
        this.dialog = false;
      } catch (error) {
        this.$$Message.present.show('登出失败')
        this.dialog = false;

      }
    },
    gotoBread(item){
      if(!item.disabled){
        console.log(5555)
        console.log(item);
        
      this.$router.push({name:item.text})
      }
    },
    async exit() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      await loginApi.logout({}, token);
      common.clear();
      this.$router.push({ name: "Login" });
    },
     findActive(name, list,callBack) {
      for (var i = 0; i < list.length; i++) {
          if(name == list[i].name){ // 找到默认 active 改成true
            callBack(list[i])
            break;
          }
          if(list[i].hasOwnProperty('children')){
            this.findActive(name,list[i].children,callBack)
          }
      }
    },
       findParent(parentId, list,callBack,arr) {
      for (var i = 0; i < list.length; i++) {
        // console.log('parentId:---',parentId)
        //  console.log(list[i].id)
          if(parentId == list[i].id){
            arr.push(list[i])
            callBack(arr)
            if(list[i].hasOwnProperty('parentId')){
                this.findParent(list[i].parentId,this.$router.options.routes,callBack,arr)
            }
          }
          if(list[i].hasOwnProperty('children')){
            this.findParent(parentId,list[i].children,callBack,arr)
          }
      }
    },
  },
  watch: {
    $route: {
      handler(val,oldVal) {
        console.log(1111111111111)
        console.log(val)
        console.log(oldVal)
        if(oldVal&&oldVal.name=='会员详情'&&val.name=='会员详情'){}else{ //路由在本页面跳转
          var list =[]
        this.$nextTick(res=>{
           this.findActive(this.$route.name,this.$router.options.routes,(res)=>{
            if(res.leaf){ //总览
              this.breadcrumbs = [{text:res.name,disabled:false}]
            }else{
              console.log('res')
              console.log(res)
              let dad = res.parentId; 
              if(oldVal){ // 会员详情是会员、贵宾、黑名单公用，面包屑需要处理
                if(oldVal.name == "贵宾名单"){dad = res.parentId1 || res.parentId;console.log(dad)}
                else if(oldVal.name == "黑名单"){dad = res.parentId2|| res.parentId}
              }
                this.findParent(dad,this.$router.options.routes,(arr)=>{
               // 面包屑
                this.breadList = [...arr,res];// 合并数组
                this.breadList =  this.breadList.sort(function(item1,item2){
                    if(item1.id>item2.id){
                      return 1
                    }
                  }) 
                console.log(this.breadList)

                this.breadcrumbs = this.breadList.map((res,index)=>{
                    if(this.breadList.length -1 !=index){
                        return {text:res.name,disabled:false}
                    }else{
                        return {text:res.name,disabled:true}
                    }
                   
                }).filter(item=>item.text)
                },list)
            }
                this.$vuetify.goTo('#app', {duration: 300,offset:-100,easing: 'easeInOutCubic'})
   
               

            })

        })
        }
          
        
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      dialog:false,
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false
        },
        {
          text: "Link 1",
          disabled: false
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
<style lang="scss" scoped>
  .logout{
     position: absolute;
    bottom: 30px;
    left: 0px;
    right: 0px;
    text-align: left;
    margin-right: auto;
    cursor: pointer;
  }

</style>

