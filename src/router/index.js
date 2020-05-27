import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import NProgress from 'nprogress'

import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Services from '../views/Services.vue'
import Admin from '../views/Admin.vue'
import NotFoundComponent from '../views/NotFoundComponent.vue'
import Test from '../views/Test.vue'

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
    name: 'notFoundComponent',
    component: NotFoundComponent
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched[0].meta) {
    const requireAuth = to.matched[0].meta.requireAuth
    const currentUser = firebase.auth().currentUser

    if (requireAuth && !currentUser) {
      next('/')
    } else if (requireAuth && currentUser) {
      next()
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
