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
          <div class="category">
            <label for="newPublicationType">
              <button
                v-if="newPublicationType"
                type="button"
                class="dont-modify"
                @click="clearNewPublicationType"
              >
                Ne plus modifier
              </button>
              <button
                v-else
                type="button"
                class="modify"
                @click="editPublicationType"
              >
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

          <div class="category">
            <label for="newTitle">
              <button
                v-if="newTitle"
                type="button"
                class="dont-modify"
                @click="clearNewTitle"
              >
                Ne plus modifier
              </button>
              <button v-else type="button" class="modify" @click="editTitle">
                Modifier
              </button>
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

          <div class="category">
            <label for="newPrice">
              <button
                v-if="newPrice"
                type="button"
                class="dont-modify"
                @click="clearNewPrice"
              >
                Ne plus modifier
              </button>
              <button v-else type="button" class="modify" @click="editPrice">
                Modifier
              </button>
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

          <div v-if="this.newPublicationType === 'promotion'" class="category">
            <label for="newOldPrice">
              <button
                v-if="newOldPrice"
                type="button"
                class="dont-modify"
                @click="clearNewOldPrice"
              >
                Ne plus modifier
              </button>
              <button v-else type="button" class="modify" @click="editOldPrice">
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

          <div class="category">
            <label for="new-description">
              <button
                v-if="newDescription"
                type="button"
                class="dont-modify"
                @click="clearNewDescription"
              >
                Ne plus modifier
              </button>
              <button
                v-else
                type="button"
                class="modify"
                @click="editDescription"
              >
                Modifier
              </button>
            </label>
            <div id="description">
              Description : {{ publicationToModify.description }}
            </div>
            <p v-if="newDescription">Nouvelle Description :</p>
            <textarea
              id="new-description"
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
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 1vw;
}

input {
  height: 4vw;
  background-color: green;
}

button {
  padding: 2vw 3vw;
  margin: 1vw;
}

button:hover {
  cursor: pointer;
}

.dont-modify {
  background-color: lightblue;
  flex-shrink: 1;
}

.modify {
  background-color: green;
  flex-shrink: 1;
}

.news {
  background-color: #283373 !important;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.promotion {
  background-color: #45d37f !important;
  color: black;
  font-weight: bold;
  font-size: 14px;
}

.category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2vw;
}

#newTitle {
  width: 50%;
}

#new-description {
  width: 90%;
  height: 4vw;
  background-color: green;
}

#newPublicationType {
  height: 4vw;
}

#publication-updater-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 500px) {
  #newTitle {
    width: 40vw;
  }

  #new-description {
    width: 30vw;
    height: 20vw;
    flex-grow: 1;
    flex-shrink: 0;
  }

  #newPublicationType {
    height: 4vw;
  }
}

@media (min-width: 500px) and (max-width: 900px) {
  button {
    padding: 1vw 1.5vw;
  }

  #description {
    flex-shrink: 1;
    flex-grow: 0;
  }
  #newTitle {
    width: 100%;
  }

  #new-description {
    width: 20vw;
    height: 10vw;
    flex-grow: 1;
    flex-shrink: 0;
  }

  #newPublicationType {
    height: 4vw;
  }
}
</style>
