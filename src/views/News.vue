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
      <h1>Voici nos dernières nouveautés !!!</h1>
      <div class="mosaic">
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
        />
        <!-- JUST FOR RENDERING ADJUSTMENTS -->
        <!-- ------------------------------------------------------------------------------------------------------------- -->
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
        />
        <!-- ------------------------------------------------------------------------------------------------------------- -->
      </div>
      <hr />

      <h1>Et voici nos offres de déstockage du moment !!!</h1>
      <div class="mosaic">
        <ProductCard
          class="col-4"
          v-for="publishedPromotion in publishedPromotionsList"
          :key="publishedPromotion.id"
          :publishedNewOrPromotion="publishedPromotion"
        />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ProductCard from '@/components/ProductCard.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Navbar,
    Footer,
    ProductCard
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

.mosaic {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
