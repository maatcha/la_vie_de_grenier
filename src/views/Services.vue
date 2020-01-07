<template>
  <div class="wrapper">
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
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
h1 {
  font-family: 'Courgette', cursive, sans-serif;
  font-size: 3vw;
}

.title {
  padding-top: 3vw;
  margin: 3vw;
  text-align: center;
}

.depot-vente {
  margin: 3vw;
  padding: 3vw;
  text-align: center;
  font-size: 1.5vw;
}

.debarras {
  /* margin-top: 0px; */
  margin: 3vw 3vw;
  padding-top: 0vw;
  padding-bottom: 3vw;
  text-align: center;
  font-size: 1.5vw;
  /* margin-bottom: 10vw; */
}

.container {
  background-color: rgba(226, 231, 235, 1);
  box-shadow: 0px 2px 10px rgba(226, 231, 235, 0.7);
  margin-left: 12vw;
  margin-right: 12vw;
}

.wrapper {
  background-color: rgba(54, 63, 72, 1);
  padding-top: 7.5vw;
  padding-bottom: 7.5vw;
  /* margin: 3vw; */
}
</style>
