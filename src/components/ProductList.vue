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
        <div v-if="publicationToModify !== null">
          <div>Price : {{ publicationToModify.price }}</div>
        </div>
        <NewsAndPromotionsTabs
          @show-full-publication="showPublicationAndAllowToModify"
        >
        </NewsAndPromotionsTabs>
      </div>
    </transition>
  </div>
</template>

<script>
import NewsAndPromotionsTabs from '@/components/NewsAndPromotionsTabs'
export default {
  components: {
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
      showProductList: false,
      publicationToModify: null
    }
  },
  methods: {
    toggleProductList() {
      this.showProductList = !this.showProductList
    },
    showPublicationAndAllowToModify(publicationToModify) {
      this.publicationToModify = publicationToModify
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
p {
  padding-left: 1vw;
}
</style>
