// require.ensure 是 Webpack 的特殊语法, 用来设置 code-split point
import Vue from 'vue'
import simplestorage from 'simplestorage.js'
import Router from 'vue-router'
import fetch from '../utils/fetch'
import Home from '@/views/index/index'                                        // 首页
import noticeList from '@/views/notice/list'                                 // 公告消息列表
import noticeDetails from '@/views/notice/details'                                 // 公告消息详情
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
      },
      children:[
        {
          // 公告消息
          path: 'noticeList',
          component: noticeList,
          meta:{
            pageTitle: '小区公告'
          },
          children:[
            {
              // 公告详情
              path: 'noticeDetails',
              component: noticeDetails,
              meta:{
                pageTitle: '公告详情'
              }
            }
          ]
        }
      ]
    },
    {
      // 选择小区
      path: '/selectQuarters',
      name: 'selectQuarters',
      component: resolve => require(['@/views/index/selectQuarters'], resolve),
      meta:{
        pageTitle: '选择小区'
      }
    },
    {
      // 社区
      path: '/community',
      name: 'community',
      component: resolve => require(['@/views/community/community'], resolve),
      meta:{
        pageTitle: '社区'
      }
    },
    {
      // 限时抢购
      path: '/sale',
      name: 'sale',
      component: resolve => require(['@/views/list/sale'], resolve),
      meta:{
        pageTitle: '限时抢购'
      }
    },
    {
      // 专题列表
      path: '/subject',
      name: 'subject',
      component: resolve => require(['@/views/list/subject'], resolve),
      meta:{
        pageTitle: '专题列表'
      }
    },
    {
      // 领券专题
      path: '/subjectCoupon',
      name: 'subjectCoupon',
      component: resolve => require(['@/views/list/subjectCoupon'], resolve),
      meta:{
        pageTitle: '领券专题'
      }
    },
    {
      // 满减优惠
      path: '/fullDiscount',
      name: 'fullDiscount',
      component: resolve => require(['@/views/list/fullDiscount'], resolve),
      meta:{
        pageTitle: '满减优惠'
      }
    },
    {
      // 搜索
      path: '/search',
      name: 'search',
      component: resolve => require(['@/views/search/search'], resolve),
      meta:{
        pageTitle: '搜索'
      }
    },
    {
      // 便利店
      path: '/store',
      name: 'store',
      component: resolve => require(['@/views/store/store'], resolve),
      meta:{
        pageTitle: '便利店'
      }
    },
    {
      // 购物车
      path: '/shopping',
      name: 'shopping',
      component: resolve => require(['@/views/shopping/shopping'], resolve),
      meta:{
        pageTitle: '购物车'
      }
    },
    {
      // 商品详情页
      path: '/commodity',
      name: 'commodity',
      component: resolve => require(['@/views/commodity/commodity'], resolve),
      meta:{
        pageTitle: '商品详情页'
      }
    },
    {
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
            requireAuth: true,
            pageTitle: '选择地址'
          },
          children:[
            {
              path: 'add',
              component: userAddressAdd,
              meta:{
                requireAuth: true,
                pageTitle: '添加地址'
              }
            }
          ]
        }
      ]
    },
    {
      // 支付结果
      path: '/success',
      name: 'success',
      component: resolve => require(['@/views/payResult/success'], resolve),
      meta:{
        requireAuth: true,
        pageTitle: '支付成功'
      }
    },
    {
      // 登录
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve),
      meta:{
        pageTitle: '登录'
      }
    },
    {
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
          },
          children:[
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
                requireAuth: true,
                pageTitle: '优惠券详情'
              }
            },{
              // 失效优惠券
              path: 'invalid',
              component: invalidCoupon,
              meta:{
                requireAuth: true,
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
    },
    {
      // 错误
      path: '/error',
      //name: 'success',
      component: resolve => require(['@/views/error/error'], resolve),
      meta:{
        pageTitle: '错误'
      }
    },
    {
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

  // 修改title
  typeof to.meta.pageTitle !== undefined && setDocumentTitle(to.meta.pageTitle)


  /*

   第1次、
   要有?projectId=111
   去微信授权
   回来
   提交微信用户信息
   游客或登录


   第2次
   要有?projectId=111
   是否已微信授权.已授权 HLXK_OPENID
   游客或登录

   出现第3次（跳到选择小区）会带一堆参数

  */
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
    // projectId不相等.说明是从不同的公众号进入.清空
    if(simplestorage.get('projectId') != projectId){
      // 保存公众号关联id
      simplestorage.set('projectId', projectId)
      // 清空小区id
      simplestorage.deleteKey('HLXK_DISTRIBUTION')
      // 清空openid
      simplestorage.deleteKey('HLXK_OPENID')
      // 清空sessionId
      simplestorage.deleteKey('HLXK_SessionId')
      // 清空SESSION
      simplestorage.deleteKey('HLXK_SESSION')
      // 清空KEY
      simplestorage.deleteKey('HLXK_KEY')
      // 清空用户登录状态
      simplestorage.deleteKey('HLXK_UserId')
    }
  }

/*******************************************************************************************************/

  /*

    什么情况下OPENID、SessionId、SESSION，存在
    只有保存了才会

  */

  // 不存在openid && 不存在SessionId && 不存在SESSION
  if(!simplestorage.get('HLXK_OPENID') && !simplestorage.get('HLXK_SessionId') && !simplestorage.get('HLXK_SESSION')){
    /*
        是否是跳转回来的，通过?userInfo={}进行识别？
        ?userInfo={}     对象 而且 要openid字段
        ?userInfo=111    普通字符
    */
    // 回来还是在微信、没有openid（还没保存）
    if(to.query.userInfo && !simplestorage.get('HLXK_OPENID')){
        let wxUserInfo = JSON.parse(to.query.userInfo);
        //console.log(JSON.stringify(to.query.userInfo));
        if(typeof wxUserInfo == "object" && wxUserInfo.openid){
          // 保存openid
          simplestorage.set('HLXK_OPENID', wxUserInfo.openid);
          // 保存assess_token失效时间7200秒.2个小时就失效？

          // 保存用户信息
          simplestorage.set('HLXK_UserInfo', wxUserInfo);
          // 保存sessionId
          simplestorage.set('HLXK_SessionId', to.query.sessionId);

          // 保存微信用户信息...这个时候还有没Session值
          //saveWxUserInfo()

          // 去游客或登录
          isLogin();

        }
    }else{
      // 跳转去获取openid
      if(process.env.NODE_ENV == "development"){
        location.href = "http://zzh.yidinghuo.net/api/pub/wechatAuth?redirect_uri="+ encodeURIComponent(location.href) +"&scope=snsapi_userinfo&projectId=" + simplestorage.get('projectId') + '&createSession=y';
      }else{
        location.href = "http://auth.yidinghuo.net/api/pub/wechatAuth?redirect_uri="+ encodeURIComponent(location.href) +"&scope=snsapi_userinfo&projectId=" + simplestorage.get('projectId') + '&createSession=y';
      }
    }
  }else{
    isLogin();
  }


  // 保存微信用户信息
  function saveWxUserInfo(){

    fetch.post('/community/authorize', {
      "projectId":simplestorage.get('projectId'),
      "openid":wxUserInfo.openid,
      "nickname":wxUserInfo.nickname,
      "sex":wxUserInfo.sex,
      "country":wxUserInfo.country,
      "province":wxUserInfo.province,
      "city":wxUserInfo.city,
      "headimgurl":wxUserInfo.headimgurl,    //头像
      "unionid":wxUserInfo.unionid
    }).then(function (res) {
      //console.log(res)
      if (res.resultCode == 0) {

      } else {
        // 提交失败
      }
    }).catch(function (error) {
      console.log(error)
    })

  }


/*******************************************************************************************************/

  // 是否登录.游客或登录
  function isLogin(){
    /*

     未登录 没有session  -> 去获取游客
     未登录 有游客session -> 去登录
     已登录 有登录session

   */
    if(simplestorage.get('HLXK_SESSION')){
      // 有游客session
      if(simplestorage.get('HLXK_UserId') == -1){
        // HLXK_UserId == -1，未登录
        go()
      }else{
        next()
      }
    }else{
      // 没有session
      guestLogin()
    }
  }


  // 以游客方式登录
  function guestLogin(){
    //alert('游客')
    fetch.post('/community/touristLogin', {
      "projectId":simplestorage.get('projectId')
    }).then(function (res) {
      //console.log(res)
      let data = res.data || {};
      if (res.resultCode == 0) {
        simplestorage.set('HLXK_SESSION', data.session);
        simplestorage.set('HLXK_KEY', data.key);
        // 判断用户是否登录
        simplestorage.set('HLXK_UserId', data.userInfo.userId);
        // 去选择小区或登录
        go();
      } else {
        alert(res.msg)
      }
    }).catch(function (error) {
      console.log(error)
    })
  }


  // 选择小区页或登录页
  function go(){
    // 是否有小区信息
    if(simplestorage.get('HLXK_DISTRIBUTION') || to.path == '/selectQuarters'){
      // 是否需要登录 && userid == -1 ，去我的登录页面
      if(to.meta.requireAuth && simplestorage.get('HLXK_UserId') == -1){
        next({
          path: '/login',
          query: {
            url: to.fullPath,
            projectId:simplestorage.get('projectId')
          }
        })
      }else{
        next()
      }
    }else{
      // 去选择小区
      next({
        path: '/selectQuarters',
        query: {
          url: to.fullPath,
          projectId:simplestorage.get('projectId')
        }
      });
    }
  }

})

export default router;


/*

 // 相关时间信息.是否时间过期，重新登录？当前时间 - 登录时间 > 1个月
 //if(simplestorage.get('HLXK_LOGIN_TIME')){
 //  // 当前时间
 //  let now = new Date().getTime();
 //  // 登录时间
 //  let loginTime = simplestorage.get('HLXK_LOGIN_TIME');
 //  // 一个月时间毫秒
 //  let oneMonth = 60 * 60 *  24 * 30 * 1000;
 //  // 过期.删除登录状态
 //  if((now - loginTime) > oneMonth) simplestorage.set('HLXK_STATUS', false)
 //}



*/
