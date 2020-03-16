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
      <p>This is the Admin page</p>
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
import store from '@/store/index'
import router from '@/router/index'

function signOutAndClearUserData() {
  fb.auth
    .signOut()
    .then(() => {
      store.dispatch('clearData')
      router.push('/')
    })
    .catch(err => {
      console.log(err)
    })
}

export default {
  components: {
    Navbar,
    Footer
  },
  created() {
    window.addEventListener('beforeunload', () => {
      signOutAndClearUserData()
    })
  },
  methods: {
    logout() {
      signOutAndClearUserData()
    }
  },
  computed: {
    ...mapState(['currentUser', 'userProfile'])
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

.container {
  background-color: rgba(226, 231, 235, 1);
  box-shadow: 0px 2px 10px rgba(226, 231, 235, 0.7);
  margin-left: 12vw;
  margin-right: 12vw;
}
</style>
