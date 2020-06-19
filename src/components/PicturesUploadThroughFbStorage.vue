<template>
  <div class="container">
    <div class="previews-container"></div>

    <label
      v-show="!imgUploaded && !selectionValidated && !mainImageSelected"
      for="main-input"
      class="files-uploader-btn btn-treehouse"
      >Importer la photo principale
      <input type="file" id="main-input" @change="previewFilesAndStockImage" />
    </label>

    <label
      v-show="!imgUploaded && !selectionValidated && mainImageSelected"
      for="input"
      class="files-uploader-btn btn-treehouse"
      >Importer des photos complémentaires
      <input
        type="file"
        multiple
        id="input"
        @change="previewFilesAndStockImagesInArray"
      />
    </label>

    <form
      v-show="imgUploaded && selectionValidated"
      class="publisher-form"
      @submit.prevent
    >
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
        <label for="price">Prix de vente :</label>
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

      <p v-if="this.publicationType === 'promotion'">
        <label for="oldPrice">Ancien Prix :</label>
        <input
          id="oldPrice"
          size="10"
          v-model="oldPrice"
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
        type="submit"
        :disabled="!this.title || !this.price || !this.publicationType"
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
      <button class="btn-mine" @click="clearData">
        ANNULER LA PUBLICATION
      </button>
    </form>
    <button
      v-show="imgUploaded && !selectionValidated"
      class="btn-mine"
      @click="validateSelectionAndMinifyTheFirst"
    >
      Valider cette Sélection
    </button>
    <button
      v-show="imgUploaded && !selectionValidated"
      class="submit-button"
      @click="clearData"
    >
      Annuler la publication
    </button>
  </div>
</template>

<script>
import mixin from '@/mixins/mixin'
import * as fb from '@/firebaseConfig.js'
import NProgress from 'nprogress'
export default {
  mixins: [mixin],
  data() {
    return {
      imgUploaded: false,
      selectionValidated: false,
      mainImageSelected: false,
      publicationType: '',
      title: '',
      price: null,
      oldPrice: null,
      description: '',
      objectToPublish: {},
      imageUrlsArray: [],
      imagesArray: [],
      filesToStore: []
    }
  },
  methods: {
    previewFilesAndStockImage() {
      this.imagesArray = []
      const mainInput = document.querySelector('#main-input')
      let file = mainInput.files[0]
      let previewElt = this.createPreviewElementAndCloseButton(file)

      this.convertToImage(file, previewElt)

      this.mainImageSelected = true
    },

    previewFilesAndStockImagesInArray() {
      const input = document.querySelector('#input')
      this.filesToStore = input.files

      this.filesToStore.forEach(file => {
        const previewElt = this.createPreviewElementAndCloseButton(file)

        this.convertToImage(file, previewElt)
      })
      this.toggleimgUploaded()
    },

    convertToImage(file, previewElt) {
      let image = new Image()
      image.name = file.name
      let reader = new FileReader()

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
    },

    toggleimgUploaded() {
      this.imgUploaded = !this.imgUploaded
    },

    createPreviewElementAndCloseButton(file) {
      const previewsContainer = document.querySelector('.previews-container')

      let previewAndbutton = document.createElement('div')
      previewAndbutton.classList.add('col-4', 'preview')
      previewsContainer.appendChild(previewAndbutton)

      let preview = document.createElement('img')
      preview.classList.add('col-4')
      preview.scale = 1
      previewAndbutton.appendChild(preview)

      let closePreviewButton = document.createElement('button')
      closePreviewButton.classList.add('preview-closer')
      closePreviewButton.width = 100
      closePreviewButton.innerText = 'X'
      closePreviewButton.addEventListener('click', () => {
        closePreviewButton.remove()
        preview.remove()

        let filteredImagesArray = this.imagesArray.filter(
          image => image.name !== file.name
        )
        this.imagesArray = filteredImagesArray

        previewAndbutton.remove()
        if (this.imagesArray.length === 1) {
          this.imgUploaded = false
        }
        if (!this.imagesArray.length) {
          this.mainImageSelected = false
          this.imgUploaded = false
          this.selectionValidated = false
          this.filesToStore = []
        }
      })
      closePreviewButton.style.cssText =
        'position: relative; bottom: 42px; right: 25px;'
      previewAndbutton.appendChild(closePreviewButton)

      return preview
    },

    validateSelectionAndMinifyTheFirst() {
      NProgress.start()

      this.connectionTest()

      this.resize().then(smallBlob => this.storeImages(smallBlob))

      const previewClosers = document.querySelectorAll('.preview-closer')
      for (let previewCloser of previewClosers) {
        previewCloser.remove()
      }

      NProgress.done()

      this.selectionValidated = true
    },

    resize() {
      const image = this.imagesArray[0]
      const container = document.querySelector('.container')

      let canvas = document.createElement('canvas')
      container.appendChild(canvas)
      canvas.id = 'canvas'
      let ratio = this.imagesArray[0].width / this.imagesArray[0].height
      if (this.imagesArray[0].width <= this.imagesArray[0].height) {
        canvas.height = 300
        canvas.width = canvas.height * ratio
      } else {
        canvas.width = 300
        canvas.height = canvas.width / ratio
      }
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
      this.storeFileOrBlob(smallBlob)
      this.filesToStore.forEach(file => {
        this.storeFileOrBlob(file)
      })
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

    publishNew() {
      NProgress.start()
      this.connectionTest()

      try {
        this.objectToPublish = {
          publicationTypeToPublish: this.publicationType,
          titleToPublish: this.title,
          priceToPublish: this.price,
          oldPriceToPublish: this.oldPrice,
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

      const imageUrlsArray = this.imageUrlsArray.map(url => url.i)
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
            oldPrice: this.objectToPublish.oldPriceToPublish,
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
      const previews = document.querySelectorAll('.preview')
      const canvas = document.querySelector('#canvas')
      for (let preview of previews) {
        preview.remove()
      }
      if (canvas) {
        canvas.remove()
      }
      this.publicationType = ''
      this.title = ''
      this.price = ''
      this.oldPrice = ''
      this.description = ''
      this.objectToPublish = {}
      this.imgUploaded = false
      this.selectionValidated = false
      this.mainImageSelected = false
      this.imageUrlsArray = []
      this.imagesArray = []
      this.filesToStore = []
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
  padding: 4vw 0 3vw 0;
  margin-left: 4vw;
  margin-right: 12vw;
}

.files-uploader-btn {
  cursor: pointer;
  margin-top: 22px;
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

#oldPrice {
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
