<template>
  <div>
    <NotificationContainer />
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
          <label for="name">Nom, Prénom: (facultatif)</label>
          <input id="name" size="22" v-model="name" />
        </p>

        <p>
          <label for="phoneNumber">Numéro de téléphone: (facultatif)</label>
          <input id="phoneNumber" size="10" v-model="phoneNumber" />
        </p>
      </div>

      <p>
        <label for="email">e-mail:</label>
        <input id="email" size="22" v-model="email" autocomplete="username" />
      </p>

      <p>
        <button
          v-if="validateAdminEmail(email)"
          class="btn-mine"
          @click="login"
        >
          Me connecter
        </button>
        <button v-else class="btn-twitter" @click="saveCustomerInfos">
          Rester informé(e)
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import * as fb from '@/firebaseConfig.js'
import NProgress from 'nprogress'
import store from '@/store/index.js'
import NotificationContainer from '@/components/NotificationContainer.vue'
export default {
  data() {
    return {
      name: null,
      phoneNumber: null,
      email: null,
      password: null
    }
  },
  components: {
    NotificationContainer
  },
  methods: {
    saveCustomerInfos() {
      let name = this.name,
        phoneNumber = this.phoneNumber,
        email = this.email
      if (validateEmail(email)) {
        NProgress.start()
        fb.customerCollection
          .add({
            createdOn: new Date(),
            name: name,
            phoneNumber: phoneNumber,
            email: email
          })
          .then(() => {
            this.name = null
            this.phoneNumber = null
            this.email = null
            NProgress.done()
            const notification = {
              type: 'success',
              message: `Vos informations ont bien été enregistrées, merci !`
            }
            this.$store.dispatch('notification/add', notification)
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
  const notification = {
    type: 'error',
    message: `S'il vous plaît, entrez une adresse e-mail valide`
  }
  store.dispatch('notification/add', notification)
  return false
}
</script>

<style scoped>
label {
  margin-right: 1vw;
}

.contact-form {
  font-size: 1.5vw;
  text-align: end;
}

.contact-form p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 382px) {
  .btn-twitter {
    padding: 2vw 3vw;
    width: 100%;
  }

  #phoneNumber {
    width: 200%;
    height: 70%;
  }

  #name {
    height: 70%;
    width: 110%;
  }

  #email {
    height: 70%;
    width: 75%;
  }

  label {
    font-size: 2vw;
    margin-right: 1vw;
  }
}

@media (min-width: 382px) and (max-width: 500px) {
  .btn-twitter {
    padding: 2vw 3vw;
    width: 100%;
  }

  #phoneNumber {
    width: 68%;
  }

  #name {
    width: 110%;
  }

  #email {
    width: 75%;
  }

  label {
    font-size: 2vw;
    margin-right: 1vw;
  }
}
</style>
