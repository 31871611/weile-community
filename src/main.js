import Vue from 'vue'
import router from './router'
import App from './App'
import FastClick from 'fastclick'
// require('es6-promise').polyfill();
import fetch from './utils/fetch'

// Vue.config.productionTip = false
Vue.prototype.$http = fetch

// register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
