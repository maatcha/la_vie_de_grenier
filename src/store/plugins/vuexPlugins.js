import * as fb from '../../firebaseConfig'

export function customerSnapshotRefresh(store) {
  fb.auth.onAuthStateChanged(user => {
    if (user) {
      if (store.state.userProfile) {
        fb.customerCollection
          .orderBy('createdOn', 'desc')
          .onSnapshot(querySnapshot => {
            let customerArray = []

            querySnapshot.forEach(customer => {
              let email = customer.data()
              email.id = customer.id
              customerArray.push(email)
            })

            store.dispatch('updateCustomerList', customerArray)
          })
      }
    }
  })
}
