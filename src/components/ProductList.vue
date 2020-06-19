<template>
  <div>
    <p class="clickableText" v-if="!showProductList" @click="toggleProductList">
      Afficher la liste des produits publiés
    </p>

    <transition
      @before-enter="beforeListEnter"
      @before-leave="beforeListLeave"
      @enter="listEnter"
      @leave="listLeave"
      :css="false"
      mode="out-in"
    >
      <div v-if="showProductList">
        <p
          class="clickableText"
          v-if="showProductList"
          @click="toggleProductList"
        >
          Cacher la liste des produits publiés
        </p>

        <form
          v-if="publicationToModify !== null"
          @submit.prevent
          id="publication-updater-form"
        >
          <div>
            <label for="newPublicationType">
              <button
                v-if="newPublicationType"
                type="button"
                @click="clearNewPublicationType"
              >
                Ne plus modifier
              </button>
              <button v-else type="button" @click="editPublicationType">
                Modifier
              </button>
            </label>
            <div>Type actuel: {{ publicationToModify.publicationType }}</div>
            <p v-if="newPublicationType">Nouveau Type :</p>
            <select
              id="newPublicationType"
              v-if="newPublicationType"
              v-model="newPublicationType"
              :class="{
                news: this.newPublicationType === 'nouveauté',
                promotion: this.newPublicationType === 'promotion'
              }"
            >
              <option value="nouveauté" class="news">Nouveauté</option>
              <option value="promotion" class="promotion">Promotion</option>
            </select>
          </div>

          <div>
            <label for="newTitle">
              <button v-if="newTitle" type="button" @click="clearNewTitle">
                Ne plus modifier
              </button>
              <button v-else type="button" @click="editTitle">Modifier</button>
            </label>
            <div>Titre actuel : {{ publicationToModify.title }}</div>
            <p v-if="newTitle">Nouveau Titre :</p>
            <input
              id="newTitle"
              v-if="newTitle"
              v-model="newTitle"
              size="10"
              :class="{
                news: this.newPublicationType === 'nouveauté',
                promotion: this.newPublicationType === 'promotion'
              }"
            />
          </div>

          <div>
            <label for="newPrice">
              <button v-if="newPrice" type="button" @click="clearNewPrice">
                Ne plus modifier
              </button>
              <button v-else type="button" @click="editPrice">Modifier</button>
            </label>
            <div>Prix actuel : {{ publicationToModify.price }}</div>
            <p v-if="newPrice">Nouveau Prix :</p>
            <input
              id="newPrice"
              v-if="newPrice"
              v-model="newPrice"
              size="10"
              :class="{
                news: this.newPublicationType === 'nouveauté',
                promotion: this.newPublicationType === 'promotion'
              }"
            />
          </div>

          <div v-if="this.newPublicationType === 'promotion'">
            <label for="newOldPrice">
              <button
                v-if="newOldPrice"
                type="button"
                @click="clearNewOldPrice"
              >
                Ne plus modifier
              </button>
              <button v-else type="button" @click="editOldPrice">
                Modifier
              </button>
            </label>
            <div>
              "Ancien Prix" actuel
              <span v-if="this.publicationToModify.oldPrice">{{
                publicationToModify.oldPrice
              }}</span>
            </div>
            <p v-if="newOldPrice">Nouvel "Ancien Prix" :</p>
            <input
              id="newOldPrice"
              v-if="newOldPrice"
              v-model="newOldPrice"
              size="10"
              :class="{
                news: this.newPublicationType === 'nouveauté',
                promotion: this.newPublicationType === 'promotion'
              }"
            />
          </div>

          <div>
            <label for="newDescription">
              <button
                v-if="newDescription"
                type="button"
                @click="clearNewDescription"
              >
                Ne plus modifier
              </button>
              <button v-else type="button" @click="editDescription">
                Modifier
              </button>
            </label>
            <div>Description : {{ publicationToModify.description }}</div>
            <p v-if="newDescription">Nouvelle Description :</p>
            <textarea
              id="newDescription"
              v-if="newDescription"
              v-model="newDescription"
              size="10"
              :class="{
                news: this.newPublicationType === 'nouveauté',
                promotion: this.newPublicationType === 'promotion'
              }"
            />
          </div>

          <button
            :disabled="
              !this.newTitle &&
                !this.newPrice &&
                !this.newDescription &&
                !this.newPublicationType
            "
            :class="{
              disabledButton:
                !this.newTitle &&
                !this.newPrice &&
                !this.newDescription &&
                !this.newPublicationType,
              news: this.newPublicationType === 'nouveauté',
              promotion: this.newPublicationType === 'promotion'
            }"
            class="btn-mine"
            type="submit"
            @click="publishModifications"
          >
            Appliquer ces modifications
          </button>
          <button class="btn-mine" type="button" @click="clearData">
            ANNULER LA MODIFICATION
          </button>
          <button
            v-show="!confirmDeletion"
            class="submit-button"
            type="button"
            @click="askForConfirmation"
          >
            EFFACER LA PUBLICATION
          </button>
          <h2 v-show="confirmDeletion">
            Es-tu sûre de vouloir supprimer cette publication ?
          </h2>
          <button
            v-show="confirmDeletion"
            class="submit-button"
            type="button"
            @click="deletePublication"
          >
            OUI
          </button>
          <button
            v-show="confirmDeletion"
            class="btn-mine"
            type="button"
            @click="cancel"
          >
            NON
          </button>
        </form>
        <NewsAndPromotionsTabs
          @show-full-publication="showPublicationAndAllowModifications"
        >
        </NewsAndPromotionsTabs>
      </div>
    </transition>
  </div>
</template>

<script>
import mixin from '@/mixins/mixin'
import * as fb from '@/firebaseConfig.js'
import NProgress from 'nprogress'
import NewsAndPromotionsTabs from '@/components/NewsAndPromotionsTabs'
export default {
  components: {
    NewsAndPromotionsTabs
  },
  props: {
    publishedNewsList: {
      type: Array,
      required: true
    },
    publishedPromotionsList: {
      type: Array,
      required: true
    }
  },
  mixins: [mixin],
  data() {
    return {
      showProductList: false,
      confirmDeletion: false,
      publicationToModify: null,
      newPublicationType: '',
      newTitle: '',
      newPrice: '',
      newOldPrice: '',
      newDescription: ''
    }
  },
  methods: {
    toggleProductList() {
      this.showProductList = !this.showProductList
    },
    showPublicationAndAllowModifications(publicationToModify) {
      this.publicationToModify = publicationToModify
    },
    editPublicationType() {
      this.newPublicationType = this.publicationToModify.publicationType
    },
    clearNewPublicationType() {
      this.newPublicationType = ''
    },
    editTitle() {
      this.newTitle = this.publicationToModify.title
    },
    clearNewTitle() {
      this.newTitle = ''
    },
    editPrice() {
      this.newPrice = this.publicationToModify.price
    },
    clearNewPrice() {
      this.newPrice = ''
    },
    editOldPrice() {
      if (this.publicationToModify.oldPrice) {
        this.newOldPrice = this.publicationToModify.oldPrice
      } else {
        this.newOldPrice = this.publicationToModify.price
      }
    },
    clearNewOldPrice() {
      this.newOldPrice = ''
    },
    editDescription() {
      this.newDescription = this.publicationToModify.description
    },
    clearNewDescription() {
      this.newDescription = ''
    },
    publishModifications() {
      NProgress.start()
      this.connectionTest()
      let updateObject = {
        publicationType: this.publicationToModify.publicationType,
        oldPrice: this.newOldPrice
      }
      if (this.newPublicationType) {
        updateObject.publicationType = this.newPublicationType
      }
      if (this.newTitle) {
        updateObject.title = this.newTitle
      }
      if (this.newPrice) {
        updateObject.price = this.newPrice
      }
      if (this.newDescription) {
        updateObject.description = this.newDescription
      }

      fb.publishedNewsCollection
        .doc(this.publicationToModify.id)
        .update(updateObject)

        .then(() => {
          NProgress.done()
          const notification = {
            type: 'success',
            message: `La publication a été modifiée avec succès !`
          }
          this.$store.dispatch('notification/add', notification)
        })
        .then(() => {
          this.clearData()
        })
        .catch(error => {
          this.publicationError(error)
        })
    },
    clearData() {
      this.publicationToModify = null
      this.newPublicationType = ''
      this.newTitle = ''
      this.newPrice = ''
      this.newOldPrice = ''
      this.newDescription = ''
      this.confirmDeletion = false
    },
    askForConfirmation() {
      this.confirmDeletion = true
    },
    cancel() {
      this.confirmDeletion = false
    },
    deletePublication() {
      NProgress.start()
      this.connectionTest()
      this.deleteImagesFromFbStorage().then(() => {
        debugger
        fb.publishedNewsCollection
          .doc(this.publicationToModify.id)
          .delete()
          .then(() => {
            NProgress.done()
            const notification = {
              type: 'success',
              message: `La publication a été effacée avec succès !`
            }
            this.$store.dispatch('notification/add', notification)
          })
          .then(() => {
            this.clearData()
          })
          .catch(error => {
            this.publicationError(error)
          })
      })
    },
    deleteImagesFromFbStorage() {
      const deletedImages = fb.publishedNewsCollection.doc(
        this.publicationToModify.id
      )

      console.log(deletedImages)
      debugger
      const bucket = fb.storage.ref()
      return deletedImages.map(imagePath => {
        return bucket.file(imagePath).delete()
      })
    },
    beforeListEnter(el) {
      this.$emit('before-list-enter', el)
    },
    listEnter(el, done) {
      this.$emit('list-enter', el, done)
    },
    beforeListLeave(el) {
      this.$emit('before-list-leave', el)
    },
    listLeave(el, done) {
      this.$emit('list-leave', el, done)
    }
  }
}
</script>

<style scoped>
p {
  padding-left: 1vw;
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

#publication-updater-form {
}
</style>
