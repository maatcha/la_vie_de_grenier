<template>
  <div class="container">
    <NotificationContainer />

    <label
      v-if="!imgUploaded"
      for="input"
      class="files-uploader-btn btn-treehouse"
      >Importer mes photos
      <input type="file" id="input" @change="previewImage" />
    </label>

    <form v-if="imgUploaded" class="news-publisher-form" @submit.prevent>
      <p>
        <label for="title">Titre :</label>
        <input id="title" size="10" v-model="title" />
      </p>

      <p>
        <label for="price">Prix :</label>
        <br />
        <input id="price" size="10" v-model="price" />
      </p>

      <p>
        <label for="description">Description :</label>
        <textarea id="description" size="10" v-model="description" />
      </p>

      <button
        :class="{
          disabledButton: !this.title || !this.price
        }"
        class="btn-mine"
        @click="publishNew"
      >
        Publier cette nouveauté
      </button>
    </form>
  </div>
</template>

<script>
import * as fb from '@/firebaseConfig.js'
import NProgress from 'nprogress'
import NotificationContainer from '@/components/NotificationContainer.vue'
export default {
  components: {
    NotificationContainer
  },
  data() {
    return {
      imgUploaded: false,
      title: '',
      price: null,
      description: ''
    }
  },
  methods: {
    toggleimgUploaded() {
      this.imgUploaded = !this.imgUploaded
    },
    previewImage() {
      const container = document.querySelector('.container')
      let preview = document.createElement('img')
      preview.id = 'img-preview'
      preview.width = 200
      preview.style.cssText =
        'display: block; margin-left: auto; margin-right: auto;'
      container.appendChild(preview)
      const reader = new FileReader()

      reader.onloadend = () => {
        preview.src = reader.result
      }

      if (this.file) {
        reader.readAsDataURL(this.file)
        this.toggleimgUploaded()
      } else {
        preview.src = ''
      }
    },
    publishNew() {
      NProgress.start()
      this.storeUrl()
        .then(url => this.saveToDatabase(url))
        .then(() => {
          NProgress.done()
          const notification = {
            type: 'success',
            message: `La nouveauté a été publiée avec succès !`
          }
          this.$store.dispatch('notification/add', notification)
        })
        .then(() => {
          const preview = document.querySelector('#img-preview')
          preview.remove()
          this.imgUploaded = false
        })
    },
    storeUrl() {
      const ref = fb.storage.ref()
      const file = this.file
      const name = +new Date() + '-' + file.name
      const metadata = {
        contentType: file.type
      }
      const task = ref.child(name).put(file, metadata)

      return task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .catch(error => {
          NProgress.done()
          const notification = {
            type: 'error',
            message:
              `Il y a eu un problème durant l'enregistrement de l'image : ` +
              error.message
          }
          this.$store.dispatch('notification/add', notification)
        })
    },
    saveToDatabase(url) {
      const imgToPublish = url
      const titleToPublish = this.title
      const priceToPublish = this.price
      const descriptionToPublish = this.description
      if (imgToPublish && titleToPublish && priceToPublish) {
        fb.publishedNewsCollection
          .add({
            createdOn: new Date(),
            img: imgToPublish,
            title: titleToPublish,
            price: priceToPublish,
            description: descriptionToPublish
          })
          .then(() => {
            this.title = ''
            this.price = ''
            this.description = ''
          })
          .catch(error => {
            NProgress.done()
            const notification = {
              type: 'error',
              message:
                `Il y a eu un problème durant la publication de votre nouveauté : ` +
                error.message
            }
            this.$store.dispatch('notification/add', notification)
          })
        // ----------------------------------------------------------------------------
      } else if (!imgToPublish) {
        alert("Il manque l'image, merci de réessayer")
      } else {
        alert(
          `Merci de remplir les champs 'Prix' et 'Titre' pour pouvoir publier la nouveauté`
        )
      }
    }
  },
  computed: {
    file() {
      return document.querySelector('input[type=file]').files[0]
    }
  }
}
</script>

<style scoped>
p,
button {
  margin: 1em;
}

.container {
  background-color: rgba(226, 231, 235, 1);
  box-shadow: 0px 2px 10px rgba(226, 231, 235, 0.7);
  margin-left: 12vw;
  margin-right: 12vw;
}

.files-uploader-btn {
  cursor: pointer;
}

.disabledButton {
  background: grey;
  opacity: 0.3;
}

#input {
  display: none;
}

#title {
  border-radius: 3px;
  width: 95%;
  margin: 1vw;
  margin-right: 1vw;
  /* padding: 1vw; */
}

#price {
  border-radius: 3px;
  width: 20%;
  margin: 1em;
}

#description {
  border-radius: 3px;
  width: 95%;
  height: 6em;
  margin: 1em;
}
</style>
