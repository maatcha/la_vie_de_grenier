<template>
  <div>
    <Navbar>
      <p slot="left">Bonjour Julie !!!</p>
      <button @click="logout" slot="right">Log out</button>
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
export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('clearData')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
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
