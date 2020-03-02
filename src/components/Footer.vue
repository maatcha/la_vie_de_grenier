<template>
  <div id="footer">
    <slot>
      <div class="adress">
        <p>Retrouvez-nous :</p>
        <p>23, rue Riquet</p>
        <p>31000 TOULOUSE</p>
        <p>Tél : 06.43.85.97.22</p>
      </div>
      <div class="message">
        <p>! Restez informé du</p>
        <p>changement prochain</p>
        <p>de local en remplissant</p>
        <p>ce formulaire !</p>
      </div>
      <ContactForm></ContactForm>
    </slot>
  </div>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'

export default {
  components: {
    ContactForm
  }
}
</script>

<style scoped>
#footer {
  /* height: 12vh; */
  background-color: rgba(54, 63, 72, 1);
  margin: none;
  color: rgba(226, 231, 235, 1);
  display: flex;
  justify-content: space-between;
  margin: 0 12vw;
  line-height: 80%;
}

.message {
  font-size: 1vw;
  /* flex-grow: 1 1 auto; */
}

.adress {
  /* flex-grow: 1 1 auto; */
  font-size: 2vw;
  line-height: 80%;
}
</style>
