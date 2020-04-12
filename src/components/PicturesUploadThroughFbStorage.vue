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

    <form v-if="imgUploaded" class="publisher-form" @submit.prevent>
      <p>
        <label for="publicationType"
          >S'agit-il d'une nouveauté ou d'une promotion ?</label
        >
        <select
          id="publicationType"
          v-model="publicationType"
          :class="{
            news: this.publicationType === 'nouveauté',
            promotion: this.publicationType === 'promotion'
          }"
        >
          <option value="nouveauté" class="news">Nouveauté</option>
          <option value="promotion" class="promotion">Promotion</option>
        </select>
      </p>

      <p>
        <label for="title">Titre :</label>
        <input
          id="title"
          size="10"
          v-model="title"
          :class="{
            news: this.publicationType === 'nouveauté',
            promotion: this.publicationType === 'promotion'
          }"
        />
      </p>

      <p>
        <label for="price">Prix :</label>
        <br />
        <input
          id="price"
          size="10"
          v-model="price"
          :class="{
            news: this.publicationType === 'nouveauté',
            promotion: this.publicationType === 'promotion'
          }"
        />
      </p>

      <p>
        <label for="description">Description :</label>
        <textarea
          id="description"
          size="10"
          v-model="description"
          :class="{
            news: this.publicationType === 'nouveauté',
            promotion: this.publicationType === 'promotion'
          }"
        />
      </p>

      <button
        :class="{
          disabledButton: !this.title || !this.price || !this.publicationType,
          news: this.publicationType === 'nouveauté',
          promotion: this.publicationType === 'promotion'
        }"
        class="btn-mine"
        @click="publishNew"
      >
        Publier cette {{ this.publicationType }}
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
      publicationType: '',
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
        .then(url => {
          if (!url) {
            throw new Error(`Défaut d'autorisation`)
          }
          this.saveToDatabase(url)
        })
        .then(() => {
          NProgress.done()
          const notification = {
            type: 'success',
            message: `La ${this.publicationType} a été publiée avec succès !`
          }
          this.$store.dispatch('notification/add', notification)
        })
        .then(() => {
          const preview = document.querySelector('#img-preview')
          preview.remove()
          this.publicationType = ''
          this.imgUploaded = false
        })
        .catch(error => {
          this.publicationError(error)
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
        .then(snapshot => {
          return snapshot.ref.getDownloadURL()
        })
        .catch(error => {
          this.publicationError(error)
        })
      //   fetch(myRequest).then(function(response) {
      // console.log(response.status); // returns 200
      // response.blob().then(function(myBlob) {
      //   var objectURL = URL.createObjectURL(myBlob);
      //   myImage.src = objectURL;
    },
    saveToDatabase(url) {
      const publicationTypeToPublish = this.publicationType
      const imgToPublish = url
      const titleToPublish = this.title
      const priceToPublish = this.price
      const descriptionToPublish = this.description
      if (imgToPublish && titleToPublish && priceToPublish) {
        fb.publishedNewsCollection
          .add({
            createdOn: new Date(),
            publicationType: publicationTypeToPublish,
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
        // ----------------------------------------------------------------------------
      } else if (!imgToPublish) {
        throw new Error(`Il manque l'image, merci de réessayer`)
      } else {
        throw new Error(
          `Merci de remplir les champs 'Type de publication', 'Prix' et 'Titre' pour pouvoir publier`
        )
      }
    },
    publicationError(error) {
      NProgress.done()
      const notification = {
        type: 'error',
        message:
          `Il y a eu un problème durant la publication de votre ${this.publicationType} : ` +
          error.message
      }
      this.$store.dispatch('notification/add', notification)
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
p {
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

.news {
  background-color: #283373;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.promotion {
  background-color: #45d37f;
  color: black;
  font-weight: bold;
  font-size: 14px;
}

.disabledButton {
  background: grey;
  opacity: 0.3;
}

.publisher-form {
}

.publisher-form > p {
  display: flex;
  flex-direction: column;
}

.publisher-form > p > label {
  margin: 1vw;
}

#publicationType {
  border-radius: 3px;
  width: 12em;
  margin: 0 1vw;
  letter-spacing: 0.1vw;
  font-family: 'Courgette', cursive, sans-serif;
  font-size: 14px;
}

#publicationType:hover {
  cursor: pointer;
}

#title {
  border-radius: 3px;
  width: 95%;
  margin: 0 1vw;
}

#price {
  border-radius: 3px;
  width: 30%;
  margin: 0 1vw;
}

#description {
  border-radius: 3px;
  width: 95%;
  height: 6em;
  margin: 0 1vw;
}

#input {
  display: none;
}
</style>
