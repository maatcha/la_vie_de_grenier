import firebase from 'firebase/app'
import 'firebase/app'
// import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyCpSDiKDtWWeHo2ffKpyZPdw1eFks5ah4g',
  authDomain: 'la-vie-de-grenier.firebaseapp.com',
  databaseURL: 'https://la-vie-de-grenier.firebaseio.com',
  projectId: 'la-vie-de-grenier',
  storageBucket: 'gs://la-vie-de-grenier.appspot.com/',
  messagingSenderId: '748252230900',
  appId: '1:748252230900:web:9c277d408b4d404b725aa1',
  measurementId: 'G-GBYLMXVQBL'
}
firebase.initializeApp(config)
// firebase.analytics()

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const storage = firebase.storage()

// date issue fix according to firebase
const settings = {
  // timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const customerCollection = db.collection('customerEmails')
const publishedNewsCollection = db.collection('publishedNews')

export {
  db,
  auth,
  storage,
  currentUser,
  usersCollection,
  customerCollection,
  publishedNewsCollection
}
