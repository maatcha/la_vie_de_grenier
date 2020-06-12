<template>
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
        >
          <button v-if="admin" slot="modify" @click="modifyPublication">
            Modifier
          </button>
          <button
            slot="fullPublication"
            @click="showFullPublication(publishedNew)"
          >
            Cliquez ICI pour voir d'autres photos ou réserver !
          </button></ProductCard
        >
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
        >
          <button v-if="admin" slot="modify" @click="modifyPublication">
            Modifier
          </button>
          <button
            slot="fullPublication"
            @click="showFullPublication(publishedPromotion)"
          >
            Cliquez ICI pour voir d'autres photos ou réserver !
          </button>
        </ProductCard>
      </div>
    </div>
    <div v-else>
      <slot>
        <FullPublication
          @return-to-list="returnToList"
          :publishedNewOrPromotion="fullPublication"
        ></FullPublication>
      </slot>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import FullPublication from '@/components/FullPublication.vue'
import { mapState } from 'vuex'
import gsap from 'gsap'
export default {
  components: {
    ProductCard,
    FullPublication
  },
  props: {
    admin: {
      type: Boolean,
      required: false
    }
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
      this.$emit('show-full-publication', productCard)
    },
    returnToList() {
      this.fullPublication = null
      this.$emit('return-to-list')
    },
    modifyPublication() {
      this.$emit('modify-publication')
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
