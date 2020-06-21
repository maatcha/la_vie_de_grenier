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
          src="@/assets/nail_and_string.png"
          :key="this.nailAndStringImgId"
        />
        <div
          v-if="isOpen"
          class="montage-in-frame"
          :key="this.montageInFrameId"
        >
          <img
            id="montageInFrameImg"
            src="@/assets/montage_in_frame_quart.png"
            alt=""
            :key="this.montageInFrameImgId"
          />
        </div>
      </transition-group>

      <div id="the-shop">
        <h2>La Boutique</h2>
        <p>
          Nous recherchons actuellement un nouveau local pour vous accueillir.
        </p>
        <p>Afin que nous puissions vous communiquer l'adresse de</p>
        <p>
          la nouvelle boutique, merci de renseigner vos coordonnées
          <a class="link" href="#footer">juste ici</a>.
        </p>
        <p>En attendant, tous nos produits restent disponibles !!!</p>
        <p>
          Découvrez toutes nos nouveautés et promotions
          <router-link class="orange-link" :to="{ name: 'news' }">
            sur cette page</router-link
          >.
        </p>
      </div>

      <div class="news" v-show="publishedNewsList.length">
        <h2>Quelques unes de nos nouveautés...</h2>
        <div class="imgWrap">
          <div v-for="publishedNew in publishedNewsList" :key="publishedNew.id">
            <router-link :to="{ name: 'news' }">
              <img
                class="tiny-img"
                :src="publishedNew.img[publishedNew.img.length - 1]"
              />
            </router-link>
          </div>
        </div>
      </div>

      <div class="promotions" v-show="publishedPromotionsList.length">
        <h2>Un aperçu de nos offres de déstockage...</h2>
        <div class="imgWrap">
          <div
            v-for="publishedPromotion in publishedPromotionsList"
            :key="publishedPromotion.id"
          >
            <router-link :to="{ name: 'news' }">
              <img
                class="tiny-img"
                :src="publishedPromotion.img[publishedPromotion.img.length - 1]"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import firebase from 'firebase/app'
import Velocity from 'velocity-animate'

export default {
  data() {
    return {
      isOpen: false,
      montageInFrameImgId: 100001,
      montageInFrameId: 100002,
      nailAndStringImgId: 100003
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
  },
  computed: {
    ...mapState(['publishedNewsList', 'publishedPromotionsList'])
  }
}
</script>

<style scoped>
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

/* ----TRANSITIONS----- */
.montage-in-frame > img {
  width: 100%;
}

.orange-link {
  color: rgb(245, 117, 12);
}

.title h1 {
  word-spacing: 2vw;
  font-size: 5vw;
}

.subtitle {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.5vw;
}

.imgWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 3vw;
  padding-bottom: 3vw;
}

.imgWrap img {
  height: 15vw;
  margin-top: 1vw;
}

.promotions {
  word-spacing: 0.5vw;
  margin-top: 4vw;
}

.news {
  word-spacing: 0.5vw;
  margin-top: 4vw;
}

#the-shop {
  font-size: 2vw;
}

#the-shop > h2 {
  word-spacing: 0.5vw;
}

#the-shop > p {
  text-align: center;
}

@media (max-width: 500px) {
  h1 {
    font-size: 7vw !important;
  }

  .title {
    padding: 3vw;
  }

  #the-shop > h2 {
    font-size: 5vw;
  }

  .news > h2 {
    font-size: 4vw;
  }

  .promotions > h2 {
    font-size: 4vw;
  }
}
</style>
