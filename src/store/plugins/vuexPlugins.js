import * as fb from '../../firebaseConfig'

export function customerAndNewsSnapshotAutoRefresh(store) {
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
    fb.publishedNewsCollection
      .orderBy('createdOn', 'desc')
      .onSnapshot(querySnapshot => {
        let publishedNewsArray = []

        querySnapshot.forEach(publishedNew => {
          let pNew = publishedNew.data()
          pNew.id = publishedNew.id
          publishedNewsArray.push(pNew)
        })

        store.dispatch('updatePublishedNewsList', publishedNewsArray)
      })
  })
}
