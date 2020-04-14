<template>
  <div>
    <Navbar>
      <div slot="left" class="navbar-links-group">
        <router-link class="navbar-link" :to="{ name: 'home' }"
          >Retour à l'accueil</router-link
        >
      </div>
      <div slot="right">
        <div class="navbar-links-group">
          <router-link class="navbar-link" :to="{ name: 'services' }"
            >Dépot-vente / Débarras maisons / caves / greniers</router-link
          >
          <a class="navbar-link" href="#footer">Contact</a>
        </div>
      </div>
    </Navbar>
    <div class="container">
      <div>
        <h1>Et voici nos dernières nouveautés !!!</h1>
        <ul v-for="publishedNew in publishedNewsList" :key="publishedNew.id">
          <li class="news-list">
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img"
              @click="fullScreen($event)"
            />
            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h1>Et voici nos offres de déstockage du moment !!!</h1>
        <ul
          v-for="publishedPromotion in publishedPromotionsList"
          :key="publishedPromotion.id"
        >
          <li class="news-list">
            <p>{{ publishedPromotion.createdOn | dateFromNow }}</p>
            <p>{{ publishedPromotion.title }}</p>
            <img
              class="tiny-img"
              :src="publishedPromotion.img"
              @click="fullScreen($event)"
            />
            <p>
              {{ publishedPromotion.price }}
            </p>
            <p>
              {{ publishedPromotion.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    fullScreen(e) {
      e.target.classList.toggle('tiny-img')
      e.target.classList.toggle('full-screen-img')
    }
  },
  computed: {
    ...mapState(['publishedNewsList', 'publishedPromotionsList'])
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
  padding-bottom: 7.5vw;
}

.tiny-img {
  max-height: 30vw;
  max-width: 30vw;
}

.full-screen-img {
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
</style>
