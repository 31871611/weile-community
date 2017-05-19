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
      component: Home,
      meta:{
        pageTitle: '首页'
      }
    }, {
      // 选择小区
      path: '/selectQuarters',
      name: 'selectQuarters',
      component: resolve => require(['@/views/index/selectQuarters'], resolve),
      meta:{
        pageTitle: '选择小区'
      }
    }, {
      // 社区
      path: '/community',
      name: 'community',
      component: resolve => require(['@/views/community/community'], resolve),
      meta:{
        pageTitle: '社区'
      }
    }, {
      // 限时抢购
      path: '/sale',
      name: 'sale',
      component: resolve => require(['@/views/list/sale'], resolve),
      meta:{
        pageTitle: '限时抢购'
      }
    }, {
      // 专题列表
      path: '/subject',
      name: 'subject',
      component: resolve => require(['@/views/list/subject'], resolve),
      meta:{
        pageTitle: '专题列表'
      }
    }, {
      // 领券专题
      path: '/subjectCoupon',
      name: 'subjectCoupon',
      component: resolve => require(['@/views/list/subjectCoupon'], resolve),
      meta:{
        pageTitle: '领券专题'
      }
    }, {
      // 搜索
      path: '/search',
      name: 'search',
      component: resolve => require(['@/views/search/search'], resolve),
      meta:{
        pageTitle: '搜索'
      }
    }, {
      // 便利店
      path: '/store',
      name: 'store',
      component: resolve => require(['@/views/store/store'], resolve),
      meta:{
        pageTitle: '便利店'
      }
    }, {
      // 购物车
      path: '/shopping',
      name: 'shopping',
      component: resolve => require(['@/views/shopping/shopping'], resolve),
      meta:{
        pageTitle: '购物车'
      }
    },{
      // 商品详情页
      path: '/commodity',
      name: 'commodity',
      component: resolve => require(['@/views/commodity/commodity'], resolve),
      meta:{
        pageTitle: '商品详情页'
      }
    },{
      // 结算
      path: '/payorder',
      name: 'payorder',
      component: resolve => require(['@/views/payorder/payorder'], resolve),
      meta:{
        requireAuth: true,
        pageTitle: '商品详情页'
      },
      children:[
        {
          // 我的地址
          path: 'address',
          component: userAddress,
          meta:{
            pageTitle: '选择地址'
          },
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
      component: resolve => require(['@/views/login/login'], resolve),
      meta:{
        pageTitle: '登录'
      }
    },{
      // 用户中心
      path: '/userHome',
      name: 'userHome',
      component: resolve => require(['@/views/userHome/userHome'], resolve),
      meta:{
        requireAuth: true,
        pageTitle: '用户中心'
      },
      children:[
        {
          // 我的订单
          path: '/userOrder',
          name: 'userOrder',
          component: userOrder,
          meta:{
            requireAuth: true,
            pageTitle: '我的订单'
          }
        },
        {
          // 我的订单详情
          path: '/userOrderDetails',
          name: 'userOrderDetails',
          component: userOrderDetails,
          meta:{
            requireAuth: true,
            pageTitle: '订单详情'
          },
          children:[
            {
              // 申请退货
              path: '/userApplyBack',
              name: 'userApplyBack',
              component: userApplyBack,
              meta:{
                requireAuth: true,
                pageTitle: '申请退货'
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
            requireAuth: true,
            pageTitle: '我的优惠券'
          },
          children:[
            {
              // 优惠券详情
              path: 'details',
              component: couponDetails,
              meta:{
                pageTitle: '优惠券详情'
              }
            },{
              // 失效优惠券
              path: 'invalid',
              component: invalidCoupon,
              meta:{
                pageTitle: '失效优惠券'
              }
            }
          ]
        },
        {
          // 我的地址
          path: '/userAddress',
          name: 'userAddress',
          component: userAddress,
          meta:{
            requireAuth: true,
            pageTitle: '我的地址'
          },
          children:[
            {
              path: 'add',
              component: userAddressAdd,
              meta:{
                requireAuth: true,
                pageTitle: '添加地址'
              }
            },
            {
              path: 'modify',
              component: userAddressAdd,
              meta:{
                requireAuth: true,
                pageTitle: '修改地址'
              }
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


// 兼容微信设置页面的title
let setDocumentTitle = function (title) {
  document.title = title;
  let ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

router.beforeEach((to, from, next) => {
  //console.log(to);

/*******************************************************************************************************/

  /*
    http://172.16.12.177:9999/#/?projectId=111
    不同的公众号进入显示的小区会不同，是根据projectId来查找不同的小区？
    需要保存、与前一次进行对比
    console.log(to.query.projectId)
    projectId 不能随便使用了...
 */

  let projectId = to.query.projectId;
  if(projectId){
    // 对比.不相等.说明是从不同的公众号进入
    if(simplestorage.get('projectId') != projectId){
      // 保存
      simplestorage.set('projectId', projectId)
      // 不相等要清空小区信息重新选择小区、清空登录状态，还有吗？
      simplestorage.deleteKey('HLXK_DISTRIBUTION')
      // 清空登录状态
      simplestorage.deleteKey('HLXK_STATUS')
      // 清空openid
      simplestorage.deleteKey('HLXK_OPENID')
    }
  }

/*******************************************************************************************************/

  // 修改title
  typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)

/*******************************************************************************************************/

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
          // 保存assess_token失效时间7200秒.2个小时就失效？
        }
    }else{
      // 跳转去获取openid
      if(process.env.NODE_ENV == "development"){
        location.href = "http://zzh.yidinghuo.net/api/pub/wechatAuth?redirect_uri="+ encodeURIComponent(location.href) +"&scope=snsapi_base&appId=wx7953a1343c2f2082";
      }else{
        location.href = "http://auth.yidinghuo.net/api/pub/wechatAuth?redirect_uri="+ encodeURIComponent(location.href) +"&scope=snsapi_base&appId=" + simplestorage.get('projectId');
      }
    }
  }

/*******************************************************************************************************/

  // 是否有游客session.过期时间是多少？不管游客过期了，没登录的，每次都去获取游客数据
  //if(!simplestorage.get('HLXK_SESSION')){
  if (!simplestorage.get('HLXK_STATUS')){
    // 以游客方式登录
    fetch.post('/community/touristLogin', {
      "projectId":simplestorage.get('projectId')
    }).then(function (res) {
      //console.log(res)
      let data = res.data || {};
      if (res.resultCode == 0) {
        simplestorage.set('HLXK_SESSION', data.session);
        simplestorage.set('HLXK_KEY', data.key);
        go();
      } else {
        alert(res.msg)
      }
    }).catch(function (error) {
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
        // 相关时间信息.是否时间过期，重新登录？当前时间 - 登录时间 > 1个月
        if(simplestorage.get('HLXK_LOGIN_TIME')){
          // 当前时间
          let now = new Date().getTime();
          // 登录时间
          let loginTime = simplestorage.get('HLXK_LOGIN_TIME');
          // 一个月时间毫秒
          let oneMonth = 60 * 60 *  24 * 30 * 1000;
          // 过期.删除登录状态
          if((now - loginTime) > oneMonth) simplestorage.set('HLXK_STATUS', false)
        }
        // 是否登录
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
