<template>
  <div>
    <NotificationContainer />
    <Navbar />
    <div class="container">
      <div class="title">
        <h1>La Vie De Grenier</h1>
      </div>

      <div class="subtitle">
        <h2>Brocante</h2>
        <h2>Dépôt-Vente</h2>
        <h2>Débarras</h2>
      </div>
      <transition-group
        id="transitionGroup"
        @before-enter="beforeFrameEnter"
        @enter="frameEnter"
        :css="false"
      >
        <img
          id="nailAndStringImg"
          src="nail_and_string.png"
          :key="this.nailAndStringImgId"
        />
        <div
          v-if="isOpen"
          class="montage-in-frame"
          :key="this.montageInFrameId"
        >
          <img
            id="montageInFrameImg"
            src="montage_in_frame_quart.png"
            alt=""
            :key="this.montageInFrameImgId"
          />
        </div>
      </transition-group>

      <div id="the-shop">
        <h2>La Boutique</h2>
        <p>
          Julie vous ouvre la Boutique du Mardi au Vendredi de 10h00 à 19h00,
        </p>
        <p>ainsi que le Samedi et le Dimanche matins,</p>
        <p>au 23, rue Riquet 31000 TOULOUSE.</p>
        <p>Venez vite découvrir les curiosités du moment !</p>
      </div>

      <p class="news">
        <img src="orange_bike.jpeg" alt="" />
        <img src="shelf.jpeg" alt="" />
        <img src="green_bike.jpeg" alt="" />
        <img src="red_bike.jpeg" alt="" />
        <img src="tesla_bike.jpeg" alt="" />
        <img src="table.jpeg" alt="" />
      </p>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import firebase from 'firebase/app'
import Velocity from 'velocity-animate'

export default {
  data() {
    return {
      isOpen: false,
      montageInFrameImgId: 1001,
      montageInFrameId: 1000,
      nailAndStringImgId: 1002
    }
  },
  components: {
    Footer,
    Navbar,
    NotificationContainer
  },
  mounted() {
    console.log(firebase.auth().currentUser)
    setTimeout(() => {
      this.isOpen = true
    }, 400)
    setTimeout(() => {
      document.querySelector('#nailAndStringImg').style.opacity = 1
    }, 3000)
  },
  methods: {
    beforeFrameEnter(el) {
      el.style.opacity = 0
      el.style.width = '0vw'
    },
    frameEnter(el, done) {
      Velocity(
        el,
        { opacity: 1, width: '70vw' },
        { delay: 100, duration: 600, easing: 'easeInQuad', complete: done }
      )
    }
  }
}
</script>

<style scoped>
.montage-in-frame > img {
  width: 100%;
}
/* ----TRANSITIONS----- */
#transitionGroup {
  position: relative;
}

@media (min-width: 901px) {
  #nailAndStringImg {
    width: 42vw !important;
    position: absolute;
    z-index: 0;
    top: -7vw;
    left: 15vw;
    animation-duration: 3.5s;
    animation-name: moving-string;
    animation-delay: 0.7s;
    opacity: 0;
  }
}

@media (max-width: 900px) {
  #nailAndStringImg {
    width: 37vw !important;
    position: absolute;
    z-index: 0;
    top: -7vw;
    left: 18vw;
    animation-duration: 3.5s;
    animation-name: moving-string;
    animation-delay: 0.7s;
    opacity: 0;
  }
}

.montage-in-frame {
  position: relative;
  margin: 5vw auto;
  animation-duration: 3.5s;
  animation-name: moving-frame;
  animation-delay: 0.4s;
}

@keyframes moving-frame {
  17% {
    transform: rotate(7deg) translateX(-30em);
  }
  38% {
    transform: rotate(-7deg) translateX(30em);
  }
  60% {
    transform: rotate(4deg) translateX(-10em);
  }
  75% {
    transform: rotate(-2deg) translateX(5em);
  }
}

@keyframes moving-string {
  62% {
    opacity: 0;
    transform: rotate(20deg);
  }
  65% {
    opacity: 0.5;
  }
  80% {
    opacity: 1;
    transform: rotate(-20deg);
  }
  100% {
    opacity: 1;
  }
}

/* ----TRANSITIONS----- */

.container {
  background-color: rgba(226, 231, 235, 1);
  margin-left: 12vw;
  margin-right: 12vw;
  box-shadow: 0px 2px 10px rgba(226, 231, 235, 0.7);
}

.title {
  text-align: center;
  padding-top: 10px;
  font-size: 2.5vw;
  word-spacing: 2vw;
  margin: 1vw 3vw;
  padding-top: 2vw;
  font-family: 'Satisfy', cursive, sans-serif;
}

.subtitle {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5vw;
  z-index: 2;
}
.subtitle > h2 {
  z-index: 2;
}

.news {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 3vw;
  padding-bottom: 3vw;
}

.news > img {
  height: 15vw;
  /* width: 25vw; */
  margin-top: 1vw;
}

#the-shop {
  font-size: 2vw;
}

#the-shop > p {
  text-align: center;
}
</style>
