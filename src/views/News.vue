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

    <NewsAndPromotionsTabs
      @show-full-publication="showFullPublication"
      @return-to-list="returnToList"
    ></NewsAndPromotionsTabs>

    <Footer v-if="fullPublication === null" />
    <Footer v-else><p></p></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import NewsAndPromotionsTabs from '@/components/NewsAndPromotionsTabs'

export default {
  components: {
    Navbar,
    Footer,
    NewsAndPromotionsTabs
  },
  data() {
    return {
      fullPublication: null
    }
  },
  methods: {
    showFullPublication(productCard) {
      this.fullPublication = productCard
    },
    returnToList() {
      this.fullPublication = null
    }
  }
}
</script>

<style scoped></style>
