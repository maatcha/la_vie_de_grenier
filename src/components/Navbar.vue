<template>
  <div class="navbar">
    <slot name="left"
      ><div class="navbar-links-group">
        <a class="navbar-link" href="#the-shop">La Boutique</a>
        <router-link class="navbar-link" :to="{ name: 'services' }"
          >Dépot-vente / Débarras maisons / caves / greniers</router-link
        >
      </div>
    </slot>
    <slot name="right">
      <div class="navbar-links-group">
        <router-link class="navbar-link" :to="{ name: 'news' }"
          >Nouveautés / Destockage</router-link
        >
        <a class="navbar-link" href="#footer">Contact</a>
      </div>
    </slot>
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
  padding: 2vw;
}

.navbar p {
  color: rgba(226, 231, 235, 1);
}

.navbar-links-group {
  margin: 0;
}

.navbar-link {
  color: rgba(226, 231, 235, 1);
  margin: 0 1vw;
}

@media (max-width: 500px) {
  .navbar {
    display: flex;
    font-weight: bold;
    height: 4vh;
    padding: 1.5vw 2vw 2vw 2vw;
  }
}
</style>
