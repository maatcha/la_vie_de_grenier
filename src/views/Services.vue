<template>
  <div>
    <Navbar>
      <div slot="left" class="navbar-links-group">
        <router-link class="navbar-link" :to="{ name: 'home' }"
          >Retour à l'accueil</router-link
        >
      </div>
    </Navbar>
    <div class="container">
      <h1 class="title">Présentation de nos services</h1>
      <div class="depot-vente">
        <h2>Le dépôt-vente</h2>
        <p>Déposez vos objets, meubles, tableaux directement en boutique...</p>
        <p>
          ou prenez un rendez-vous au 06.43.85.97.22 si vous optez pour une
          collecte à domicile !
        </p>
        <p>
          Le paiement sera effectué le dernier jour du mois de vente de l'objet
        </p>
        <p>
          (notre commission varie entre 30% et 40% du prix de vente en
          boutique).
        </p>
      </div>
      <div class="debarras">
        <h2>Le débarras</h2>
        <p>
          Contactez-nous au 06.43.85.97.22 pour le débarras d'une maison, cave
          ou grenier...
        </p>
        <p>
          et nous établirons ensemble un devis, sur place ou d'après photos, en
          fonction de la surface à vider et de son contenu.
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Courgette', cursive, sans-serif;
  /* margin-bottom: 1vw; */
}

.depot-vente {
  margin: 3vw;
  padding: 3vw;
  text-align: center;
  font-size: 1.5vw;
}

.debarras {
  margin: 0vw 3vw;
  padding-top: 0vw;
  padding-bottom: 3vw;
  text-align: center;
  font-size: 1.5vw;
}
</style>
