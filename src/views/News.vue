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
    <div class="container">
      <h1>Voici nos dernières nouveautés !!!</h1>
      <div class="mosaic">
        <div
          class="col-4 article"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
        >
          <div>
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img[0]"
              @click="seeFullPublication(publishedNew.id)"
            />
            <p>cliquez sur l'image pour voir d'autres photos</p>

            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </div>
        </div>
        <!-- JUST FOR RENDERING ADJUSTMENTS -->
        <!-- ------------------------------------------------------------------------------------------------------------- -->
        <div
          class="col-4 article"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
        >
          <div>
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img[0]"
              @click="seeFullPublication(publishedNew.id)"
            />
            <p>cliquez sur l'image pour voir d'autres photos</p>

            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </div>
        </div>
        <div
          class="col-4 article"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
        >
          <div>
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img[0]"
              @click="seeFullPublication(publishedNew.id)"
            />
            <p>cliquez sur l'image pour voir d'autres photos</p>

            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </div>
        </div>
        <div
          class="col-4 article"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
        >
          <div>
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img[0]"
              @click="seeFullPublication(publishedNew.id)"
            />
            <p>cliquez sur l'image pour voir d'autres photos</p>

            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </div>
        </div>
        <div
          class="col-4 article"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
        >
          <div>
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img[0]"
              @click="seeFullPublication(publishedNew.id)"
            />
            <p>cliquez sur l'image pour voir d'autres photos</p>

            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </div>
        </div>
        <div
          class="col-4 article"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
        >
          <div>
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img[0]"
              @click="seeFullPublication(publishedNew.id)"
            />
            <p>cliquez sur l'image pour voir d'autres photos</p>

            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </div>
        </div>
        <div
          class="col-4 article"
          v-for="publishedNew in publishedNewsList"
          :key="publishedNew.id"
        >
          <div>
            <p>{{ publishedNew.createdOn | dateFromNow }}</p>
            <p>{{ publishedNew.title }}</p>
            <img
              class="tiny-img"
              :src="publishedNew.img[0]"
              @click="seeFullPublication(publishedNew.id)"
            />
            <p>cliquez sur l'image pour voir d'autres photos</p>

            <p>
              {{ publishedNew.price }}
            </p>
            <p>
              {{ publishedNew.description }}
            </p>
          </div>
        </div>
        <!-- ------------------------------------------------------------------------------------------------------------- -->
      </div>
      <hr />

      <h1>Et voici nos offres de déstockage du moment !!!</h1>
      <div class="mosaic">
        <div
          class="col-4 article"
          v-for="publishedPromotion in publishedPromotionsList"
          :key="publishedPromotion.id"
        >
          <p>{{ publishedPromotion.createdOn | dateFromNow }}</p>
          <p>{{ publishedPromotion.title }}</p>
          <img
            class="tiny-img"
            :src="publishedPromotion.img[0]"
            @click="seeFullPublication(publishedPromotion.id)"
          />
          <p>cliquez sur l'image pour voir d'autres photos</p>
          <p>
            {{ publishedPromotion.price }}
          </p>
          <p>
            {{ publishedPromotion.description }}
          </p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    seeFullPublication(publicationId) {
      console.log(publicationId)
    }
  },
  computed: {
    ...mapState(['publishedNewsList', 'publishedPromotionsList'])
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Courgette', cursive, sans-serif;
}

.mosaic {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.article {
  border: solid black 1px;
  list-style: none;
  float: left;
  padding: 15px;
}

.tiny-img {
  max-height: 50%;
  max-width: 80%;
}

.full-screen-img {
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
</style>
