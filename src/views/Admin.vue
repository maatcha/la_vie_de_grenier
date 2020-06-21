<template>
  <div>
    <Navbar>
      <p slot="left">Bonjour {{ userProfile.name }} !!!</p>
      <button v-if="currentUser" @click="logout" slot="right">Log out</button>
      <router-link
        v-else
        slot="right"
        class="navbar-link"
        :to="{ name: 'home' }"
        >Retour à l'accueil</router-link
      >
    </Navbar>
    <div class="container">
      <NotificationContainer />
      <PicturesUploadThroughFbStorage />
      <ProductList
        :publishedNewsList="publishedNewsList"
        :publishedPromotionsList="publishedPromotionsList"
        @before-list-enter="beforeListEnter"
        @list-enter="listEnter"
        @before-list-leave="beforeListLeave"
        @list-leave="listLeave"
      />
      <CustomerList
        :customerList="customerList"
        @before-list-enter="beforeListEnter"
        @list-enter="listEnter"
        @before-list-leave="beforeListLeave"
        @list-leave="listLeave"
      />
    </div>
    <Footer>
      <p>Que ta journée soit belle 33</p>
    </Footer>
  </div>
</template>

<script>
import * as fb from '@/firebaseConfig.js'
import ProductList from '@/components/ProductList.vue'
import { mapState } from 'vuex'
import router from '@/router/index'
import store from '@/store/index'
import Velocity from 'velocity-animate'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import CustomerList from '@/components/CustomerList.vue'
import PicturesUploadThroughFbStorage from '@/components/PicturesUploadThroughFbStorage.vue'

function signOutAndClearUserData() {
  fb.auth
    .signOut()
    .then(() => {
      store.dispatch('clearData')
      router.push('/')
    })
    .catch(error => {
      const notification = {
        type: 'error',
        message:
          'Il y a eu un problème pendant la déconnexion : ' + error.message
      }
      store.dispatch('notification/add', notification)
    })
}

export default {
  components: {
    Navbar,
    Footer,
    NotificationContainer,
    CustomerList,
    ProductList,
    PicturesUploadThroughFbStorage
  },
  methods: {
    logout() {
      signOutAndClearUserData()
    },
    beforeListEnter(el) {
      el.style.height = '3em'
      el.style.overflow = 'auto'
    },
    listEnter(el, done) {
      Velocity(
        el,
        { height: '40em' },
        { duration: 500, easing: [60, 10], complete: done }
      )
    },
    beforeListLeave(el) {
      el.style.height = '12em'
    },
    listLeave(el, done) {
      Velocity(
        el,
        { height: '0em' },
        { duration: 300, easing: 'easeInCubic', complete: done }
      )
    }
  },
  computed: {
    ...mapState([
      'currentUser',
      'userProfile',
      'customerList',
      'publishedNewsList',
      'publishedPromotionsList'
    ])
  },
  created() {
    window.addEventListener('beforeunload', () => {
      signOutAndClearUserData()
    })
  },
  updated() {
    if (!this.currentUser) {
      this.$router.push('/')
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.currentUser) {
      const answer = window.confirm(
        "Hmmm...tu n'aurais pas oublié de te déconnecter, par hasard ?"
      )
      if (answer) {
        next(false)
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Courgette', cursive, sans-serif;
}
</style>
