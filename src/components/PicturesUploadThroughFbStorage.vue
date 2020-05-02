<template>
  <div class="container">
    <NotificationContainer />
    <div class="previews-container"></div>

    <label
      v-if="!imgUploaded"
      for="input"
      class="files-uploader-btn btn-treehouse"
      >Importer mes photos
      <input
        type="file"
        multiple
        id="input"
        @change="previewFilesAndStockImagesInArray"
      />
    </label>

    <form v-else class="publisher-form" @submit.prevent>
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
      <button @click="consoleLog">
        Console log
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
      description: '',
      objectToPublish: {},
      imageUrlsArray: [],
      imagesArray: []
    }
  },
  computed: {
    filesToStore() {
      return document.querySelector('input[type=file]').files
    }
  },
  methods: {
    previewFilesAndStockImagesInArray() {
      this.filesToStore.forEach((file, index) => {
        const previewElt = this.createPreviewElementAndCloseButton(file, index)

        let image = new Image()
        image.name = file.name
        const reader = new FileReader()

        reader.onloadend = () => {
          image.src = reader.result
          previewElt.src = reader.result
        }
        if (file) {
          reader.readAsDataURL(file)
          this.imagesArray.push(image)
        } else {
          previewElt.src = ''
          image.src = ''
        }
      })
      this.toggleimgUploaded()
    },
    toggleimgUploaded() {
      this.imgUploaded = !this.imgUploaded
    },
    createPreviewElementAndCloseButton(file, index) {
      const previewsContainer = document.querySelector('.previews-container')

      let previewAndbutton = document.createElement('div')
      previewAndbutton.classList.add('col-4')
      previewsContainer.appendChild(previewAndbutton)

      let preview = document.createElement('img')
      preview.id = `img-preview-number-${index}`
      preview.classList.add('col-4')
      preview.scale = 1
      previewAndbutton.appendChild(preview)

      let closePreviewButton = document.createElement('button')
      closePreviewButton.id = `close-preview-number-${index}`
      closePreviewButton.width = 100
      closePreviewButton.innerText = 'X'
      closePreviewButton.addEventListener('click', () => {
        closePreviewButton.remove()
        preview.remove()

        let filteredImagesArray = this.imagesArray.filter(
          image => image.name !== file.name
        )
        this.imagesArray = filteredImagesArray

        // this.updateFilesToStore(this.imagesArray)

        console.log(this.filesToStore)
        console.log(this.imagesArray)

        previewAndbutton.remove()
        if (!this.imagesArray.length) {
          // this.imagesArray = []
          // const drewCanvas = document.querySelector('#canvas')
          // drewCanvas.remove()
          this.toggleimgUploaded()
        }
      })
      closePreviewButton.style.cssText =
        'position: relative; bottom: 42px; right: 25px;'
      previewAndbutton.appendChild(closePreviewButton)

      return preview
    },
    publishNew() {
      NProgress.start()

      this.connectionTest()

      this.resize().then(smallBlob => this.storeImages(smallBlob))

      // this.saveToDatabase()
    },
    consoleLog() {
      console.log(this.imageUrlsArray)
      this.saveToDatabase()
    },
    resize() {
      const image = this.imagesArray[0]
      const container = document.querySelector('.container')

      let canvas = document.createElement('canvas')
      container.appendChild(canvas)
      canvas.id = 'canvas'
      canvas.max_size = 544
      canvas
        .getContext('2d')
        .drawImage(image, 0, 0, canvas.width, canvas.height)
      const drewCanvas = document.querySelector('#canvas')
      return new Promise((resolve, reject) => {
        drewCanvas.toBlob((blob, error) => {
          blob.id = 'resized-image'
          blob.name = 'small-' + image.name
          if (error) {
            reject(error)
          } else {
            resolve(blob)
          }
        })
      })
    },
    storeImages(smallBlob) {
      try {
        this.objectToPublish = {
          publicationTypeToPublish: this.publicationType,
          titleToPublish: this.title,
          priceToPublish: this.price,
          descriptionToPublish: this.description
        }
        if (
          !this.objectToPublish.publicationTypeToPublish ||
          !this.objectToPublish.titleToPublish ||
          !this.objectToPublish.priceToPublish
        ) {
          throw new Error(
            `Merci de remplir les champs 'Type de publication', 'Prix' et 'Titre' pour pouvoir publier`
          )
        }
      } catch (error) {
        return this.publicationError(error)
      }
      this.filesToStore.forEach(file => {
        this.storeFileOrBlob(file)
      })
      this.storeFileOrBlob(smallBlob)
      this.imagesArray = []
    },
    storeFileOrBlob(file) {
      const ref = fb.storage.ref()
      const name = +new Date() + '-' + file.name
      const metadata = {
        contentType: file.type
      }
      const task = ref.child(name).put(file, metadata)
      task
        .then(snapshot => {
          let imageUrl = snapshot.ref.getDownloadURL()
          this.imageUrlsArray.push(imageUrl)
          console.log('stored')
        })
        .catch(() => {
          throw new Error(`Défaut d'autorisation ou d'espace de stockage`)
        })
    },
    saveToDatabase() {
      console.log(this.imageUrlsArray)
      const imageUrlsArray = this.imageUrlsArray.map(url => url.i)
      console.log(imageUrlsArray)
      debugger
      if (
        imageUrlsArray &&
        this.objectToPublish.publicationTypeToPublish &&
        this.objectToPublish.titleToPublish &&
        this.objectToPublish.priceToPublish
      ) {
        fb.publishedNewsCollection
          .add({
            img: imageUrlsArray,
            createdOn: new Date(),
            title: this.objectToPublish.titleToPublish,
            price: this.objectToPublish.priceToPublish,
            description: this.objectToPublish.descriptionToPublish,
            publicationType: this.objectToPublish.publicationTypeToPublish
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
            this.clearData()
          })
          .catch(() => {
            throw new Error(`Défaut d'autorisation ou d'espace de stockage`)
          })
          .catch(error => {
            return this.publicationError(error)
          })
      } else if (!imageUrlsArray) {
        throw new Error(`Il manque la (les) image(s), merci de réessayer`)
      }
    },
    clearData() {
      const preview = document.querySelector('#img-preview')
      preview.remove()
      this.publicationType = ''
      this.title = ''
      this.price = ''
      this.description = ''
      this.objectToPublish = {}
      this.imgUploaded = false
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
    },
    connectionTest() {
      const testRequest = new Request('fb')
      fetch(testRequest)
        .catch(() => {
          throw new Error(`Impossible d'établir la connexion`)
        })
        .catch(error => {
          this.publicationError(error)
        })
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
