<template>
  <div
    class="product-card"
    @click="showFullPublication(publishedNewOrPromotion)"
  >
    <!-- <p>{{ publishedNewOrPromotion.createdOn | dateFromNow }}</p> -->
    <h2>
      {{ publishedNewOrPromotion.title }}
    </h2>
    <img
      class="tiny-img"
      :src="publishedNewOrPromotion.img[publishedNewOrPromotion.img.length - 1]"
    />
    <p class="price">PRIX : {{ publishedNewOrPromotion.price }}</p>
    <p>
      Cliquez pour voir d'autres photos ou réserver !
    </p>
  </div>
</template>

<script>
export default {
  props: {
    publishedNewOrPromotion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fullPublication: null
    }
  },
  methods: {
    showFullPublication(productCard) {
      this.$emit('show-full-publication', productCard)
    }
  }
}
</script>

<style scoped>
h2 {
  text-decoration: none;
  margin-bottom: 1vw;
}

.product-card {
  padding: 15px;
  margin: 1vw;
  border-radius: 20%;
  border: solid black 1px;
  background: rgba(54, 63, 72, 1);
  list-style: none;
  text-align: center;
  color: aliceblue;
  cursor: pointer;
}

.tiny-img {
  max-height: 50%;
  max-width: 80%;
}

.price {
  font-weight: bolder;
  letter-spacing: 0.2vw;
}
</style>
