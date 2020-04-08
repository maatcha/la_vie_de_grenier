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
      <transition name="fade">
        <p
          class="clickableText"
          v-if="!displayCustomerList"
          @click="toggleCustomerList"
        >
          Afficher la liste des prospects
        </p>

        <div v-if="displayCustomerList">
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
            <li class="customerList">
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
import { mapState } from 'vuex'
import router from '@/router/index'
import store from '@/store/index'

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
    Footer
  },
  data() {
    return {
      displayCustomerList: false
    }
  },
  created() {
    window.addEventListener('beforeunload', () => {
      signOutAndClearUserData()
    })
  },
  methods: {
    logout() {
      signOutAndClearUserData()
    },
    toggleCustomerList() {
      this.displayCustomerList = !this.displayCustomerList
    }
  },
  computed: {
    ...mapState(['currentUser', 'userProfile', 'customerList'])
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

.container {
  background-color: rgba(226, 231, 235, 1);
  box-shadow: 0px 2px 10px rgba(226, 231, 235, 0.7);
  margin-left: 12vw;
  margin-right: 12vw;
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
