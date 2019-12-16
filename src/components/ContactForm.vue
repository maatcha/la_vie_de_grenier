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
  }
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
