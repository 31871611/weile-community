// require.ensure 是 Webpack 的特殊语法, 用来设置 code-split point
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import Router from 'vue-router'
import fetch from '../utils/fetch'
import Home from '@/views/index/index'
import userOrder from '@/views/userOrder/userOrder'                           // 我的订单
import userOrderDetails from '@/views/userOrderDetails/userOrderDetails'     // 我的订单详情
import userApplyBack from '@/views/userOrderDetails/userApplyBack'          // 申请退货
import userAddress from '@/views/userAddress/userAddress'               // 我的地址
import userAddressAdd from '@/views/userAddress/addAddress'             // 添加、修改地址
import userCoupon from '@/views/userCoupon/userCoupon'                  // 我的优惠券
import couponDetails from '@/views/userCoupon/couponDetails'            // 优惠券详情
import invalidCoupon from '@/views/userCoupon/invalidCoupon'            // 失效优惠券

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
      // 搜索
      path: '/search',
      name: 'search',
      component: resolve => require(['@/views/search/search'], resolve)
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
      component: resolve => require(['@/views/payorder/payorder'], resolve),
      meta:{
        requireAuth: true
      },
      children:[
        {
          // 我的地址
          path: 'address',
          component: userAddress,
          children:[
            {
              path: 'add',
              component: userAddressAdd
            }
          ]
        }
      ]
    },{
      // 支付结束
      path: '/payResult',
      name: 'payResult',
      component: resolve => require(['@/views/payResult/payResult'], resolve),
      meta:{
        requireAuth: true
      }
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
      },
      children:[
        {
          // 我的订单
          path: '/userOrder',
          name: 'userOrder',
          component: userOrder,
          meta:{
            requireAuth: true
          }
        },
        {
          // 我的订单详情
          path: '/userOrderDetails',
          name: 'userOrderDetails',
          component: userOrderDetails,
          meta:{
            requireAuth: true
          },
          children:[
            {
              // 申请退货
              path: '/userApplyBack',
              name: 'userApplyBack',
              component: userApplyBack,
              meta:{
                requireAuth: true
              }
            }
          ]
        },
        {
          // 我的优惠券
          path: '/userCoupon',
          name: 'userCoupon',
          component: userCoupon,
          meta:{
            requireAuth: true
          },
          children:[
            {
              // 优惠券详情
              path: 'details',
              component: couponDetails
            },{
              // 失效优惠券
              path: 'invalid',
              component: invalidCoupon
            }
          ]
        },
        {
          // 我的地址
          path: '/userAddress',
          name: 'userAddress',
          component: userAddress,
          meta:{
            requireAuth: true
          },
          children:[
            {
              path: 'add',
              component: userAddressAdd
            },
            {
              path: 'modify',
              component: userAddressAdd
            }
          ]
        }
      ]
    }, {
      path: '*',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  //console.log(to);
  // 微信中 && 不存在openid
  if(/MicroMessenger/i.test(navigator.userAgent) && !simplestorage.get('HLXK_OPENID')){
    /*
        是否是跳转回来的，通过?userInfo={}进行识别？
        ?userInfo={}     对象 而且 要openid字段
        ?userInfo=111    普通字符
    */
    // 回来还是在微信、没有openid（还没保存）
    if(to.query.userInfo && !simplestorage.get('HLXK_OPENID')){
        let wxUserInfo = JSON.parse(to.query.userInfo);
        if(typeof wxUserInfo == "object" && wxUserInfo.openid){
          // 保存openid
          simplestorage.set('HLXK_OPENID', wxUserInfo.openid);
        }
    }else{
      // 跳转去获取openid
      location.href = "http://zzh.yidinghuo.net/api/pub/wechatAuth?redirect_uri="+ encodeURIComponent(location.href) +"&scope=snsapi_base&appId=wx7953a1343c2f2082";
    }
  }

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
