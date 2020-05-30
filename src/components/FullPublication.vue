<template>
  <!-- <transition-group @before-enter="beforeEnter" @enter="enter" :css="false"> -->
  <div class="full-publication">
    <label for="back-button">
      <img src="@/assets/back-arrow-hi.png" alt="" />
    </label>
    <div>
      <!-- <p>{{ publishedNewOrPromotion.createdOn | dateFromNow }}</p> -->
      <h1>{{ publishedNewOrPromotion.title }}</h1>

      <p>{{ publishedNewOrPromotion.description }}</p>
      <p>Réference article : {{ publishedNewOrPromotion.id }}</p>
      <p class="price">PRIX : {{ publishedNewOrPromotion.price }}</p>
      <button class="book-button" @click="toggleBookingView">
        RESERVER MAINTENANT
      </button>
    </div>

    <button id="back-button" @click="returnToList"></button>
    <p v-show="bookingView" class="booking">
      CET ARTICLE VOUS PLAIT ? RESERVEZ-LE VITE EN APPELANT JULIE AU
      06.43.85.97.22. <br />
      En cas de non-réponse, envoyez vos coordonnées ainsi que la référence de
      l'article par SMS
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
  <!-- </transition-group> -->
</template>

<script>
// import gsap from 'gsap'
export default {
  props: {
    publishedNewOrPromotion: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      bookingView: false
    }
  },
  methods: {
    returnToList() {
      this.$emit('return-to-list')
    },
    toggleBookingView() {
      this.bookingView = !this.bookingView
    }
  }
  // ,
  // beforeEnter(el) {
  //   el.style.transform = 'scale(0,0)'
  // },
  // enter(el, done) {
  //   gsap.to(el, {
  //     duration: 10,
  //     opacity: 1,
  //     scale: 1,
  //     ease: 'power1',
  //     onComplete: done
  //   })
  // }
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
  /* opacity: 1; */
  width: 5vw;
  cursor: pointer;
  margin-left: 1vw;
}
</style>
