<template>
  <div>
    <form class="contact-form" @submit.prevent="onSubmit">
      <p v-if="validateAdminEmail(email)">
        <label for="password">Mot de passe:</label>
        <input id="password" size="10" v-model="password" />
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
        <input id="email" size="10" v-model="email" />
      </p>

      <p>
        <button
          v-if="validateAdminEmail(email)"
          class="btn-mine"
          @click="login"
        >
          Me connecter
        </button>
        <input
          v-else
          class="btn-twitter"
          type="submit"
          value="Rester informé(e)"
        />
      </p>
    </form>
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="errorMsg !== ''" class="error-msg">
        <p>{{ errorMsg }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import * as fb from '@/firebaseConfig.js'
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      performingRequest: false,
      errorMsg: null
    }
  },
  methods: {
    onSubmit() {
      let firstName = this.firstName,
        lastName = this.lastName,
        email = this.email
      if (validateEmail(email)) {
        //SEND DATA
        console.log(firstName, lastName, email)
        //SEND DATA
        this.firstName = null
        this.lastName = null
        this.email = null
      }
    },
    login() {
      this.performingRequest = true
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(userData => {
          this.$store.dispatch('defineCurrentUser', userData.user)
          this.$store.dispatch('fetchUserProfile')
          this.performingRequest = false
          this.$router.push('/admin')
        })
        .catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
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

<style scoped>
.contact-form {
  font-size: 1vw;
  /* flex-shrink: 1; */
  text-align: end;
}

.submitButton {
  color: red;
  font-weight: bold;
}

.btn-twitter {
  background-color: #a80000;
  color: white;
  border-radius: 4px;
  font-weight: bolder;
  padding: 10px 15px;
  text-decoration: none;
  font-family: sans-serif;
}

.btn-twitter:hover {
  opacity: 0.6;
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
}

.btn-mine:hover {
  opacity: 1;
}

.loading {
  font-weight: bold;
  position: fixed;
  bottom: 0;
  right: 10px;
  color: red;
}

.error-msg {
  font-weight: bold;
  position: fixed;
  bottom: 0;
  right: 10px;
  color: red;
}
/* .contact-form>input {
  resize: horizontal;
  min-width: 50px;
} */
</style>
