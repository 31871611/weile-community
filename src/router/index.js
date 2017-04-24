// require.ensure 是 Webpack 的特殊语法, 用来设置 code-split point
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import Router from 'vue-router'
import Home from '@/views/index/index'

Vue.use(Router)

const router = new Router({
  //linkActiveClass:'select',
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/selectQuarters',
      name: 'selectQuarters',
      component: resolve => require(['@/views/index/selectQuarters'], resolve)
    }, {
      path: '/community',
      name: 'community',
      component: resolve => require(['@/views/community/community'], resolve)
    }, {
      path: '/sale',
      name: 'sale',
      component: resolve => require(['@/views/list/sale'], resolve)
    }, {
      path: '/subject',
      name: 'subject',
      component: resolve => require(['@/views/list/subject'], resolve)
    }, {
      path: '/subjectCoupon',
      name: 'subjectCoupon',
      component: resolve => require(['@/views/list/subjectCoupon'], resolve)
    }, {
      path: '/store',
      name: 'store',
      component: resolve => require(['@/views/store/store'], resolve)
    }, {
      path: '/shopping',
      name: 'shopping',
      component: resolve => require(['@/views/shopping/shopping'], resolve)
    },{
      path: '/commodity',
      name: 'commodity',
      component: resolve => require(['@/views/commodity/commodity'], resolve)
    },{
      path: '/payorder',
      name: 'payorder',
      component: resolve => require(['@/views/payorder/payorder'], resolve)
    },{
      path: '/payResult',
      name: 'payResult',
      component: resolve => require(['@/views/payResult/payResult'], resolve)
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    },{
      path: '/userHome',
      name: 'userHome',
      component: resolve => require(['@/views/userHome/userHome'], resolve)
    },{
      path: '/userOrder',
      name: 'userOrder',
      component: resolve => require(['@/views/userOrder/userOrder'], resolve)
    },{
      path: '/userOrderDetails',
      name: 'userOrderDetails',
      component: resolve => require(['@/views/userOrderDetails/userOrderDetails'], resolve)
    },{
      path: '/userApplyBack',
      name: 'userApplyBack',
      component: resolve => require(['@/views/userApplyBack/userApplyBack'], resolve)
    },{
      path: '/userAddress',
      name: 'userAddress',
      component: resolve => require(['@/views/userAddress/userAddress'], resolve),
      children:[
        {
          path: 'add',
          component: resolve => require(['@/views/userAddress/addAddress'], resolve)
        },
        {
          path: 'modify',
          component: resolve => require(['@/views/userAddress/addAddress'], resolve)
        }
      ]
    },{
      path: '/userCoupon',
      name: 'userCoupon',
      component: resolve => require(['@/views/userCoupon/userCoupon'], resolve)
    },{
      path: '/couponDetails',
      name: 'couponDetails',
      component: resolve => require(['@/views/userCoupon/couponDetails'], resolve)
    }, {
      path: '*',
      component: Home
    }
  ]
})

/**

  最少要有游客的session
  还需要小区信息

  是否登录

**/
router.beforeEach((to, from, next) => {
  //console.log(to);
  console.log(simplestorage.get('HLXK_SESSION'));
  console.log(localStorage.getItem('simpleStorage'));
  if(localStorage.getItem('HLXK_DISTRIBUTION') || to.path == '/selectQuarters'){





    //if(to.meta.requireAuth){
    //
    //}else{
    //  next()
    //}
    next();
  }else{
    // 去选择小区
    console.log('去选择小区');
    next({ path: '/selectQuarters' });
  }
})

export default router;
