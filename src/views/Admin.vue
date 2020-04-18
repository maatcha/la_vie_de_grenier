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
      <PicturesUploadThroughFbStorage />
      <p
        class="clickableText"
        v-if="!displayCustomerList"
        @click="toggleCustomerList"
        :key="listUndisplayedId"
      >
        Afficher la liste des prospects
      </p>

      <transition
        @before-enter="beforeListEnter"
        @before-leave="beforeListLeave"
        @enter="listEnter"
        @leave="listLeave"
        :css="false"
        mode="out-in"
      >
        <div v-if="displayCustomerList" :key="listDisplayedId">
          <p
            class="clickableText"
            v-if="displayCustomerList"
            @click="toggleCustomerList"
          >
            Cacher la liste des prospects
          </p>
          <ul>
            <li class="customerList">
              <p>Souscription</p>
              <p>E-mail</p>
              <p>Prénom</p>
              <p>Nom</p>
            </li>
          </ul>
          <hr />
          <ul v-for="(customer, index) in customerList" :key="index">
            <li v-if="displayCustomerList" class="customerList">
              <p>{{ customer.createdOn | dateFromNow }}</p>
              <p>{{ customer.email }}</p>
              <p v-if="customer.firstName">
                {{ customer.firstName }}
              </p>
              <p v-if="customer.lastName">
                {{ customer.lastName }}
              </p>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <Footer>
      <p>Que ta journée soit belle 33</p>
    </Footer>
  </div>
</template>

<script>
import * as fb from '@/firebaseConfig.js'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PicturesUploadThroughFbStorage from '@/components/PicturesUploadThroughFbStorage.vue'
import { mapState } from 'vuex'
import router from '@/router/index'
import store from '@/store/index'
import Velocity from 'velocity-animate'

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
    PicturesUploadThroughFbStorage
  },
  data() {
    return {
      displayCustomerList: false,
      listDisplayedId: 222222,
      listUndisplayedId: 111111,
      displayTestList: false
    }
  },
  methods: {
    logout() {
      signOutAndClearUserData()
    },
    toggleCustomerList() {
      this.displayCustomerList = !this.displayCustomerList
    },
    beforeListEnter(el) {
      el.style.height = '3em'
      el.style.overflow = 'auto'
    },
    listEnter(el, done) {
      Velocity(
        el,
        { height: '15em' },
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
    ...mapState(['currentUser', 'userProfile', 'customerList'])
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
.customerList {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.customerList > p {
  margin: 0;
  padding: 0;
}

.clickableText:hover {
  cursor: pointer;
  text-decoration: underline;
  color: red;
}

h1 {
  font-family: 'Courgette', cursive, sans-serif;
}

ul {
  margin: 0;
  padding: 0 1vw;
}

p {
  padding-left: 1vw;
}
</style>
