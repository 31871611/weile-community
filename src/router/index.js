// require.ensure 是 Webpack 的特殊语法, 用来设置 code-split point
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import Router from 'vue-router'
import fetch from '../utils/fetch'
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
      // 选择小区
      path: '/selectQuarters',
      name: 'selectQuarters',
      component: resolve => require(['@/views/index/selectQuarters'], resolve)
    }, {
      // 社区
      path: '/community',
      name: 'community',
      component: resolve => require(['@/views/community/community'], resolve)
    }, {
      // 限时抢购
      path: '/sale',
      name: 'sale',
      component: resolve => require(['@/views/list/sale'], resolve)
    }, {
      // 专题列表
      path: '/subject',
      name: 'subject',
      component: resolve => require(['@/views/list/subject'], resolve)
    }, {
      // 领券专题
      path: '/subjectCoupon',
      name: 'subjectCoupon',
      component: resolve => require(['@/views/list/subjectCoupon'], resolve)
    }, {
      // 便利店
      path: '/store',
      name: 'store',
      component: resolve => require(['@/views/store/store'], resolve)
    }, {
      // 购物车
      path: '/shopping',
      name: 'shopping',
      component: resolve => require(['@/views/shopping/shopping'], resolve)
    },{
      // 商品详情页
      path: '/commodity',
      name: 'commodity',
      component: resolve => require(['@/views/commodity/commodity'], resolve)
    },{
      // 结算
      path: '/payorder',
      name: 'payorder',
      component: resolve => require(['@/views/payorder/payorder'], resolve)
    },{
      // 支付结束
      path: '/payResult',
      name: 'payResult',
      component: resolve => require(['@/views/payResult/payResult'], resolve)
    },{
      // 登录
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    },{
      // 用户中心
      path: '/userHome',
      name: 'userHome',
      component: resolve => require(['@/views/userHome/userHome'], resolve),
      meta:{
        requireAuth: true
      }
    },{
      // 我的订单
      path: '/userOrder',
      name: 'userOrder',
      component: resolve => require(['@/views/userOrder/userOrder'], resolve)
    },{
      // 我的订单详情
      path: '/userOrderDetails',
      name: 'userOrderDetails',
      component: resolve => require(['@/views/userOrderDetails/userOrderDetails'], resolve)
    },{
      // 申请退货
      path: '/userApplyBack',
      name: 'userApplyBack',
      component: resolve => require(['@/views/userApplyBack/userApplyBack'], resolve)
    },{
      // 我的地址
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
      // 我的优惠券
      path: '/userCoupon',
      name: 'userCoupon',
      component: resolve => require(['@/views/userCoupon/userCoupon'], resolve)
    },{
      // 优惠券详情
      path: '/couponDetails',
      name: 'couponDetails',
      component: resolve => require(['@/views/userCoupon/couponDetails'], resolve)
    }, {
      path: '*',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  //console.log(to);
  // 是否有游客session
  if(!simplestorage.get('HLXK_SESSION')){
    // 以游客方式登录
    fetch.post('/community/touristLogin').then(function(res) {
      //console.log(res)
      let data = res.data || {};
      if(res.resultCode == 0){
        simplestorage.set('HLXK_SESSION', data.session);
        simplestorage.set('HLXK_KEY', data.key);
        go();
      }
    }).catch(function(error) {
      console.log(error)
    })
  }else{
    go();
  }

  function go(){
    // 是否有小区信息
    if(simplestorage.get('HLXK_DISTRIBUTION') || to.path == '/selectQuarters'){
      // 是否需要登录
      if(to.meta.requireAuth){
        if (simplestorage.get('HLXK_STATUS')) {
          next();
        }else {
          next({
            path: '/login',
            query: {url: to.fullPath}
          })
        }
      }else{
        next()
      }
    }else{
      // 去选择小区
      next({ path: '/selectQuarters',query: { url: to.fullPath }});
    }
  }

})

export default router;
