<template>
  <div class="navbar">
    <div class="navbar-links-group">
      <router-link class="navbar-link" :to="{ name: 'home' }"
        >Retour à l'accueil</router-link
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2vw;
  /* position: sticky; */
  /* height: 12vh; */
  background-color: rgba(54, 63, 72, 1);
  margin: none;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 0vw;
  padding-bottom: 3vw;
}

.navbar-links-group {
  margin: 0;
}

.navbar-link {
  color: rgba(226, 231, 235, 1);
  margin: 0 1vw;
}
</style>
