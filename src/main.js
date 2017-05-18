import Vue from 'vue'
import router from './router'
import App from './App'
import FastClick from 'fastclick'
// require('es6-promise').polyfill();
import fetch from './utils/fetch'
import infiniteScroll from 'vue-infinite-scroll'

// 滚动加载插件https://github.com/ElemeFE/vue-infinite-scroll
Vue.use(infiniteScroll)

// Vue.config.productionTip = false
Vue.prototype.$http = fetch

// register global utility filters.
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
