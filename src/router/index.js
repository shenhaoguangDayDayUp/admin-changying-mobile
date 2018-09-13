import Vue from 'vue'
import Router from 'vue-router'
import {common} from '@/logic'
import store from '@/store'
import Home from '../views/Home.vue'
Vue.use(Router)
const router =new Router({
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
        iconCls: 'fas fa-tachometer-alt',
        leaf:true,
        children:[
            {menuShow:false,name:'总览',path: '/overView',component: ()=>import('../views/overview/overView.vue')}
        ]
    },
    {
        path: '/',
        active:false,
        component: Home,
        name: '数据分析',
        id:7, 
        iconCls: 'fas fa-chart-line',
        children: [
            {active:false,  path: '/rechargeTotalNumberChart', menuShow:true,component: ()=>import('../views/analysis/rechargeTotalNumberChart.vue'), name: '充值情況',parentId:7,id:71 },
            {active:false,  path: '/mbrRechargeRanking', menuShow:true,component: ()=>import('../views/analysis/rechargeRanking.vue'), name: '充值排行榜',parentId:7 ,id:76},
            {active:false, path: '/betTotalNumberChart',menuShow:true, component: ()=>import('../views/analysis/betTotalNumberChart.vue'), name: '下注情况',parentId:7,id:72 },
            {active:false,  path: '/betRanking', menuShow:true,component: ()=>import('../views/analysis/betRanking.vue'), name: '下注排行榜',parentId:7 ,id:74},
            {active:false,  path: '/prizeTotalNumberChart', menuShow:true,component: ()=>import('../views/analysis/prizeTotalNumberChart.vue'), name: '奖金情况',parentId:7 ,id:73},
            {active:false,  path: '/prizeRanking', menuShow:true,component: ()=>import('../views/analysis/prizeRanking.vue'), name: '奖金排行榜',parentId:7 ,id:75},        
            {active:false,  path: '/exchangeTotalNumberChart', menuShow:true,component: ()=>import('../views/analysis/exchangeNumberChart.vue'), name: '兑换情况',parentId:7 ,id:76},     
            {active:false,  path: '/exchangeRanking', menuShow:true,component: ()=>import('../views/analysis/exchangeRanking.vue'), name: '兑换排行榜',parentId:7 ,id:77},        
        ]
    },
    {
        path: '/',
        active:false,
        component: Home,
        name: '会员中心',
        id:1, 
        iconCls: 'fas fa-user',//图标样式class
        redirect: '/mbrList', 
        children: [
            { active:false, path: '/mbrList',menuShow:true, component: ()=>import('../views/mbrcenter/mbrList.vue'), name: '会员名单',parentId:1,id:11 },
            {active:false,  path: '/mbrDetail/:code', menuShow:false,component: ()=>import('../views/mbrcenter/mbrDetail.vue'), name: '会员详情',parentId:11 ,id:16,parentId1:10,parentId2:13},// 会员、贵宾、黑名单共用一个会员详情
        ]
    },
    {
        path: '/',
        component: Home,
        active:false, 
        name: '游戏中心',
        redirect:'/gameList',
        id:2,
        iconCls: 'fa fa-gamepad',
        children: [
            {active:false, path: '/gameList',menuShow:true, component: ()=>import('../views/gameCenter/gameList'), name: '游戏清单',parentId:2,id:20},
            {active:false,  path: '/gameDetail/:code',menuShow:false, component: ()=>import('../views/gameCenter/gameDetail'), name: '游戏详情',parentId:20,id:21},
        ]
    },
    {
      path: '/',
      component: Home,
      active:false, 
      id:3,
      name: '资金中心',
      redirect:'/topup',
      iconCls: 'fa fa-credit-card',
      children:[
        {path:'/topup',menuShow:true,component: ()=>import('../page/founding/TopUp.vue'), name:'充值',parentId:3,id:30,active:false},
        {path:'/present',menuShow:true,component: ()=>import('../page/founding/Present.vue'), name:'赠送',parentId:3,id:31,active:false},
        {path:'/expense',menuShow:true,component: ()=>import('../page/founding/Expanse'), name:'下注',parentId:3,id:32,active:false},
        {path:'/reword',menuShow:true,component: ()=>import('../page/founding/Reword'), name:'奖金',parentId:3,id:33,active:false},
        {path:'/convert',menuShow:true,component: ()=>import('../page/founding/Convert'), name:'兑换',parentId:3,id:34,active:false},
        {path:'/bonusPool',menuShow:true,component: ()=>import('../page/founding/BounsPool'), name:'奖金池',parentId:3,id:35,active:false},
        {path:'/bonusDetail/:id',menuShow:false,component: ()=>import('../page/founding/BounsPoolDetail'), name:'奖金池详情',parentId:35,id:36,active:false},
        {path:'/issuse',menuShow:true,component: ()=>import('../page/founding/IssusCost'), name:'发行费',parentId:3,id:37,active:false},
        {path:'/walfare',menuShow:true,component: ()=>import('../page/founding/Walfare'), name:'公益金',parentId:3,id:38,active:false},        
      ]

  },
  {
    path: '/',
    component: Home,
    active:false, 
    name: '测试',
    id:4,
    iconCls: 'fa fa-gamepad',
    children: [
        { active:false, path: '/font',menuShow:true, component: ()=>import('../page/menber/MenberList.vue'), name: '测试清单',parentId:4,id:40},
       
    ]
},
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
  ]
})

router.beforeEach(function (to, from, next) {
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
export default router
