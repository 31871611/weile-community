// require.ensure 是 Webpack 的特殊语法, 用来设置 code-split point
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index/index'

Vue.use(Router)

export default new Router({
  linkActiveClass:'select',
  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/list',
      name: 'list',
      component: resolve => require(['@/views/list/list'], resolve)
    }, {
      path: '/sale',
      name: 'sale',
      component: resolve => require(['@/views/list/sale'], resolve)
    }, {
      path: '/subject',
      name: 'subject',
      component: resolve => require(['@/views/list/subject'], resolve)
    }, {
      path: '/store',
      name: 'store',
      component: resolve => require(['@/views/store/store'], resolve)
    }, {
      path: '/shopping',
      name: 'shopping',
      component: resolve => require(['@/views/shopping/shopping'], resolve)
    },
    {
      path: '/commodity',
      name: 'commodity',
      component: resolve => require(['@/views/commodity/commodity'], resolve)
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    }, {
      path: '*',
      component: Home
    }
  ]
})
