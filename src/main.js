import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'
import formatDate from './filters/formatDate'

Vue.filter('dateFromNow', formatDate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
