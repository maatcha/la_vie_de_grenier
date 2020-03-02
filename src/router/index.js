import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Services from '../views/Services.vue'
import Admin from '../views/Admin.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/services',
    name: 'services',
    component: Services
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta) {
    const requireAuth = to.matched[0].meta.requireAuth
    const currentUser = firebase.auth().currentUser

    if (requireAuth && !currentUser) {
      next('/')
    } else if (requireAuth && currentUser) {
      console.log('logged in')
      next()
    } else {
      next()
    }
  }
})

export default router
