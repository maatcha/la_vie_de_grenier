<template>
  <div id="not-found-wrapper">
    <BaseSadFaceIcon />
    <h1 id="not-found-text">
      Désolé, mais la page que vous recherchez n'existe pas !
    </h1>
    <p>
      <router-link class="homeLink" :to="{ name: 'home' }"
        >Retour à l'accueil du site</router-link
      >
    </p>
  </div>
</template>

<script>
import BaseSadFaceIcon from '@/components/BaseSadFaceIcon.vue'

export default {
  components: {
    BaseSadFaceIcon
  }
}
</script>

<style scoped>
#not-found-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  display: flex;
  flex-direction: column;
}
#not-found-text {
  font-family: sans-serif;
  word-spacing: 10px;
  font-size: 40px;
}

.homeLink {
  text-decoration: none;
  color: purple;
  font-size: 2em;
  font-weight: bold;
}
</style>
