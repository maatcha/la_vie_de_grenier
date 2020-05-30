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
      <h1 v-show="publishedNewsList.length && fullPublication === null">
        Voici nos dernières nouveautés !!!
      </h1>
      <div v-if="fullPublication === null" class="mosaic">
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
          @set-full-publication="setFullPublication"
        />
        <!-- JUST FOR RENDERING ADJUSTMENTS -->
        <!-- ------------------------------------------------------------------------------------------------------------- -->
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
          @set-full-publication="setFullPublication"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
          @set-full-publication="setFullPublication"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
          @set-full-publication="setFullPublication"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
          @set-full-publication="setFullPublication"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
          @set-full-publication="setFullPublication"
        />
        <ProductCard
          class="col-3"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
          :publishedNewOrPromotion="publishedNew"
          @set-full-publication="setFullPublication"
        />
        <!-- ------------------------------------------------------------------------------------------------------------- -->
      </div>
      <div v-else>
        <FullPublication
          @return-to-list="returnToList"
          :publishedNewOrPromotion="fullPublication"
        ></FullPublication>
      </div>
      <hr />

      <h1 v-show="publishedPromotionsList.length">
        Et voici nos offres de déstockage du moment !!!
      </h1>
      <div class="mosaic">
        <ProductCard
          class="col-3"
          v-for="publishedPromotion in publishedPromotionsList"
          :key="publishedPromotion.id"
          :publishedNewOrPromotion="publishedPromotion"
          @set-full-publication="setFullPublication"
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
import FullPublication from '@/components/FullPublication.vue'
import { mapState } from 'vuex'
import gsap from 'gsap'
export default {
  components: {
    Navbar,
    Footer,
    ProductCard,
    FullPublication
  },
  data() {
    return {
      fullPublication: null
    }
  },
  computed: {
    ...mapState(['publishedNewsList', 'publishedPromotionsList'])
  },
  methods: {
    setFullPublication(productCard) {
      this.fullPublication = productCard
    },
    returnToList() {
      this.fullPublication = null
    }
  },
  mounted() {
    gsap.from('.col-3', {
      opacity: 0,
      scale: 0,
      y: 200,
      ease: 'power1',
      stagger: {
        each: 0.2,
        from: 'left'
      }
    })
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
