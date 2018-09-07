import Vue from 'vue'
import Router from 'vue-router'
import {common} from '@/logic'
import store from '@/store'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })


const route =new Router({
  scrollBehavior (to, from, savedPosition) {
      setTimeout(() => {
        if (savedPosition) {
          // console.log(to)
          // console.log(savedPosition)
          // console.log(to.matched.some(m => m.meta.scrollToTop))
            if(to.matched.some(m => m.meta.scrollToTop)){
              scrollTo(0, 0)
              return { x: 0, y: 0 }
            }
            scrollTo(0, savedPosition.y)
            return savedPosition
       
        } else {
              scrollTo(0, 0)
          return { x: 0, y: 0 }
        }
      }, 100)
  },
routes: [
  {
    path: '/',
    component: () => import('@/components/layout/common'),
    redirect: '/vip',
    children: [
      {
        path: '/vip',
        name: 'Vip',
        component: () => import('@/page/menber/VipMenber'),
      },
      {
        path: '/menber',
        name: 'Menber',
        component: () => import('@/page/menber/MenberList.vue'),
      },
      {
        path: '/test1',
        name: 'Test1',
        component: () => import('@/page/main/test'),
      },
      {
        path: '/test2',
        name: 'Test2',
        component: () => import('@/page/main/test'),
      },
      {
        path: '/test3',
        name: 'Test3',
        component: () => import('@/page/main/test'),
      },
    ]
  },
  {
      path: '*',
      redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    meta:{
      scrollToTop:true
    },
    component: () => import('@/page/common/Login'),
  },
 
 


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

route.afterEach(function (to) {


})
export default route
