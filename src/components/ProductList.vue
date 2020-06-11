<template>
  <div>
    <p class="clickableText" v-if="!showProductList" @click="toggleProductList">
      Afficher la liste des produits publiés
    </p>

    <transition
      @before-enter="beforeListEnter"
      @before-leave="beforeListLeave"
      @enter="listEnter"
      @leave="listLeave"
      :css="false"
      mode="out-in"
    >
      <div v-if="showProductList">
        <p
          class="clickableText"
          v-if="showProductList"
          @click="toggleProductList"
        >
          Cacher la liste des produits publiés
        </p>

        <NewsAndPromotionsTabs>
          <button>Modifier</button>
        </NewsAndPromotionsTabs>
      </div>
    </transition>
  </div>
</template>

<script>
// import ProductCard from '@/components/ProductCard'
import NewsAndPromotionsTabs from '@/components/NewsAndPromotionsTabs'
export default {
  components: {
    // ProductCard
    NewsAndPromotionsTabs
  },
  props: {
    publishedNewsList: {
      type: Array,
      required: true
    },
    publishedPromotionsList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showProductList: false
    }
  },
  methods: {
    toggleProductList() {
      this.showProductList = !this.showProductList
    },
    beforeListEnter(el) {
      this.$emit('before-list-enter', el)
    },
    listEnter(el, done) {
      this.$emit('list-enter', el, done)
    },
    beforeListLeave(el) {
      this.$emit('before-list-leave', el)
    },
    listLeave(el, done) {
      this.$emit('list-leave', el, done)
    }
  }
}
</script>

<style scoped>
/* ul {
  margin: 0;
  padding: 0 1vw;
} */

p {
  padding-left: 1vw;
}

/* .customerList {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.customerList > p {
  margin: 0;
  padding: 0;
} */
</style>
