import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from './firebaseConfig.js'
// import dotenv from 'dotenv'

// dotenv.config()

Vue.config.productionTip = false

fb.auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
