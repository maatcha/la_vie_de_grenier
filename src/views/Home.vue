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

      <div class="montage-in-frame">
        <img src="montage_in_frame_2.png" alt="" />
      </div>

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

export default {
  components: {
    Footer,
    Navbar,
    NotificationContainer
  },
  created() {
    console.log(firebase.auth().currentUser)
  }
}
</script>

<style scoped>
.container {
  /* height: 100vh; */
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
}

.montage-in-frame {
  display: flex;
  justify-content: center;
  margin: 1vw 3vw;
}

.montage-in-frame > img {
  width: 68vw;
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
