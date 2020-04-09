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
      <p>
        <button
          :class="{
            disabledButton: !this.title || !this.price || !this.description
          }"
          class="btn-mine"
          @click="publishNew"
        >
          Publier cette nouveauté
        </button>
      </p>
      <img id="storedImg" src="" alt="" />
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
      // const file = document.querySelector('input[type=file]').files[0]
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
    storeUrl() {
      const ref = fb.storage.ref()
      const file = this.file
      console.log(file.size)

      const name = +new Date() + '-' + file.name
      const metadata = {
        contentType: file.type
      }
      const task = ref.child(name).put(file, metadata)
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(url)
          document.querySelector('#storedImg').src = url
          this.saveToDatabase(url)
        })
        .catch(console.error)
    },
    saveToDatabase(url) {
      const fileToPublish = url
      const titleToPublish = this.title
      const priceToPublish = this.price
      const descriptionToPublish = this.description
      if (
        fileToPublish &&
        titleToPublish &&
        priceToPublish &&
        descriptionToPublish
      ) {
        // -----------------------------------------------------
        // console.log(this.file)
        // console.log(fileToPublish)
        // const zip = new jsZip()
        // const compressed = zip.file('photo.png', fileToPublish)
        // console.log(compressed)
        // ---------------------------------------------------------------------------
        fb.publishedNewsCollection
          .add({
            createdOn: new Date(),
            file: fileToPublish,
            title: titleToPublish,
            price: priceToPublish,
            description: descriptionToPublish
          })
          .then(() => {
            this.title = ''
            this.price = ''
            this.description = ''
            // img.src = ''
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
      } else if (!fileToPublish) {
        alert("Il manque l'image, merci de réessayer")
      } else {
        alert(
          'Merci de remplir tous les champs pour pouvoir publier la nouveauté'
        )
      }
    },
    publishNew() {
      this.storeUrl()
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

.disabledButton {
  background: grey;
  opacity: 0.3;
}

#input {
  display: none;
}

#title {
  border-radius: 3px;
  width: 90%;
  margin: 1em;
}

#price {
  border-radius: 3px;
  width: 20%;
  margin: 1em;
}

#description {
  border-radius: 3px;
  width: 90%;
  height: 6em;
  margin: 1em;
}
</style>
