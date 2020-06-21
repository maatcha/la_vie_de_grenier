<template>
  <div class="full-publication">
    <label for="back-button">
      <img src="@/assets/back-arrow-hi.png" alt="" />
    </label>
    <div>
      <h1>{{ publishedNewOrPromotion.title }}</h1>

      <p>{{ publishedNewOrPromotion.description }}</p>
      <p>Réference article : {{ publishedNewOrPromotion.ref }}</p>
      <p
        v-show="publishedNewOrPromotion.publicationType === 'nouveauté'"
        class="price"
      >
        PRIX : {{ publishedNewOrPromotion.price }}
      </p>
      <p
        v-show="
          publishedNewOrPromotion.publicationType === 'promotion' &&
            publishedNewOrPromotion.oldPrice
        "
        class="price"
      >
        PRIX :
        <span class="oldPrice">{{ publishedNewOrPromotion.oldPrice }}</span>
      </p>
      <p
        v-show="publishedNewOrPromotion.publicationType === 'promotion'"
        class="price"
      >
        PRIX SOLDE : {{ publishedNewOrPromotion.price }}
      </p>
      <button class="book-button" @click="toggleBookingView">
        RESERVER MAINTENANT
      </button>
    </div>

    <button id="back-button" @click="returnToList"></button>
    <p v-show="showBooking" class="booking">
      CET ARTICLE VOUS PLAIT ? RESERVEZ-LE VITE EN APPELANT JULIE AU
      06.43.85.97.22. <br />
      En cas de non-réponse, envoyez lui vos coordonnées ainsi que la référence
      de l'article par SMS
    </p>
    <div class="mosaic">
      <img
        class="photo"
        v-for="(publicationImage, index) in publishedNewOrPromotion.img"
        :src="publicationImage"
        :key="index"
      />
    </div>
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
      showBooking: false
    }
  },
  methods: {
    returnToList() {
      this.$emit('return-to-list')
    },
    toggleBookingView() {
      this.showBooking = !this.showBooking
    }
  }
}
</script>

<style scoped>
.booking {
  font-family: cursive, sans-serif;
  font-weight: bolder;
  margin: 0vw auto 2vw;
}

.full-publication {
  max-width: 100%;
  padding: 15px;
  margin: 1vw;
  border-radius: 10%;
  border: solid black 1px;
  background: rgba(54, 63, 72, 1);
  list-style: none;
  text-align: center;
  color: aliceblue;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.photo {
  max-width: 80%;
}

.price {
  font-weight: bolder;
  letter-spacing: 0.2vw;
}

.oldPrice {
  text-decoration: line-through red wavy;
}

.book-button {
  height: 3vw;
  width: 15vw;
  margin-bottom: 2vw;
  border-radius: 10%;
  background: lightgreen;
  cursor: pointer;
}

#back-button {
  opacity: 0;
}

label,
label img {
  width: 5vw;
  cursor: pointer;
  margin-left: 1vw;
}

@media (max-width: 500px) {
  h1 {
    font-size: 8vw;
  }

  p {
    font-size: 5vw;
  }

  img {
    width: 200% !important;
  }

  .book-button {
    height: 15vw;
    width: 40vw;
    margin-bottom: 2vw;
    border-radius: 10%;
    background: lightgreen;
    cursor: pointer;
    font-size: 4vw;
    font-weight: bold;
  }

  .booking {
    line-height: 4.5vw;
  }
}

@media (min-width: 500px) and (max-width: 900px) {
  h1 {
    font-size: 7vw;
  }

  p {
    font-size: 3vw;
  }

  img {
    width: 150% !important;
  }

  .book-button {
    height: 10vw;
    width: 30vw;
    margin-bottom: 2vw;
    border-radius: 10%;
    background: lightgreen;
    cursor: pointer;
    font-size: 3vw;
    font-weight: bold;
  }

  .booking {
    line-height: 4.5vw;
  }
}
</style>
