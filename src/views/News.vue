<template>
  <div class="wrapper">
    <NavbarInPages />
    <div class="container">
      <h1>Et voici nos dernières nouveautés !!!</h1>
    </div>
  </div>
</template>

<script>
import NavbarInPages from '@/components/NavbarInPages.vue'
export default {
  components: {
    NavbarInPages
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

.wrapper {
  background-color: rgba(54, 63, 72, 1);
  padding-top: 2vw;
  padding-bottom: 7.5vw;
}
</style>
