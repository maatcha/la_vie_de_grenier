<template>
  <form class="contact-form" @submit.prevent="onSubmit">
    <p>
      <label for="firstName">Prénom:</label>
      <input id="firstName" size="10" v-model="firstName" />
    </p>

    <p>
      <label for="lastName">Nom de famille:</label>
      <input id="lastName" size="10" v-model="lastName" />
    </p>

    <p>
      <label for="email">e-mail:</label>
      <input id="email" size="10" v-model="email" />
    </p>

    <p>
      <input class="submitButton" type="submit" value="Rester informé(e)" />
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null
    }
  },
  methods: {
    onSubmit() {
      let firstName = this.firstName,
        lastName = this.lastName,
        email = this.email
      if (validateEmail(email)) {
        if (
          process.env.VUE_APP_MAIL === email &&
          process.env.VUE_APP_PASS === firstName
        ) {
          console.log(process.env.VUE_APP_SECRET)
          alert("You're July")
          //ASK PASSWORD
        }
        console.log(lastName)
        //SEND DATA
        this.firstName = null
        this.lastName = null
        this.email = null
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

/* .contact-form>input {
  resize: horizontal;
  min-width: 50px;
} */
</style>
