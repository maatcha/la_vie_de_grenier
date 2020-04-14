<template>
  <div id="footer">
    <slot>
      <div class="adress">
        <p>Retrouvez-nous au</p>
        <div>
          <p>23, rue Riquet</p>
          <p>31000</p>
          <p>TOULOUSE</p>
        </div>
        <div>
          <p>Tél</p>
          <p>06.43.85.97.22</p>
        </div>
      </div>
      <div id="footerRight">
        <div class="message">
          <p>! Restez informé du</p>
          <p id="locationSwitch">changement prochain de local</p>
          <p>en remplissant ce formulaire !</p>
        </div>
        <ContactForm></ContactForm>
        <div><p>Merci et à bientôt !</p></div>
      </div>
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
p {
  font-size: 2vw;
}

.message {
  font-size: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  line-height: 1.5vw;
}

.message > p {
  margin: 0.5vw;
}

.adress {
  font-size: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 2vw 0;
  border: 1px solid black;
  padding: 2vw;
  border-radius: 50px;
}
.adress > p {
  margin: 0.5vw;
}

#locationSwitch {
  text-decoration: underline;
}

#footer {
  background-color: rgba(54, 63, 72, 1);
  margin: none;
  color: rgba(226, 231, 235, 1);
  display: flex;
  justify-content: space-between;
  margin: 0 12vw;
  line-height: 80%;
}

#footerRight {
  margin: 1vw 0;
  border: 1px solid black;
  padding: 2vw;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

@media (max-width: 500px) {
  #footerRight {
    padding: 2vw 2vw 2vw 6vw;
  }
}
</style>
