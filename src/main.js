import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'
// import * as fb from './firebaseConfig.js'
import formatDate from './filters/formatDate'

Vue.filter('dateFromNow', formatDate)

Vue.config.productionTip = false

// fb.auth.onAuthStateChanged(user => {
//   if (user) {
//     if (store.state.userProfile) {
//       fb.customerCollection
//         .orderBy('createdOn', 'desc')
//         .onSnapshot(querySnapshot => {
//           let customerArray = []

//           querySnapshot.forEach(customer => {
//             let email = customer.data()
//             email.id = customer.id
//             customerArray.push(email)
//           })

//           store.dispatch('updateCustomerEmails', customerArray)
//         })
//     }
//   }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// })
