import Vue from 'vue'
import router from './router'
import App from './App'
import FastClick from 'fastclick'
// require('es6-promise').polyfill();
import fetch from './utils/fetch'
import infiniteScroll from 'vue-infinite-scroll'

// 滚动加载插件
Vue.use(infiniteScroll)

// Vue.config.productionTip = false
Vue.prototype.$http = fetch

// register global utility filters.
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
