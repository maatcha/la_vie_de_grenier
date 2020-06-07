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
      <button
        class="tabButton"
        :class="{ active: showNews }"
        @click="toggleTab"
        v-if="fullPublication === null"
        :disabled="showNews"
      >
        <span v-show="showPromotions">Voir les</span>
        Nouveautés
      </button>
      <button
        class="tabButton"
        :class="{ active: showPromotions }"
        @click="toggleTab"
        v-show="fullPublication === null"
        :disabled="showPromotions"
      >
        <span v-show="showNews">Voir le</span>
        Déstockage
      </button>

      <div v-if="showNews && fullPublication === null">
        <h1>
          Voici nos dernières nouveautés !!!
        </h1>
        <div class="mosaic">
          <ProductCard
            class="col-3 product-card"
            v-for="publishedNew in publishedNewsList"
            :key="publishedNew.id"
            :publishedNewOrPromotion="publishedNew"
            @show-full-publication="showFullPublication"
          />
        </div>
      </div>

      <div v-else-if="showPromotions && fullPublication === null">
        <h1>
          Et voici nos offres de déstockage du moment !!!
        </h1>
        <div class="mosaic">
          <ProductCard
            class="col-3 product-card"
            v-for="publishedPromotion in publishedPromotionsList"
            :key="publishedPromotion.id"
            :publishedNewOrPromotion="publishedPromotion"
            @show-full-publication="showFullPublication"
          />
        </div>
      </div>

      <div v-else>
        <FullPublication
          @return-to-list="returnToList"
          :publishedNewOrPromotion="fullPublication"
        ></FullPublication>
      </div>
    </div>
    <Footer v-if="fullPublication === null" />
    <Footer v-else><p></p></Footer>
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
      fullPublication: null,
      showNews: true,
      showPromotions: false
    }
  },
  computed: {
    ...mapState(['publishedNewsList', 'publishedPromotionsList'])
  },
  methods: {
    toggleTab() {
      this.showNews = !this.showNews
      this.showPromotions = !this.showPromotions
    },
    showFullPublication(productCard) {
      this.fullPublication = productCard
    },
    returnToList() {
      this.fullPublication = null
    }
  },
  mounted() {
    gsap.from('.product-card', {
      opacity: 0,
      scale: 0,
      y: 200,
      ease: 'power1',
      stagger: {
        each: 0.2,
        from: 'left'
      }
    })
  },
  updated() {
    gsap.from('.product-card', {
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
  text-align: center;
  margin-top: 1vw;
}

.tabButton {
  font-family: 'Courgette', cursive, sans-serif;
  font-size: 2vw;
  font-weight: bolder;
  background: rgba(54, 63, 72, 1);
  color: rgba(226, 231, 235, 1);
  width: 50%;
  height: 4vw;
  border: 1px;
  cursor: pointer;
}

.active {
  border: 0;
  color: currentColor;
  opacity: 0.4;
  background: rgba(226, 231, 235, 1);
  cursor: none;
}
</style>
