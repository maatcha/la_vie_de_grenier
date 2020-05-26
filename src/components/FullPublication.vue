<template>
  <!-- <transition @before-enter="beforeEnter" @enter="enter" :css="false"> -->
  <div class="full-publication">
    <p>{{ publishedNewOrPromotion.createdOn | dateFromNow }}</p>
    <p>{{ publishedNewOrPromotion.title }}</p>

    {{ publishedNewOrPromotion.description }}
    <p class="price">PRIX : {{ publishedNewOrPromotion.price }}</p>
    <button class="book-button" @click="toggleBookingView">
      RESERVER MAINTENANT
    </button>
    <button class="back-button" @click="returnToList">
      RETOUR A LA LISTE
    </button>
    <p v-show="bookingView">
      CET ARTICLE VOUS PLAIT ? RESERVEZ-LE VITE EN APPELANT JULIE AU
      06.43.85.97.22
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
  <!-- </transition> -->
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
.full-publication {
  max-width: 100%;
  padding: 15px;
  margin: 1vw;
  border-radius: 20%;
  border: solid black 1px;
  background: rgba(54, 63, 72, 1);
  list-style: none;
  text-align: center;
  color: aliceblue;
  cursor: pointer;
  position: relative;
}

.photo {
  max-width: 80%;
}

.price {
  font-weight: bolder;
  letter-spacing: 0.2vw;
}

.book-button {
  height: 15vw;
  width: 15vw;
  top: 32vh;
  right: 4vw;
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  background: lightgreen;
}

.back-button {
  height: 15vw;
  width: 15vw;
  top: 32vh;
  left: 4vw;
  position: absolute;
  z-index: 1;
  border-radius: 50%;
  background: red;
}
</style>
