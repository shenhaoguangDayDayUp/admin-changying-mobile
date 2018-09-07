import Vue from 'vue'
import Router from 'vue-router'
import {common} from '@/logic'
import store from '@/store'
import Home from '../views/Home.vue'
Vue.use(Router)
const route =new Router({
  routes: [
      {
        path: '/login',
        component: ()=>import('../views/Login.vue'),
        name: 'Login',
        id:-1,
        hidden: true
    },
    {
        path: '/404',
        component: ()=>import('../views/404.vue'),
        name: '',
        hidden: true,
        id:-1
    },
    {
        path: '/',
        component: Home,
        active:false, 
        name: '总览',
        id:0,
        redirect:'/overView',
        iconCls: ['fa','tachometer-alt'],
        leaf:true,
        show:false,
        path: '/overView',
        component: ()=>import('../views/charts/overView.vue'),
    },
    {
        path: '/',
        active:false,
        component: Home,
        name: '数据分析',
        id:7, 
        iconCls: ['fas','chart-line'],
    },
    {
        path: '/',
        active:false,
        component: Home,
        name: '会员中心',
        id:1, 
        iconCls: ['fas','user'],//图标样式class
        // redirect: '/vipList', 
        children: [
            { active:false, path: '/mbrList',menuShow:true, component: ()=>import('../views/mbrcenter/mbrList.vue'), name: '会员名单',parentId:1,id:11 },
            {active:false,  path: '/mbrDetail', menuShow:false,component: ()=>import('../views/mbrcenter/mbrDetail.vue'), name: '会员详情',parentId:11 ,id:16,parentId1:10,parentId2:13},// 会员、贵宾、黑名单共用一个会员详情
        ]
    },
    {
        path: '/',
        component: Home,
        active:false, 
        name: '游戏中心',
        id:2,
        iconCls: ['fa' ,'gamepad'],
        children: [
            { active:false, path: '/gameList',menuShow:true, component: ()=>import('../views/gameCenter/gameList.vue'), name: '游戏清单',parentId:2,id:20},
            {active:false,  path: '/gameDetail',menuShow:false, component: ()=>import('../views/gameCenter/gameDetail.vue'), name: '游戏详情',parentId:20,id:21},
        ]
    },
    {
      path: '/',
      component: Home,
      active:false, 
      id:3,
      name: '资金中心',
      iconCls: ['fa' ,'credit-card'],
  },
  {
    path: '/',
    component: Home,
    active:false, 
    name: '测试',
    id:4,
    iconCls: ['fa' ,'gamepad'],
    children: [
        { active:false, path: '/font',menuShow:true, component: ()=>import('../page/menber/MenberList.vue'), name: '游戏清单',parentId:2,id:20},
       
    ]
},
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
  ]
})

route.beforeEach(function (to, from, next) {
 store.dispatch('toggleRoutes', to)
  if(to.name == 'Login'){
    next()
  }else{
    if(common.getCommon()){
      next()
    }else{
      next({
        path: '/login'
    })
    }
  }
})
export default route
