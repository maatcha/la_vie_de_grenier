<template>
  <div>
    <form class="contact-form" @submit.prevent>
      <p v-if="validateAdminEmail(email)">
        <input name="username" style="display: none;" />
        <label for="password">Mot de passe:</label>
        <input
          id="password"
          type="password"
          size="10"
          v-model="password"
          autocomplete="current-password"
        />
      </p>

      <div v-else>
        <p>
          <label for="firstName">Prénom:</label>
          <input id="firstName" size="10" v-model="firstName" />
        </p>

        <p>
          <label for="lastName">Nom de famille:</label>
          <input id="lastName" size="10" v-model="lastName" />
        </p>
      </div>

      <p>
        <label for="email">e-mail:</label>
        <input id="email" size="10" v-model="email" autocomplete="username" />
      </p>

      <p>
        <button
          v-if="validateAdminEmail(email)"
          class="btn-mine"
          @click="login"
        >
          Me connecter
        </button>
        <button v-else class="btn-twitter" @click="saveCustomerEmail">
          Rester informé(e)
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import * as fb from '@/firebaseConfig.js'
import NProgress from 'nprogress'
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  },
  methods: {
    saveCustomerEmail() {
      let firstName = this.firstName,
        lastName = this.lastName,
        email = this.email
      if (validateEmail(email)) {
        fb.customerCollection
          .add({
            createdOn: new Date(),
            firstName: firstName,
            lastName: lastName,
            email: email
          })
          .then(() => {
            this.firstName = null
            this.lastName = null
            this.email = null
          })
          .catch(error => {
            NProgress.done()
            const notification = {
              type: 'error',
              message:
                `Il y a eu un problème durant l'enregistrement de vos données : ` +
                error.message
            }
            this.$store.dispatch('notification/add', notification)
          })
      }
    },
    login() {
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(userData => {
          NProgress.start()
          this.$store.dispatch('defineCurrentUser', userData.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/admin')
        })
        .catch(error => {
          NProgress.done()
          const notification = {
            type: 'error',
            message:
              `Il y a eu un problème durant l'authentification de l'administrateur : ` +
              error.message
          }
          this.$store.dispatch('notification/add', notification)
        })
    },
    validateAdminEmail(email) {
      if (email === process.env.VUE_APP_MAIL) {
        return true
      }
    }
  }
}

const validateEmail = email => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  }
  alert("S'il vous plaît, entrez une adresse e-mail valide")
  return false
}
</script>

<style>
.contact-form {
  font-size: 1.5vw;
  text-align: end;
}

.contact-form p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.submitButton {
  color: red;
  font-weight: bold;
}

.btn-twitter {
  background-color: green;
  color: white;
  border-radius: 4px;
  font-weight: bolder;
  padding: 10px 15px;
  text-decoration: none;
  font-family: sans-serif;
}

.btn-twitter:hover {
  opacity: 0.6;
  cursor: pointer;
}

.btn-medium {
  background-color: transparent;
  color: rgb(150, 150, 150);
  border-radius: 50px;
  font-weight: lighter;
  padding: 10px 15px;
  text-decoration: none;
  border: 1px solid rgb(150, 150, 150);
  opacity: 0.7;
  font-family: sans-serif;
}

.btn-medium:hover {
  opacity: 1;
}

.btn-treehouse {
  padding: 10px 15px;
  color: #45d37f;
  border: 2px solid;
  border-radius: 5px;
  font-family: sans-serif;
  text-decoration: none;
  font-weight: 600;
  opacity: 0.7;
  letter-spacing: 0.5;
}

.btn-treehouse:hover {
  opacity: 1;
  background-color: #45d37f;
  border-color: #45d37f;
  color: white;
}

.btn-mine {
  background-color: #283373;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  opacity: 0.6;
  letter-spacing: 1.5;
  margin: 0 2vw !important;
}

.btn-mine:hover {
  opacity: 1;
  cursor: pointer;
}
</style>
